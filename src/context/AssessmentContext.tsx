'use client'

/* eslint-disable react-refresh/only-export-components */

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
  BodyArea,
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

  /* STEP */

  currentStep: number

  setCurrentStep: (
    step: number
  ) => void

  /* FORM */

  formData: AssessmentFormValues

  painAreas: BodyArea[]

  setPainAreas: (
    areas: BodyArea[]
  ) => void

  /* RESULT */

  result: AssessmentResult | null

  setResult: (
    result: AssessmentResult | null
  ) => void

  /* UI */

  isLoading: boolean

  setIsLoading: (
    loading: boolean
  ) => void

  error: string | null

  setError: (
    error: string | null
  ) => void

  /* SAVE */

  lastSavedAt: string | null

  saveStatus: SaveStatus

  /* ACTIONS */

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
   STORAGE
========================================================= */

const STORAGE_KEY =
  'movewell-assessment-draft'

/* =========================================================
   INITIAL VALUES
========================================================= */

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
     BODY AREA STATE
  ===================================================== */

  const [
    painAreas,
    setPainAreas,
  ] = useState<BodyArea[]>([])

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
    setValue,
  } = methods

  /* =====================================================
     WATCH FORM
  ===================================================== */

  const watchedForm =
    useWatch({
      control,
    })

  /* =====================================================
     SAFE FORM DATA
  ===================================================== */

  const formData: AssessmentFormValues =
  {
    painAreas:
      (watchedForm?.painAreas ||
        []) as BodyArea[],

    painIntensity:
      Object.fromEntries(
        Object.entries(
          watchedForm?.painIntensity ||
          {}
        ).filter(
          (
            [, value]
          ) =>
            typeof value ===
            'number'
        )
      ) as Record<string, number>,

    mobilityDifficulty:
      (
        watchedForm?.mobilityDifficulty ||
        []
      ).map((item) => ({
        id: item?.id || '',
        question:
          item?.question || '',
        difficulty:
          item?.difficulty || 0,
        area: item?.area || '',
      })),

    dailyImpact:
      (
        watchedForm?.dailyImpact ||
        []
      ).map((item) => ({
        id: item?.id || '',
        category:
          item?.category || 'work',
        impact:
          item?.impact || 0,
        description:
          item?.description || '',
      })),

    notes:
      watchedForm?.notes || '',
  }

  /* =====================================================
     SYNC RHF + CONTEXT
  ===================================================== */

  useEffect(() => {

    setValue(
      'painAreas',
      painAreas
    )

  }, [
    painAreas,
    setValue,
  ])

  /* =====================================================
     LOAD SAVED DATA
  ===================================================== */

  useEffect(() => {

    try {

      const raw =
        localStorage.getItem(
          STORAGE_KEY
        )

      if (!raw) return

      const parsed =
        JSON.parse(raw)

      /* FORM */

      if (parsed?.data) {

        reset(parsed.data)

        if (
          Array.isArray(
            parsed.data.painAreas
          )
        ) {

          setPainAreas(
            parsed.data
              .painAreas as BodyArea[]
          )
        }
      }

      /* STEP */

      if (
        typeof parsed?.step ===
        'number'
      ) {

        setCurrentStep(
          parsed.step
        )
      }

      /* SAVE */

      if (parsed?.savedAt) {

        requestAnimationFrame(() => {

          setLastSavedAt(
            parsed.savedAt
          )

        })
      }

    } catch (err) {

      console.error(
        'Failed to restore assessment draft:',
        err
      )
    }

  }, [
    reset,
  ])

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

            data: {
              ...formData,
              painAreas,
            },

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
    painAreas,
    currentStep,
  ])

  /* =====================================================
     RESET
  ===================================================== */

  const resetAssessment =
    useCallback(() => {

      reset(initialValues)

      setPainAreas([])

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
     CONTEXT VALUE
  ===================================================== */

  const value =
    useMemo<AssessmentContextType>(
      () => ({

        currentStep,
        setCurrentStep,

        formData,

        painAreas,
        setPainAreas,

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
        formData,
        painAreas,
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