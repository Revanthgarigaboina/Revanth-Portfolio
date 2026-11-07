# Revanth — Cinematic Angular Portfolio

An original editorial portfolio starter built with Angular standalone components, GSAP + ScrollTrigger, and Motion for JavaScript (the framework-agnostic Motion API from the Framer Motion ecosystem).

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm start
```

Open http://localhost:4200

Production build:

```bash
npm run build
```

## Important implementation note: Angular and Framer Motion

Framer Motion's `framer-motion` package is React-specific and cannot be mounted as an Angular animation library without embedding React. This project uses `motion` (`animate` + `spring`) for the interaction layer, alongside GSAP/ScrollTrigger for scroll and editorial motion. This is the Motion for JavaScript API from the same Motion ecosystem, used natively without adding a React runtime.

## Personal configuration

1. **Portrait:** the supplied latest resume PDF does not contain a portrait. Add your real photo as `src/assets/revanth-portrait.jpg` and update the portrait block in `src/app/app.component.html` to use it. The current composition deliberately uses a typographic placeholder rather than inventing or substituting a person.
2. **LinkedIn / GitHub:** add verified URLs to `linkedinUrl` and `githubUrl` in `src/app/app.component.ts`. These fields are intentionally blank because no profile URLs were present in the supplied resume.
3. **Email / phone / portfolio:** populated from the supplied resume. Confirm the portfolio URL is still current before publishing.
4. **Experience and project copy:** sourced from the supplied resume. Internal banking work is described at a high level; no confidential implementation detail is exposed.

## Features

- Responsive editorial layout with hero, point of view, project case studies, about, skills, experience and collaboration sections.
- GSAP intro timeline, ScrollTrigger reveals, project image-mask-style reveals, collaboration string drawing, and cleanup through a scoped GSAP context.
- Reusable flashlight reveal using a CSS radial mask and pointer coordinates updated through `requestAnimationFrame`; touch move support and reduced-motion fallback.
- Motion `animate` / `spring` interaction on the collaboration button.
- Accessible contact dialog with Escape close, focus return, basic focus trap, visible close button, mailto and telephone actions.
- Reduced-motion CSS and JavaScript handling.

## Validation

The project has been scaffolded with strict TypeScript and Angular production build budgets. Run `npm install`, `npm run build`, and `npm start` in an environment with npm registry access. This generated bundle has not been installed or executed in this environment, so no successful build is claimed.
