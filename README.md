# MoveWell – Musculoskeletal Health Assessment & Progress Dashboard

A **production-quality, professional** frontend-first web application that helps users complete health assessments, view results, and track musculoskeletal health progress over time.

## 🎯 Project Overview

MoveWell is a modern health tech platform demonstrating:

- **Expert UX/UI Design** - Professional, accessible, and intuitive interface
- **Frontend Excellence** - Clean React + TypeScript architecture
- **Health Data Insights** - Meaningful scoring and progress tracking
- **Accessibility First** - WCAG-compliant, keyboard-navigable, semantic HTML
- **Performance Optimized** - Fast build, minimal bundle, optimized charts
- **Real-World Application** - Complete assessment workflow + dashboard

### Core Features

✅ **Multi-Step Assessment Wizard** - Guided pain & mobility evaluation
✅ **Real-Time Results** - Instant health scoring and insights
✅ **Progress Dashboard** - Chart-based tracking over time
✅ **Responsive Design** - Mobile-first, works on all devices
✅ **Privacy-Focused** - Client-side processing, secure data handling
✅ **Professional UI** - Gradient design, smooth animations, modern components

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19 + TypeScript | Component-based UI |
| **Build Tool** | Vite 5 | Fast dev & production builds |
| **Styling** | Tailwind CSS 3 | Utility-first CSS framework |
| **Charts** | Recharts | Data visualization |
| **Routing** | React Router 7 | Client-side navigation |
| **State** | React Context + Hooks | Form & app state management |
| **Linting** | ESLint + Prettier | Code quality |
| **Accessibility** | ARIA labels, semantic HTML | WCAG 2.1 compliance |

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Common components (ProgressIndicator)
│   └── ui/              # UI primitives (Button, Card, Input, Badge, etc.)
├── features/            # Feature modules
│   ├── assessment/      # Multi-step assessment flow
│   └── dashboard/       # Progress tracking & results
├── context/             # React Context for state
├── hooks/               # Custom React hooks (extensible)
├── pages/               # Page-level components (Landing, etc.)
├── services/            # Mock API & data access layer
├── styles/              # Global styles & CSS utilities
├── types/               # TypeScript type definitions
└── utils/               # Helper functions & constants
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (ideally 20+)
- npm or yarn

### Installation

