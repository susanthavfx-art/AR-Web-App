# Wonderlab — WebAR creation studio

> **GitHub Pages update:** See [GITHUB-PAGES-SETUP.md](GITHUB-PAGES-SETUP.md) for deploying this repository at `/AR-Web-App/`. The included workflow builds the app and publishes `site/`, not the source repository.

**A little imagination. A whole new world.**

A working, child-friendly MVP of a marker-based WebAR authoring platform. Build a 3D scene from a demo object library, arrange and animate it, share a self-contained project link, print a marker sheet, and view the scene through a phone camera.

![Wonderlab creation studio](docs/studio-preview.png)

## Try the complete flow

1. Open the running **Wonderlab — AR creation studio** live preview. For editing, a laptop or desktop is easiest.
2. Click an object in **Your toolbox**, or drag it onto the 3D workspace.
3. Select an object. Move, rotate, resize, recolour, duplicate or remove it in **Make it yours**. The canvas tools also provide transform handles.
4. Choose **Still**, **Float** or **Spin**. Press the canvas Play button to preview animations.
5. Open **Markers** to choose **Space explorer** or **Forest friends**.
6. Click **Publish & share**. This creates a *snapshot link*, not a cloud upload.
7. Choose **Print your marker → Download marker PDF**. Print the A4 sheet in colour at 100%, without cropping the illustrated image.
8. Scan the sheet's **QR code** with a phone. Open the viewer directly in a current mobile browser, not inside an embedded social-media browser or restricted iframe.
9. Tap **Start AR camera**, allow camera access, and point at the entire **illustrated tracking image**. Keep the page flat on a desk, well lit and free of glare. Move back if the image does not fit in view.

**The QR opens the correct project. The illustration is the image-tracking target. These are two different jobs.** You can also display the marker on another screen for an initial test, though a good print is preferable for the intended workflow.

AR needs an accessible **HTTPS** URL, camera permission, WebGL and a compatible browser. Current Safari on iPhone and Chrome on Android are the intended test targets, not a blanket compatibility guarantee. A 3D viewer is available when camera access is unavailable.

> **Preview links are temporary.** A printed QR continues working only while the app is available at the URL in that QR. Deploy the app to a stable public HTTPS domain before printing long-term classroom materials, then generate new sheets on that domain.

## Included and working

| Area | Features |
| --- | --- |
| 3D authoring | Orbit/zoom, click selection, drag-and-drop placement, move/rotate/uniform-scale handles, numerical transforms, colours, duplicate/delete, undo/redo |
| Object library | 12 original procedural demo models: rocket, Earth, Saturn, Moon, Sun, astronaut, tree, mushroom, robot, atom, volcano and flower |
| Markers | Two AI-illustrated image markers, with matching precompiled MindAR `.mind` target files |
| Scene management | Named objects, object visibility, scene list, float/spin animations, grid and marker guide |
| Projects | Local autosave, reopen, rename, duplicate, search, delete, JSON export/import, four starting templates |
| Sharing | Compressed scene snapshot in a URL fragment; QR code; opens on a different device without the editor's local storage |
| Printing | Project-specific A4 PDF, printable web page, tracking image and project QR on the same sheet |
| Mobile viewer | Real MindAR image tracking, target found/lost state, camera-error handling, 3D fallback, AR size adjustment, viewing tips |
| Lifecycle | Camera tracks stop when the user exits AR, leaves the page, or the page becomes hidden |
| Responsive UI | Desktop editor and phone-sized object/properties drawers; mobile-first published viewer |

## Honest MVP boundaries

- **No backend, login, student profiles, classroom management or teacher/admin roles.** Nothing is pretending to authenticate or upload a project.
- Projects are saved in **this browser on this device** using local storage. Clearing site data can remove them. Private browsing or full storage may prevent saving. Export JSON to keep a backup.
- Anyone with a snapshot link can view the included scene. Links are **not private, revocable, password protected or permanent hosted records**. Editing a project does not change an old link; create and share a new snapshot.
- The demo permits **20 objects per scene and 30 local projects** to keep URLs and mobile workloads reasonable. Even within this limit, performance varies by phone.
- The library contains procedural demo models. **Custom GLB/GLTF uploads and an admin library uploader are not implemented yet.** Your existing models and markers can be integrated in a follow-up phase.
- The two bundled image targets are compiled in advance. Selecting them does not require runtime compilation. Arbitrary user-uploaded images would need a target-compilation workflow.
- The editor's platform, orbit lines and grid are authoring aids; they do not appear in the real AR scene.
- Camera tracking runs on the device; the app does not upload the camera feed or include analytics. Ordinary hosting access logs are still the responsibility of the deployment provider.
- UI copy is in English. Sinhala localisation, keyboard-only 3D manipulation improvements and broader accessibility/device validation are next steps.
- This is a working **prototype**, not a fully audited or classroom-certified production service.

## Run locally

Use Node.js 20.19+ or a supported newer LTS release.

```bash
npm ci
npm run dev
```

The development server binds to `0.0.0.0:5173` and accepts the Arena preview host. Open the live preview supplied by the workspace.

