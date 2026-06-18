import { useState } from "react";
import { Camera, Award, Edit3, LogOut, X, Plus } from "lucide-react";
import { P_GRAD, P_SOFT } from "../constants/data";
import PBtn from "../components/common/PBtn";
import TagBadge from "../components/common/TagBadge";

export default function ProfilePage({ onNavigate }) {
  const [notifs, setNotifs] = useState({ outfit: true, trends: false, shopping: true });
  const iStyle = { borderColor: "rgba(124,92,252,0.15)", background: "#F9F8FF" };

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          {/* Profile card */}
          <div className="bg-white rounded-3xl border p-6 shadow-sm text-center" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
            <div className="relative inline-block mb-4">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format" alt="Profile" className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-100" />
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ background: P_GRAD }}>
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <h2 className="font-bold text-gray-900 text-xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sophia Chen</h2>
            <div className="text-sm text-gray-500 mb-4">sophia@example.com</div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: P_SOFT, color: "#7C5CFC" }}>
              <Award className="w-4 h-4" /> Pro Member
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6 border-t pt-6" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
              {[{ val: "47", label: "Clothes" }, { val: "23", label: "Outfits" }, { val: "94", label: "Score" }].map(({ val, label }) => (
                <div key={label}>
                  <div className="font-black text-xl" style={{ color: "#7C5CFC", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{val}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan card */}
          <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: P_GRAD }}>
            <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 20%, white, transparent)" }} />
            <div className="relative">
              <div className="text-white/70 text-xs font-semibold mb-1 uppercase tracking-wide">Current Plan</div>
              <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pro</div>
              <div className="text-white/70 text-sm mb-4">$19/month · Renews Jan 15</div>
              <button className="text-sm font-semibold px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors">Manage Plan</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* Preferences */}
          <div className="bg-white rounded-3xl border p-6 shadow-sm" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
            <h3 className="font-bold text-gray-900 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Fashion Preferences</h3>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-3">Style Tags</label>
                <div className="flex flex-wrap gap-2">
                  {["Minimalist", "Business", "Casual", "Feminine", "Classic", "Trendy"].map((s) => <TagBadge key={s} label={s} />)}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-3">Favorite Colors</label>
                <div className="flex gap-3">
                  {["#111827", "#1D4ED8", "#7C5CFC", "#F59E0B", "#FFFFFF", "#6B7280"].map((c) => (
                    <button key={c} className="w-8 h-8 rounded-full border-4 border-white shadow-md ring-2 ring-purple-100 hover:scale-110 transition-transform" style={{ background: c }} />
                  ))}
                  <button className="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center hover:border-purple-400 transition-colors" style={{ borderColor: "rgba(124,92,252,0.3)" }}>
                    <Plus className="w-3.5 h-3.5" style={{ color: "#7C5CFC" }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account settings */}
          <div className="bg-white rounded-3xl border p-6 shadow-sm" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
            <h3 className="font-bold text-gray-900 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Account Settings</h3>
            <div className="space-y-4">
              {[
                { label: "Full Name", value: "Sophia Chen" },
                { label: "Email Address", value: "sophia@example.com" },
                { label: "Username", value: "@sophiastyles" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</label>
                  <div className="flex items-center gap-2">
                    <input defaultValue={value} className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none transition-all" style={iStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#7C5CFC"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(124,92,252,0.15)"; }} />
                    <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600"><Edit3 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              <PBtn size="sm">Save Changes</PBtn>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-3xl border p-6 shadow-sm" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
            <h3 className="font-bold text-gray-900 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { key: "outfit", label: "Daily Outfit Suggestions", desc: "Get outfit ideas every morning" },
                { key: "trends", label: "Trend Alerts", desc: "New fashion trends matching your style" },
                { key: "shopping", label: "Shopping Deals", desc: "Sales on items in your wishlist" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{label}</div>
                    <div className="text-xs text-gray-400">{desc}</div>
                  </div>
                  <button onClick={() => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className="w-12 h-6 rounded-full relative transition-all flex-shrink-0" style={{ background: notifs[key] ? "#7C5CFC" : "#E5E7EB" }}>
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm" style={{ left: notifs[key] ? "calc(100% - 22px)" : "2px" }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-3xl border p-6 shadow-sm" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
            <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Account Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onNavigate("landing")} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
                <X className="w-4 h-4" /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
