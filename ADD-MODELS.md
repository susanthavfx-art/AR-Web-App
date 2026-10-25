# Library ekata aluth GLB models add karana hati — OWNER guide

> Teachers lata model uploads/GitHub instructions penenne naha. Owner-curated library saha new categories: [TEACHER-LIBRARY.md](TEACHER-LIBRARY.md). This document is for the repository owner, not a teacher upload workflow.

**Me version eke JavaScript edit karanna one naha.** Model file eka GitHub ekata upload karala `public/models/catalog.json` ekata entry ekak add karanna.

> **First time:** Aluth model support eka install karanna [UPDATE-MODEL-LIBRARY.md](UPDATE-MODEL-LIBRARY.md) balanna. Parana demo-only app ekata GLB file ekak upload karana eka witharak madi.

## 1. GLB file eka ready karaganna

- **glTF 2.0 Binary (`.glb`)** widihata export karanna. FBX/OBJ ekaka filename extension eka `.glb` kiyala rename karanna epa.
- Meshes, buffers saha textures **GLB eka athule embed** karanna. Separate texture file URLs me version eke support karanne naha.
- Standard PBR materials + embedded **PNG/JPEG** textures use karanna. Draco saha Meshopt geometry compression support karanawa. **KTX2/Basis textures support naha**; ewa PNG/JPEG widihata export karanna.
- Phone ekakata light model ekak use karanna: preferably **5 MB ta aduwen**, moderate polygon count and 1K/2K textures. Eya recommendation ekak, performance guarantee ekak nemei. App eka **40 MiB ta wada loku GLB** reject karanawa.
- File names simple lowercase names karanna: `lion.glb`, `solar-system.glb`. Case-sensitive: `Lion.glb` saha `lion.glb` eka file eka nemei.
- Camera, lights and unnecessary high-resolution geometry export nokarana eka hondai.
- Oyata publish karanna rights thiyena models witharak add karanna. Public GitHub/Pages files private naha.

## 2. GitHub ekata upload karanna

Repository: **https://github.com/susanthavfx-art/AR-Web-App**

1. GitHub eke repository eka open karanna.
2. `public` → `models` folder ekata yanna.
3. **Add file → Upload files** click karanna.
4. Example ekata `lion.glb` upload karala **Commit changes** karanna.

File structure eka:

```text
public/
  models/
    catalog.json
    wonder-bot.glb      <- included, original animated sample
    lion.glb            <- oyage model eka
```

`public/models/` folder eka build ekedi website eke `/AR-Web-App/models/` wenawa. GLB eka `src/`, repository root, `site/`, nathnam `node_modules/` athulata danna epa.

## 3. Catalogue ekata entry ekak add karanna

`public/models/catalog.json` open karala pencil **Edit** button eka click karanna.

Included sample eka thiyala, `models` array eka athule aluth object ekak add karanna. Example eka mehema:

```json
{
  "version": 1,
  "repository": "susanthavfx-art/AR-Web-App",
  "models": [
    {
      "id": "wonder-bot",
      "name": "Wonder Bot",
      "category": "Science",
      "file": "wonder-bot.glb",
      "height": 1.6,
      "rotation": [0, 0, 0],
      "animate": true,
      "background": "#e7f1e9"
    },
    {
      "id": "lion-01",
      "name": "Lion",
      "category": "Animals",
      "file": "lion.glb",
      "height": 1.5,
      "rotation": [0, 0, 0],
      "animate": true
    }
  ]
}
```

**Me example eke `lion.glb` oya upload karanna one file ekak. ZIP eke thiyenne Wonder Bot sample eka witharai.** Oyage actual filename, model name saha category danna.

### Fields

| Field | Monawada danna one |
| --- | --- |
| `id` | Required, unique, permanent ID. Letters/numbers/`-`/`_` only; letter or number ekakin start karanna. Maximum 60 characters. Example `lion-01`. Existing ID ekak wena model ekakata reuse karanna epa. |
| `file` | Required, GLB filename relative to `public/models/`. Example `lion.glb` or `animals/lion.glb`. **`public/models/lion.glb` kiyala danna epa.** Absolute/external URLs saha `../` paths reject karanawa. |
| `name` | Library eke penena name eka; up to 45 characters. Omit kaloth ID eka use wenawa. |
| `category` | Example `Animals`, `Vehicles`, `Buildings`. New category eka automatically library tab ekak wenawa. Default `General`; up to 24 characters. |
| `height` | Model eke initial fitted height in scene units, default `1.5`, bounded to `0.2–4`. App eka centre karala floor eka matha thiyanawa. Editor Size slider eken object eka thawath resize karanna puluwan. Very flat models fit using a nonzero horizontal extent. |
| `rotation` | Initial [X, Y, Z] in **degrees**; default `[0, 0, 0]`, each axis bounded to ±360. Lying sideways nam example `[-90, 0, 0]` try karanna. Editor rotation me base orientation ekata add wenawa. |
| `animate` | Default `true`: first embedded GLB animation eka loop wenawa while editor Play, Preview saha AR. `false` nam embedded clip eka run wenne naha. Float/Spin scene motions separate settings. Clip chooser ekak me version eke naha. |
| `thumbnail` | Optional image filename inside `public/models/`; PNG/JPG/JPEG/WebP. Example `lion.png` or `animals/lion.png`. Omit kaloth app eka GLB eken thumbnail ekak render karanawa. Large libraries walata thumbnails provide karana eka hondai. |
| `background` | Optional thumbnail card background, hex colour. Example `#eef4ea`. |
| `credit` | Optional model creator/licence note, up to 180 characters; retained in model metadata. Obey the model licence separately; me field eka licence permission ekak nemei. |

