import { Upload, Sparkles, Bookmark, Heart, Shirt, TrendingUp, ChevronRight, ArrowRight } from "lucide-react";
import { WARDROBE_ITEMS, P_GRAD, P_SOFT } from "../constants/data";
import StatCard from "../components/common/StatCard";

export default function DashboardPage({ onNavigate }) {
  const recent = WARDROBE_ITEMS.slice(0, 4);
  const activity = [
    { action: "Uploaded", item: "White Oxford Shirt", time: "2 hours ago", icon: Upload, color: "#7C5CFC" },
    { action: "Generated outfit for", item: "Office Meeting", time: "5 hours ago", icon: Sparkles, color: "#A78BFA" },
    { action: "Saved outfit", item: "Campus Cool Look", time: "Yesterday", icon: Bookmark, color: "#F59E0B" },
    { action: "Favorited", item: "Navy Slim Blazer", time: "Yesterday", icon: Heart, color: "#F43F5E" },
    { action: "Uploaded", item: "Floral Midi Dress", time: "2 days ago", icon: Upload, color: "#7C5CFC" },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome banner */}
      <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: P_GRAD }}>
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 50%, white, transparent 60%)" }} />
        <div className="relative">
          <div className="text-white/70 text-sm mb-2 font-medium">Good morning,</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sophia Chen 👋</h2>
          <p className="text-white/70 mb-6 max-w-md text-sm">You have 3 unreviewed outfits for this week. Your style score improved by 12 points!</p>
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
        <StatCard icon={Shirt} label="Total Clothes" value="47" change="+3 this week" />
        <StatCard icon={Sparkles} label="Outfits Generated" value="23" change="+5 this week" />
        <StatCard icon={Heart} label="Favorite Items" value="12" change="+2 this week" />
        <StatCard icon={TrendingUp} label="Style Score" value="94" change="+12 pts" />
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recent.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] mb-2 bg-gray-100">
                  <img src={`https://images.unsplash.com/photo-${item.photo}?w=200&h=280&fit=crop&auto=format`} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-xs font-semibold text-gray-800 truncate">{item.name}</div>
                <div className="text-xs text-gray-400">{item.category}</div>
              </div>
            ))}
          </div>
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
