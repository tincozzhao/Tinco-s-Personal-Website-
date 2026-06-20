# Animated Storyboard Portfolio

A customizable personal website template built with Next.js, TypeScript, CSS
Modules, and GSAP ScrollTrigger.

## Replace the placeholders

All biography, dates, navigation labels, project details, contact labels, and
image paths live in:

`src/content/siteContent.ts`

Put real images in `public/images`, then set the matching `path` field to a
root-relative URL such as `/images/childhood.jpg`. Empty paths automatically
render designed placeholder frames.

## Development

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```
