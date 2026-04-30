/**
 * Score calculation utilities for health assessments
 */

import type { AssessmentFormData, AssessmentResult, MobilityQuestion, DailyImpactQuestion } from '../types';
import { SCORE_THRESHOLDS } from './constants';

/**
 * Calculate overall pain score from selected areas and intensity ratings
 * Returns 0-100 where 0 is excellent (no pain) and 100 is worst (severe pain)
 */
export function calculatePainScore(
  painAreas: string[],
  painIntensity: Record<string, number>
): number {
  if (painAreas.length === 0) return 0;

  const totalIntensity = painAreas.reduce((sum, area) => {
    return sum + (painIntensity[area] || 0);
  }, 0);

  // Average intensity across selected areas, scaled to 0-100
  return Math.round((totalIntensity / painAreas.length) * 10);
}

/**
 * Calculate mobility score from difficulty ratings
 * Returns 0-100 where 0 is excellent mobility and 100 is severe difficulty
 */
export function calculateMobilityScore(
  mobilityDifficulties: number[]
): number {
  if (mobilityDifficulties.length === 0) return 0;

  const average =
    mobilityDifficulties.reduce((a, b) => a + b, 0) /
    mobilityDifficulties.length;

  // Average difficulty, scaled to 0-100
  return Math.round(average * 10);
}

/**
 * Calculate daily impact score from impact ratings
 * Returns 0-100 where 0 is no impact and 100 is severe impact
 */
export function calculateImpactScore(impactRatings: number[]): number {
  if (impactRatings.length === 0) return 0;

  const average =
    impactRatings.reduce((a, b) => a + b, 0) / impactRatings.length;

  return Math.round(average * 10);
}

/**
 * Calculate overall health score (weighted average of component scores)
 * Returns 0-100 where 0 is excellent health and 100 is poor
 * Weights: Pain 40%, Mobility 35%, Impact 25%
 */
export function calculateOverallScore(
  painScore: number,
  mobilityScore: number,
  impactScore: number
): number {
  return Math.round(painScore * 0.4 + mobilityScore * 0.35 + impactScore * 0.25);
}

/**
 * Get score interpretation and color coding
 * Returns threshold object with label and color for UI display
 */
export function getScoreInterpretation(score: number) {
  if (score <= SCORE_THRESHOLDS.EXCELLENT.max) {
    return SCORE_THRESHOLDS.EXCELLENT;
  }
  if (score <= SCORE_THRESHOLDS.GOOD.max) {
    return SCORE_THRESHOLDS.GOOD;
  }
  if (score <= SCORE_THRESHOLDS.MODERATE.max) {
    return SCORE_THRESHOLDS.MODERATE;
  }
  return SCORE_THRESHOLDS.POOR;
}

/**
 * Generate health recommendations based on scores
 */
export function generateRecommendations(
  painScore: number,
  mobilityScore: number,
  impactScore: number
): string[] {
  const recommendations: string[] = [];

  if (painScore > 40) {
    recommendations.push(
      'Consider gentle stretching or physical therapy to manage pain levels.'
    );
  }

  if (mobilityScore > 50) {
    recommendations.push(
      'Mobility exercises could help improve your range of motion.'
    );
  }

  if (impactScore > 40) {
    recommendations.push(
      'Daily activities are being significantly affected. Consult a healthcare professional.'
    );
  }

  if (painScore < 30 && mobilityScore < 30) {
    recommendations.push(
      'Keep up the good work! Continue with your current routine.'
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Your health metrics look good. Regular movement and awareness help maintain wellness.'
    );
  }

  return recommendations;
}

/**
 * Calculate percentage improvement between two scores
 * Positive percentage indicates improvement (lower score)
 */
export function calculateImprovement(
  previousScore: number,
  currentScore: number
): number {
  if (previousScore === 0) return 0;
  return Math.round(((previousScore - currentScore) / previousScore) * 100);
}

/**
 * Create assessment result from form data
 */
export function createAssessmentResult(
  formData: AssessmentFormData,
  userId: string = 'user-default'
): AssessmentResult {
  const mobilityDifficulties = formData.mobilityDifficulty.map((q: MobilityQuestion) => q.difficulty);
  const impactRatings = formData.dailyImpact.map((q: DailyImpactQuestion) => q.impact);

  const painScore = calculatePainScore(
    formData.painAreas,
    formData.painIntensity
  );
  const mobilityScore = calculateMobilityScore(mobilityDifficulties);
  const impactScore = calculateImpactScore(impactRatings);
  const overallScore = calculateOverallScore(
    painScore,
    mobilityScore,
    impactScore
  );

  const interpretation = getScoreInterpretation(overallScore);
  const recommendations = generateRecommendations(
    painScore,
    mobilityScore,
    impactScore
  );

  return {
    id: `assessment-${Date.now()}`,
    userId,
    formData,
    overallScore,
    painScore,
    mobilityScore,
    impactScore,
    summary: `Your overall musculoskeletal health is ${interpretation.label.toLowerCase()}. Focus on ${painScore > mobilityScore ? 'pain management' : 'mobility'}.`,
    recommendations,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Generate a dynamic insight string based on score improvements and current state
 */
export function generateInsightText(
  improvement: number,
  painScore: number,
  mobilityScore: number
): string {
  if (improvement > 10) {
    if (painScore < 30) return `Your pain levels have dropped significantly. Your consistency is paying off.`;
    return `You've improved by ${improvement}% recently. Keep following your daily routine.`;
  }
  if (improvement > 0) {
    return `You're making steady progress. Small daily habits are moving the needle.`;
  }
  if (improvement < -10) {
    return `Your scores have dipped recently. Let's focus on gentle, restorative movements today.`;
  }
  if (improvement < 0) {
    return `A slight decline recently. Listen to your body and don't push too hard today.`;
  }
  
  // Stable (improvement === 0 or no history)
  if (painScore > 50) return `Your symptoms are persisting. Focus on pain management strategies today.`;
  if (mobilityScore > 50) return `Your baseline is stable, but mobility remains a challenge. Let's focus on flexibility.`;
  
  return `Your body's baseline is stable. Great job maintaining your current health levels.`;
}
