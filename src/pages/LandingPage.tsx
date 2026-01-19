/**
 * Landing Page - first impression of MoveWell
 * Clear value proposition and call-to-action
 * Mobile-first responsive design with professional UX
 */

import { useNavigate } from 'react-router-dom'
import Button from '@components/ui/Button'
import Card from '@components/ui/Card'

function LandingPage() {
  const navigate = useNavigate()

  const handleStartAssessment = () => {
    navigate('/assessment')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header / Navigation */}
      <header className="backdrop-blur-sm bg-white/80 border-b border-slate-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-lg py-lg flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">MW</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                MoveWell
              </h1>
              <p className="text-xs text-slate-500 font-medium">Health Assessment</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 hidden md:block font-medium">
            Musculoskeletal Health Tracking
          </p>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-lg py-2xl sm:py-0">
        <div className="max-w-4xl mx-auto w-full">
          {/* Main Heading */}
          <div className="text-center mb-2xl animate-fadeInUp">
            <div className="inline-block mb-lg">
              <span className="inline-flex items-center gap-sm px-md py-sm bg-primary-50 border border-primary-200 rounded-full text-sm font-semibold text-primary-700">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                Welcome to Better Movement
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-md leading-tight">
              Understand Your{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Musculoskeletal Health
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-2xl max-w-2xl mx-auto leading-relaxed font-medium">
              Take a personalized 5-minute assessment to understand your pain and mobility. 
              Get instant insights and track your progress with our intuitive dashboard.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-md justify-center mb-xl">
              <Button
                size="lg"
                onClick={handleStartAssessment}
                className="sm:px-2xl text-base"
              >
                <span className="mr-sm">→</span>
                Start Free Assessment
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="sm:px-2xl text-base"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>

            <p className="text-sm text-slate-500 font-medium">
              ✓ No account needed • ✓ 5 minutes • ✓ Instant results
            </p>
          </div>

          {/* Key Features */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-2xl">
            {/* Feature 1 */}
            <Card className="group hover:shadow-xl hover:border-primary-200 bg-white/60 backdrop-blur">
              <div className="flex justify-center mb-md">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">⏱️</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 mb-sm text-center text-lg">
                Quick Assessment
              </h3>
              <p className="text-sm text-slate-600 text-center leading-relaxed">
                Complete a comprehensive evaluation in just 5 minutes with our intuitive questionnaire.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="group hover:shadow-xl hover:border-primary-200 bg-white/60 backdrop-blur">
              <div className="flex justify-center mb-md">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 mb-sm text-center text-lg">
                Smart Analysis
              </h3>
              <p className="text-sm text-slate-600 text-center leading-relaxed">
                Receive personalized insights and clear, easy-to-understand health recommendations.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="group hover:shadow-xl hover:border-primary-200 bg-white/60 backdrop-blur">
              <div className="flex justify-center mb-md">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 mb-sm text-center text-lg">
                Track Progress
              </h3>
              <p className="text-sm text-slate-600 text-center leading-relaxed">
                Monitor improvements over time with visual progress charts and detailed analytics.
              </p>
            </Card>
          </div>

          {/* Trust Section */}
          <Card className="bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200 mb-2xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary-700 mb-md">
                🔒 Your health data is secure and private
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                All assessments are encrypted and never shared with third parties. MoveWell is designed 
                for educational purposes and complements, not replaces, professional medical advice.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur border-t border-slate-100 py-lg mt-auto">
        <div className="max-w-6xl mx-auto px-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
            <div>
              <h4 className="font-semibold text-slate-900 mb-sm text-sm">About</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                MoveWell helps you understand and track your musculoskeletal health.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-sm text-sm">Privacy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your data is encrypted and secure. We never sell or share your information.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-sm text-sm">Disclaimer</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Not a medical diagnosis. Always consult healthcare professionals.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-lg">
            <p className="text-center text-xs text-slate-500">
              © 2026 MoveWell. Designed for your health. Built with care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
