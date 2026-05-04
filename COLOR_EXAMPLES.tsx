/* eslint-disable @typescript-eslint/no-unused-vars */
// MoveWell Color System: Quick Reference for Components
// Based on EightShapes design principles

import { semanticColors } from '@/config/colors';

/**
 * BRAND COLOR EXAMPLES
 */

// ✓ Primary Action Button
function PrimaryButton() {
  return (
    <button className="bg-emerald-50 hover:bg-emerald-60 active:bg-emerald-70 text-white rounded-lg px-6 py-3 font-semibold">
      Start Assessment
    </button>
  );
}

// ✓ Secondary Action Button (Interactive Blue)
function SecondaryButton() {
  return (
    <button className="bg-blue-50 hover:bg-blue-60 active:bg-blue-70 text-white rounded-lg px-6 py-3 font-semibold">
      Learn More
    </button>
  );
}

// ✓ Text Link
function Link() {
  return (
    <a href="#" className="text-blue-50 hover:text-blue-60 underline">
      View full results
    </a>
  );
}

/**
 * FEEDBACK COLORS
 */

// ✓ Success Message
function SuccessAlert() {
  return (
    <div className="bg-success-05 border border-success-20 rounded-lg p-4">
      <p className="text-success-80 font-semibold">Assessment completed!</p>
      <p className="text-success-80 text-sm">Your results are ready to review.</p>
    </div>
  );
}

// ✓ Error Message
function ErrorAlert() {
  return (
    <div className="bg-error-05 border border-error-20 rounded-lg p-4">
      <p className="text-error-80 font-semibold">Something went wrong</p>
      <p className="text-error-80 text-sm">Please try again or contact support.</p>
    </div>
  );
}

// ✓ Warning Message
function WarningAlert() {
  return (
    <div className="bg-warning-05 border border-warning-20 rounded-lg p-4">
      <p className="text-warning-80 font-semibold">Heads up</p>
      <p className="text-warning-80 text-sm">This assessment will take about 2 minutes.</p>
    </div>
  );
}

// ✓ Info Message
function InfoAlert() {
  return (
    <div className="bg-info-05 border border-info-20 rounded-lg p-4">
      <p className="text-info-80 font-semibold">Did you know?</p>
      <p className="text-info-80 text-sm">Regular movement assessments help track progress.</p>
    </div>
  );
}

/**
 * TYPOGRAPHY WITH ACCESSIBILITY
 */

// ✓ Primary Text (Dark on light)
function PrimaryText() {
  return <p className="text-gray-90 text-base">Main content goes here. Uses highest contrast.</p>;
}

// ✓ Secondary Text (Medium on light)
function SecondaryText() {
  return <p className="text-gray-70 text-sm">Supporting information. Good contrast.</p>;
}

// ✓ Muted Text (Light gray on light)
function MutedText() {
  return <p className="text-gray-30 text-xs">Metadata or disabled state text.</p>;
}

// ✓ Light on Dark (Reverse treatment)
function DarkModeText() {
  return (
    <div className="bg-gray-90 p-6 rounded-lg dark:bg-gray-95">
      <p className="text-gray-02">This is light text on dark background.</p>
      <p className="text-gray-20">Supporting text with reduced brightness.</p>
    </div>
  );
}

/**
 * DISABLED STATES
 */

// ✓ Disabled Button
function DisabledButton() {
  return (
    <button disabled className="bg-gray-20 text-gray-50 opacity-50 cursor-not-allowed rounded-lg px-6 py-3">
      Disabled Action
    </button>
  );
}

// ✓ Disabled Input
function DisabledInput() {
  return (
    <input
      disabled
      type="text"
      placeholder="Read-only field"
      className="bg-gray-10 text-gray-50 border border-gray-20 rounded px-3 py-2 opacity-50"
    />
  );
}

/**
 * DARK MODE
 */

