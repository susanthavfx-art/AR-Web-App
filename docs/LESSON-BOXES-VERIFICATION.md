# Lesson boxes verification

**Date:** 25 October 2026  
**Base:** `susanthavfx-art/AR-Web-App` main `79308a831ac2c35a10c5e9c66853eaf5faef2119` (teacher-library update already applied)

## Added

- Toolbox **Lesson** tab: Text, Audio, Video and Link boxes (max 12 per scene).
- Box editor: title, explanation (600 chars), colour, show/hide, duplicate, remove, position, **Point to a model part** (pointer line follows the model part, including animation), drag boxes directly in the 3D workspace.
- Audio: in-browser **voice recording** (MediaRecorder, preview before use, 5-minute limit, microphone stopped afterwards) or audio upload. Video upload. Upload progress/cancel and file type/size checks.
- Link: only `http`/`https`; opens in a new tab with `noopener noreferrer`.
- Boxes appear in editor, preview, 3D viewer and **phone AR** (HTML overlay projected from the 3D camera, kept on screen, separated when overlapping; compact pills on phones). Tapping opens a sheet with full text, audio/video player or link.
- Optional Supabase connection: teacher sign-in by email code (`create_user: false`), uploads to `lesson-media/<teacher-id>/...`, publishing a lesson JSON for **short QR links** (`#page=view&lesson=…`). Not configured → website still works; full-scene links are used, media upload buttons explain they are off.
- Share/print/PDF use the short link when published. Old scene links (v1/v2 without boxes) still open.
- Workflow passes optional repository variables `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to the build.

## Results

- `VITE_BASE_PATH=/AR-Web-App/ npm run build`: success (1905 modules).
- `APP_BASE_PATH=/AR-Web-App/ npx playwright test`: **25 passed (3.8 min)** = 21 existing + 4 new.
- `npm audit --omit=dev`: 0 vulnerabilities. Prettier: clean.
- Mobile 390×844 studio (Lesson tab, box inspector, canvas): no horizontal overflow, no page errors.

New tests:
1. Text/link/audio boxes without cloud: edit, pointer line, re-point by clicking the model, drag, invalid `javascript:` link rejected, persistence after reload, publish, fresh-browser viewer opens text/link/empty-audio sheets.
2. With an **in-memory fake Supabase** (Auth + Storage REST): wrong email/code errors, sign-in, real MediaRecorder recording from a synthetic tone microphone, video upload, wrong file type rejected, upload headers/folder checks, short link publish + QR, fresh mobile student browser plays the uploaded audio/video URLs, print page QR, missing lesson message, sign out.
3. Crafted link: HTML in titles shown as plain text, `javascript:` link, `http:` media and wrong media type removed, invalid object index ignored.
4. Real MindAR detection with synthetic camera: boxes and pointer line appear when the marker is found, tap opens the sheet, camera stops on exit.

## Not verified

- A **real Supabase project** (only a fake REST stand-in was used), real email delivery, SMTP, storage policies, CDN.
- Physical phones, real microphones, iPhone Safari recording/playback, printed markers, live GitHub Pages deployment. No push was made.
- Uploaded media/lessons are public to anyone with the link; no moderation, quotas per teacher, payments or private classrooms.
