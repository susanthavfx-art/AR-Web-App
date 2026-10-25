# Teacher-curated library verification

**Date:** 25 October 2026  
**Base repository:** `susanthavfx-art/AR-Web-App`  
**Base commit:** `e56c821f69ff5a6640af4b4c4e4ca20ff597fedf`

## Requested behaviour

Owner maintains the supplied model library. Teachers select/arrange those models and publish scene snapshots; they do not need model-upload buttons or repository editing instructions. Keep Space, Nature, Science and Animals, allow additional categories through catalogue metadata, and remove the owner-specific Your models category.

## Changes

- Removed the toolbox model-owner guide button, About-dialog owner button, GitHub model-edit instructions, and model-guide modal import/render path. The old source component may remain in the repository but is not imported into the application bundle.
- Removed its unused styles. Catalogue problems now have a short teacher-facing refresh/provider-help notice rather than an owner editing dialog.
- Moved the sample Wonder Bot into Science. Did not delete it or any GLB.
- Preserved the owner's Velociraptor ID `Velociraptor-01`, name, Animals category, file `jw_alive_blue.glb`, height, orientation and animation flag.
- Missing categories and old Your models labels normalise to General, including validated project metadata; the current two-entry catalogue explicitly uses Science and Animals and does not create a General tab.
- Automatic category discovery remains unchanged: a valid model entry with a new category creates a new tab; no JavaScript edit or separate category registry is needed.
- Scene/project creation, JSON backup/import, sharing, QR/PDF, both markers and camera lifecycle are retained. No authentication, payment, private storage or DRM was added.

## Validation

```bash
npm ci
VITE_BASE_PATH=/AR-Web-App/ npm run build
node scripts/serve-pages.mjs
# Separate terminal:
APP_BASE_PATH=/AR-Web-App/ npx playwright test
npm audit --omit=dev
```

- Production build succeeded for `/AR-Web-App/`.
- Final complete test suite: **21 passed (3.0 minutes)**, one Chromium worker, strict static server with no SPA fallback.
- Production dependency audit: **0 reported vulnerabilities**. This is not a full security audit.
- Prettier checks passed for changed runtime and test source.
- No uncaught browser page errors in the tested flows.

### Teacher-specific tests

1. Teacher library has no Add your own models control, no Your models category and no GitHub owner link in the page/About dialog. Wonder Bot is selectable in Science. The owner's **actual 2,092,900-byte `jw_alive_blue.glb`** loads, thumbnails, places in an isolated scene and publishes a QR/share link. A fresh mobile-sized viewer without author storage requests/loads that file successfully.
2. A test-only catalogue entry using the existing sample file and category Vehicles adds a new tab **alongside** All, Space, Nature, Science and Animals. Filtering and placement work without changing application code. No fake car/rover asset or extra category was inserted into the actual catalogue.
3. Missing category and legacy Your models values become General; no owner-specific tab appears, and placement/inspector metadata remain usable.

### Existing 18 regression cases

Updated expectations for the real two-entry owner catalogue and curated UI; all passed. Cover procedural/GLB authoring, transforms/size/tint, embedded animation, clone/disposal/cache behaviour, autosave/backups, legacy v1 and stable v2 sharing, catalogue outage/reorder/descriptor variants, invalid paths, Draco/Meshopt/embedded-texture/skinned fixtures, mobile drawers, strict Pages/hash routes, PDF/print, permission denial, and both actual MindAR synthetic-camera marker tests with camera shutdown. The Space explorer tracking scene contains the original animated Wonder Bot.

### Visual inspection

Reviewed desktop editing of the owner's textured Velociraptor and the category row: **All / Space / Nature / Science / Animals**. Owner model-guide button count is zero. Also checked a 390×844 viewport: no document horizontal overflow and no page errors.

## Archive checks

- Selected-file update: **13 files**, no GLB binaries, generated `site/`, dependencies, Git internals or unrelated configuration.
- ZIP CRC and source-byte comparisons passed. Catalogue was semantically compared with the base commit: the only data change is Wonder Bot's category from Your models to Science; the dinosaur entry is unchanged.
- Applied the ZIP to a clean export of the base commit and built again for `/AR-Web-App/`. Index, all compiled JS/CSS chunks, catalogue and both GLBs matched the tested runtime **byte for byte** (11 files compared). The uploaded dinosaur remains 2,092,900 bytes.

## Boundaries

- No remote commit/push or live-site deployment was performed. Owner must apply the update and verify the latest successful Pages deployment.
- No physical iPhone/Android/printed-marker test. The uploaded dinosaur was exercised in the editor and fresh browser 3D viewer; camera-marker regressions use the real detector with synthetic input, not physical dinosaur AR viewing.
- Keeping model upload/edit controls out of the teacher UI does not protect public GLB downloads or implement paid access. Commercial distribution/model licensing and production privacy/accessibility/device review are separate requirements.
- Snapshot and local-storage limits remain; model paths/files must stay online. Keep old binaries for old links, and back up projects.
- Patch is source/catalogue/docs/tests only. Do not remove existing GLBs, markers, fonts, runtime files, Pages configuration or other catalogue entries added after the base commit.
