// ========================================================
// CENTRALIZED UI EXPORTS
// Consistent design-system surface API
// ========================================================

/* =======================================================
   CORE PRIMITIVES
======================================================= */

export { Button } from './Button'
export type { ButtonProps } from './Button'

export { Card } from './Card'
export type { CardProps } from './Card'

export { Input } from './Input'
export type { InputProps } from './Input'

/* =======================================================
   FEEDBACK + INTERACTION
======================================================= */

export { default as Slider } from './Slider'
export { default as AssessmentCard } from './AssessmentCard'
export { default as AssessmentSlider } from './AssessmentSlider'

export {
  default as Tooltip,
} from './Tooltip'

/* =======================================================
   STATUS + VISUALIZATION
======================================================= */

export {
  default as Badge,
} from './Badge'

export {
  default as ProgressBar,
} from './ProgressBar'

export {
  default as KpiStrip,
} from './KpiStrip'

export {
  default as InsightCard,
} from './InsightCard'

/* =======================================================
   FUTURE SYSTEM PRIMITIVES
======================================================= */

// export { Modal } from './Modal'
// export { Drawer } from './Drawer'
// export { Tabs } from './Tabs'
// export { Select } from './Select'
// export { Textarea } from './Textarea'
// export { Checkbox } from './Checkbox'
// export { RadioGroup } from './RadioGroup'
// export { Avatar } from './Avatar'
// export { EmptyState } from './EmptyState'
// export { Skeleton } from './Skeleton'
// export { Section } from './Section'

/* =======================================================
   DESIGN SYSTEM NOTES
======================================================= */

/*
  Principles followed:

  - Named exports preferred for scalability
  - Predictable import surface
  - Tree-shaking friendly
  - Enterprise frontend architecture
  - Easier refactoring and discoverability
  - Better IDE autocomplete
  - Consistent API ergonomics

  Example:

  import {
    Button,
    Card,
    Badge,
    ProgressBar,
  } from '@/components/ui'
*/