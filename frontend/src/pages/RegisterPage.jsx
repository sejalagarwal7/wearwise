import { useState, useRef } from "react";
import { Shirt, Mail, Lock, Eye, EyeOff, Camera, Check } from "lucide-react";
import { P_GRAD } from "../constants/data";
import PBtn from "../components/common/PBtn";
import { api } from "../api";

export default function RegisterPage({ onNavigate, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("Casual");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const focus = (e) => { e.target.style.borderColor = "#7C5CFC"; e.target.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.1)"; };
  const blur = (e) => { e.target.style.borderColor = "rgba(124,92,252,0.2)"; e.target.style.boxShadow = "none"; };
  const iStyle = { borderColor: "rgba(124,92,252,0.2)", background: "#F9F8FF" };

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill out all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleCreateAccount = async () => {
    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // 1. Register user
      await onRegister(name, email, password);

      // 2. Set style preference in user profile
      try {
        await api.updateProfile({
          name,
          preferences: {
            stylePreference: selectedStyle,
            topSize: "M",
            bottomSize: "30",
            shoeSize: "7"
          }
        });
      } catch (prefErr) {
        console.error("Failed to save style preferences:", prefErr);
      }
    } catch (err) {
      setError(err.message || "Registration failed");
      setStep(1); // Go back to step 1 to fix fields if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&h=1200&fit=crop&auto=format" alt="Fashion" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(124,92,252,0.65), rgba(245,158,11,0.3))" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Start your style journey today</h2>
          <p className="text-white/70 mb-6">Upload your wardrobe and get AI-powered outfit recommendations in minutes.</p>
          <div className="flex -space-x-3">
            {["1580489944761-15a19d654956", "1438761681033-6461ffad8d80", "1507003211169-0a1dd7228f2d"].map((id) => (
              <img key={id} src={`https://images.unsplash.com/photo-${id}?w=40&h=40&fit=crop&auto=format`} alt="" className="w-10 h-10 rounded-full border-2 border-white/50 object-cover" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center text-xs text-white font-bold" style={{ background: "rgba(255,255,255,0.2)" }}>+9k</div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ background: "#FAFAFC" }}>
        <div className="w-full max-w-sm">
          <div className="flex gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex-1 h-1.5 rounded-full transition-all" style={{ background: s <= step ? "#7C5CFC" : "#E5E7EB" }} />
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#111827" }}>
            {step === 1 ? "Create account" : "Your style profile"}
          </h1>
          <p className="text-gray-500 mb-8">{step === 1 ? "Begin your AI style journey" : "Help us personalize your experience"}</p>

          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleStep1} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input type="text" placeholder="Sophia Chen" onFocus={focus} onBlur={blur}
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all" style={iStyle} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" placeholder="sophia@example.com" onFocus={focus} onBlur={blur}
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all" style={iStyle} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPw ? "text" : "password"} placeholder="••••••••" onFocus={focus} onBlur={blur}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-2xl border text-sm outline-none transition-all" style={iStyle} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                <input type="password" placeholder="••••••••" onFocus={focus} onBlur={blur}
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all" style={iStyle} />
              </div>
              <PBtn type="submit" className="w-full mt-2 block">Continue</PBtn>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Style Preference</label>
                <div className="flex flex-wrap gap-2">
                  {["Minimalist", "Casual", "Business", "Bohemian", "Streetwear", "Classic", "Trendy", "Athleisure"].map((s) => (
                    <button key={s} onClick={() => setSelectedStyle(s)} className="px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all"
                      style={selectedStyle === s ? { background: "#7C5CFC", color: "white", borderColor: "#7C5CFC" } : { background: "white", color: "#6B7280", borderColor: "rgba(124,92,252,0.2)" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <button onClick={() => setAgreed(!agreed)} className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center border-2 transition-colors"
                  style={{ borderColor: agreed ? "#7C5CFC" : "#D1D5DB", background: agreed ? "#7C5CFC" : "transparent" }}>
                  {agreed && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className="text-sm text-gray-500">
                  I agree to the{" "}
                  <a href="#" className="font-semibold hover:underline" style={{ color: "#7C5CFC" }}>Terms of Service</a>
                  {" and "}
                  <a href="#" className="font-semibold hover:underline" style={{ color: "#7C5CFC" }}>Privacy Policy</a>
                </span>
              </div>
              <PBtn onClick={handleCreateAccount} disabled={loading} className="w-full block">
                {loading ? "Creating Account..." : "Create Account"}
              </PBtn>
              <button onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-400 hover:text-gray-600">Back</button>
            </div>
          )}
          {step === 1 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <button onClick={() => onNavigate("login")} className="font-semibold hover:underline" style={{ color: "#7C5CFC" }}>Sign in</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
