# MoveWell - Project Architecture & Structure

## 🏗️ Complete Project Structure

```
move-app/
├── public/                          # Static assets
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── ProgressIndicator.tsx    # Multi-step progress tracker
│   │   └── ui/                          # Reusable UI primitives
│   │       ├── Badge.tsx                # Status indicator
│   │       ├── Button.tsx               # Primary CTA element
│   │       ├── Card.tsx                 # Content container
│   │       ├── Input.tsx                # Form field
│   │       ├── ProgressBar.tsx          # Visual progress indicator
│   │       ├── Slider.tsx               # Range selector
│   │       └── index.ts                 # Export barrel
│   │
│   ├── features/
│   │   ├── assessment/                  # Assessment workflow
│   │   │   ├── AssessmentPage.tsx       # Main assessment container
│   │   │   ├── ResultsPage.tsx          # Results display
│   │   │   ├── StepImpact.tsx          # Step 4: Daily impact
│   │   │   ├── StepMobility.tsx        # Step 3: Mobility
│   │   │   ├── StepPainIntensity.tsx   # Step 2: Pain ratings
│   │   │   ├── StepPainMap.tsx         # Step 1: Pain areas
│   │   │   └── StepReview.tsx          # Step 5: Review & submit
│   │   │
│   │   └── dashboard/                  # Results tracking
│   │       └── DashboardPage.tsx        # Progress & analytics
│   │
│   ├── context/
│   │   └── AssessmentContext.tsx        # Form state management
│   │
│   ├── hooks/                           # Custom React hooks (extensible)
│   │
│   ├── pages/
│   │   └── LandingPage.tsx              # Home page
│   │
│   ├── services/
│   │   └── assessmentService.ts         # Mock API/data layer
│   │
│   ├── styles/
│   │   ├── globals.css                  # Global styles & animations
│   │   └── App.css                      # Component-specific styles
│   │
│   ├── types/
│   │   └── index.ts                     # TypeScript type definitions
│   │
│   ├── utils/
│   │   ├── constants.ts                 # App constants & thresholds
│   │   ├── helpers.ts                   # Utility functions
│   │   └── scoring.ts                   # Health scoring algorithms
│   │
│   ├── App.tsx                          # Root component & router
│   ├── main.tsx                         # App entry point
│   └── index.css                        # Tailwind imports
│
├── .github/
│   └── copilot-instructions.md          # Custom instructions
│
├── public/
├── node_modules/                        # Dependencies (gitignored)
├── dist/                                # Production build output
│
├── .env.example                         # Environment template
├── .eslintignore                        # ESLint ignore rules
├── .gitignore                           # Git ignore patterns
├── .vercelignore                        # Vercel ignore patterns
├── eslint.config.js                     # ESLint configuration
├── index.html                           # HTML entry point
├── package.json                         # Dependencies & scripts
├── package-lock.json                    # Lock file
├── postcss.config.js                    # PostCSS config (Tailwind)
├── README.md                            # Project documentation
├── tailwind.config.js                   # Tailwind configuration
├── tsconfig.json                        # TypeScript config
├── tsconfig.app.json                    # App TypeScript config
├── tsconfig.node.json                   # Node TypeScript config
├── vercel.json                          # Vercel deployment config
├── vite.config.ts                       # Vite build config
│
├── DEPLOYMENT.md                        # Deployment instructions
├── DEPLOYMENT_COMPLETE.md               # Complete guide
└── deploy.sh                            # Deployment script
```

## 🔄 Data Flow Architecture

### Assessment Flow
```
LandingPage
    ↓
    → AssessmentPage
        ├── StepPainMap (select areas)
        ├── StepPainIntensity (rate pain)
        ├── StepMobility (movement difficulty)
        ├── StepImpact (daily impact)
        └── StepReview (submit)
            ↓
            assessmentService.submitAssessment()
            ↓
            AssessmentContext (store result)
            ↓
ResultsPage (display results)
            ↓
            navigate('/dashboard')
            ↓
DashboardPage (view history & progress)
```

### State Management
```
AssessmentContext
├── formData
│   ├── painAreas[]
│   ├── painIntensity{}
│   ├── mobilityDifficulty[]
│   └── dailyImpact[]
├── currentStep
├── result (AssessmentResult)
├── isLoading
└── error

Service Layer (assessmentService)
├── submitAssessment() → creates result
├── fetchHealthData() → retrieves history
├── fetchProgressData() → gets time-range data
└── fetchAssessmentHistory() → gets past results
```

## 🎨 Component Hierarchy

