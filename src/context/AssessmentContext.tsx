'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

import {
  useForm,
  FormProvider,
  useWatch,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  assessmentSchema,
  type AssessmentFormValues,
} from '../utils/schemas'

import type {
  AssessmentResult,
} from '../types'

/* =========================================================
   TYPES
========================================================= */

type SaveStatus =
  | 'idle'
  | 'saving'
  | 'saved'
  | 'error'

interface AssessmentContextType {
  currentStep: number
  setCurrentStep: (step: number) => void

  result: AssessmentResult | null
  setResult: (
    result: AssessmentResult | null
  ) => void

  isLoading: boolean
  setIsLoading: (
    loading: boolean
  ) => void

  error: string | null
  setError: (
    error: string | null
  ) => void

  lastSavedAt: string | null

  saveStatus: SaveStatus

  resetAssessment: () => void
}

/* =========================================================
   CONTEXT
========================================================= */

const AssessmentContext =
  createContext<
    AssessmentContextType | undefined
  >(undefined)

/* =========================================================
   CONSTANTS
========================================================= */

const STORAGE_KEY =
  'movewell-assessment-draft'

const initialValues: AssessmentFormValues =
{
  painAreas: [],
  painIntensity: {},
  mobilityDifficulty: [],
  dailyImpact: [],
  notes: '',
}

/* =========================================================
   PROVIDER
========================================================= */

export function AssessmentProvider({
  children,
}: {
  children: ReactNode
}) {

  /* =====================================================
     UI STATE
  ===================================================== */

  const [
    currentStep,
    setCurrentStep,
  ] = useState(0)

  const [
    result,
    setResult,
  ] = useState<AssessmentResult | null>(
    null
  )

  const [
    isLoading,
    setIsLoading,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState<string | null>(null)

  const [
    lastSavedAt,
    setLastSavedAt,
  ] = useState<string | null>(null)

  const [
    saveStatus,
    setSaveStatus,
  ] = useState<SaveStatus>('idle')

  /* =====================================================
     FORM
  ===================================================== */

  const methods =
    useForm<AssessmentFormValues>({
      resolver: zodResolver(
        assessmentSchema
      ),
      defaultValues: initialValues,
      mode: 'onChange',
    })

  const {
    reset,
    control,
  } = methods

  /* =====================================================
     WATCH FORM DATA
     (better than watch() for compiler safety)
  ===================================================== */

  const formData = useWatch({
    control,
  })

  /* =====================================================
     LOAD SAVED DRAFT
  ===================================================== */

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(
          STORAGE_KEY
        )

      if (!raw) return

      const parsed = JSON.parse(raw)

      if (parsed?.data) {
        reset(parsed.data)
      }

      if (parsed?.savedAt) {
        setLastSavedAt(
          parsed.savedAt
        )
      }

      if (
        typeof parsed?.step ===
        'number'
      ) {
        setCurrentStep(
          parsed.step
        )
      }
    } catch (err) {
      console.error(
        'Failed to restore draft:',
        err
      )
    }
  }, [reset])

  /* =====================================================
     AUTOSAVE
  ===================================================== */

  useEffect(() => {
    const timeout =
      window.setTimeout(() => {
        try {

          setSaveStatus(
            'saving'
          )

          const payload = {
            data: formData,
            savedAt:
              new Date().toISOString(),
            step: currentStep,
          }

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(payload)
          )

          setLastSavedAt(
            payload.savedAt
          )

          setSaveStatus(
            'saved'
          )

          window.setTimeout(() => {
            setSaveStatus(
              'idle'
            )
          }, 1800)

        } catch (err) {

          console.error(
            'Autosave failed:',
            err
          )

          setSaveStatus(
            'error'
          )
        }
      }, 800)

    return () =>
      window.clearTimeout(timeout)

  }, [
    formData,
    currentStep,
  ])

  /* =====================================================
     RESET
  ===================================================== */

  const resetAssessment =
    useCallback(() => {

      reset(initialValues)

      setCurrentStep(0)

      setResult(null)

      setError(null)

      setLastSavedAt(null)

      setSaveStatus('idle')

      localStorage.removeItem(
        STORAGE_KEY
      )

    }, [reset])

  /* =====================================================
     MEMOIZED CONTEXT
  ===================================================== */

  const value =
    useMemo<AssessmentContextType>(
      () => ({
        currentStep,
        setCurrentStep,

        result,
        setResult,

        isLoading,
        setIsLoading,

        error,
        setError,

        lastSavedAt,

        saveStatus,

        resetAssessment,
      }),
      [
        currentStep,
        result,
        isLoading,
        error,
        lastSavedAt,
        saveStatus,
        resetAssessment,
      ]
    )

  /* =====================================================
     PROVIDER
  ===================================================== */

  return (
    <AssessmentContext.Provider
      value={value}
    >
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </AssessmentContext.Provider>
  )
}

/* =========================================================
   HOOK
========================================================= */

export function useAssessment():
  AssessmentContextType {

  const context =
    useContext(
      AssessmentContext
    )

  if (!context) {
    throw new Error(
      'useAssessment must be used within AssessmentProvider'
    )
  }

  return context
}