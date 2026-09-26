# xiaoruiyliu.github.io

Personal website, built with Next.js and deployed to GitHub Pages by
`.github/workflows/deploy.yml`.

## Editing content

Page text lives in `content/` as Markdown:

- `bio.md`: the paragraph under the name. `[option one/ option two]` becomes a clickable phrase that cycles through the options.
- `publications.md`, `teaching.md`, `lore.md`: one file per section. `####` is a small group label, `>` is an indented note.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## Credit 

This personal website was based off of Eric Rawn's [personal website](https://www.ericrawn.media/). 