// ✓ Dark Mode Card
function DarkModeCard() {
  return (
    <div className="bg-gray-02 text-gray-90 dark:bg-gray-90 dark:text-gray-02 rounded-lg p-6 border border-gray-20 dark:border-gray-70">
      <h2 className="font-semibold mb-2">Assessment Results</h2>
      <p className="text-gray-70 dark:text-gray-30">Your overall mobility score has improved by 12%.</p>
    </div>
  );
}

/**
 * SEMANTIC USAGE (Advanced)
 * Use these when you need programmatic color access
 */

function ComponentWithSemanticColors() {
  return (
    <div style={{ backgroundColor: semanticColors.bg.primary }}>
      <h1 style={{ color: semanticColors.text.primary }}>
        Welcome to MoveWell
      </h1>
      <p style={{ color: semanticColors.text.secondary }}>
        Track your movement and pain levels
      </p>
      <button
        style={{
          backgroundColor: semanticColors.interactive.primary,
          color: '#fff',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = semanticColors.interactive.hover)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = semanticColors.interactive.primary)}
      >
        Start Assessment
      </button>
    </div>
  );
}

/**
 * COMMON PATTERNS
 */

// ✓ Card with Brand Accent
function AssessmentCard() {
  return (
    <div className="bg-white border-l-4 border-l-emerald-50 rounded-r-lg p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-50 mt-2" />
        <div>
          <h3 className="font-semibold text-gray-90">Pain Assessment</h3>
          <p className="text-gray-70 text-sm">Identify areas of concern</p>
        </div>
      </div>
    </div>
  );
}

// ✓ Progress Indicator with Brand Color
function ProgressStep({ complete }: { complete: boolean }) {
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white transition-colors ${
        complete ? 'bg-emerald-50' : 'bg-gray-20 text-gray-70'
      }`}
    >
      ✓
    </div>
  );
}

// ✓ Navigation with Active State
function Navigation() {
  return (
    <nav className="flex gap-6 border-b border-gray-20">
      <a href="#" className="pb-4 font-semibold text-emerald-50 border-b-2 border-emerald-50">
        Assessment
      </a>
      <a href="#" className="pb-4 text-gray-70 hover:text-gray-90 border-b-2 border-transparent">
        Dashboard
      </a>
      <a href="#" className="pb-4 text-gray-70 hover:text-gray-90 border-b-2 border-transparent">
        Settings
      </a>
    </nav>
  );
}

/**
 * DON'T DO THIS
 */

// ❌ WRONG: Using medium gray (creates wireframey look)
function BadGrayExample() {
  return <div className="bg-gray-50 text-gray-50">❌ Avoid this</div>;
}

// ❌ WRONG: Unpredictable contrast
function BadContrastExample() {
  return (
    <div className="bg-blue-10 text-blue-05">
      ❌ Unreadable - insufficient contrast
    </div>
  );
}

// ❌ WRONG: Using wrong color for interactive
function BadInteractiveExample() {
  return (
    <a href="#" className="text-emerald-50">
      ❌ Links should be blue, not green
    </a>
  );
}

/**
 * TAILWIND CLASSES AVAILABLE
 * Use these color values in your classes:
 *
 * Emerald: emerald-05 through emerald-95
 * Blue:    blue-05 through blue-95
 * Gray:    gray-02, 05, 10, 20, 30, 70, 80, 90, 95
 * Success: success-05, 20, 50, 80
 * Warning: warning-05, 20, 50, 80
 * Error:   error-05, 20, 50, 80
 * Info:    info-05, 20, 50, 80
 *
 * Examples:
 * - bg-emerald-50 (background)
 * - text-blue-50 (text color)
 * - border-gray-20 (border color)
 * - hover:bg-emerald-60 (hover state)
 * - dark:bg-gray-90 (dark mode)
 * - ring-emerald-50 (focus ring)
 */

export {
  PrimaryButton,
  SecondaryButton,
  SuccessAlert,
  ErrorAlert,
  WarningAlert,
  DarkModeCard,
  AssessmentCard,
};
