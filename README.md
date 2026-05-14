<div align="center">

# MoveWell

### Musculoskeletal Recovery Intelligence Platform

A production-grade health-tech frontend focused on movement assessment, recovery analytics, and longitudinal health insights.

<br />

<img src="https://img.shields.io/badge/React-19-black?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/TypeScript-Strict-black?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/Vite-5-black?style=for-the-badge&logo=vite" />
<img src="https://img.shields.io/badge/Tailwind-CSS-black?style=for-the-badge&logo=tailwindcss" />
<img src="https://img.shields.io/badge/Accessibility-WCAG%202.1-black?style=for-the-badge" />

<br />
<br />

<img width="100%" alt="MoveWell Banner" src="https://dummyimage.com/1400x600/f7f3eb/1a1a1a&text=MoveWell+Recovery+Intelligence+Dashboard" />

</div>

---

# Overview

MoveWell is a modern recovery intelligence platform designed to explore how frontend engineering, health-focused UX systems, and longitudinal analytics can combine into a scalable product experience.

The application guides users through structured movement assessments, generates synthesized recovery insights, and visualizes progression through an analytics-driven dashboard.

The project emphasizes:

- scalable frontend architecture
- calm enterprise UI systems
- accessibility-first interactions
- low cognitive load interfaces
- reusable design systems
- product-oriented React engineering

---

# Product Experience

## Assessment Workflow

Structured multi-step movement assessment system covering:

- pain mapping
- pain intensity
- mobility restrictions
- daily impact analysis
- movement limitations
- recovery review synthesis

### UX Principles

- progressive disclosure
- minimal friction inputs
- responsive interaction systems
- accessible keyboard navigation
- contextual visual hierarchy
- low-noise interfaces

---

## Recovery Results Engine

Generates a synthesized movement profile using weighted recovery scoring systems.

### Includes

- overall recovery score
- mobility evaluation
- pain analysis
- lifestyle impact metrics
- movement intelligence insights
- personalized recovery recommendations

---

## Recovery Dashboard

Longitudinal analytics dashboard built for movement tracking and recovery progression visualization.

### Dashboard Features

- recovery trend visualization
- score progression analytics
- movement balance radar
- insight generation
- journal system
- recovery history
- health metric breakdowns
- movement stability indicators

---

# Frontend Architecture

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 19 + TypeScript | Component architecture |
| Build Tool | Vite 5 | Development & production builds |
| Styling | Tailwind CSS | Design system implementation |
| Motion | Framer Motion | Interaction transitions |
| Charts | Recharts | Analytics visualization |
| Routing | React Router 7 | Client-side routing |
| State | React Context + Hooks | Scoped state management |
| Forms | React Hook Form | Assessment validation |
| Linting | ESLint + TypeScript | Code quality enforcement |

---

# Frontend Engineering Decisions

## Why React Context Instead of Redux

The assessment workflow contains localized state requirements and predictable update patterns.

React Context + hooks provided:
- lower complexity
- reduced boilerplate
- cleaner scalability
- faster iteration cycles

without introducing unnecessary global abstractions.

---

## Why Client-Side Rendering

MoveWell is interaction-heavy rather than SEO-dependent.

Client-side rendering improves:
- dashboard responsiveness
- interaction continuity
- state persistence
- development simplicity

while reducing infrastructure complexity.

---

## Component System Strategy

The UI architecture is built around reusable primitives:

```txt
Button
Card
Badge
Tabs
Progress Indicators
Input Systems
Surface Variants
```

This enables:
- scalable UI composition
- design consistency
- maintainability
- reduced duplication
- faster iteration

across all product surfaces.

---

# Design Philosophy

MoveWell intentionally avoids:
- excessive gradients
- over-animation
- template-style SaaS design
- high cognitive load dashboards
- noisy visual systems

The interface prioritizes:
- visual restraint
- subtle motion
- calm hierarchy
- readability
- enterprise clarity
- accessibility

Inspired by:
- Linear
- Raycast
- Vercel
- modern health-tech products

---

# Project Structure

```txt
src/
├── components/
│   ├── common/
│   └── ui/
│
├── context/
│
├── features/
│   ├── assessment/
│   └── dashboard/
│
├── hooks/
├── pages/
├── services/
├── styles/
├── types/
└── utils/
```

