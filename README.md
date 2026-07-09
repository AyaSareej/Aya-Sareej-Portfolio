# Aya Phoenix Portfolio

A high-end interactive 3D portfolio for Aya Sareej, built with Vite, React, TypeScript, React Three Fiber, Drei, and GSAP ScrollTrigger.

## Design language

- Deep red, gold, and black cinematic palette.
- Phoenix-inspired particle background that reacts to scroll and pointer movement.
- DOM-first text for accessibility, clean sizing, and no overlapping content.
- GSAP reveal choreography with reduced-motion support.
- Lazy-loaded R3F scene, DPR capping, adaptive DPR, and particle-based geometry for a strong performance baseline.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The build has been verified locally. Vite may report that the lazy-loaded 3D scene chunk is large because Three.js and Drei are intentionally isolated from the initial app shell. The initial shell stays separate from the 3D scene for faster first paint.

## CV download

The uploaded CV is copied to `public/Aya_Sareej_CV.pdf` and linked from the UI.
