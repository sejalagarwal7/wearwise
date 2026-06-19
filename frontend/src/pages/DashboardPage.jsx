import { useState, useEffect } from "react";
import { Upload, Sparkles, Bookmark, Heart, Shirt, TrendingUp, ChevronRight, ArrowRight, ShoppingBag } from "lucide-react";
import { P_GRAD, P_SOFT } from "../constants/data";
import StatCard from "../components/common/StatCard";
import { api } from "../api";

export default function DashboardPage({ onNavigate }) {
  const [stats, setStats] = useState({ totalClothes: 0, savedOutfits: 0, favoriteItems: 0 });
  const [recentItems, setRecentItems] = useState([]);
  const [profile, setProfile] = useState({ name: "User" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, wardrobeData, profileData] = await Promise.all([
          api.getStats(),
          api.getWardrobe(),
          api.getProfile()
        ]);
        setStats(statsData);
        setRecentItems(wardrobeData.slice(-4).reverse());
        setProfile(profileData);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const activity = [
    { action: "Uploaded", item: recentItems[0]?.name || "New Item", time: "Recently", icon: Upload, color: "#7C5CFC" },
    { action: "Generated outfit", item: "AI Outfit Recommend", time: "Recently", icon: Sparkles, color: "#A78BFA" },
    { action: "Saved outfit", item: "My Outfit", time: "Recently", icon: Bookmark, color: "#F59E0B" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
        <span className="text-gray-400 font-semibold text-sm">Loading dashboard stats...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome banner */}
      <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: P_GRAD }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 50%, white, transparent 60%)" }} />
        <div className="relative">
          <div className="text-white/70 text-sm mb-2 font-medium">Good morning,</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{profile.name} 👋</h2>
          <p className="text-white/70 mb-6 max-w-md text-sm">You have {stats.totalClothes} wardrobe items and {stats.savedOutfits} saved outfits. Keep styling!</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate("outfits")} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold bg-white hover:shadow-md transition-all" style={{ color: "#7C5CFC" }}>
              <Sparkles className="w-4 h-4" /> Get Outfit Ideas
            </button>
            <button onClick={() => onNavigate("upload")} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-all">
              <Upload className="w-4 h-4" /> Upload Clothes
            </button>
          </div>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
          <Shirt className="w-40 h-40 text-white" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Shirt} label="Total Clothes" value={stats.totalClothes.toString()} change="From your wardrobe" />
        <StatCard icon={Sparkles} label="Outfits Saved" value={stats.savedOutfits.toString()} change="Created by you" />
        <StatCard icon={Heart} label="Favorite Items" value={stats.favoriteItems.toString()} change="In wardrobe" />
        <StatCard icon={TrendingUp} label="Style Preference" value={profile.preferences?.stylePreference || "Casual"} change="Your signature style" />
      </div>

      {/* Content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent uploads */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border shadow-sm" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent Uploads</h3>
            <button onClick={() => onNavigate("wardrobe")} className="text-sm font-semibold flex items-center gap-1 hover:underline" style={{ color: "#7C5CFC" }}>
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {recentItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              No clothing items uploaded yet. Start by uploading one!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recentItems.map((item) => (
                <div key={item._id} className="group cursor-pointer">
                  <div className="rounded-2xl overflow-hidden aspect-[3/4] mb-2 bg-gray-100">
                    <img src={item.imageUrl || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=280&fit=crop&auto=format"} alt={item.category} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="text-xs font-semibold text-gray-800 truncate">{item.color} {item.category}</div>
                  <div className="text-xs text-gray-400">{item.occasion} · {item.season}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Quick actions */}
          <div className="bg-white rounded-3xl p-5 border shadow-sm" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
            <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Upload new clothes", icon: Upload, s: "upload" },
                { label: "Generate outfit", icon: Sparkles, s: "outfits" },
                { label: "Check shopping item", icon: ShoppingBag, s: "shopping" },
              ].map(({ label, icon: Icon, s }) => (
                <button key={label} onClick={() => onNavigate(s)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-purple-50 transition-colors group">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: P_SOFT }}>
                    <Icon className="w-4 h-4" style={{ color: "#7C5CFC" }} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">{label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-purple-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-3xl p-5 border shadow-sm" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
            <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recent Activity</h3>
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${a.color}15` }}>
                    <a.icon className="w-4 h-4" style={{ color: a.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-800"><span className="text-gray-500">{a.action} </span>{a.item}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
