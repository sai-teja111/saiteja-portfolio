# Sai Teja Kandula — Personal Developer Portfolio

A modern, responsive single-page developer portfolio for **Sai Teja Kandula**, Python Full Stack Developer. It showcases technical skills, selected projects, professional experience, education, and contact information with smooth scroll-based navigation and project detail pages.

## Live Portfolio

> Add your deployed URL here once the site is live, for example:
>
> - Netlify: `https://your-site-name.netlify.app`
> - Vercel: `https://your-site-name.vercel.app`

## Overview

This is a Single Page Application (SPA) built with React 19 and Vite. The home page is composed of anchored sections (Home, About, Skills, Projects, Experience, Education, Contact), and each project has a dedicated details page at `/project/:id`. The navbar navigates between sections with smooth scrolling and no full page reload.

- Main route: `/`
- Project details route: `/project/:id`
- Catch-all route: `*` renders a custom Not Found page
- SPA fallback for deep links is configured in `netlify.toml` (all routes rewrite to `/index.html`)

## Features

- Single-page layout with smooth section navigation and active-section navbar highlighting
- Project cards with images, status badges, tech tags, and links to full project detail pages
- Project details pages (`/project/:id`) with full description, tech stack, and feature list
- Experience timeline with role details, responsibilities, and technology tags
- Skills showcase grouped by Languages, Backend, Frontend, Database, and Cloud
- Contact section with validated form (Web3Forms), email/phone links, and WhatsApp click-to-chat
- Resume download button in the hero section (served from `/resume.pdf`)
- Page loader, scroll progress bar, back-to-top button, and custom 404 page
- Motion-based entrance, scroll, and hover animations with `prefers-reduced-motion` support
- Fully responsive layout for desktop, tablet, and mobile
- Dark gradient theme with accessible focus states and semantic markup

## Tech Stack

Core dependencies taken directly from `package.json`:

| Technology | Purpose |
| --- | --- |
| React 19 | UI components and routing views |
| React DOM 19 | React rendering |
| Vite 8 | Build tooling and dev server |
| JavaScript (ES modules) | Application language |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first styling |
| Motion for React (`motion`) | Entrance, scroll, stagger, and hover animations |
| Lucide React | Interface icons |
| React Icons | Brand/technology icons (skills, WhatsApp) |
| React Router 7 (`react-router`, `react-router-dom`) | `/`, `/project/:id`, and `*` routes |
| ESLint | Linting (`npm run lint`) |

> Note: the requested stack mentioned `shadcn/ui`, but it is **not** installed in `package.json` and no `src/components/ui/*` files exist, so it is intentionally omitted here. Likewise, Redux Toolkit is listed as a technology for the Todo Manager project in the project data, but no Redux package is currently installed in `package.json`.

## Portfolio Sections

All sections render on the home route (`/`) in this order:

| Section | Anchor | Content |
| --- | --- | --- |
| Home (Hero) | `#home` | Name, role, tech highlights, View Projects / Download Resume buttons, GitHub / LinkedIn / WhatsApp links |
| About | `#about` | Bio, profile image, and focus-area cards (Backend, Frontend, Database & Data, Development & Cloud) |
| Skills | `#skills` | Grouped skill chips: Languages, Backend, Frontend, Database, Cloud |
| Projects | `#projects` | Three project cards; each links to `/project/:id` |
| Experience | `#experience` | Vertical timeline with role, company, duration, description, responsibilities, and tech tags |
| Education | `#education` | SSC, Intermediate, and B.E. Information Technology entries |
| Contact | `#contact` | Contact details plus a validated Web3Forms-backed contact form |

## Projects

### 1. Smart Service Dispatch System — `Currently Building`

> This is currently a **Python-based project**. The React frontend is planned for the future and is **not** implemented yet. No React frontend functionality is claimed below.

Description (from `src/data/projects.js`):

> "A Python-based service dispatch system that intelligently matches customers with suitable technicians using semantic service detection, skills, location, availability, workload, and ratings."

Current technologies (as requested — Python backend only):

- Python
- FastAPI
- PostgreSQL
- SQLModel
- ChromaDB
- JWT

Current features (from `src/data/projects.js`):

- Intelligent technician matching
- Semantic service detection with ChromaDB
- JWT authentication and role-based access
- Service tracking, history, and feedback

Details page: `/project/project-1`

> Code note: `src/data/projects.js` currently still includes `"React"` in this project's `technologies` array. Update that array if you want the UI tags to match the Python-only list above.

### 2. Personal Developer Portfolio — `Completed`

Description (from `src/data/projects.js`):

> "A responsive single-page developer portfolio built to showcase my technical skills, projects, professional experience, education, and contact information with a modern, accessible, and responsive user experience."

Technologies (from `src/data/projects.js`):

- React
- JavaScript
- Vite
- Tailwind CSS
- Motion
- React Router
- Lucide React

Features (from `src/data/projects.js`):

- Responsive single-page layout
- Project and experience showcase
- Smooth section navigation
- Resume download
- GitHub, LinkedIn, and WhatsApp integration
- Responsive contact form

Details page: `/project/project-2`

### 3. Todo Manager — `Currently Building`

Description (from `src/data/projects.js`):

> "A modern task management application built with React and Redux Toolkit to demonstrate scalable state management, reusable components, and efficient task management workflows."

Technologies (from `src/data/projects.js`):

- React
- JavaScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite

Features (from `src/data/projects.js`):