`repository` optional root metadata field ekak. Teacher UI eke model-folder/catalogue-edit links naha; owner instructions repository documentation eke witharai. Fork karoth repository metadata update karanna.

**JSON rules:** double quotes use karanna; entries athara comma ekak danna; anthima entry ekata passe trailing comma ekak danna epa; comments danna epa. Root `"version": 1` thiyanna. Catalogue eka models **100** kata saha roughly **200 KB** ta limit karala thiyenawa. Demo models 12 JSON ekata add karanna one naha.

## 4. Publish wela thiyenawada balanna

1. Catalogue edit eka **Commit changes** karanna.
2. Repository eke **Actions** tab eka open karanna.
3. **Build and deploy Wonderlab to GitHub Pages** workflow eka green wenakan inna. File upload + catalogue edit commits dekak nam latest commit eke run eka balanna.
4. Open **https://susanthavfx-art.github.io/AR-Web-App/**.
5. Hard refresh karanna (`Ctrl + Shift + R`, nathnam private/incognito window ekak).
6. Toolbox eke `Animals` tab eka click karanna, nathnam `Lion` search karanna.
7. Model eka add karala move/rotate/resize karanna. Embedded animation thiyenawa nam **Play** press karala check karanna.
8. **Publish & share** eken aluth link/QR/PDF hadala, wena phone ekakin open karanna.

A laptop/desktop browser eka GitHub folder uploads saha scene editing walata easiest. Phone camera viewer eka accessible **HTTPS** website ekakin open karanna; localhost QR eka phone ekata wada karanne naha.

## Share links, backups saha model updates

- Saved projects saha JSON backups model definitions retain karanawa. New share links **stable model IDs + bounded model definitions** include karanawa; catalogue order eka wenas kalata wrong object ekak load wenne naha.
- Fresh phone ekata editor eke local storage one naha. Catalogue eka temporarily unavailable unath shared model definition eka use karanna puluwan, **GLB file eka website eke available nam**.
- Model binary eka link/QR/JSON backup eka athule embed wenne naha. Original GLB file eka **keep karanna**. File eka delete kaloth, rename kaloth, website move kaloth old phone links break wenna puluwan.
- Same filename eke file contents replace kaloth old shares walatath replaced geometry/textures penenawa. Permanent published versions walata **new filename + new ID** use karala old files keep karanna.
- `height`, `rotation`, `animate`, file path wage model settings already placed objects walata stored wenawa. Catalogue settings edit kalata old scene ekak silently change karanne naha. New settings apply karanna model eka scene eken remove karala library eken re-add karanna, nathnam a new version add karanna.
- Shared scene edit kalata old link eka update wenne naha. **Publish & share** again karala new link/QR/print sheet ekak hadanna.
- Old v1 demo-only snapshot/QR links continue to decode. New model shares need this updated app.

## Trouble nam

| Problem | Balanna one de |
| --- | --- |
| Model library eke penenne naha | Latest Actions run green da? Correct `public/models/catalog.json` da? Search clear karala All/category tab balanna. Hard refresh karanna. Teacher UI shows a generic library notice. Owner widihata catalogue JSON syntax, unique IDs and file paths check karanna. Invalid entry ekak skip wenna puluwan. |
| `HTTP 404` | Filename/capital letters exact da? GitHub `public/models/` athule file eka thiyenawada? `file` value ekata `public/` prefix dala nadda? Published URL `https://susanthavfx-art.github.io/AR-Web-App/models/lion.glb` browser eken download karala balanna. |
| Purple loading shape | GLB download/decode wena gaman. Loku file ekak nam optimise karanna. 30-second load/decode timeout ekak thiyenawa. Fix kalata passe refresh karanna. |
| Red wireframe + error | File missing, damaged, unsupported or not a GLB. Visible error message eka balanna. FBX rename karala GLB karanna ba. Valid GLB 2.0 widihata re-export karanna. |
| Wrong orientation/size | Catalogue `rotation`/`height` adjust karala commit karanna; refreshed library eken model eka scene ekata re-add karanna. |
| Missing textures/KTX2 message | Textures PNG/JPEG widihata GLB eke embed karala export karanna. KTX2/transcoder setup me scope eke naha. |
| Thumbnail witharak missing | Optional `thumbnail` file path correct da? Image eka upload karala nathnam `thumbnail` field eka remove karanna; app eka auto-generate karai. |
| Many models, slow phone | Provide thumbnails; reduce polygons/textures; use smaller GLBs. A scene has a 20-object limit, but 20 heavy models unath slow wenna puluwan. |
| Phone eken model load wenne naha | Phone ekata public site saha GLB files access thiyenna one. GitHub file path—not a laptop file/blob URL—use karanna. After deploying, generate a new share link. |
| Camera wada naha | Direct Safari/Chrome + HTTPS + camera permission check karanna. 3D preview eken model loading first check karanna. Physical-device/print testing still required. |

## Included sample

`public/models/wonder-bot.glb`: original mint-and-cream robot, **327,908 bytes**, one looping “A friendly wave” arm animation. It is not downloaded from a third-party catalogue. Rebuild it with:

```bash
npm ci
node scripts/create-sample-model.mjs
```

Me workflow eka **repository-managed catalogue** ekak. In-app file upload/admin panel, cloud storage, login, moderation saha automatic marker compilation me update eke naha. Model files are public web assets; no secret keys or backend setup required.
