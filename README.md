# Portfolio 2025

A simple personal portfolio site built with plain HTML, CSS and JavaScript. It has no build step and no dependencies.

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
npx serve .
# or
python -m http.server 8000
```

## Customize

- **Content:** edit the text in `index.html` (hero, about, skills, projects, experience, contact links).
- **Colors:** change the variables at the top of `styles.css`.
- **Cache busting:** after changing `styles.css` or `script.js`, bump the `?v=` number on their links in `index.html` so visitors get the new version.
- **Photo:** replace `images/headshot.jpg` to change the profile picture.

## Deploy

This works as-is on GitHub Pages, Netlify or Vercel. Point the host at the repo root.