- Todo creation, editing, completion, and deletion
- Centralized state management with Redux Toolkit
- Search, filtering, and sorting functionality
- Task priorities, categories, and due dates
- Persistent state with localStorage
- Responsive and modern user interface

Details page: `/project/project-3`

## Experience

### Trainee Software Engineer — AJA Consulting Services

- Duration: Jun 2026 — Present
- Status: Currently Building

Description (from `src/data/experience.js`):

> "Working as a Trainee Software Engineer, contributing to full-stack application development with a focus on REST APIs, backend services, database integration, and responsive frontend interfaces. Currently working on the Smart Service Dispatch project using Python, FastAPI, SQLModel, and PostgreSQL, while also working with React and related web technologies."

Technologies used in the role (from `src/data/experience.js`):

- Python
- FastAPI
- React
- JavaScript
- PostgreSQL
- SQLModel
- Bootstrap
- Tailwind CSS

Responsibilities (from `src/data/experience.js`):

- Develop and integrate REST APIs using Python and FastAPI for backend application features.
- Work with PostgreSQL and SQLModel to design database models, queries, and backend data operations.
- Build responsive frontend interfaces using React.js, JavaScript, HTML, CSS, Bootstrap, and Tailwind CSS.
- Contribute to the Smart Service Dispatch project by developing service request, technician matching, and service management workflows.

## Project Structure

```text
my-portfolio/
├── index.html                 # Title, meta/OG tags, fonts, Vite entry
├── netlify.toml               # Build config + SPA fallback to /index.html
├── package.json               # Scripts and dependencies
├── vite.config.js             # React + Tailwind Vite plugins
├── eslint.config.js           # ESLint configuration
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx               # React root + global CSS import
│   ├── App.jsx                # Page loader + router provider
│   ├── index.css              # Theme tokens, utilities, animations
│   ├── assets/
│   │   ├── profile.png
│   │   └── projects/          # Project card/detail images
│   ├── components/
│   │   ├── common/            # Button, Container, SectionHeading, loaders, links
│   │   ├── Layout/            # Navbar, Footer
│   │   └── sections/          # Hero, About, Skills, Projects, Experience, Education, Contact
│   ├── data/
│   │   ├── projects.js        # Project content (source of truth for Projects section)
│   │   ├── experience.js      # Experience + education content
│   │   ├── skills.js          # Skills content
│   │   ├── contact.js         # Email, phone, GitHub, LinkedIn, WhatsApp helpers
│   │   └── navigation.js      # Navbar section links
│   ├── hooks/
│   │   ├── useActiveSection.js  # Smooth section navigation + active-section tracking
│   │   └── useMediaQuery.js     # Responsive behavior in components
│   ├── lib/
│   │   ├── motion.js          # Shared animation variants and transitions
│   │   └── pageLoad.js        # Page-ready coordination for loader/hero/navbar
│   ├── pages/
│   │   ├── Home.jsx           # Home route composing all sections
│   │   ├── ProjectDetails.jsx # /project/:id route
│   │   └── NotFound.jsx       # * route
│   └── routes/
│       └── router.jsx         # Route definitions
└── dist/                      # Production build output (generated)
```

## Getting Started

Prerequisites:

- Node.js (LTS recommended; Vite 8 requires a recent Node.js version)
- npm (ships with Node.js)

## Installation

From the project folder (`my-portfolio/`):

```bash
npm install
```

## Run Locally

Starts the Vite development server with hot module replacement:

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

Other available scripts from `package.json`:

```bash
npm run lint     # Run ESLint across the project
npm run preview  # Preview the production build locally
```

## Build for Production

```bash
npm run build
```

This generates the optimized static site in `dist/`. The current build succeeds (`vite build`, 2298 modules transformed).

## Deployment

This project is deployment-ready for any static host. Netlify is already configured:

- Build command: `npm run build` (from `netlify.toml`)
- Publish directory: `dist` (from `netlify.toml`)
- SPA redirect: `/* → /index.html` with status `200`, so `/project/:id` deep links work after deployment

General steps (Netlify):

1. Push the `my-portfolio/` project to GitHub.
2. Create a new Netlify site from the repository.
3. Set base directory to `my-portfolio/` if the repo root contains more than the Vite app.
4. Keep build command `npm run build` and publish directory `dist`.
5. Deploy; the included `netlify.toml` handles the build and SPA fallback automatically.

The same `dist/` output also works on Vercel, GitHub Pages (with appropriate routing handling), Cloudflare Pages, or any static file host.

## Future Improvements

- Add the planned React frontend for the Smart Service Dispatch System
- Align the `project-1` technology tags in `src/data/projects.js` with the Python-only backend list
- Add real GitHub repository and live demo URLs for each project (currently empty strings)
- Add `/resume.pdf` to `public/` so the hero Download Resume button resolves (currently links to `/resume.pdf`)
- Optimize project images to reduce bundle size (PNGs currently add several MB to `dist/`)
- Consider code-splitting to reduce the ~500 kB JS chunk flagged by the build warning

## Contact

- Name: Sai Teja Kandula
- Role: Python Full Stack Developer
- Email: saiteja6111@gmail.com
- Phone: 9866060229
- GitHub: https://github.com/sai-teja111
- LinkedIn: https://www.linkedin.com/in/saitejadev/
- WhatsApp: available via the portfolio Contact section (click-to-chat link built from the number above)

Contact details are sourced from `src/data/contact.js`. The contact form submits via Web3Forms and opens a pre-filled WhatsApp chat without sending anything automatically.

