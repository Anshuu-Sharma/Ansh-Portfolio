# Placement README: Interactive Developer Portfolio (Production Build)

This document details the project structure, tech stack, systems concepts, resume rating, and high-impact resume bullet points for **Ansh Portfolio** to be used in SDE applications for FAANG-tier companies.

---

## 1. Project Description
This is the final production release of a highly interactive, animated developer portfolio website built using **Next.js 14**, **TailwindCSS**, **Three.js/OGL**, **Framer Motion**, and **GSAP**. The project features advanced WebGL coordinate math, a curved image carousel that deforms along a dynamic 3D cylinder, custom GPU-bound Signed Distance Field (SDF) shaders, smooth scrollers, and a Matter.js 2D rigid-body physics sandbox.

---

## 2. Tech Stack
- **Framework**: Next.js 14 (React, TypeScript)
- **WebGL & 3D Graphics**: OGL (minimal WebGL rendering), Three.js, React Three Fiber, Spline Tool (`@splinetool/react-spline`)
- **Physics Engine**: Matter.js (2D rigid-body engine)
- **Animation Frameworks**: GSAP (GreenSock), Framer Motion (`motion`)
- **Scroller**: Lenis (Kinetic smooth scroll)
- **Styling**: TailwindCSS, PostCSS, styled-components

---

## 3. Technical Concepts Used
- **GPU-Accelerated Shaders (GLSL)**: Custom WebGL vertex and fragment shaders. Uses a **Signed Distance Field (SDF)** algorithm inside the GPU fragment pipeline to render anti-aliased card boundaries and apply dynamic overlay colors without standard CSS bottlenecks.
- **Trigonometric Coordinate Projection**: Maps horizontal scrolling coordinates to circular cylinder coordinates in WebGL, performing real-time translation and rotation transformations to bend the gallery along a curved axis.
- **2D Rigid-Body Physics Playground**: Integrated Matter.js to bind gravity-based collision shapes, friction vectors, and restitution forces to UI nodes, supporting interactive drag/drop gestures.
- **Kinetic Smooth Scroll (Lenis)**: Intercepts browser scroll triggers, computing sub-pixel offsets via linear interpolation (`lerp`) and velocity damping for a premium scroll-animation experience.
- **High-Performance Vector Animations**: Combines GSAP timeline coordinates with Framer Motion transitions to synchronize UI entry loader gates, component scaling, and layout transitions.

---

## 4. FAANG Resume Rating
### **Rating: 9.8 / 10**
- **Pros**: Exceptional demonstration of advanced web graphics (WebGL, GLSL, Three.js), math-driven interface designs (trigonometry projections, SDF formulas), and fluid user interaction systems (Matter.js, GSAP). An outstanding portfolio piece for creative front-end and user interface engineering teams at Google, Netflix, and Apple.
- **Cons**: High WebGL rendering footprint on legacy hardware.

---

## 5. Resume Bullet Points (Score > 7)
Include these highly optimized, metric-oriented bullet points directly in your resume:

* **Developed a production-grade interactive portfolio** using **Next.js**, **Three.js/OGL**, and **GSAP**, implementing custom WebGL-based layouts and animations.
* **Wrote custom GLSL fragment shaders** utilizing **Signed Distance Fields (SDFs)** to process GPU-accelerated boundary rendering and pixel scaling for multi-resolution images.
* **Engineered a 2D physics interaction playground** utilizing **Matter.js**, binding gravity, restitution, and collision vectors to React DOM components for dynamic user interactions.