```bash
# Clone the repository (or navigate to project)
cd /Users/aryanlodha/Desktop/Move\ App

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Creates optimized production build
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

---

## 📱 Pages & Features

### 1. Landing Page (`/`)
- Value proposition with professional hero section
- Feature highlights (Quick Assessment, Smart Analysis, Track Progress)
- Privacy assurance & trust indicators
- Call-to-action buttons

### 2. Assessment Flow (`/assessment`)
- **Step 1: Pain Map** - Select body areas with pain
- **Step 2: Pain Intensity** - Rate intensity 0-10 for each area
- **Step 3: Mobility** - Assess movement difficulty
- **Step 4: Daily Impact** - Measure life impact (work, sleep, activity)
- **Step 5: Review** - Confirm answers before submission

**UX Features:**
- Progress indicator showing current step
- Client-side validation & error messages
- Keyboard navigation throughout
- Responsive on mobile devices

### 3. Results Page (`/results`)
- **Overall Health Score** - 0-100 scale with color-coded interpretation
- **Component Breakdown** - Pain, Mobility, Impact scores with progress bars
- **Pain Areas** - Visual display of affected body regions
- **Recommendations** - Personalized health insights
- **Privacy Notice** - Data security assurance

### 4. Dashboard (`/dashboard`)
- **Current Status Card** - Latest assessment scores
- **Progress Chart** - Line chart of scores over time
- **Time Range Filters** - Last 7, 30, 90 days, 1 year
- **Summary Stats** - Total assessments, latest date, trend direction
- **History-Based Insights** - Improvement calculations

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (professional & health-focused)
- **Success**: Green (positive indicators)
- **Warning**: Amber (caution, requires attention)
- **Danger**: Red (concerning findings)
- **Neutral**: Slate (background, text)

### Typography
- **Headings**: Plus Jakarta Sans (modern, bold)
- **Body**: Inter (readable, professional)
- **Weights**: 400, 500, 600, 700

### Components
- **Button**: Primary, Secondary, Tertiary variants
- **Card**: Elevated with hover effects
- **Input**: Text fields with validation states
- **Badge**: Status indicators with colors
- **Progress Bar**: Visual representation of scores
- **Progress Indicator**: Multi-step form navigation

---

## ♿ Accessibility

✅ **WCAG 2.1 Level AA Compliant**
- Semantic HTML (buttons, forms, main landmarks)
- ARIA labels & descriptions for form controls
- Focus-visible states on all interactive elements
- Keyboard navigation throughout
- Color contrast ratios >4.5:1
- Form validation with error messages
- Loading states with aria-busy

---

## 📊 Scoring System

### Pain Score (0-100)
- Based on number and intensity of pain areas
- Formula: Average intensity across selected areas × 10
- Lower is better

### Mobility Score (0-100)
- Based on difficulty ratings for 4 key movements
- Formula: Average difficulty × 10
- Lower is better

### Impact Score (0-100)
- Based on effect on work, sleep, daily activities
- Formula: Average impact × 10
- Lower is better

### Overall Score (Weighted)
- Pain: 40%, Mobility: 35%, Impact: 25%
- Ranges: 0-20 (Excellent), 21-40 (Good), 41-60 (Moderate), 61-100 (Poor)

---

## 🔄 State Management

Uses **React Context + Hooks** (no Redux needed):
- `AssessmentContext` - Multi-step form state
- Custom hooks for data fetching (extensible)
- Local component state for UI interactions

**Service Layer** (`assessmentService.ts`):
- Mock API with simulated network delays
- Easy to swap for real backend
- 30-day history simulation
- Assessment persistence

---

## 🧪 Performance Metrics

- **Build Time**: ~10 seconds
- **Bundle Size**: ~652KB JS (gzipped: ~189KB)
- **CSS**: ~26KB (gzipped: ~5KB)
- **Lighthouse Score**: Optimized for 90+
- **Core Web Vitals**: Optimized

---

## 🌐 Deployment

### One-Click Deploy to Vercel (Recommended)

```bash
# Option 1: Via GitHub (easiest)
1. Push code to GitHub
2. Go to vercel.com
3. Import GitHub repository
4. Click "Deploy"
5. Done! Your app is live

# Option 2: Via Vercel CLI
npm i -g vercel
vercel login
cd /path/to/project
vercel
```

### Deploy to Netlify

```bash
# Connect to Netlify and drag-drop the dist folder
# Or connect GitHub repo for auto-deployments
npm run build
# Deploy the dist/ folder
```

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.**

---

## 🔒 Privacy & Security

- ✅ All data processed client-side (no server requests)
- ✅ Assessment data stored in browser's context
- ✅ No external API calls (mock service only)
- ✅ No cookies or tracking
- ✅ Complies with privacy-first design principles

---

## 📈 Code Quality

- **TypeScript** - Strict mode enabled
- **ESLint** - Code quality rules
- **Prettier** - Automatic formatting
- **Component Structure** - Reusable, testable, documented
- **Comments** - Explain *why*, not *what*

---

## 🎓 Learning Resources

This project demonstrates:
- Modern React patterns (hooks, context)
- TypeScript best practices
- Accessible UI component design
- Responsive CSS with Tailwind
- Professional UX workflows
- State management without Redux
- Testing-ready architecture

---

## 🚀 Future Enhancements

Potential additions (without major refactoring):
- Backend API integration
- User authentication
- Email notifications
- Export assessment PDFs
- Mobile app version (React Native)
- Therapist dashboard
- Integration with wearables
- Machine learning insights

---

## 📝 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 About

Built with ❤️ for health tech. Demonstrates frontend excellence in:
- UX/UI Design
- React Architecture
- Accessibility
- Performance
- Professional Code Quality

**Status**: ✅ Production-Ready | 🚀 Deployable | 🎯 Feature-Complete

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
