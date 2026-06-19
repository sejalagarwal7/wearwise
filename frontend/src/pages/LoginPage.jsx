import { useState } from "react";
import { Shirt, Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";
import { P_GRAD } from "../constants/data";
import PBtn from "../components/common/PBtn";

export default function LoginPage({ onNavigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const focus = (e) => { e.target.style.borderColor = "#7C5CFC"; e.target.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.1)"; };
  const blur = (e) => { e.target.style.borderColor = "rgba(124,92,252,0.2)"; e.target.style.boxShadow = "none"; };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=1200&fit=crop&auto=format" alt="Fashion" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(124,92,252,0.6), rgba(167,139,250,0.3))" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}>
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>WearWiseAI</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Dress for every moment</h2>
          <p className="text-white/70 text-lg">Let AI be your personal stylist, every single day.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ background: "#FAFAFC" }}>
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: P_GRAD }}><Shirt className="w-5 h-5 text-white" /></div>
            <span className="font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>WearWise<span style={{ color: "#7C5CFC" }}>AI</span></span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>Welcome back</h1>
          <p className="text-gray-500 mb-8">Sign in to your style dashboard</p>

          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="email" placeholder="sophia@example.com" onFocus={focus} onBlur={blur}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all"
                  style={{ borderColor: "rgba(124,92,252,0.2)", background: "#F9F8FF" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <button type="button" className="text-xs font-semibold hover:underline" style={{ color: "#7C5CFC" }}>Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showPw ? "text" : "password"} placeholder="••••••••" onFocus={focus} onBlur={blur}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-2xl border text-sm outline-none transition-all"
                  style={{ borderColor: "rgba(124,92,252,0.2)", background: "#F9F8FF" }} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <PBtn type="submit" onClick={handleSignIn} disabled={loading} className="w-full mt-6 justify-center block">
              {loading ? "Signing In..." : "Sign In"}
            </PBtn>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {"Don't have an account? "}
            <button onClick={() => onNavigate("register")} className="font-semibold hover:underline" style={{ color: "#7C5CFC" }}>Create account</button>
          </p>
        </div>
      </div>
    </div>
  );
}
