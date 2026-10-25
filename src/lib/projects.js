import LZString from "lz-string";
import { ASSETS, MARKERS, sceneObject, getAsset } from "./assets";

export const STORAGE_KEY = "wonderlab.projects.v1";
export const ACTIVE_KEY = "wonderlab.active.v1";
export const MAX_OBJECTS = 20;
const copy = (value) => JSON.parse(JSON.stringify(value));
export const clone = copy;

export const TEMPLATES = [
  {
    id: "space",
    name: "My space adventure",
    category: "Space & beyond",
    description: "A small step for you. A giant leap for your imagination.",
    color: "#eee9fc",
    asset: "saturn",
    markerId: "space-explorer",
    objects: () => [
      sceneObject("earth", [-0.05, 0.35, 0.9], 1.06, { animation: "spin" }),
      sceneObject("saturn", [1.3, 0.8, -1], 0.9, { rotation: [0, 0, -8] }),
      sceneObject("rocket", [-2.1, 0.38, 1.3], 1.05, {
        rotation: [0, 18, -17],
        animation: "float",
      }),
      sceneObject("moon", [1.65, 0.12, 1.1], 0.5),
      sceneObject("sun", [-1.05, 1.4, -1.4], 0.52),
    ],
  },
  {
    id: "forest",
    name: "My little green world",
    category: "The natural world",
    description: "Plant an idea. Watch a wonderful little world grow.",
    color: "#e9f2e5",
    asset: "tree",
    markerId: "forest-friends",
    objects: () => [
      sceneObject("tree", [-0.75, 0, -0.5], 1.3),
      sceneObject("tree", [1.0, 0, -0.8], 0.8),
      sceneObject("mushroom", [-1.1, 0, 1.1], 0.65),
      sceneObject("flower", [0.65, 0, 0.9], 0.7, { animation: "float" }),
      sceneObject("sun", [0.9, 1.7, -1.5], 0.48),
    ],
  },
  {
    id: "science",
    name: "Hello, future!",
    category: "Science & discovery",
    description:
      "Meet a friendly robot and explore the tiniest building blocks.",
    color: "#e8f1f7",
    asset: "robot",
    markerId: "space-explorer",
    objects: () => [
      sceneObject("robot", [-0.8, 0, 0.55], 1.1, { animation: "float" }),
      sceneObject("atom", [1, 0.4, -0.5], 1.1, { animation: "spin" }),
      sceneObject("rocket", [-1.2, 0, -1.2], 0.6),
    ],
  },
  {
    id: "blank",
    name: "My next big idea",
    category: "Start from scratch",
    description: "An empty canvas. Endless possibilities. All yours.",
    color: "#f8efe2",
    asset: "rocket",
    markerId: "space-explorer",
    objects: () => [],
  },
];

export function newProject(templateId = "blank") {
  const t = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[3];
  return {
    version: 1,
    id: crypto.randomUUID(),
    title: t.name,
    markerId: t.markerId,
    objects: t.objects(),
    updatedAt: new Date().toISOString(),
  };
}
const number = (v, fallback = 0, min = -10, max = 10) =>
  typeof v === "number" && Number.isFinite(v)
    ? Math.max(min, Math.min(max, v))
    : fallback;
