import { useState, useEffect } from "react";
import { Camera, Award, Edit3, LogOut, X, Plus } from "lucide-react";
import { P_GRAD, P_SOFT } from "../constants/data";
import PBtn from "../components/common/PBtn";
import { api } from "../api";

export default function ProfilePage({ onNavigate, user, onUpdateProfile, onLogout }) {
  const [notifs, setNotifs] = useState({ outfit: true, trends: false, shopping: true });
  const [stats, setStats] = useState({ totalClothes: 0, savedOutfits: 0 });
  
  // Settings States
  const [name, setName] = useState(user?.name || "");
  const [topSize, setTopSize] = useState(user?.preferences?.topSize || "M");
  const [bottomSize, setBottomSize] = useState(user?.preferences?.bottomSize || "30");
  const [shoeSize, setShoeSize] = useState(user?.preferences?.shoeSize || "7");
  const [stylePreference, setStylePreference] = useState(user?.preferences?.stylePreference || "Casual");
  
  const [saving, setSaving] = useState(false);
  const iStyle = { borderColor: "rgba(124,92,252,0.15)", background: "#F9F8FF" };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await api.getStats();
        setStats(statsData);
      } catch (err) {
        console.error("Failed to fetch profile stats:", err);
      }
    };
    fetchStats();
  }, []);

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await api.updateProfile({
        name,
        preferences: {
          topSize,
          bottomSize,
          shoeSize,
          stylePreference
        }
      });
      onUpdateProfile(updated);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

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
            <h2 className="font-bold text-gray-900 text-xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{user?.name || "Sophia Chen"}</h2>
            <div className="text-sm text-gray-500 mb-4">{user?.email || "sophia@example.com"}</div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: P_SOFT, color: "#7C5CFC" }}>
              <Award className="w-4 h-4" /> Free Member
            </div>
            <div className="grid grid-cols-3 gap-3 mt-6 border-t pt-6" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
              {[{ val: stats.totalClothes.toString(), label: "Clothes" }, { val: stats.savedOutfits.toString(), label: "Outfits" }, { val: "94", label: "Score" }].map(({ val, label }) => (
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
              <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Free</div>
              <div className="text-white/70 text-sm mb-4">Enjoy basic AI outfit styling</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* Preferences */}
          <div className="bg-white rounded-3xl border p-6 shadow-sm" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
            <h3 className="font-bold text-gray-900 mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Fashion Preferences</h3>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-3">Style Signature</label>
                <div className="flex flex-wrap gap-2">
                  {["Minimalist", "Casual", "Business", "Bohemian", "Streetwear", "Classic", "Trendy", "Athleisure"].map((s) => (
                    <button key={s} onClick={() => setStylePreference(s)} className="px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all"
                      style={stylePreference === s ? { background: "#7C5CFC", color: "white", borderColor: "#7C5CFC" } : { background: "white", color: "#6B7280", borderColor: "rgba(124,92,252,0.2)" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Account settings */}
          <form onSubmit={handleSavePreferences} className="bg-white rounded-3xl border p-6 shadow-sm space-y-4" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
            <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Account & Size Settings</h3>
            
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all" style={iStyle} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Top Size</label>
                <input value={topSize} onChange={(e) => setTopSize(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all" style={iStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Bottom Size</label>
                <input value={bottomSize} onChange={(e) => setBottomSize(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all" style={iStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Shoe Size</label>
                <input value={shoeSize} onChange={(e) => setShoeSize(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all" style={iStyle} />
              </div>
            </div>

            <PBtn type="submit" disabled={saving} size="sm">
              {saving ? "Saving Changes..." : "Save Changes"}
            </PBtn>
          </form>

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
              <button onClick={onLogout} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
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
