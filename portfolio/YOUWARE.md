# Junior Lespikius Portfolio - Project Documentation

This project is a high-end, interactive portfolio website built with React, Vite, and Tailwind CSS. It features a unique "Mode" system allowing users to switch between Standard, Developer, and Cybersecurity themes, each with distinct visual identities and interactions.

## Key Features

### 1. Advanced Theme System
- **Modes:** Light, Dark, Developer (Terminal Green), Cybersecurity (Neon Cyan).
- **Implementation:** `ThemeContext` manages state and applies CSS variables/classes globally.
- **Visual Effects:**
    - **Dev Mode:** Monospace fonts, terminal green accents, grid background, GitHub-style dark theme.
    - **Cyber Mode:** Scanline overlay, neon cyan glow, deep navy background.

### 2. Interactive Command Terminal (`Ctrl + K`)
- **Functionality:** A fully functional "Fake CLI" terminal.
- **Features:**
    - **Terminal UI:** Dark background, monospaced font, command history, and prompt.
    - **Commands:**
        - `help`: List all available commands.
        - `whoami`: Display user identity.
        - `show skills`: Render skills grid in terminal.
        - `dashboard`: Show fake system performance metrics.
        - `mode [dev|cyber|light|dark]`: Switch themes via command line.
        - `goto [page]`: Navigate to sections.
    - **Access:** `Ctrl + K` or Search buttons.
    - **Fixes:** 
        - Resolved z-index conflicts (z-[99999]) and focus trapping issues.
        - Replaced Framer Motion with standard DOM elements for maximum input stability.
        - Enforced direct input focus handling and removed form submission dependencies.

### 3. Navigation Architecture
- **Header (Fixed Top):**
    - **Left:** Mobile Menu Toggle, Dynamic Breadcrumbs.
    - **Right:** Search (Command Palette), Theme Toggle, Mode Switcher.
    - **Style:** Glassmorphism, mode-aware borders, extended height with gradient.
- **Sidebar (Fixed Left):**
    - **Desktop:** Collapsible (Icon-only -> Full width) with Framer Motion animations.
    - **Mobile:** Slide-over drawer behavior with backdrop overlay.
- **Footer:**
    - **Layout:** 3-column (Brand, Links, Connect).
    - **Features:** Scroll-to-top button, Easter egg ("whoami").

### 4. Landing Page (Hero Section)
- **Architecture:** 5-layer system (Hero Core, Identity Strip, Tech Stack, Mode Personality, Cyber Motion).
- **Dynamic Content:** Typing effect for subtitles ("Building Secure APIs", etc.).
- **Mode-Aware Profile:**
    - **Dev Mode:** Terminal-style card with bash prompt.
    - **Cyber Mode:** Glowing frame with scanning animation.
    - **Normal:** Glassmorphism card.
- **Tech Stack:** Visual row of technologies (React, Node, Docker, etc.).

### 5. Sections
- **Projects:** Real-world projects (Smart Class, Linux Buddy, WiFi Billing, Event Booking) with case study links.
- **Skills:** Categorized cards with hover effects.
- **Qualifications:** Education timeline and Certification cards (Cisco, Google) with PDF links.
- **About:** "Current Focus" section and Engineering Philosophy.
- **Contact:** Functional-looking form and social links.

## Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + `clsx` + `tailwind-merge`
- **Animations:** Framer Motion (except Command Palette)
- **Icons:** Lucide React

## Development
- **Build:** `npm run build`
- **Dev:** `npm run dev`

## Project Structure
- `src/context/ThemeContext.tsx`: Core theme logic and global UI state.
- `src/components/layout/`: Header, Footer, Sidebar, Layout wrapper.
- `src/components/features/`: Command Palette implementation.
- `src/components/sections/`: Individual page sections (Hero, About, etc.).
- `src/components/ui/`: Reusable UI components (Button, Card).
- `public/assets/`: Static assets (images, PDFs).