export function validateProject(input) {
  if (!input || typeof input !== "object" || !Array.isArray(input.objects))
    throw new Error("This is not a Wonderlab project file.");
  if (input.objects.length > MAX_OBJECTS)
    throw new Error(
      `Keep your scene to ${MAX_OBJECTS} objects for a smooth mobile experience.`,
    );
  const ids = new Set();
  return {
    version: 1,
    id:
      typeof input.id === "string" && input.id.length < 80
        ? input.id
        : crypto.randomUUID(),
    title:
      typeof input.title === "string"
        ? input.title.trim().slice(0, 70) || "My new creation"
        : "My new creation",
    markerId: MARKERS.some((m) => m.id === input.markerId)
      ? input.markerId
      : MARKERS[0].id,
    updatedAt:
      typeof input.updatedAt === "string" &&
      Number.isFinite(Date.parse(input.updatedAt))
        ? new Date(input.updatedAt).toISOString()
        : new Date().toISOString(),
    objects: input.objects
      .filter((o) => o && ASSETS.some((a) => a.id === o.assetId))
      .map((o) => {
        let id =
          typeof o.id === "string" && o.id.length < 80
            ? o.id
            : crypto.randomUUID();
        if (ids.has(id)) id = crypto.randomUUID();
        ids.add(id);
        return {
          id,
          assetId: o.assetId,
          name:
            typeof o.name === "string"
              ? o.name.slice(0, 35)
              : getAsset(o.assetId).name,
          position: [0, 1, 2].map((i) =>
            number(o.position?.[i], 0, i === 1 ? 0 : -4, i === 1 ? 4 : 4),
          ),
          rotation: [0, 1, 2].map((i) => number(o.rotation?.[i], 0, -360, 360)),
          scale: number(o.scale, 1, 0.15, 2.5),
          animation: ["none", "float", "spin"].includes(o.animation)
            ? o.animation
            : "none",
          visible: o.visible !== false,
          ...(typeof o.color === "string" && /^#[0-9a-f]{6}$/i.test(o.color)
            ? { color: o.color }
            : {}),
        };
      }),
  };
}
export function loadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(saved)) return saved.slice(0, 30).map(validateProject);
  } catch {
    /* A corrupt or unavailable store should never prevent opening the editor. */
  }
  return [newProject("space")];
}
export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects.slice(0, 30)));
    return true;
  } catch {
    return false;
  }
}
const r = (n) => Math.round(n * 100) / 100;
export function encodeScene(project) {
  const p = validateProject(project);
  const compact = {
    v: 1,
    n: p.title,
    m: MARKERS.findIndex((m) => m.id === p.markerId),
    o: p.objects.map((o) => [
      ASSETS.findIndex((a) => a.id === o.assetId),
      ...o.position.map(r),
      ...o.rotation.map(r),
      r(o.scale),
      ["none", "float", "spin"].indexOf(o.animation),
      o.visible ? 1 : 0,
      o.name === getAsset(o.assetId).name ? "" : o.name,
      o.color || "",
    ]),
  };
  return LZString.compressToEncodedURIComponent(JSON.stringify(compact));
}
export function decodeScene(encoded) {
  if (!encoded || encoded.length > 12000)
    throw new Error("This project link is missing or too large.");
  const raw = LZString.decompressFromEncodedURIComponent(encoded);
  if (!raw || raw.length > 25000)
    throw new Error("This project link could not be read.");
  const data = JSON.parse(raw);
  if (data.v !== 1 || !Array.isArray(data.o))
    throw new Error("This project link uses an unsupported format.");
  return validateProject({
    title: data.n,
    markerId: MARKERS[data.m]?.id,
    objects: data.o.map((a) => ({
      id: crypto.randomUUID(),
      assetId: ASSETS[a[0]]?.id,
      position: a.slice(1, 4),
      rotation: a.slice(4, 7),
      scale: a[7],
      animation: ["none", "float", "spin"][a[8]],
      visible: a[9] !== 0,
      name: a[10] || ASSETS[a[0]]?.name,
      color: a[11],
    })),
  });
}
export function projectFromLocation() {
  const h = window.location.hash;
  if (!h.startsWith("#scene="))
    throw new Error(
      "No project was included in this link. Ask your creator for a new share link.",
    );
  return decodeScene(h.slice(7));
}
export function shareUrl(project, page = "view") {
  return `${window.location.origin}/${page}#scene=${encodeScene(project)}`;
}
export function downloadProject(project) {
  const blob = new Blob([JSON.stringify(validateProject(project), null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, `${slug(project.title)}.wonderlab.json`);
}
export function slug(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "my-creation"
  );
}
export function downloadBlob(blob, name) {
  const u = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 10000);
}
