# Lesson boxes: text, audio, video and links

Teachers can add explanation boxes beside a model, like the animal-cell example:

| Box | What the teacher adds | What students see |
| --- | --- | --- |
| **Text box** | Title and up to 600 characters of explanation | Box with the explanation |
| **Audio box** | **Voice recording in the browser** or an uploaded audio file | Box → tap → audio player |
| **Video box** | Uploaded video file | Box → tap → video player |
| **Link box** | Website address and button text | Box → tap → opens the website in a new tab |

Each box can have a **dashed pointer line** to a part of the model. Boxes work in the editor, preview, 3D viewer and **phone AR camera**.

---

## Teacher steps (Singlish)

1. Toolbox eke **Lesson** tab eka open karanna.
2. **Text box / Audio box / Video box / Link box** eken ekak click karanna.
3. Right side eke **Title** saha explanation type karanna.
4. **Point to a model part** click karala model eke part eka click karanna. Line eka e part ekata yanawa.
5. Box eka scene eke **drag karala** clear thanakata move karanna.
6. Audio box: **Record voice** → **Start recording** → **Stop recording** → ahala balala **Use recording**. Nathnam **Upload audio**.
7. Video box: **Upload video** (MP4 best).
8. Link box: website address eka (`https://...`) saha button text eka denna.
9. **Publish & share** → QR / link eka students lata denna.

Box ekak hide karanna **Hide**, delete karanna **Remove**, undo karanna **Ctrl+Z**.

Each scene: **up to 12 boxes**. Text and link boxes work without sign-in. Audio and video need teacher sign-in (below).

---

## Owner setup for audio, video and short links (one time)

Audio and video files must be **online** so students' phones can play them. GitHub Pages only hosts static files, so this update uses **Supabase** (free plan available) for:

- Teacher sign-in by email code
- Storing uploaded audio/video files
- Short published lesson links (small, easy-to-scan QR codes)

Without this setup, the website still works: text and link boxes publish normally; audio/video upload buttons show *“Media uploads are not switched on…”*.

### 1. Create a Supabase project
1. https://supabase.com → sign up → **New project**.
2. **Project Settings → API Keys**: copy **Project URL** (`https://xxxx.supabase.co`) and the **Publishable key** (`sb_publishable_...`).
   - **Never use the `secret` / `service_role` key in the website.**

### 2. Create storage and upload rules
**SQL Editor → New query**, paste, then **Run**:

```sql
-- Public bucket: students can play files from published lessons.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lesson-media', 'lesson-media', true, 52428800,
  array[
    'audio/mpeg','audio/mp4','audio/aac','audio/wav','audio/x-wav','audio/ogg','audio/webm',
    'video/mp4','video/webm','video/quicktime','application/json',
    'image/jpeg','application/octet-stream'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Signed-in teachers may only upload into their own folder.
create policy "Teachers upload lesson files to their own folder"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'lesson-media'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
  and (storage.foldername(name))[2] in ('audio', 'video', 'lessons', 'markers')
);
```

> This SQL already includes teacher-made markers. If you ran the older version before, run the short update in [MARKER-MAKER.md](MARKER-MAKER.md).

Files stay in the bucket. Old QR codes keep working only while their files remain.

### 3. Only teachers you add can sign in (important)
1. **Authentication → Sign In / Providers → Email**: keep Email enabled.
2. Turn **off “Allow new users to sign up”**. Otherwise anyone could create an account and upload files.
3. Add each teacher: **Authentication → Users → Add user → Create new user** → teacher email, tick **Auto Confirm User** (password can be random; teachers use email codes).
4. Remove a teacher: delete the user there.

### 4. Send a number code instead of a link
**Authentication → Emails → Templates → Magic Link**. Put this in the message body:

```html
<h2>Your Wonderlab sign-in code</h2>
<p>Enter this code in Wonderlab: <strong>{{ .Token }}</strong></p>
<p>If you did not ask for this code, you can ignore this email.</p>
```

### 5. Email sending (needed for real teachers)
Supabase's built-in email service is only for testing and has very low limits (it may only send to your own project team). Before giving accounts to teachers, configure **Authentication → Emails → SMTP Settings** with an email provider (for example Resend, Brevo, Amazon SES, or your school/Google Workspace SMTP).

### 6. Connect the website (GitHub)
1. GitHub repo → **Settings → Secrets and variables → Actions → Variables** tab → **New repository variable**:
   - `SUPABASE_URL` = your Project URL
   - `SUPABASE_PUBLISHABLE_KEY` = your `sb_publishable_...` key
2. The updated `.github/workflows/static.yml` (included in this patch) passes them to the build.
3. **Actions → Build and deploy… → Run workflow** (or commit any change). Wait for green, then hard-refresh the site.

Lesson tab will now show **Teacher sign-in**.

---

## Limits and notes

- Audio: MP3, M4A, WAV, OGG, WebM, up to **20 MB**; recordings up to **5 minutes**.
- Video: MP4, WebM, MOV, up to **50 MB**. Use **MP4 (H.264)** for phones; iPhone HEVC `.mov` files may not play on some Android phones.
- Recording uses the browser microphone (needs HTTPS and permission). Chrome/Edge/Safari record M4A or WebM.
- **Published = snapshot.** After editing, press Publish & share again and use the new QR.
- Published lesson files and uploaded media are **public to anyone with the link**. Do not upload private student information or recordings of students.
- Supabase free-plan storage, bandwidth and project-pause rules apply; check Supabase pricing before selling at scale.
- Without sign-in, sharing uses the older full-scene link. Many long text boxes can make that link too large for a QR code; teacher sign-in fixes this with a short link.
- Links open in a new tab. Only `http`/`https` websites are allowed.
