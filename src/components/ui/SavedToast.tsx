import { useEffect, useState } from 'react'
import { useAssessment } from '@/context/AssessmentContext'

export default function SavedToast() {
  const { lastSavedAt } = useAssessment()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (lastSavedAt) {
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 1800)
      return () => clearTimeout(t)
    }
  }, [lastSavedAt])

  if (!visible || !lastSavedAt) return null

  return (
    <div aria-live="polite" className="fixed bottom-6 right-6 z-[999] bg-foreground text-background text-sm px-4 py-2 rounded-md shadow-md">
      Saved
    </div>
  )
}
