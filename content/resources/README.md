# Resource PDFs

These four files are **placeholders**. They are clearly marked as such on every page.

When Tidy’s final A4, print-ready PAZ and MAPA documents arrive (EN and ES):

1. Replace the four PDFs in this folder, keeping the filenames *or* update `files` and `downloadName` in `lib/resources-config.js`.
2. Replace the placeholder titles and one-line descriptions in `lib/resources-config.js` (one field per language) and the matching menu blurbs in `app/ResourcesMenu.js`.
3. Optional: a cover image per sheet, if Tidy has one.

Do not put these files in `/public`. They are served only through the signed download link in `/api/resources/download/[token]` after a successful form request (and as an email attachment).
