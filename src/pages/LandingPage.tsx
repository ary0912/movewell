/**
 * MoveWell Landing Page
 * Professional SaaS-style landing page with strong visual hierarchy
 */

import { useNavigate } from "react-router-dom"
import Button from "@components/ui/Button"
import Card from "@components/ui/Card"

function LandingPage() {
  const navigate = useNavigate()

  const startAssessment = () => {
    navigate("/assessment")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">

      {/* Navigation */}

      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-md">
              <span className="text-white font-bold">MW</span>
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                MoveWell
              </h1>

              <p className="text-xs text-slate-500">
                Musculoskeletal Health
              </p>
            </div>
          </div>

          <Button size="sm" onClick={startAssessment}>
            Start Assessment
          </Button>

        </nav>
      </header>

      {/* Hero Section */}

      <section className="flex-1 flex items-center justify-center px-6 py-20">

        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 px-4 py-1 rounded-full text-sm font-medium text-primary-700 mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Musculoskeletal Health Tracking
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Understand Your
            <span className="block text-primary-600">
              Movement & Health
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A simple 5-minute assessment that helps you understand pain,
            mobility, and movement patterns — with a dashboard that tracks
            your improvement over time.
          </p>

          {/* CTA */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">

            <Button size="lg" onClick={startAssessment}>
              Start Free Assessment
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </Button>

          </div>

          <p className="text-sm text-slate-500">
            No account required • Takes 5 minutes • Instant insights
          </p>

        </div>

      </section>

      {/* Features */}

      <section
        id="features"
        className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6"
      >

        <Card className="text-center hover:shadow-lg transition-shadow">

          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-50 flex items-center justify-center text-xl">
            ⏱️
          </div>

          <h3 className="font-semibold text-slate-900 mb-2">
            Quick Assessment
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Complete a guided questionnaire in under five minutes and get
            immediate insights into your musculoskeletal health.
          </p>

        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">

          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-50 flex items-center justify-center text-xl">
            📊
          </div>

          <h3 className="font-semibold text-slate-900 mb-2">
            Smart Insights
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Receive personalised recommendations and easy-to-understand
            insights based on your assessment results.
          </p>

        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">

          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-50 flex items-center justify-center text-xl">
            📈
          </div>

          <h3 className="font-semibold text-slate-900 mb-2">
            Track Progress
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Visualise improvements over time through interactive dashboards
            and progress charts.
          </p>

        </Card>

      </section>

      {/* Trust Section */}

      <section className="max-w-5xl mx-auto px-6 pb-20">

        <Card className="bg-primary-50 border-primary-200 text-center">

          <h3 className="font-semibold text-primary-700 mb-2">
            Your data stays private
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Assessments are securely processed and never shared with
            third parties. MoveWell is designed to support awareness
            of musculoskeletal health and does not replace professional
            medical advice.
          </p>

        </Card>

      </section>

      {/* Footer */}

      <footer className="bg-white border-t border-slate-200 py-10">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-sm">

          <div>
            <h4 className="font-semibold mb-2 text-slate-900">
              About
            </h4>
            <p className="text-slate-600">
              MoveWell helps people understand and track their
              musculoskeletal health through simple digital
              assessments.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-slate-900">
              Privacy
            </h4>
            <p className="text-slate-600">
              Your information remains encrypted and private.
              We never sell or share your data.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-slate-900">
              Disclaimer
            </h4>
            <p className="text-slate-600">
              MoveWell provides informational insights and does not
              replace professional medical consultation.
            </p>
          </div>

        </div>

        <div className="text-center text-xs text-slate-500 mt-8">
          © 2026 MoveWell — Built with care for better movement.
        </div>

      </footer>

    </div>
  )
}

export default LandingPage