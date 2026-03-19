# Gemini CLI Documentation

This file serves as a foundational record of all actions, architectural decisions, and project progress performed by Gemini CLI.

## Project Overview
- **Project Name:** WINDOWSEVEN PORTIFOLIO
- **Date Created:** 2026-03-06

## Project Intelligence

### Core Architecture
- **Framework:** React 18 with TypeScript and Vite.
- **Styling:** Tailwind CSS with dynamic theme switching (Cyber, Dev, and Default modes).
- **Animations:** Powered by Framer Motion and GSAP for high-fidelity interactive elements.
- **State Management:** Uses Zustand for global state and a custom `ThemeContext` for mode switching.
- **Key Features:**
    - **Mode-Aware UI:** The entire application's aesthetic (backgrounds, borders, typography) shifts based on the selected theme.
    - **Interactive Elements:** Includes a `CommandPalette` for quick navigation and a `Walkthrough` feature.
    - **Visual Effects:** Utilizes scanline overlays for Cyber mode and terminal-style headers for Dev mode.

### Dependencies
- **UI Components:** `@headlessui/react`, `lucide-react`.
- **Graphics/Physics:** `three`, `cannon-es`, `matter-js`.
- **Internationalization:** `i18next`.

## Activity Log

### 2026-03-06
- **Task:** Initial Setup
- **Action:** Created `GEMINI.md` to document project history and mandates.
- **Task:** Project Analysis
- **Action:** Conducted a comprehensive review of the codebase, including `package.json`, `App.tsx`, `Layout.tsx`, and `Hero.tsx`. Documented core architecture and dependencies.
