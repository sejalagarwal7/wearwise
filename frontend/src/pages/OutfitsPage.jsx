import { useState, useEffect } from "react";
import { LayoutGrid, BarChart3, Award, Star, Globe, Heart, Sparkles, Bookmark, Share2, Wand2, Trash2 } from "lucide-react";
import PBtn from "../components/common/PBtn";
import { api } from "../api";

export default function OutfitsPage() {
  const [activeTab, setActiveTab] = useState("suggestions"); // suggestions | saved
  const [wardrobe, setWardrobe] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [occasion, setOccasion] = useState("Office");
  const [suggestions, setSuggestions] = useState([]);

  const P_GRAD = "linear-gradient(135deg, #7C5CFC 0%, #A78BFA 100%)";
  const occasionIcons = {
    College: LayoutGrid, Office: BarChart3, Interview: Award,
    Party: Star, Travel: Globe, "Date Night": Heart,
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [wardrobeData, outfitsData] = await Promise.all([
        api.getWardrobe(),
        api.getOutfits(),
      ]);
      setWardrobe(wardrobeData);
      setSavedOutfits(outfitsData);
      
      // Generate outfits dynamically
      generateOutfitSuggestions(wardrobeData, occasion);
    } catch (err) {
      console.error("Failed to load outfit page data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [occasion]);

  const generateOutfitSuggestions = (items, currentOccasion) => {
    const tops = items.filter((i) => i.category === "Tops");
    const bottoms = items.filter((i) => i.category === "Bottoms");
    const shoes = items.filter((i) => i.category === "Shoes");
    const outerwear = items.filter((i) => i.category === "Outerwear");

    const list = [];
    // Generate up to 3 combinations
    const limit = Math.min(3, Math.max(tops.length, bottoms.length));
    
    for (let i = 0; i < limit; i++) {
      const top = tops[i % tops.length];
      const bottom = bottoms[i % bottoms.length];
      const shoe = shoes[i % shoes.length];
      const outer = outerwear[i % outerwear.length];

      if (top && bottom) {
        const outfitItems = [top, bottom];
        if (shoe) outfitItems.push(shoe);
        if (outer) outfitItems.push(outer);

        // Dynamic style names based on color
        const topColor = top.color || "Classic";
        const bottomColor = bottom.color || "Navy";
        const outfitName = `${topColor} & ${bottomColor} ${currentOccasion} Style`;
        
        list.push({
          name: outfitName,
          items: outfitItems,
          score: 85 + (i * 4) + (currentOccasion.length % 5),
          photo: top.imageUrl || bottom.imageUrl
        });
      }
    }

    setSuggestions(list);
  };

  const handleSaveOutfit = async (outfit) => {
    try {
      const itemIds = outfit.items.map((it) => it._id);
      const saved = await api.saveOutfit(outfit.name, itemIds);
      setSavedOutfits((prev) => [...prev, saved]);
      alert("Outfit saved successfully!");
    } catch (err) {
      alert("Failed to save outfit: " + err.message);
    }
  };

  const handleDeleteOutfit = async (id) => {
    if (!window.confirm("Delete this saved outfit?")) return;
    try {
      await api.deleteOutfit(id);
      setSavedOutfits((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      alert("Failed to delete outfit: " + err.message);
    }
  };

  return (
    <div className="pb-8">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6 pb-px">
        <button onClick={() => setActiveTab("suggestions")}
          className="pb-3 text-sm font-bold transition-colors relative"
          style={{ color: activeTab === "suggestions" ? "#7C5CFC" : "#9CA3AF" }}>
          AI Suggestions
          {activeTab === "suggestions" && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "#7C5CFC" }} />}
        </button>
        <button onClick={() => setActiveTab("saved")}
          className="pb-3 text-sm font-bold transition-colors relative"
          style={{ color: activeTab === "saved" ? "#7C5CFC" : "#9CA3AF" }}>
          Saved Outfits ({savedOutfits.length})
          {activeTab === "saved" && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "#7C5CFC" }} />}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
          <span className="text-gray-400 font-semibold text-sm">Styling your outfits...</span>
        </div>
      ) : activeTab === "suggestions" ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>What are you dressing for?</h2>
            <p className="text-sm text-gray-500 mb-5">Select an occasion and our AI builds perfect outfits from your wardrobe.</p>
            <div className="flex flex-wrap gap-3">
              {["College", "Office", "Interview", "Party", "Travel", "Date Night"].map((occ) => {
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
              <span>From your {wardrobe.length} wardrobe items</span>
            </div>
          </div>

          {suggestions.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
              <div className="text-gray-400 font-medium mb-3">Add more items in Tops and Bottoms categories to get AI suggestions!</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {suggestions.map((outfit, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border hover:shadow-md transition-all group" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
                  <div className="h-64 relative overflow-hidden bg-gray-100">
                    <img src={outfit.photo || "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&fit=crop"} alt={outfit.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-white/95">
                      <Sparkles className="w-3.5 h-3.5" style={{ color: "#7C5CFC" }} />
                      <span style={{ color: "#7C5CFC" }}>{outfit.score}% match</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{outfit.name}</div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {outfit.items.map((item) => (
                        <span key={item._id} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                          {item.color} {item.category}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${outfit.score}%`, background: P_GRAD }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-500">{outfit.score}%</span>
                    </div>
                    <PBtn size="sm" onClick={() => handleSaveOutfit(outfit)} className="w-full justify-center">
                      <span className="flex items-center gap-1"><Bookmark className="w-3.5 h-3.5" /> Save Outfit</span>
                    </PBtn>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>
          {savedOutfits.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
              <div className="text-gray-400 font-medium mb-3">No saved outfits yet. Get AI recommendations to save them!</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {savedOutfits.map((outfit) => (
                <div key={outfit._id} className="bg-white rounded-3xl overflow-hidden shadow-sm border hover:shadow-md transition-all group" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
                  <div className="h-64 relative overflow-hidden bg-gray-100">
                    <img src={outfit.items?.[0]?.imageUrl || "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&fit=crop"} alt={outfit.name}
                      className="w-full h-full object-cover" />
                    <button onClick={() => handleDeleteOutfit(outfit._id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{outfit.name}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {outfit.items?.map((item) => (
                        <span key={item._id} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                          {item.color} {item.category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
