import { useNavigate } from "react-router-dom"
import Button from "@components/ui/Button"
import Card from "@components/ui/Card"

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* Navigation */}

      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold">MW</span>
            </div>

            <span className="font-semibold text-slate-900 text-lg">
              MoveWell
            </span>

          </div>

          <Button size="sm" onClick={() => navigate("/assessment")}>
            Take Assessment
          </Button>

        </nav>
      </header>

      {/* Hero */}

      <section className="flex-1 flex items-center justify-center px-6 py-24">

        <div className="max-w-4xl text-center">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">

            Move Better.
            <br />
            Feel Better.
            <br />

            <span className="text-primary-600">
              Understand Your Body.
            </span>

          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">

            Your body gives you signals every day — stiffness,
            pain, limited mobility.

            MoveWell helps you understand those signals and
            track how your body improves over time.

          </p>

          <Button
            size="lg"
            onClick={() => navigate("/assessment")}
          >
            Take Your First Assessment
          </Button>

          <p className="text-sm text-slate-500 mt-4">
            Takes less than 5 minutes • No account required
          </p>

        </div>

      </section>

      {/* Benefits */}

      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">

        <Card className="text-center">

          <div className="text-3xl mb-4">🧠</div>

          <h3 className="font-semibold text-lg mb-2">
            Understand your pain
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            Identify patterns in discomfort and mobility that you
            may not notice day to day.
          </p>

        </Card>

        <Card className="text-center">

          <div className="text-3xl mb-4">📊</div>

          <h3 className="font-semibold text-lg mb-2">
            See the bigger picture
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            Turn complex health signals into simple insights
            you can actually understand.
          </p>

        </Card>

        <Card className="text-center">

          <div className="text-3xl mb-4">📈</div>

          <h3 className="font-semibold text-lg mb-2">
            Track your improvement
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            Monitor progress over time and see how your body
            responds to movement and recovery.
          </p>

        </Card>

      </section>

      {/* Trust */}

      <section className="max-w-4xl mx-auto px-6 pb-20">

        <Card className="text-center bg-slate-100">

          <h3 className="font-semibold text-slate-900 mb-2">
            Your health data stays private
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">

            MoveWell is designed to help you understand your
            musculoskeletal health. Your assessment results
            are never shared or sold.

          </p>

        </Card>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-200 py-10">

        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-500">

          © 2026 MoveWell  
          <br />
          Built to help people move better.

        </div>

      </footer>

    </div>
  )
}

export default LandingPage