```
App
├── AssessmentProvider (Context wrapper)
└── Routes
    ├── / → LandingPage
    ├── /assessment → AssessmentPage
    │   ├── ProgressIndicator
    │   ├── StepComponents (Step 1-5)
    │   │   └── Reuses: Button, Input, Slider, Card
    │   └── Button (navigation)
    ├── /results → ResultsPage
    │   ├── Card (score display)
    │   ├── Badge (status)
    │   ├── ProgressBar (visual indicators)
    │   └── Button (actions)
    ├── /dashboard → DashboardPage
    │   ├── Card (status card)
    │   ├── LineChart (Recharts)
    │   ├── Button (filters)
    │   └── Badge (trend indicator)
    └── * → Navigate to /
```

## 📊 Type System

```typescript
// Core Assessment Types
AssessmentFormData
├── painAreas: BodyArea[]
├── painIntensity: Record<BodyArea, number>
├── mobilityDifficulty: MobilityQuestion[]
├── dailyImpact: DailyImpactQuestion[]
└── timestamp: string

AssessmentResult
├── id, userId, formData
├── overallScore: number
├── painScore: number
├── mobilityScore: number
├── impactScore: number
├── summary: string
├── recommendations: string[]
└── createdAt: string

HealthData
├── userId: string
├── currentAssessment: AssessmentResult | null
├── history: ProgressEntry[]
└── lastUpdated: string

ProgressEntry
├── id, date
├── overallScore, painScore
├── mobilityScore, impactScore
```

## 🎯 Scoring Algorithm

```
Pain Score (0-100)
  = (sum of intensity for selected areas / number of areas) × 10

Mobility Score (0-100)
  = (average difficulty rating) × 10

Impact Score (0-100)
  = (average impact rating) × 10

Overall Score (0-100) [Weighted]
  = (Pain × 0.4) + (Mobility × 0.35) + (Impact × 0.25)

Interpretation
  0-20   → Excellent (green)
  21-40  → Good (blue)
  41-60  → Moderate (amber)
  61-100 → Poor (red)
```

## 🚀 Deployment Architecture

```
Local Development (npm run dev)
         ↓
GitHub Repository Push
         ↓
Vercel Import Project
         ↓
Auto-detect Vite Configuration
         ↓
Build (npm run build)
         ↓
Deploy to Vercel CDN
         ↓
Production URL: https://movewell-xxx.vercel.app
```

## 📱 Responsive Breakpoints

```
Mobile:   < 640px  (sm)
Tablet:   640px+   (md: 768px)
Desktop:  1024px+  (lg)
Wide:     1280px+  (xl)
```

## ⚡ Performance Optimizations

```
Bundle
├── Vite Code Splitting
├── Dynamic imports (routes)
├── Tree shaking
└── Minification → 652KB JS, 26KB CSS (gzipped)

Rendering
├── React.memo on components
├── useCallback for event handlers
├── Lazy evaluation of calculations
└── Efficient re-render boundaries

Images & Assets
├── No large images (emoji only)
├── CSS optimized with Tailwind
├── Font: Google Fonts (async)
└── Icons: SVG inline

Network
├── Vercel CDN for global delivery
├── Automatic gzip compression
├── Cache-bust on deploy
└── Zero cold starts with serverless
```

## 🔒 Security Considerations

```
Data Handling
├── All client-side processing
├── No sensitive data in URLs
├── No external API calls (mock only)
├── Context-based state (not localStorage by default)
└── HTTPS enforced on Vercel

Accessibility
├── Semantic HTML
├── ARIA labels
├── Keyboard navigation
├── Color contrast WCAG AA
└── Screen reader friendly

Privacy
├── No analytics by default (optional)
├── No cookies
├── No tracking
├── No external scripts
└── Educational use only
```

## 📈 Scalability Path

Current: Client-side only

Next Phase Options:
1. **Backend API**
   - User authentication
   - Data persistence
   - Multi-device sync

2. **Enhanced Features**
   - PDF export
   - Email reminders
   - Integration with providers
   - Mobile app (React Native)

3. **Analytics**
   - Therapist dashboard
   - Population health insights
   - ML-based recommendations

4. **Monetization**
   - Freemium model
   - Subscription tiers
   - B2B licensing
```

---

This architecture is:
- ✅ **Modular** - Easy to extend
- ✅ **Maintainable** - Clean separation of concerns
- ✅ **Scalable** - Ready for growth
- ✅ **Testable** - Components are isolated
- ✅ **Documented** - Clear structure
- ✅ **Professional** - Production-ready patterns
