/**
 * Type definitions for MoveWell assessment and health data
 */

// Assessment form data
export interface AssessmentFormData {
  painAreas: BodyArea[];
  painIntensity: Record<BodyArea, number>;
  mobilityDifficulty: MobilityQuestion[];
  dailyImpact: DailyImpactQuestion[];
  timestamp: string;
}

// Body areas for pain selection
export type BodyArea =
  | 'neck'
  | 'shoulder'
  | 'elbow'
  | 'wrist'
  | 'hand'
  | 'upperBack'
  | 'lowerBack'
  | 'hip'
  | 'knee'
  | 'ankle'
  | 'foot';

// Mobility assessment questions
export interface MobilityQuestion {
  id: string;
  question: string;
  difficulty: number; // 0-10 scale
  area: BodyArea;
}

// Daily impact questions
export interface DailyImpactQuestion {
  id: string;
  category: 'work' | 'sleep' | 'activity';
  impact: number; // 0-10 scale
  description: string;
}

// Assessment result/submission
export interface AssessmentResult {
  id: string;
  userId: string;
  formData: AssessmentFormData;
  overallScore: number; // 0-100 (lower is better)
  painScore: number; // 0-100
  mobilityScore: number; // 0-100
  impactScore: number; // 0-100
  summary: string;
  recommendations: string[];
  createdAt: string;
}

// Progress entry for tracking over time
export interface ProgressEntry {
  id: string;
  date: string;
  overallScore: number;
  painScore: number;
  mobilityScore: number;
  impactScore: number;
}

// Health data for dashboard
export interface HealthData {
  userId: string;
  currentAssessment: AssessmentResult | null;
  history: ProgressEntry[];
  lastUpdated: string;
}

// User context data
export interface User {
  id: string;
  email?: string;
  name?: string;
  createdAt: string;
}
