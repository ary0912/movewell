/**
 * Assessment context for managing form state across multi-step wizard
 * Provides centralized state management without Redux
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AssessmentFormData, AssessmentResult, BodyArea, MobilityQuestion, DailyImpactQuestion } from '../types';

interface AssessmentContextType {
  // Form state
  formData: AssessmentFormData;
  currentStep: number;

  // Actions
  setCurrentStep: (step: number) => void;
  setPainAreas: (areas: BodyArea[]) => void;
  setPainIntensity: (area: BodyArea, intensity: number) => void;
  setMobilityDifficulty: (questions: MobilityQuestion[]) => void;
  setDailyImpact: (questions: DailyImpactQuestion[]) => void;
  resetForm: () => void;

  // Result state
  result: AssessmentResult | null;
  setResult: (result: AssessmentResult) => void;

  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Error state
  error: string | null;
  setError: (error: string | null) => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

// Initial form state
const initialFormData: AssessmentFormData = {
  painAreas: [],
  painIntensity: {} as Record<BodyArea, number>,
  mobilityDifficulty: [],
  dailyImpact: [],
  timestamp: new Date().toISOString(),
};

/**
 * Provider component for assessment context
 */
export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<AssessmentFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setPainAreas = useCallback((areas: BodyArea[]) => {
    setFormData((prev: AssessmentFormData) => ({
      ...prev,
      painAreas: areas,
    }));
  }, []);

  const setPainIntensity = useCallback((area: BodyArea, intensity: number) => {
    setFormData((prev: AssessmentFormData) => ({
      ...prev,
      painIntensity: {
        ...prev.painIntensity,
        [area]: intensity,
      },
    }));
  }, []);

  const setMobilityDifficulty = useCallback((questions: MobilityQuestion[]) => {
    setFormData((prev: AssessmentFormData) => ({
      ...prev,
      mobilityDifficulty: questions,
    }));
  }, []);

  const setDailyImpact = useCallback((questions: DailyImpactQuestion[]) => {
    setFormData((prev: AssessmentFormData) => ({
      ...prev,
      dailyImpact: questions,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setResult(null);
    setError(null);
  }, []);

  const value: AssessmentContextType = {
    formData,
    currentStep,
    setCurrentStep,
    setPainAreas,
    setPainIntensity,
    setMobilityDifficulty,
    setDailyImpact,
    resetForm,
    result,
    setResult,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

/**
 * Hook to use assessment context
 * Throws error if used outside provider
 */
export function useAssessment(): AssessmentContextType {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}
