<<<<<<< HEAD
# Assignment
=======
# Scroll-Driven Hero Section Animation

A pixel-perfect, 60fps scroll-driven interactive hero section built for an internship assignment. Recreates and enhances the top-view car scroll experience from the reference 

![Live Demo Placeholder](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)

---

## 🚀 Live Demo & Repository
- **Live Demo Link:** `https://car-scroll-animation-demo.vercel.app` (Placeholder)
- **Repository:** `https://github.com/your-username/car-scroll-animation`

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router) with React
- **Styling:** Tailwind CSS
- **Animation Engine:** GSAP 3 + ScrollTrigger plugin
- **Icons & Assets:** Custom high-res McLaren 720S top-view PNG asset (`/public/car.png`)

---

## 🏃 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, pnpm, or yarn

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/car-scroll-animation.git
cd car-scroll-animation

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

### Build & Production Test

```bash
# Lint code
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 📁 Project Folder Structure

```
├── public/
│   └── car.png                    # Top-view McLaren 720S transparent car PNG (3981x1901)
├── src/
│   ├── app/
│   │   ├── globals.css            # Tailwind directives & CSS resets
│   │   ├── layout.js              # Root layout & Google fonts configuration
│   │   └── page.js                # Main page entrypoint rendering HeroSection
│   ├── components/
│   │   ├── HeroSection.jsx        # Pinned section container wrapper (200vh height)
│   │   ├── RoadTrack.jsx          # Pinned track, road strip, trail backdrop, and stat cards
│   │   ├── Headline.jsx           # Semantic <h1> letter-spaced headline renderer
│   │   ├── StatCard.jsx           # Reusable floating stat card component with percentage ref
│   │   └── CarVisual.jsx          # Car visual image component
│   ├── constants/
│   │   └── animationConfig.js     # Centralized GSAP timing, easings, scrub, & offset values
│   └── hooks/
│       └── useCarScrollAnimation.js # Custom hook managing GSAP timelines, ScrollTrigger, & reflow prevention
├── package.json
├── README.md
└── tailwind.config.mjs
```

---

## 💡 How the Animations Work

### 1. Initial Load Animation
- **FOUC Prevention:** `gsap.set()` immediately sets initial hidden states (`opacity: 0`, `y: 40`, `x: 0`, `scaleX: 0`) before paint.
- **Headline Entrance:** A GSAP timeline (`introTl`) animates headline letter spans upward (`y: 40` $\rightarrow$ `0`) with a smooth 0.04s stagger and `power3.out` easing, placing letters at a subtle ambient baseline opacity (`0.35`).

### 2. Scroll-Driven Core Animation
- **Viewport Pinning:** GSAP ScrollTrigger pins the `.track` view for the duration of the `200vh` section.
- **Fluid Car Scrub:** The car translates along the horizontal X-axis (`x: 0` $\rightarrow$ `innerWidth - carWidth`) with `scrub: 1` momentum smoothing.
- **Green Trail Growth:** The green backdrop trail behind the car updates using `scaleX(progressRatio)` with `transform-origin: left center`.
- **Sequential Letter Reveal:** As the car's horizontal center coordinate passes each letter's X-position, that letter's opacity transitions to `1.0`.
- **Stat Cards & Count-Up Numbers:** Four colored stat cards fade & slide in at sequential scroll milestones (`top+=400px`, `top+=600px`, etc.). Their percentage text counts up from `0%` to target values (`58%`, `23%`, `27%`, `40%`) snapped to integers based on ScrollTrigger scrub progress.

---

## ⚡ Performance & Optimization Decisions

1. **Zero Scroll-Time Reflows:** All layout dimensions (`carWidth`, `roadWidth`, `headlineLeft`, `letterOffsets`) are calculated and cached inside ScrollTrigger's `onRefresh` hook. The scroll handler reads ONLY cached numeric values—never invoking `getBoundingClientRect()` or `offsetWidth` during scroll.
2. **GPU Composited Animations:** All scroll animations strictly manipulate `transform` (`x`, `y`, `scale`, `scaleX`) and `opacity`. Width/height animations were replaced with `scaleX`, keeping rendering on the compositor thread.
3. **Hardware Acceleration:** Added `will-change: transform` to the car and trail elements for smooth 60fps frame rates.
4. **Clean React Lifecycle Cleanup:** Encapsulated GSAP instances inside `gsap.context()` with `ctx.revert()` in the `useLayoutEffect` unmount callback, preventing duplicate timelines under React 18+ Strict Mode.
5. **Accessibility (`prefers-reduced-motion`):** Detects `(prefers-reduced-motion: reduce)` system settings and bypasses motion scrub, instantly setting final visible states for sensitive users.

---

## 🎙️ Interview Explanation Guide ("How I'd explain this in an interview")

When presenting this project in an interview, here is how I explain the key architectural choices:

> **Q: How did you synchronize the car motion, green trail, letter reveals, and stat cards to user scroll?**
>
> *"I used **GSAP ScrollTrigger** with `scrub: 1`. Rather than playing a time-based animation on a timer, `scrub` links the timeline's progress directly to the scrollbar position. Setting `scrub: 1` adds a slight 1-second physics easing so the movement feels organic rather than stiff. I pinned the viewport container (`pin: true`) over a `200vh` section, giving the user ample scroll distance to experience the car driving from left to right."*

> **Q: How did you ensure 60fps performance without jank or scroll stutter?**
>
> *"I focused on two main rules: **Composite-only properties** and **Zero layout reflows on scroll**.*
> 1. *Instead of animating `width` on the green trail—which triggers browser layout and paint cycles—I used `transform: scaleX(...)` with `transform-origin: left center`. This keeps calculations on the GPU.*
> 2. *I eliminated layout thrashes by caching element positions (`getBoundingClientRect()`, `offsetWidth`) inside ScrollTrigger's `onRefresh` callback rather than reading them inside `onUpdate`. During scroll, the handler only reads cached numbers."*

> **Q: How did you handle React 18 Strict Mode and SSR compatibility?**
>
> *"ScrollTrigger relies on DOM measurements unavailable during server-side rendering. I wrapped plugin registration in client-only checks (`typeof window !== 'undefined'`) and initialized animations inside `useLayoutEffect`. To prevent double-invocation bugs in React Strict Mode, I scoped all timelines with `gsap.context()` and returned `ctx.revert()` in the cleanup function, cleanly destroying old triggers before re-attaching."*

---

## 📝 Design & Implementation Notes
- **Headline Choice:** Used semantic `<h1>` tag with spaced `<span>` elements for accessibility and screen reader support while retaining letter-by-letter GSAP animation capability.
- **Card Colors:** Extracted exact hex palette from reference (`#def54f` yellow, `#6ac9ff` cyan, `#333333` dark gray, `#fa7328` orange).

---

## 📄 License
MIT License. Built for internship submission assignment.
>>>>>>> c0fc5bd (feat: complete scroll-driven car hero section animation assignment)
