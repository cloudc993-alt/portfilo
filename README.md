# Ne'matov Islomjon — Full-Stack Developer 3D Portfolio

Interactive, bilingual (Uzbek / English) 3D developer portfolio built with React, Vite, SCSS, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP, and Framer Motion.

## Features

- **Interactive 3D Hero Environment**: Custom procedural Three.js / React Three Fiber obsidian core, glowing crimson lattice, metallic orbital rings, and particle field with mouse parallax, scroll response, and automatic mobile / software-WebGL optimization.
- **Bilingual Support (UZ / EN)**: Defaults to Uzbek (`uz`) with an instant language switcher persisted in `localStorage`.
- **Real Portrait Centerpiece**: Configured to display `/images/islomjon.jpg` (`public/images/islomjon.jpg`) with a non-broken fallback frame until the photo file is placed.
- **Portfolio Showcase**: All 8 real web projects with category filtering (`All`, `Education`, `E-commerce`, `Games`, `Web Applications`), project detail modal, dedicated `/projects` route, and live demo external links.
- **Interactive Developer Terminal**: Command-line interface supporting `help`, `about`, `skills`, `projects`, `contact`, and `clear`, with command history navigation.
- **Validated Contact Form & Editable Social Links**: Full client-side validation with transparent configuration instructions (`VITE_CONTACT_ENDPOINT` / `src/data/siteConfig.ts`) instead of fake delivery confirmations.

## Local Installation

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

## Production Build

```bash
npm run build
```

Output is generated in `dist/`.

## Personal Asset & Integration Configuration

1. **Portrait Photograph**:
   Place your portrait image at:
   ```text
   public/images/islomjon.jpg
   ```
   The Hero and About sections automatically load `/images/islomjon.jpg`.

2. **Resume / CV PDF**:
   Place your PDF resume at `public/cv/Nematov_Islomjon_CV.pdf` and update `cvUrl` in `src/data/siteConfig.ts`:
   ```ts
   cvUrl: '/cv/Nematov_Islomjon_CV.pdf',
   ```

3. **Social Media Links**:
   Add your real profile URLs for GitHub, Telegram, Instagram, and LinkedIn inside `src/data/siteConfig.ts`.

4. **Contact Form Email Delivery**:
   Set `VITE_CONTACT_ENDPOINT` in your environment variables (for example, a Formspree or backend API endpoint) or update `contactEndpoint` in `src/data/siteConfig.ts`.

## Deploying to Netlify

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Create a new site in Netlify and connect the repository.
3. Netlify reads `netlify.toml` automatically:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **SPA Redirect**: All routes (`/*`) resolve to `/index.html` with status `200`.
4. (Optional) Add `VITE_CONTACT_ENDPOINT` under **Site configuration → Environment variables**.
