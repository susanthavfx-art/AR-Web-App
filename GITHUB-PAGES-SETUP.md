# AR-Web-App — GitHub Pages fix

**Repo:** https://github.com/susanthavfx-art/AR-Web-App  
**Live URL after deployment:** https://susanthavfx-art.github.io/AR-Web-App/

## Karanna one de — browser eken

1. **`AR-Web-App-GitHub-Pages-Fix.zip` download karala unzip karanna.** ZIP file ekama GitHub ekata upload karanna epa.
2. Repo eke **Code → Add file → Upload files** open karanna:
   https://github.com/susanthavfx-art/AR-Web-App/upload/main
3. Unzip karapu files/folders **repo root ekata** upload karanna. Existing matching files replace karanna. Aluth outer folder ekak yata danna epa. File structure eka pahala wage wenna one.
4. **Important:** existing **`.github/workflows/static.yml`** file eka me ZIP eke updated version eken replace wenna one. Aluth second Pages workflow ekak hadanna epa; old workflow eka ithuru unoth aye wrong files publish wenna puluwan.
5. **Commit changes** karanna. Puluwan nam changed files okkoma eka commit ekakin upload karanna.
6. **Settings → Pages → Build and deployment → Source = GitHub Actions** kiyala thiyenna one. Oyage repo eke kalin deployment ekak success wela thibuna, e nisa already e setup eka thiyenna puluwan.
7. **Actions** tab eke **Build and deploy Wonderlab to GitHub Pages** run eka green/success wenakan balanna:
   https://github.com/susanthavfx-art/AR-Web-App/actions
8. Live link eka open karala **Ctrl+Shift+R** / hard refresh karanna:
   **https://susanthavfx-art.github.io/AR-Web-App/**

**Repo Code page eka web app eka nemei. App eka balanna `github.io` live URL eka use karanna.**

### `.github` folder eka penne nathnam

`.github` dot ekakin patan ganna hidden folder ekak. File manager eke **Show hidden files** on karanna. Nethnam repo eke existing `.github/workflows/static.yml` file eka open karala **Edit** karanna, ZIP eke e file eke full content eka paste karala commit karanna. Folder/file name eka wenas karanna epa.

### Correct locations

```text
AR-Web-App/                        ← existing repository root
  .github/
    workflows/
      static.yml                  ← replace existing workflow
  index.html                      ← updated source entry
  vite.config.js                  ← deployment base setting
  src/
    App.jsx                       ← fragment router
    components/
      Viewer.jsx                  ← correct Home links
    lib/
      deployment.js               ← NEW file — include this!
      assets.js                   ← correct marker URLs
      projects.js                 ← correct share/print URLs
```

The ZIP also includes updated tests, a strict local Pages test server, this guide and a README update. **Keep your existing `package.json`, `package-lock.json`, `public/`, `src/vendor/` and other app files.** They are not repeated in the small update ZIP because they are already in your repo. Do not delete the rest of the repository.

There is no need to manually edit compiled files inside `site/`. The workflow rebuilds that folder from source and publishes only its fresh contents.

## Why the old page was blank

The repository was inspected at commit `104e422e104492649d27e8dd6256b15f77f7ea94`.

1. The old workflow uploaded `path: '.'` without installing dependencies or building the React/Vite app. The live document referenced `/src/main.jsx`, which is not a built browser bundle.
2. The earlier build assumed a domain root. GitHub project Pages serves this app under **`/AR-Web-App/`**, so `/assets`, `/markers` and root Home links were incorrect there.
3. The old viewer/print links used `/view` and `/print` at the origin root. GitHub Pages has no SPA rewrite for those routes. The updated app keeps the project path and uses fragment navigation instead.

## What the updated workflow does

```text
Checkout → Node 22 → npm ci → npm run build
         → upload ./site → deploy to GitHub Pages
```

Vite's deployment base is provided by `actions/configure-pages` using the actual Pages `base_path`; for this repo it is `/AR-Web-App/`. Assets and fonts are built with that prefix.

New share URLs keep the app's base path. Their format is:

```text
https://susanthavfx-art.github.io/AR-Web-App/#page=view&scene=ENCODED_SCENE
https://susanthavfx-art.github.io/AR-Web-App/#page=print&scene=ENCODED_SCENE
```

`ENCODED_SCENE` above is explanatory text, not a usable project link. Use the app's **Publish & share** button to generate a real one.

## After the site opens

1. Try adding an object and opening Preview.
2. Publish & share, then open the QR link on a phone.
3. Generate a **new marker PDF from the deployed GitHub Pages app**.
4. Print it and test the camera against the illustrated marker.

**Old PDFs/QR codes from the Arena preview or the old path will not automatically update. Generate new ones after deployment.** Camera permission still needs a supported mobile browser and HTTPS.

## If the Actions run is red

Open the failed run, open the red step and copy its error message or send a screenshot. Common checks:

- `npm ci` cannot find a lock file → `package-lock.json` must be at the repo root, beside `package.json`.
- Build cannot resolve `./deployment` → upload **`src/lib/deployment.js`** at the exact path shown above.
- Configure/Deploy Pages fails → check **Settings → Pages → Source: GitHub Actions** and repository Actions permissions.
- No new workflow is running / old workflow name still appears → verify you replaced **`.github/workflows/static.yml`**, not a different file or nested folder.
- Site still blank after a successful new run → hard refresh and verify the live page's source references **`/AR-Web-App/assets/...js`**, not `/src/main.jsx` or `/assets/...js`.

## Verified locally

The fixed production build was served at `/AR-Web-App/` using a strict static server **without SPA fallback**. All **7 end-to-end tests passed**, including assets/fonts, editor functions, fresh-context sharing, print links, in-tab navigation, denied-camera fallback and actual MindAR detection using synthetic camera streams for both demo markers.

This verifies the local build and deployment layout, not a remote GitHub Actions execution. The repository has **not** been changed automatically; you must upload/commit this update. Physical phone/print testing remains necessary.

### Developer reproduction

```bash
npm ci
VITE_BASE_PATH=/AR-Web-App/ npm run build
node scripts/serve-pages.mjs
```

In a second terminal:

```bash
npx playwright install --with-deps chromium
APP_BASE_PATH=/AR-Web-App/ npm test
```

The environment-variable command syntax above is for bash-compatible shells. For ordinary root-domain development, `npm run dev` still defaults to `/`.