`localhost` is treated as a secure context on the *same device*. An ordinary `http://<laptop-LAN-IP>` address is **not** sufficient for phone camera access. Use a public HTTPS deployment or a correctly configured HTTPS development endpoint for a phone.

### Build for deployment

```bash
npm run build
npm run preview
```

Build with `npm run build` and deploy the generated `site/` directory on a static HTTPS host. The default base is `/` for a root-domain deployment. For a subfolder deployment, build with `VITE_BASE_PATH` set to the final folder, including a trailing slash, e.g. `VITE_BASE_PATH=/AR-Web-App/ npm run build`.

The GitHub Pages workflow in `.github/workflows/static.yml` installs dependencies, gets the actual Pages `base_path`, builds with that prefix, and uploads only `./site`. It does not publish the unbuilt repository. Viewer and print links use `#page=view&scene=...` and `#page=print&scene=...` under the app's base path, so a static host does not need SPA rewrites for those new links. The legacy `/view` and `/print` routes remain supported on hosts that already have fallback, but new GitHub Pages links do not depend on them.

Full-quality illustration originals are kept in `design-assets/marker-originals/`; the app uses optimised JPEGs compiled into the matching tracking targets.

There are no runtime CDN dependencies: fonts, marker images and tracking bundles are local. npm needs network access at install time. The 3D editor and AR viewer require JavaScript and WebGL; there is no offline/service-worker guarantee.

For production, replace the permissive development-host setting with normal deployment controls. A content-security policy must allow the local scripts/assets and MindAR's blob worker; camera permission must be allowed for the top-level viewer. Prefer opening the viewer directly rather than loosening an unrelated iframe's permissions.

## Source map

```text
src/
  App.jsx                       Editor, project management, templates and guide
  components/
    StudioCanvas.jsx            Three.js workspace, orbit and transform controls
    Viewer.jsx                  Published viewer and real MindAR camera tracking
    ShareModal.jsx              Snapshot link, QR and marker publishing flow
    PrintPage.jsx               Printable marker page
    UI.jsx                      Shared branding, modal and controls
  lib/
    assets.js                   Procedural model registry and marker metadata
    projects.js                 Validation, local persistence and scene encoding
    pdf.js                      Project-specific A4 marker PDF generation
  vendor/                       Pinned MindAR 1.2.5 browser bundles and licence
public/
  markers/                      Optimised marker JPEGs and matching .mind files
  fonts/                        Self-hosted fonts and OFL notices
scripts/
  compile-targets.html/.mjs      Rebuild the two .mind files from the JPEGs
  screenshot.mjs                Desktop preview capture
  check-ar.mjs                  Synthetic-camera tracking smoke test
```

The shared schema only accepts allowlisted demo asset IDs, bounded finite transforms, known animations and safe colour values. Imported JSON is validated and capped in size. Scene data is encoded as compact JSON with LZ-String in the URL fragment; no project lookup API is needed for the demo. The viewer maps editor X/Z coordinates to the image plane and editor Y to height above the marker.

The studio renders on demand when still, limits animated rendering to about 30 FPS and caps pixel ratio. This avoids continuously redrawing an idle scene, especially on lower-powered devices. The tracking runtime itself has its own processing loop.

### Recompile markers

Only needed after changing a marker image. Keep the dev server running, install Playwright's Chromium, then run:

```bash
node scripts/compile-targets.mjs
```

The runtime JPEG and the `.mind` file must remain a matching pair. Each bundled target file contains one image, so the runtime uses target index `0` for the selected marker. Avoid replacing just the JPEG without recompiling.

## Verification

With the dev server already running:

```bash
npx playwright install --with-deps chromium
npm test
```

The final complete production-build run passed all **6 tests**. Details are in [docs/VERIFICATION.md](docs/VERIFICATION.md).

For the GitHub Pages subfolder verification, use the commands in [GITHUB-PAGES-SETUP.md](GITHUB-PAGES-SETUP.md). The updated suite passed **7 tests** against a strict `/AR-Web-App/` deployment without SPA fallback.

The included end-to-end tests cover editing and local persistence; project templates and backups; snapshot sharing to a fresh browser context; PDF download and print rendering; camera-denied fallback; mobile drawers; malformed links; and **actual MindAR detection against each bundled marker using a synthetic camera stream**, including camera shutdown on exit.

A synthetic stream exercises real detection and rendering code, but **does not replace physical iPhone/Android testing**. Before classroom use, verify rear-camera selection, permissions, target reacquisition, different viewing angles, lighting, print quality, performance and battery/thermal behaviour on the intended devices.

## Next production phase

1. Integrate your actual marker/object catalogue; optimise GLB assets and thumbnails; build controlled admin uploads and target compilation.
2. Add an API, database and object storage; persistent short project URLs/QRs; versioned publish records and access/revocation controls.
3. Add teacher/student roles, private classrooms and age-appropriate content controls. Avoid collecting unnecessary children's personal data.
4. Validate child-data/privacy requirements for the intended schools and jurisdictions; implement the required consent, retention and safeguarding controls.
5. Add Sinhala/English localisation, accessibility review, monitoring and a physical-device/browser test matrix.

This is an original implementation of the requested workflow, not a copy of Assemblr's code, branding or content. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for software and asset notes.
