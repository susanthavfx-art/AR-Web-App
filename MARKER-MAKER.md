# Teacher marker maker (own markers)

Teacher kenekta **eyagema photo ekak upload karala, text ekak add karala** AR marker ekak hadaganna puluwan. Hama project ekakatama wena wenama marker ekak use karanna puluwan.

## Teacher use karana widiha
1. Editor eke **Markers** tab → **Create your own marker**.
2. **Upload a photo** (JPG / PNG / WebP, 20 MB wadi naha). Zoom, Left/right, Up/down slider walin hari preview eka drag karala hari photo eka hariyata thiyanna.
3. **Text** eka liyanna (characters 40k wenakan), Top / Bottom / No text thoranna, text size, band colour, frame colour thoranna.
4. **Marker name** eka denna (teacher ta witharai penne).
5. **Check tracking** → app eka browser ekema MindAR target eka hadala balanawa (secs 2–10):
   - **Great / Good** → save karanna puluwan.
   - **Might be slow to find** → save karanna puluwan, eth wena photo ekak hoda.
   - **Too little detail to track** → save karanna denne naha (plain background, blur photo, text witharak thiyena design wage).
6. **Sign in** wela **Save & use in this project** → marker eka online save wela, me project ekata set wenawa.
7. **Publish & share → Get my printable marker** → aluth marker eka saha QR eka thiyena A4 sheet eka print karanna.

**My markers** list eka (Markers tab eke) eken kalin haduwa markers wenath projects walata thoranna puluwan. **X** eken list eken ain karath files delete wenne naha, e nisa print karapu parana sheets / QR codes digatama wada.

Online storage naththam: design karala **Download picture** karanna puluwan, eth AR walata use karanna nam save karanna oone (.mind tracking file eka ~1 MB, link eke yawanna ba).

## Owner: ekaparak karanna oone Supabase update
Lesson boxes walata Supabase hadala thiyenawa nam, **SQL Editor → New query** eke meka paste karala **Run** karanna:

```sql
-- Allow marker pictures and compiled MindAR tracking files.
update storage.buckets
set allowed_mime_types = array[
  'audio/mpeg','audio/mp4','audio/aac','audio/wav','audio/x-wav','audio/ogg','audio/webm',
  'video/mp4','video/webm','video/quicktime','application/json',
  'image/jpeg','application/octet-stream'
]
where id = 'lesson-media';

-- Teachers may also upload into their own "markers" folder.
drop policy if exists "Teachers upload lesson files to their own folder" on storage.objects;
create policy "Teachers upload lesson files to their own folder"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'lesson-media'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
  and (storage.foldername(name))[2] in ('audio', 'video', 'lessons', 'markers')
);
```

Me update eka nathuwa save karoth teacher ta *"the owner needs to run the marker storage update (MARKER-MAKER.md)"* kiyala error ekak pennanawa. Aluth GitHub Variables oone naha.

Files save wena than: `lesson-media/{teacher-id}/markers/{id}.jpg` (print karana picture eka) saha `{id}.mind` (tracking data). Bucket eke files delete karoth e marker eka use karana QR codes wada karanne naha.

## Hoda marker ekakata tips
- Colour, shapes, edges godak thiyena photo (classroom chart, illustration, nature photo).
- Plain wall / sky, blur photo, loku histhan walin wadak naha.
- Text keti karanna; tracking karanne photo eken.
- Matte paper eke 100% scale walin print karala flat thiyanna.

## Technical notes
- Compile wenne teacher ge browser eke (MindAR 1.2.5 compiler, `src/vendor`), server ekak oone naha.
- Project eke `marker: {id: "custom:<uuid>", name, image, target}` save wenawa; share link walata yanne URLs witharai (`k`). Parana links / built-in markers wenas wenne naha.
- Tests: `tests/marker-maker.spec.mjs` — photo + text eken marker hadala, fake Supabase ekata save karala, phone AR (synthetic camera) eken **MindAR marker eka hoyagannawa**; plain photo reject; projects deka wena wenama markers; unsafe marker URLs reject.
