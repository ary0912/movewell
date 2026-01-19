/**
 * Constants and enumerations for MoveWell
 */

export const BODY_AREAS = [
  'neck',
  'shoulder',
  'elbow',
  'wrist',
  'hand',
  'upperBack',
  'lowerBack',
  'hip',
  'knee',
  'ankle',
  'foot',
] as const;

export const BODY_AREA_LABELS: Record<string, string> = {
  neck: 'Neck',
  shoulder: 'Shoulder',
  elbow: 'Elbow',
  wrist: 'Wrist',
  hand: 'Hand',
  upperBack: 'Upper Back',
  lowerBack: 'Lower Back',
  hip: 'Hip',
  knee: 'Knee',
  ankle: 'Ankle',
  foot: 'Foot',
};

export const MOBILITY_QUESTIONS = [
  {
    id: 'mobility-1',
    question: 'How difficult is it to raise your arm overhead?',
    area: 'shoulder' as const,
  },
  {
    id: 'mobility-2',
    question: 'How difficult is it to bend forward at the waist?',
    area: 'lowerBack' as const,
  },
  {
    id: 'mobility-3',
    question: 'How difficult is it to rotate your head?',
    area: 'neck' as const,
  },
  {
    id: 'mobility-4',
    question: 'How difficult is it to squat down?',
    area: 'knee' as const,
  },
];

export const DAILY_IMPACT_CATEGORIES = [
  'work',
  'sleep',
  'activity',
] as const;

export const DAILY_IMPACT_QUESTIONS = [
  {
    id: 'impact-1',
    category: 'work' as const,
    description: 'How much does pain affect your work/productivity?',
  },
  {
    id: 'impact-2',
    category: 'sleep' as const,
    description: 'How much does pain affect your sleep quality?',
  },
  {
    id: 'impact-3',
    category: 'activity' as const,
    description: 'How much does pain limit your daily activities?',
  },
];

// Score thresholds and interpretations
export const SCORE_THRESHOLDS = {
  EXCELLENT: { min: 0, max: 20, label: 'Excellent', color: 'success' },
  GOOD: { min: 21, max: 40, label: 'Good', color: 'primary' },
  MODERATE: { min: 41, max: 60, label: 'Moderate', color: 'warning' },
  POOR: { min: 61, max: 100, label: 'Poor', color: 'danger' },
} as const;

// Time range options for progress tracking
export const TIME_RANGES = {
  WEEK: { label: 'Last 7 Days', days: 7 },
  MONTH: { label: 'Last 30 Days', days: 30 },
  QUARTER: { label: 'Last 90 Days', days: 90 },
  YEAR: { label: 'Last Year', days: 365 },
} as const;