---

# Assessment System

## Step 1 — Pain Mapping

Visual anatomical selection of affected movement regions.

---

## Step 2 — Pain Intensity

Structured 0–10 pain severity evaluation.

---

## Step 3 — Mobility Evaluation

Functional movement resistance assessment.

---

## Step 4 — Daily Impact

Evaluates influence on:
- work
- sleep
- movement
- recovery quality

---

## Step 5 — Review & Synthesis

Assessment confirmation and movement intelligence generation.

---

# Recovery Scoring System

## Pain Score

Generated from:
- affected body regions
- pain intensity averages

Lower scores indicate healthier movement conditions.

---

## Mobility Score

Calculated using:
- stiffness levels
- range-of-motion resistance
- movement limitations

---

## Impact Score

Measures:
- productivity limitations
- sleep disruption
- recovery interference
- daily movement restriction

---

## Overall Recovery Score

| Metric | Weight |
|---|---|
| Pain | 40% |
| Mobility | 35% |
| Lifestyle Impact | 25% |

---

# Dashboard Analytics

## Recovery Tracking

The dashboard provides:
- movement trajectory visualization
- score history analysis
- recovery stability monitoring
- progression analytics
- longitudinal health insights

---

## Insight Layer

The platform surfaces:
- dominant recovery limitations
- movement instability indicators
- recovery momentum patterns
- progression consistency metrics

through contextual insight systems.

---

## Journal System

Persistent local journaling for:
- movement observations
- stiffness tracking
- recovery notes
- daily mobility reflections

---

# Accessibility

MoveWell was designed using accessibility-first engineering principles.

## Accessibility Features

- semantic HTML structure
- keyboard navigation
- visible focus states
- WCAG-compliant contrast
- ARIA labels
- accessible validation states
- responsive interaction systems
- screen-reader compatibility

---

# Performance Considerations

## Optimization Strategy

- modular component architecture
- scoped state management
- reusable UI primitives
- controlled animation usage
- responsive chart rendering
- minimized unnecessary rerenders
- lightweight frontend structure

---

# Engineering Highlights

- Feature-based frontend architecture
- Strict TypeScript implementation
- Reusable design system primitives
- Responsive dashboard systems
- Accessible interaction patterns
- Longitudinal analytics visualization
- Persistent journal state management
- Structured assessment workflows
- Production deployment readiness

---

# Screenshots

## Recovery Dashboard

<img width="100%" alt="Dashboard Preview" src="https://dummyimage.com/1400x800/f7f3eb/1a1a1a&text=Recovery+Dashboard+Preview" />

---

## Assessment Workflow

<img width="100%" alt="Assessment Flow" src="https://dummyimage.com/1400x800/f7f3eb/1a1a1a&text=Assessment+Workflow+Preview" />

---

## Recovery Results

<img width="100%" alt="Results Page" src="https://dummyimage.com/1400x800/f7f3eb/1a1a1a&text=Recovery+Results+Preview" />

---

# Local Development

## Prerequisites

```bash
Node.js 18+
npm or yarn
```

---

## Installation

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

## Build Production Version

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

## Run ESLint

```bash
npm run lint
```

---

# Deployment

The project is deployment-ready for:

- Vercel
- Netlify
- Cloudflare Pages

---

## Recommended Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

---

# Future Expansion

The architecture supports future integration of:

- backend APIs
- authentication systems
- clinician dashboards
- wearable integrations
- AI-assisted recovery insights
- PDF exports
- cloud persistence
- notification systems

without major frontend restructuring.

---

# Repository Goals

MoveWell was built to demonstrate:

- scalable frontend systems
- modern React architecture
- health-tech UX workflows
- dashboard design systems
- enterprise frontend thinking
- accessibility-first engineering
- maintainable component composition

---

# Status

| Area | Status |
|---|---|
| Responsive Design | ✅ |
| Accessibility | ✅ |
| Type Safety | ✅ |
| Dashboard Analytics | ✅ |
| Assessment System | ✅ |
| Production Deployment | ✅ |

---

# Author

## Aryan Lodha

Frontend Engineer · UI/UX Systems Designer · MSc Data Science

GitHub: <https://github.com/ary0912>

---

<div align="center">

### Built for scalable frontend engineering, product UX systems, and modern health-tech interfaces.

</div>
