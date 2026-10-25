# GLB library update — meka issellama balanna

**Me ZIP eka existing `susanthavfx-art/AR-Web-App` repository ekata update patch ekak. Full replacement repository ekak nemei.** Current GitHub Pages fix eka keep karanna.

Based on public `main` commit: `05be36a426c90f8b94a6e56121ea1955b28013a4` (the repository already contains the previous Pages repair).

## Meka add karanne monawada?

- `public/models/catalog.json` eken GLB model library eka manage karanna puluwan.
- New categories automatically appear. Future model additions walata JavaScript edit karanna one naha.
- Automatic thumbnails, model loading/errors, centring/flooring/sizing, embedded animation playback, editor transforms, saved project/JSON support.
- Fresh-phone share links include stable IDs + model settings. Reordering the catalogue does not change which model a scene uses; legacy demo QR links still decode.
- Original animated **Wonder Bot** GLB sample eka included. Oyaga actual model files me ZIP eke naha.
- **Add your own models** in-app guide ekak included. Me button eka instructions open karanawa, upload/admin panel ekak nemei.

## A. One-time update eka install karanna

### GitHub website eken

1. **`AR-Web-App-GLB-Library-Update.zip` download karala extract/unzip karanna.** ZIP file eka repository ekata upload karana eka witharak madi.
2. Open **https://github.com/susanthavfx-art/AR-Web-App** → `main` branch → repository **root**.
3. **Add file → Upload files** click karanna.
4. Extract karapu ZIP eke `src`, `public`, `scripts`, `tests`, `docs` **folders**, saha root `.md` guide/README files, repository root upload area ekata drag karanna. Folder paths preserve wenna one.
5. Upload list eke paths `src/App.jsx`, `public/models/catalog.json` wage thiyenawada balanna. Files okkoma root eke `App.jsx`, `catalog.json` wage flatten karanna epa. ZIP eka extract karapu wrapper folder ekak thiyenawa nam e wrapper eka upload karanna epa; **inside contents** upload karanna.
6. Existing matching files replace karala **Commit changes** to `main` karanna. Existing other files delete karanna epa.
7. **Actions** → latest **Build and deploy Wonderlab to GitHub Pages** run eka green wenakan inna.
8. Open **https://susanthavfx-art.github.io/AR-Web-App/** → hard refresh (`Ctrl + Shift + R`) or private window.
9. Toolbox eke **Your models → Wonder Bot** penenna one. Click karala scene ekata add karanna. Play button eka press kalama arm eka wave wenawa.

If the browser cannot preserve folder uploads, use a Git checkout/desktop file workflow or replace each file at the exact path listed in the archive. Do not replace `public/` or `src/` with only their patch contents by deleting the old folders: the original markers, fonts, app components and vendored tracking runtime are still required.

### Git checkout ekak use karanawa nam

Current repository clone eke root ekata archive contents extract/overwrite karanna. Then inspect changes and commit the source/public/docs/test files. Do not commit `node_modules` or a local generated `site/` build. No dependency/package-lock changes are required for this feature.

```bash
npm ci
VITE_BASE_PATH=/AR-Web-App/ npm run build
```

Existing `.github/workflows/static.yml`, `src/lib/deployment.js`, Vite base config, markers/fonts and MindAR bundles are **unchanged** by this patch. The workflow builds and publishes `site/` automatically. Keep Pages source set to **GitHub Actions**. Do not switch back to publishing the unbuilt repository.

## B. Ita passe oyage models add karanna

1. Upload `lion.glb` to **`public/models/`**.
2. Edit **`public/models/catalog.json`**, add an object inside `models`:

```json
{
  "id": "lion-01",
  "name": "Lion",
  "category": "Animals",
  "file": "lion.glb",
  "height": 1.5,
  "rotation": [0, 0, 0],
  "animate": true
}
```

3. Entries athara comma ekak danna. Existing Wonder Bot entry eka keep karanna, unless deliberately removing it from the library.
4. Commit → Actions green → refresh.
5. Library eke **Animals / Lion** appear wei. Add, arrange, then **Publish & share** eken new phone link/QR eka hadanna.

**Full guide saha complete JSON example:** [ADD-MODELS.md](ADD-MODELS.md).

## C. Important

- This patch was built and tested locally; **no remote commit/push or live Pages deployment was made by the assistant**. The owner must upload/commit it and check the resulting deployment.
- No admin panel/cloud upload UI/backend is included; the selected method is GitHub files + JSON catalogue.
- Standard self-contained GLB 2.0 with embedded textures; Draco/Meshopt geometry supported. KTX2 textures are not supported.
- Model files must remain online for old phone links. Existing project metadata does not contain the GLB binary.
- Validate your own GLB and intended phones/printed markers. Automated synthetic-camera tests are not physical-device certification.

Local verification details: [docs/GLB-LIBRARY-VERIFICATION.md](docs/GLB-LIBRARY-VERIFICATION.md).
