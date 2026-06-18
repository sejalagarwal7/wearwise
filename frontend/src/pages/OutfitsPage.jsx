import { useState } from "react";
import { LayoutGrid, BarChart3, Award, Star, Globe, Heart, Sparkles, Bookmark, Share2, Wand2 } from "lucide-react";
import { OUTFIT_DATA, OCCASIONS, P_GRAD } from "../constants/data";
import PBtn from "../components/common/PBtn";

export default function OutfitsPage() {
  const [occasion, setOccasion] = useState("Office");
  const [saved, setSaved] = useState(new Set());
  const [liked, setLiked] = useState(new Set());
  const cards = OUTFIT_DATA[occasion] ?? [];

  const occasionIcons = {
    College: LayoutGrid, Office: BarChart3, Interview: Award,
    Party: Star, Travel: Globe, "Date Night": Heart,
  };

  return (
    <div className="pb-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What are you dressing for?</h2>
        <p className="text-sm text-gray-500 mb-5">Select an occasion and our AI builds perfect outfits from your wardrobe.</p>
        <div className="flex flex-wrap gap-3">
          {OCCASIONS.map((occ) => {
            const Icon = occasionIcons[occ] ?? Sparkles;
            return (
              <button key={occ} onClick={() => setOccasion(occ)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-sm font-semibold transition-all"
                style={occasion === occ ? { background: P_GRAD, color: "white", borderColor: "transparent", boxShadow: "0 4px 16px rgba(124,92,252,0.3)" } : { background: "white", color: "#6B7280", borderColor: "rgba(124,92,252,0.15)" }}>
                <Icon className="w-4 h-4" /> {occ}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          AI Outfits for <span style={{ color: "#7C5CFC" }}>{occasion}</span>
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Wand2 className="w-4 h-4" style={{ color: "#7C5CFC" }} />
          <span>From your 47 wardrobe items</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((outfit, i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border hover:shadow-md transition-all group" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
            <div className="h-64 relative overflow-hidden bg-gray-100">
              <img src={`https://images.unsplash.com/photo-${outfit.photo}?w=400&h=300&fit=crop&auto=format`} alt={outfit.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-white/95">
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#7C5CFC" }} />
                <span style={{ color: "#7C5CFC" }}>{outfit.score}% match</span>
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setLiked((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                  className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <Heart className={`w-4 h-4 ${liked.has(i) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </button>
                <button onClick={() => setSaved((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                  className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <Bookmark className={`w-4 h-4 ${saved.has(i) ? "fill-purple-500 text-purple-500" : "text-gray-400"}`} />
                </button>
                <button className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{outfit.name}</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {outfit.items.map((item) => <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{item}</span>)}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${outfit.score}%`, background: P_GRAD }} />
                </div>
                <span className="text-xs font-semibold text-gray-500">{outfit.score}%</span>
              </div>
              <div className="flex gap-2">
                <PBtn size="sm" className="flex-1 justify-center"><span className="flex items-center gap-1"><Bookmark className="w-3.5 h-3.5" /> Save</span></PBtn>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold hover:bg-gray-50 transition-colors" style={{ borderColor: "rgba(124,92,252,0.2)", color: "#7C5CFC" }}>
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
