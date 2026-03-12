import { useNavigate } from "react-router-dom"
import Button from "@components/ui/Button"
import Card from "@components/ui/Card"

function LandingPage() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] text-[#1d1d1f] font-[Inter]">

      {/* NAVBAR */}

      <header className="sticky top-0 bg-white/70 backdrop-blur border-b border-slate-200 z-50">

        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-[#1DB954] flex items-center justify-center font-bold text-white">
              MW
            </div>

            <span className="font-semibold text-lg">
              MoveWell
            </span>

          </div>

          <Button
            size="sm"
            className="bg-[#1DB954] hover:bg-[#17a94d] text-white"
            onClick={() => navigate("/assessment")}
          >
            Start Assessment
          </Button>

        </nav>

      </header>

      {/* HERO */}

      <section className="flex-1 flex items-center justify-center px-6 py-28">

        <div className="max-w-4xl text-center">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">

            Your body already
            <br />

            <span className="text-[#1DB954]">
              tells a story.
            </span>

          </h1>

          <p className="text-xl text-[#6e6e73] max-w-2xl mx-auto mb-10 leading-relaxed">

            Pain, stiffness, limited mobility — your body sends signals
            every day. MoveWell helps you understand those signals
            and track how your movement improves over time.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button
              size="lg"
              className="bg-[#1DB954] hover:bg-[#17a94d] text-white px-8"
              onClick={() => navigate("/assessment")}
            >
              Take Your First Assessment
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="px-8"
            >
              Learn More
            </Button>

          </div>

          <p className="text-sm text-[#86868b] mt-5">
            Takes under 5 minutes · No account required
          </p>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">

        <Card className="text-center p-8 hover:shadow-lg transition">

          <div className="text-3xl mb-4">🧠</div>

          <h3 className="font-semibold text-lg mb-2">
            Understand Your Body
          </h3>

          <p className="text-[#6e6e73] text-sm leading-relaxed">

            Identify patterns in pain and mobility so you can
            understand what your body is telling you.

          </p>

        </Card>

        <Card className="text-center p-8 hover:shadow-lg transition">

          <div className="text-3xl mb-4">📊</div>

          <h3 className="font-semibold text-lg mb-2">
            Clear Insights
          </h3>

          <p className="text-[#6e6e73] text-sm leading-relaxed">

            Turn complex health signals into simple, easy-to-understand
            insights about your movement.

          </p>

        </Card>

        <Card className="text-center p-8 hover:shadow-lg transition">

          <div className="text-3xl mb-4">📈</div>

          <h3 className="font-semibold text-lg mb-2">
            Track Improvement
          </h3>

          <p className="text-[#6e6e73] text-sm leading-relaxed">

            Monitor how your health changes over time with
            intuitive dashboards and progress tracking.

          </p>

        </Card>

      </section>

      {/* TRUST */}

      <section className="max-w-4xl mx-auto px-6 pb-20">

        <Card className="text-center bg-white p-10">

          <h3 className="font-semibold mb-2">
            Your health data stays private
          </h3>

          <p className="text-[#6e6e73] text-sm leading-relaxed">

            MoveWell is designed to help you understand your
            musculoskeletal health. Your assessment data is never
            sold or shared with third parties.

          </p>

        </Card>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-200 py-10">

        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-[#86868b]">

          © 2026 MoveWell  
          <br />
          Built to help people move better.

        </div>

      </footer>

    </div>
  )
}

export default LandingPage