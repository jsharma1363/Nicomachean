# Personal Website

A deliberately plain personal site with a 90s-ish feel: basic HTML, blue links,
simple typography, and one starter photo section for Japan.

## Preview

Open `index.html` in a browser.

## Add Japan photos

1. Put image files in `assets/photos/japan/`.
2. Add each photo to `photos.js`.

Example:

```js
{
  src: "assets/photos/japan/shinjuku-night.jpg",
  thumb: "assets/photos/japan/shinjuku-night.jpg",
  title: "Shinjuku at night",
  place: "Tokyo",
  date: "2026",
  caption: "Neon, rain, and a long walk back to the station."
}
```

## Go live

This can deploy as a static site on GitHub Pages, Netlify, Vercel, or Cloudflare
Pages. There is no build step.

Custom domain:

```text
nicomachean.xyz
```
