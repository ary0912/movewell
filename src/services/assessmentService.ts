/**
 * Mock assessment service - simulates backend API calls
 * In a real app, this would make HTTP requests to a backend server
 */

import type { AssessmentFormData, AssessmentResult, HealthData, ProgressEntry } from '../types';
import { createAssessmentResult } from '@utils/scoring';

// Simulated database
const assessments: Map<string, AssessmentResult[]> = new Map();
const users: Map<string, HealthData> = new Map();

/**
 * Mock delay to simulate network latency
 */
function delay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Initialize user data with sample history
 */
function initializeUserData(userId: string): HealthData {
  const today = new Date();
  const sampleHistory: ProgressEntry[] = [];

  // Generate mock 30-day history
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    sampleHistory.push({
      id: `entry-${i}`,
      date: date.toISOString().split('T')[0],
      overallScore: 65 - i * 0.5 + Math.random() * 10, // Slight improvement trend
      painScore: 70 - i * 0.4 + Math.random() * 8,
      mobilityScore: 60 - i * 0.6 + Math.random() * 12,
      impactScore: 55 - i * 0.3 + Math.random() * 7,
      recommendations: ["Deep Breathing", "Neck Rotations", "Lower Back Stretch"],
    });
  }

  return {
    userId,
    currentAssessment: null,
    history: sampleHistory,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Submit assessment form and get results
 */
export async function submitAssessment(
  formData: AssessmentFormData,
  userId: string = 'user-default'
): Promise<AssessmentResult> {
  await delay(800); // Simulate processing time

  // Create assessment result
  const result = createAssessmentResult(formData, userId);

  // Store assessment
  if (!assessments.has(userId)) {
    assessments.set(userId, []);
  }
  assessments.get(userId)!.push(result);

  // Update user data
  if (!users.has(userId)) {
    users.set(userId, initializeUserData(userId));
  }

  const userData = users.get(userId)!;
  userData.currentAssessment = result;
  userData.lastUpdated = new Date().toISOString();

  // Add to history
  userData.history.push({
    id: result.id,
    date: new Date(result.createdAt).toISOString().split('T')[0],
    overallScore: result.overallScore,
    painScore: result.painScore,
    mobilityScore: result.mobilityScore,
    impactScore: result.impactScore,
  });

  return result;
}

/**
 * Fetch user's health data
 */
export async function fetchHealthData(userId: string = 'user-default'): Promise<HealthData> {
  await delay(600);

  if (!users.has(userId)) {
    users.set(userId, initializeUserData(userId));
  }

  return users.get(userId)!;
}

/**
 * Fetch assessment history
 */
export async function fetchAssessmentHistory(
  userId: string = 'user-default',
  limit: number = 10
): Promise<AssessmentResult[]> {
  await delay(500);

  const userAssessments = assessments.get(userId) || [];
  return userAssessments.slice(-limit).reverse();
}

/**
 * Fetch single assessment
 */
export async function fetchAssessment(
  assessmentId: string,
  userId: string = 'user-default'
): Promise<AssessmentResult | null> {
  await delay(400);

  const userAssessments = assessments.get(userId) || [];
  return userAssessments.find((a) => a.id === assessmentId) || null;
}

/**
 * Get progress data for time range
 */
export async function fetchProgressData(
  userId: string = 'user-default',
  days: number = 30
): Promise<ProgressEntry[]> {
  await delay(500);

  const userData = users.get(userId) || initializeUserData(userId);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return userData.history.filter((entry: ProgressEntry) => {
    return new Date(entry.date) >= cutoffDate;
  });
}

/**
 * Clear user data (for testing)
 */
export function clearUserData(userId: string): void {
  assessments.delete(userId);
  users.delete(userId);
}

/**
 * Reset all data (for testing)
 */
export function resetAllData(): void {
  assessments.clear();
  users.clear();
}
