# GLB catalogue library — verification record

**Date:** 25 October 2026  
**Base:** public `susanthavfx-art/AR-Web-App` main commit `05be36a426c90f8b94a6e56121ea1955b28013a4`  
**Scope:** GitHub-hosted self-contained GLB files + editable JSON catalogue, no upload backend/admin panel.

## Commands and results

```bash
npm ci
VITE_BASE_PATH=/AR-Web-App/ npm run build
node scripts/serve-pages.mjs
# Separate terminal, with Playwright Chromium installed:
APP_BASE_PATH=/AR-Web-App/ npx playwright test
npm audit --omit=dev
```

- Vite production build succeeded with the `/AR-Web-App/` base. No dependency or workflow change was required.
- Final complete production test run: **18 passed (2.8 minutes)**, one Chromium worker, strict static host with **no SPA fallback**.
- npm production dependency audit: **0 reported vulnerabilities** at verification time. This is not a comprehensive security audit.
- No uncaught browser page errors were observed by the test listeners in the tested flows.
- The archive is a selected-file update, not generated `site/`, `node_modules`, a new backend or a replacement for the entire repository.

## New GLB tests — 11 passing cases

1. **Catalogue/authoring/backup:** 12 original demos + sample GLB; new category; in-app repository guide and edit link; automatically rendered PNG thumbnail; placement/name/position/rotation/size; tint and Original reset; embedded animation changes the rendered canvas while Play is active and pauses when stopped; duplication/removal; local save/reload; schema-v2 JSON export/import retaining the model definition.
2. **Fresh-phone sharing:** production-generated link/QR carries stable `model:<id>` and a bounded relative descriptor; opened without author local storage in two new contexts, one with a reordered/changed catalogue and one with a missing catalogue. Both load the original snapshot file, not the replacement path. Camera-denied fallback and print page still work.
3. **Bad entries/file:** duplicate IDs and traversal entries skipped with visible warnings; missing GLB produces actionable HTTP 404 feedback; removal and procedural objects remain usable.
4. **Catalogue failure:** HTTP 404 and malformed JSON leave the original 12 demo models usable; guide shows the issue instead of a blank application.
5. **Compatibility/security checks:** legacy numeric-index v1 demo QR payload decodes; absolute/external/traversal/non-GLB paths and duplicate definitions rejected before an external file fetch.
6. **Async lifecycle/cache:** remove a model while its request is delayed; complete it safely afterward; later instances and thumbnails reuse one request without uncaught errors.
7. **Draco fixture:** actual glTF Draco-compressed mesh decodes, thumbnails and clones; decoder wrapper and WASM are requested under `/AR-Web-App/vendor/draco/`, not from a CDN or origin-root path.
8. **Meshopt fixture:** actual Meshopt-compressed mesh decodes and produces a thumbnail/scene instances.
9. **Texture fixture:** GLB containing an embedded PNG material loads and renders, with no external texture file.
10. **Skin/animation fixture:** skinned geometry, two bones and an embedded animation; thumbnails, multiple cloned instances, playback and removal operate without uncaught page errors.
11. **Per-object descriptor references:** an imported scene retains two definitions of the same stable model ID with different file paths and fit heights. Share encoding deduplicates exact descriptors, assigns validated per-object references, and a fresh viewer fetches both intended files rather than silently replacing one.

All fixtures are original generated test geometry; their generator is `scripts/create-test-models.mjs`. The ordinary application test run uses the included fixture files and does not download an encoder.

## Existing regression coverage — 7 passing cases

- Editor library/search/transforms/history/scene animation/markers/autosave/reload.
- Templates, project creation/duplication/deletion, JSON backup/import/search.
- Snapshot opened in a clean browser context, PDF bytes/download, printable page/CSS, camera permission denial and 3D fallback.
- Mobile authoring drawers, document width and malformed link handling.
- Strict Pages base path, fonts/markers/compiled targets, fragment routing, reload/print/back/Home links; `/AR-Web-App/view` intentionally returns 404.
- **Actual MindAR detection**, not an injected target-found event, using a synthetic camera showing Space explorer. This scene also contains the loaded, animated Wonder Bot GLB. Camera track ends on exit.
- Actual synthetic-camera detection and shutdown for Forest friends.

## Additional inspection

- Reviewed desktop GLB authoring and AR screenshots.
- Reviewed the model guide after its open animation completed at 1440×960 and 390×844. Mobile document has no horizontal overflow; guide is opaque, internally scrollable, and its close button is visible. No page errors in that inspection.
- Original `wonder-bot.glb`: **327,908 bytes**, valid binary glTF 2.0, one embedded “A friendly wave” clip, no third-party model or texture. Its generator is included.
- Draco glTF decoder files are self-hosted with licence materials. Meshopt decoder is bundled from the pinned Three.js package. No model/runtime CDN is required.

## Update-archive checks

- The selected-file update contains **33 files**. ZIP CRC verification passed; every archived file was compared with its working source. No `site/`, `node_modules` or `.git` contents are included.
- Applied only the ZIP to a clean export of base commit `05be36a426c90f8b94a6e56121ea1955b28013a4`, then built for `/AR-Web-App/`. The index, all generated JS/CSS assets, catalogue, sample GLB and decoder files matched the tested production build **byte for byte** (13 runtime files compared).
- Prettier checks passed for all changed application, script and test source files.
- The current Pages workflow and deployment helper are deliberately not replaced; this patch builds on the previous repair already present in that base commit.

## Boundaries and unverified conditions

- **No remote commit/push was made.** The patch has not been deployed to or revalidated on the owner's live Pages URL; the owner must upload/commit it and check the latest Actions deployment.
- No actual user GLB was attached. Validated the original sample and small, known fixtures, not every exporter, extension, rig, animation clip or commercial model.
- **No physical iPhone/Android camera or printed-sheet test** was performed. Synthetic input exercises the real detector/renderer but does not establish print/lighting robustness, rear-camera behaviour or mobile GPU/thermal performance.
- Standard embedded PNG/JPEG textures and GLB 2.0; KTX2/Basis textures, separate external texture/buffer files and standalone `.gltf` are outside this scope. Draco and Meshopt geometry were exercised, but this is not a guarantee for all extension combinations.
- Only the first embedded animation plays automatically; no clip picker or animation authoring UI is included.
- Catalogue metadata is bounded and relative paths are validated. This is not a production security review of arbitrary uploaded 3D content; repository owners must vet models, licensing and complexity.
- A snapshot preserves paths/settings, not immutable GLB bytes. Referenced files and a stable HTTPS deployment must remain available. Replacing/deleting a file can alter/break old shares.
- The application's 40 MiB per-file check, two-load queue, lazy thumbnails and object-count cap do not guarantee smooth performance for very complex models. Optimise and test intended phones.
