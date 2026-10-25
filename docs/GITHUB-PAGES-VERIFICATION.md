# GitHub Pages deployment verification

25 October 2026. Repository inspected: `susanthavfx-art/AR-Web-App`, commit `104e422e104492649d27e8dd6256b15f77f7ea94`.

## Diagnosis

The public Pages URL returned HTTP 200 with the unbuilt root HTML referencing `/src/main.jsx`. The workflow uploaded the entire repository without a Vite build. The old prebuilt index also referenced origin-root `/assets` paths. The original app used root `/markers`, `/view`, `/print` and Home links, incompatible with a project Pages subfolder.

## Local fixes verified

- `VITE_BASE_PATH=/AR-Web-App/ npm run build` succeeded.
- Built JS, CSS, favicon and font paths include `/AR-Web-App/`.
- Marker image and .mind URLs preserve the deployment prefix.
- Share and print URLs use the app base plus fragment parameters; no `/view` or `/print` HTTP route is required.
- Hash changes, in-tab navigation and reloads route correctly.
- Static server intentionally returns 404 for `/AR-Web-App/view`, proving the new flow is not relying on a hidden SPA fallback.
- All **7 Playwright tests passed**, including the existing editor/backup/print/camera flows, both real MindAR synthetic-camera detection tests, and a new deployment-path regression test.
- Workflow YAML was parsed successfully. The `configure-pages@v5` `base_path` output was checked against the action metadata.

This is local verification of the corrected source/build. No commit or push was made to the remote repository, and its new Actions deployment must be checked after the owner uploads the patch. No physical-phone compatibility guarantee is implied.
