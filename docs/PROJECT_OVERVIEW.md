## Project Overview

This repository is a personal portfolio built with React and Vite. It showcases projects (web and mobile), provides a downloadable resume, and includes several UI components and animations.

## Tech stack

- React (v19)
- Vite (dev server / build tool)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations)
- React Router (client routing)
- React Slick + Slick Carousel (carousel/slider UI)
- React Icons (icons)
- Email integrations: `@emailjs/browser` / `emailjs-com` (contact form)

Dev / tooling:

- ESLint and related plugins
- @vitejs/plugin-react

These packages are listed in `package.json` and are used to build, lint, and run the app locally with fast HMR via Vite.

## High-level file / folder purpose

- `index.html` — App entry HTML used by Vite.
- `package.json` — Dependencies and scripts (dev, build, preview, lint).
- `vite.config.js` — Vite configuration (project-specific plugins).
- `public/` — Static assets served as-is. Example: `public/documents/Habib_Khan_Resume.pdf` is used by the `DownloadButton` component.
- `src/` — Main application source.
  - `main.jsx` — React entry; mounts `<App />` and wraps it in `BrowserRouter`.
  - `App.jsx` — Top-level app component. Renders global pieces such as `AnimatedBackground` and `Navbar`, and defines routes for pages.
  - `App.css`, `index.css` — Global styling and Tailwind utilities.
  - `assets/` — App-specific static assets imported by JS modules:
    - `images/` — Photos and UI images (ProfileImage.jpg, Dashboard images, logos, project screenshots).
    - `apk/` — APK files used for project downloads (e.g. `Fresh-news.apk`, `QuickHr.apk`). These are imported in `Projects.jsx` and linked for download.
    - `react.svg` (present at the assets root) — small misc image.
  - `components/` — Reusable UI components. Notable ones:
    - `Navbar.jsx` — top navigation, shows logo at `src` or referenced from public path `/MyLogo.png`.
    - `AnimatedBackground.jsx` and `MouseTrail.jsx` — background visual effects implemented with canvas-like DOM and animation loops.
    - `DownloadButton.jsx` — triggers downloading the resume PDF from `public/documents` via a direct link (`/documents/Habib_Khan_Resume.pdf`).
  - `pages/` — Route-level pages:
    - `Home.jsx` — Homepage; imports `ProfileImage.jpg` from `src/assets/images` and renders `DownloadButton`.
    - `Projects.jsx` — Projects gallery; imports many images and APKs directly from `src/assets` and uses `react-slick` to render sliders and modals. APK imports are used as `href`/`download` links so the user's browser can download them.
    - `About.jsx`, `Contact.jsx` — other page content and contact form (uses EmailJS packages).

## How assets are used (concrete patterns)

- Importing images/apks from `src/assets`:

  - Files inside `src/assets` are imported directly in modules using ES module imports, e.g.:
    - `import profileImage from '../assets/images/ProfileImage.jpg'` (used in `Home.jsx`)
    - `import FreshNews from '../assets/apk/Fresh-news.apk'` (used in `Projects.jsx`)
  - When imported, Vite processes them and returns an URL string which is safe to set as `src` on `<img>` or `href` on `<a download>`.

- Public/static files in `public/`:

  - Files placed in `public/` are served at the root path at runtime. Example: `public/documents/Habib_Khan_Resume.pdf` is downloadable via `/documents/Habib_Khan_Resume.pdf` and used by the `DownloadButton` component which programmatically clicks a link to that path.
  - The `Navbar` references `/MyLogo.png` which suggests a logo image lives at project root `public/MyLogo.png` (or equivalent). Static files referenced with leading `/` are resolved relative to the server root.

- Dev-time vs compiled behavior:
  - Imports from `src/assets` are resolved by Vite (hashed names in production). This makes them great for images interpreted by JS components (profile, project screenshots, slider images).
  - Files in `public/` are copied as-is to the build output and maintain their paths, which is convenient for direct downloads or absolute links.

## Common usage examples (from the codebase)

- Displaying an imported image in React:

  - `import profileImage from '../assets/images/ProfileImage.jpg'`
  - `<img src={profileImage} alt="Profile" />`

- Linking an APK for download in a project modal:

  - `import FreshNews from '../assets/apk/Fresh-news.apk'`
  - `<a href={FreshNews} download="Fresh-News.apk">Download APK</a>`

- Serving a resume PDF from `public/` via a native link (DownloadButton):

  - Create an anchor pointing to `/documents/Habib_Khan_Resume.pdf` and trigger click programmatically.

## Build & run (local)

1. Install dependencies:

```powershell
npm install
```

2. Run dev server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

4. Preview production build locally:

```powershell
npm run preview
```

## Notes, assumptions, and tips

- Assumption: The project's `public/` directory contains `documents/Habib_Khan_Resume.pdf` and a `MyLogo.png` used by the navbar (the code references these paths). If these are missing, add them to `public/` so the runtime links work.
- Keep large binary assets (APKs) in `public/` if you prefer stable URLs and no bundling; currently APKs live under `src/assets/apk/` and are imported, which is fine but may cause bundling of large files. If build size becomes a concern, move them to `public/apk/` and reference `/apk/...` directly.
- When adding new images used by JS modules, import them from `src/assets/images` to get hashed filenames in production. For files you want to preserve path and name, use `public/`.

## File tree (concise)

- `index.html`
- `package.json`
- `vite.config.js`
- `public/`
  - `documents/` (e.g. `Habib_Khan_Resume.pdf`)
- `src/`
  - `App.jsx`, `main.jsx`, `App.css`, `index.css`
  - `assets/`
    - `images/` (ProfileImage.jpg, Dashboard images, project screenshots)
    - `apk/` (Fresh-news.apk, QuickHr.apk, Employee-Form.apk)
    - miscellaneous (react.svg, etc.)
  - `components/` (Navbar.jsx, AnimatedBackground.jsx, DownloadButton.jsx, MouseTrail.jsx)
  - `pages/` (Home.jsx, About.jsx, Projects.jsx, Contact.jsx)
  - `config/` (not present or empty in workspace — check if a runtime config file is needed)

## Final checklist & next steps

- [x] Tech stack summarized (based on `package.json`).
- [x] Asset usage patterns documented (imports from `src/assets` vs static `public/`).
- [x] Concise file/folder structure included.

If you want, I can:

- Move large binary files (APKs) to `public/` and update references.
- Add a short CONTRIBUTING or DEV_NOTES file describing how to add images and APKs safely.
- Create a small script to audit asset sizes before build.

---

Generated: project overview for developer reference.
