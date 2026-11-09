# Shahdat Hossain — Senior Video Editor & Motion Graphics Designer Portfolio

A modern, high-performance portfolio website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🌟 Key Features

- **4-Theme Studio System**:
  - `Editorial Paper` (Light Architectural Luxury)
  - `Nordic Minimal` (Cool Gallery)
  - `Desert Studio` (Warm Architectural)
  - `Cinema Gold` (Warm Dark Lounge)
- **Clean Cinema Showreel Player**:
  - Direct responsive embed with zero third-party branding overlays
  - Custom Electric Lime NLE transport controls (Play/Pause, Audio On/Mute, Scrubber, Chapter quick-jumps)
  - Fullscreen Theater Mode
  - Supports both YouTube/Vimeo embeds and direct native `.mp4` video files
- **Curated Selected Works Archive**:
  - Asymmetric editorial bento grid
  - Category filters (Fashion Films, Commercials, Motion Graphics, Product Videos, Brand Campaigns, Social Media Reels, Logo Animation, VFX)
  - Deep-dive case study view for each project
- **Capabilities & Software Matrix**:
  - 12 Core capabilities
  - 9 Industry-standard software tools
- **Professional Career Timeline**:
  - Expandable accordion detailing responsibilities and achievements
- **Contact & Inquiry System**:
  - Validated client inquiry form with direct mailto fallback
  - Quick-copy email, WhatsApp, and social channel links
- **Live Studio CMS Drawer**:
  - Test real-time changes to text, video URLs, and themes directly in the browser
  - 1-click JSON export

---

## 📁 Project Architecture

```text
src/
├── app/
│   ├── layout.tsx         # Root Layout, Google Fonts & Global SEO Metadata
│   ├── page.tsx           # Main Page Component
│   └── globals.css        # Tailwind CSS & Typography Variables
│
├── components/            # Modular UI Components
│   ├── Navbar.tsx         # Header & 4-Theme Switcher
│   ├── Hero.tsx           # Intro & Showreel Preview
│   ├── Showreel.tsx       # Showreel Player & Custom Transport Controls
│   ├── WorkGallery.tsx    # Asymmetrical Project Grid & Filters
│   ├── CaseStudyView.tsx  # In-depth Case Study Template
│   ├── About.tsx          # Biography, Portrait & Resume Download
│   ├── Capabilities.tsx   # 12 Core Capabilities & 9 Software Tools
│   ├── ExperienceSection.tsx # Career Timeline Accordion
│   ├── ContactSection.tsx # Inquiry Form & Contact Cards
│   ├── Footer.tsx         # Minimalist Footer
│   ├── ShowreelModal.tsx  # Fullscreen Theater Modal
│   ├── CmsDrawer.tsx      # Live Studio CMS Drawer
│   └── EditorialVisualFrame.tsx # Procedural Kinetic Preview Frame
│
├── data/                  # Centralized Content (Easily Editable)
│   ├── siteConfig.ts      # Bio, Showreel, Contact & SEO details
│   ├── projects.ts        # All 8 project case studies & media
│   ├── skills.ts          # Capabilities & software tools
│   ├── experience.ts      # Organizations, roles & achievements
│   └── themes.ts          # Studio color theme palettes
│
├── types/
│   └── index.ts           # TypeScript Interfaces & Definitions
│
└── public/
    ├── images/            # Drop portrait and project photos here
    ├── videos/            # Drop local showreel / video .mp4 files here
    └── cv/                # Drop PDF resumes here
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Linter
```bash
npm run lint
```

---

## 📝 How to Update Your Content

| To Update | Edit File |
| :--- | :--- |
| Your Name, Bio, Email, WhatsApp | `src/data/siteConfig.ts` |
| Showreel Video URL | `src/data/siteConfig.ts` (`showreel.videoUrl`) |
| Profile Photo | Drop in `public/images/` & set path in `siteConfig.ts` |
| Resume / CV | Drop in `public/cv/` & set path in `siteConfig.ts` |
| Projects & Videos | `src/data/projects.ts` |
| Experience History | `src/data/experience.ts` |

---

## 🚀 Deployment

The project is ready for one-click deployment to **[Vercel](https://vercel.com)**:
1. Push your repository to GitHub.
2. Import the repository on Vercel.
3. Deploy!
