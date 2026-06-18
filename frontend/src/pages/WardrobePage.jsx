import { useState } from "react";
import { Search, Plus, Heart, Edit3, Trash2 } from "lucide-react";
import { WARDROBE_ITEMS } from "../constants/data";
import PBtn from "../components/common/PBtn";

export default function WardrobePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [liked, setLiked] = useState(new Set([2, 4, 6, 9, 11]));
  const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Footwear"];
  const swatches = ["#111827", "#1D4ED8", "#DC2626", "#D97706", "#059669", "#F9FAFB", "#F3E8FF"];

  const filtered = WARDROBE_ITEMS.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleLike = (id) => {
    setLiked((prev) => {
      const n = new Set(prev);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      return n;
    });
  };

  return (
    <div className="pb-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search your wardrobe..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none bg-white transition-all"
            style={{ borderColor: "rgba(124,92,252,0.15)" }}
            onFocus={(e) => { e.target.style.borderColor = "#7C5CFC"; e.target.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(124,92,252,0.15)"; e.target.style.boxShadow = "none"; }} />
        </div>
        <PBtn size="sm"><span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Item</span></PBtn>
      </div>

      <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all"
            style={activeCategory === cat ? { background: "#7C5CFC", color: "white", borderColor: "#7C5CFC" } : { background: "white", color: "#6B7280", borderColor: "rgba(124,92,252,0.15)" }}>
            {cat}
          </button>
        ))}
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          {swatches.map((c) => (
            <button key={c} className="w-6 h-6 rounded-full border-2 border-white shadow hover:scale-110 transition-transform" style={{ background: c }} />
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-400 mb-4">{filtered.length} items</div>

      <div style={{ columns: "3 180px", columnGap: "1rem" }}>
        {filtered.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-4 group relative rounded-3xl overflow-hidden bg-gray-100 cursor-pointer" style={{ display: "inline-block", width: "100%" }}>
            <img src={`https://images.unsplash.com/photo-${item.photo}?w=400&h=${item.h}&fit=crop&auto=format`} alt={item.name}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ height: item.h }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => toggleLike(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg">
                <Heart className={`w-4 h-4 ${liked.has(item.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg"><Edit3 className="w-4 h-4 text-gray-500" /></button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg"><Trash2 className="w-4 h-4 text-gray-500" /></button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="text-white font-semibold text-sm mb-1">{item.name}</div>
              <div className="flex gap-1.5 flex-wrap">
                {item.tags.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">{tag}</span>)}
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-gray-700">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
