import { Shirt, Sparkles, ShoppingBag, TrendingUp, Camera, Star, ArrowRight, Check, Zap, Award } from "lucide-react";
import { P_GRAD, TESTIMONIALS } from "../constants/data";
import PBtn from "../components/common/PBtn";
import GBtn from "../components/common/GBtn";

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen" style={{ background: "#FAFAFC", fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(250,250,252,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(124,92,252,0.08)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm" style={{ background: P_GRAD }}>
            <Shirt className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
            WearWise<span style={{ color: "#7C5CFC" }}>AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Pricing"].map((item) => (
            <a key={item} href={`#${item}`} className="text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate("login")} className="text-sm font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition-colors" style={{ color: "#7C5CFC" }}>Sign In</button>
          <PBtn onClick={() => onNavigate("register")} size="sm">Get Started Free</PBtn>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#F3F0FF", color: "#7C5CFC" }}>
              <Sparkles className="w-4 h-4" /> Powered by Advanced AI
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
              Your Personal{" "}
              <span style={{ background: P_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Fashion</span>{" "}
              Assistant
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Digitize your wardrobe, get personalized outfit recommendations, and discover pieces that perfectly complement your style.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <PBtn onClick={() => onNavigate("register")} size="lg">
                <span className="flex items-center gap-2">Get Started Free <ArrowRight className="w-4 h-4" /></span>
              </PBtn>
              <GBtn onClick={() => onNavigate("upload")}>
                <span className="flex items-center gap-2"><Camera className="w-4 h-4" /> Upload Clothes</span>
              </GBtn>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {["1580489944761-15a19d654956", "1438761681033-6461ffad8d80", "1507003211169-0a1dd7228f2d"].map((id) => (
                  <img key={id} src={`https://images.unsplash.com/photo-${id}?w=40&h=40&fit=crop&auto=format`} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">12,000+</span> style lovers</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 rounded-[40px]" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(124,92,252,0.1) 0%, transparent 70%)" }} />
            <div className="relative w-64 md:w-72 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white z-10 bg-purple-50" style={{ aspectRatio: "9/19" }}>
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=800&fit=crop&auto=format" alt="Fashion" className="w-full h-full object-cover" />
              <div className="absolute bottom-6 left-4 right-4 rounded-2xl p-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: P_GRAD }}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">AI Recommendation</div>
                  <div className="text-xs font-bold text-gray-900">Office Look — 97% Match</div>
                </div>
              </div>
            </div>
            {/* Floating cards */}
            <div className="absolute -left-6 top-8 w-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 rotate-[-6deg]">
              <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=160&fit=crop&auto=format" alt="" className="w-full h-28 object-cover" />
              <div className="bg-white p-2"><div className="text-xs font-semibold">Oxford Shirt</div><div className="text-xs text-purple-500">Formal · Office</div></div>
            </div>
            <div className="absolute -right-4 top-20 w-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 rotate-[5deg]">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=180&h=160&fit=crop&auto=format" alt="" className="w-full h-24 object-cover" />
              <div className="bg-white p-2"><div className="text-xs font-semibold">Sneakers</div><div className="text-xs text-amber-500">Casual · Sport</div></div>
            </div>
            <div className="absolute -right-8 bottom-20 w-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 rotate-[-4deg]">
              <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=160&fit=crop&auto=format" alt="" className="w-full h-28 object-cover" />
              <div className="bg-white p-2"><div className="text-xs font-semibold">Floral Dress</div><div className="text-xs text-pink-500">Party · Summer</div></div>
            </div>
            <div className="absolute left-4 bottom-14 z-30 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg bg-white">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold">Style Score <span style={{ color: "#7C5CFC" }}>94/100</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="Features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#F3F0FF", color: "#7C5CFC" }}>
            <Zap className="w-4 h-4" /> Features
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Everything your wardrobe needs</h2>
          <p className="text-gray-500 max-w-md mx-auto">From AI-powered organization to personalized style advice — all in one place.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Shirt, title: "Smart Wardrobe", desc: "Upload and organize all your clothes with AI auto-tagging, color detection, and categorization.", color: "#7C5CFC" },
            { icon: Sparkles, title: "AI Outfits", desc: "Get daily outfit recommendations tailored to the occasion, weather, and your personal style.", color: "#A78BFA" },
            { icon: ShoppingBag, title: "Shop Assistant", desc: "Check compatibility before buying. See how any piece fits with your existing wardrobe.", color: "#F59E0B" },
            { icon: TrendingUp, title: "Style Analytics", desc: "Track your style evolution, most-worn pieces, and cost-per-wear insights over time.", color: "#10B981" },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-3xl p-7 shadow-sm border hover:shadow-md transition-shadow" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: `${color}18` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="How It Works" className="py-24 px-6 md:px-12" style={{ background: "linear-gradient(135deg, #F3F0FF 0%, #EDE9FE 50%, #FEF3C7 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>How It Works</h2>
            <p className="text-gray-600 max-w-md mx-auto">Get dressed smarter in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Upload Your Clothes", desc: "Photograph your wardrobe. Our AI instantly categorizes, tags, and organizes everything automatically.", icon: Camera },
              { step: "02", title: "Get AI Recommendations", desc: "Tell us the occasion and receive curated outfit combinations with confidence scores.", icon: Sparkles },
              { step: "03", title: "Dress with Confidence", desc: "Save favorites, share looks, and track what you wear. Discover gaps with smart suggestions.", icon: Award },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden">
                <div className="text-7xl font-black absolute top-4 right-6 leading-none select-none" style={{ color: "rgba(124,92,252,0.06)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step}</div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: P_GRAD }}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Loved by style lovers</h2>
          <p className="text-gray-500">Join thousands who dress smarter every day.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-3xl p-8 shadow-sm border hover:shadow-md transition-shadow" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={`https://images.unsplash.com/photo-${t.avatar}?w=48&h=48&fit=crop&auto=format`} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="Pricing" className="py-24 px-6 md:px-12" style={{ background: "#FAFAFC" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Simple, transparent pricing</h2>
            <p className="text-gray-500">Start free, upgrade when you need more.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {[
              { tier: "Free", price: "$0", features: ["25 clothing items", "5 outfit generations/day", "Basic AI tags", "Mobile app"], cta: "Get Started", hi: false },
              { tier: "Pro", price: "$19", features: ["Unlimited items", "Unlimited outfit AI", "Shopping assistant", "Style analytics", "Priority support"], cta: "Start Free Trial", hi: true },
              { tier: "Elite", price: "$49", features: ["Everything in Pro", "Personal stylist AI", "Capsule wardrobe builder", "Brand partnerships", "VIP support"], cta: "Contact Us", hi: false },
            ].map(({ tier, price, features, cta, hi }) => (
              <div key={tier} className={`rounded-3xl p-8 border relative overflow-hidden ${hi ? "shadow-2xl scale-[1.04]" : "shadow-sm bg-white"}`}
                style={hi ? { background: P_GRAD, borderColor: "transparent" } : { borderColor: "rgba(124,92,252,0.1)" }}>
                {hi && <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">Most Popular</div>}
                <div className={`text-sm font-semibold mb-2 ${hi ? "text-white/80" : "text-purple-600"}`}>{tier}</div>
                <div className={`text-5xl font-black mb-1 ${hi ? "text-white" : "text-gray-900"}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {price}<span className={`text-lg font-normal ${hi ? "text-white/60" : "text-gray-400"}`}>/mo</span>
                </div>
                <div className={`border-t my-6 ${hi ? "border-white/20" : "border-gray-100"}`} />
                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className={`flex items-center gap-3 text-sm ${hi ? "text-white/90" : "text-gray-600"}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${hi ? "bg-white/20" : "bg-purple-50"}`}>
                        <Check className={`w-3 h-3 ${hi ? "text-white" : "text-purple-600"}`} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => onNavigate("register")}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02] ${hi ? "bg-white text-purple-700" : "border-2 border-purple-200 text-purple-700 hover:bg-purple-50"}`}>
                  {cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden" style={{ background: P_GRAD }}>
          <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 20% 50%, white, transparent 60%)" }} />
          <h2 className="text-4xl font-bold text-white mb-4 relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Ready to dress smarter?</h2>
          <p className="text-white/80 mb-8 relative">Join 12,000+ fashion lovers who have transformed their style with AI.</p>
          <button onClick={() => onNavigate("register")} className="bg-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-xl hover:scale-[1.02] text-sm relative" style={{ color: "#7C5CFC" }}>
            Start for Free — No Credit Card Required
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: P_GRAD }}>
              <Shirt className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>WearWise<span style={{ color: "#7C5CFC" }}>AI</span></span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            {["Privacy", "Terms", "Blog", "Contact", "Twitter", "Instagram"].map((l) => (
              <a key={l} href="#" className="hover:text-purple-600 transition-colors">{l}</a>
            ))}
          </div>
          <div className="text-sm text-gray-400">&copy; 2026 WearWise AI</div>
        </div>
      </footer>
    </div>
  );
}
