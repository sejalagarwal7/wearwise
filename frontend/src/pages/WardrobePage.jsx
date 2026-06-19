import { useState, useEffect } from "react";
import { Search, Plus, Heart, Edit3, Trash2, X } from "lucide-react";
import PBtn from "../components/common/PBtn";
import { api } from "../api";

export default function WardrobePage({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [editingItem, setEditingItem] = useState(null);
  
  // Modal Edit State
  const [editCategory, setEditCategory] = useState("Tops");
  const [editColor, setEditColor] = useState("");
  const [editSeason, setEditSeason] = useState("");
  const [editOccasion, setEditOccasion] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  const categories = ["All", "Tops", "Bottoms", "Shoes", "Outerwear"];
  const swatches = ["#111827", "#1D4ED8", "#DC2626", "#D97706", "#059669", "#F9FAFB", "#F3E8FF"];

  const loadWardrobe = async () => {
    try {
      const data = await api.getWardrobe();
      setItems(data);
    } catch (err) {
      console.error("Failed to load wardrobe:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWardrobe();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this clothing item?")) return;
    try {
      await api.deleteWardrobeItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to delete item: " + err.message);
    }
  };

  const handleStartEdit = (item) => {
    setEditingItem(item);
    setEditCategory(item.category || "Tops");
    setEditColor(item.color || "");
    setEditSeason(item.season || "");
    setEditOccasion(item.occasion || "");
    setEditImageUrl(item.imageUrl || "");
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const updated = await api.updateWardrobeItem(editingItem._id, {
        category: editCategory,
        color: editColor,
        season: editSeason,
        occasion: editOccasion,
        imageUrl: editImageUrl,
      });
      setItems((prev) => prev.map((item) => (item._id === editingItem._id ? updated : item)));
      setEditingItem(null);
    } catch (err) {
      alert("Failed to update item: " + err.message);
    }
  };

  const filtered = items.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch =
      (item.color || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.occasion || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.season || "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
        <span className="text-gray-400 font-semibold text-sm">Loading wardrobe items...</span>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search color, category, occasion..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none bg-white transition-all"
            style={{ borderColor: "rgba(124,92,252,0.15)" }}
            onFocus={(e) => { e.target.style.borderColor = "#7C5CFC"; e.target.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.08)"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(124,92,252,0.15)"; e.target.style.boxShadow = "none"; }} />
        </div>
        <PBtn size="sm" onClick={() => onNavigate("upload")}><span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Item</span></PBtn>
      </div>

      <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all"
            style={activeCategory === cat ? { background: "#7C5CFC", color: "white", borderColor: "#7C5CFC" } : { background: "white", color: "#6B7280", borderColor: "rgba(124,92,252,0.15)" }}>
            {cat}
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-400 mb-4">{filtered.length} items</div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
          <div className="text-gray-400 font-medium mb-3">No items found matching your filters</div>
          <PBtn size="sm" onClick={() => onNavigate("upload")}>Upload your first item</PBtn>
        </div>
      ) : (
        <div style={{ columns: "3 180px", columnGap: "1rem" }}>
          {filtered.map((item) => (
            <div key={item._id} className="break-inside-avoid mb-4 group relative rounded-3xl overflow-hidden bg-gray-100 cursor-pointer" style={{ display: "inline-block", width: "100%" }}>
              <img src={item.imageUrl || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&fit=crop&auto=format"} alt={item.category}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ minHeight: "180px", maxHeight: "320px" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleStartEdit(item)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg"><Edit3 className="w-4 h-4 text-gray-500" /></button>
                <button onClick={() => handleDelete(item._id)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-lg"><Trash2 className="w-4 h-4 text-gray-500" /></button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-white font-semibold text-sm mb-1">{item.color} {item.category}</div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">{item.occasion}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">{item.season}</span>
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-gray-700">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-bold text-gray-900 text-lg">Edit Clothing Item</h3>
              <button onClick={() => setEditingItem(null)} className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border mb-4">
                <img src={editImageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Image URL</label>
                <input type="text" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "rgba(124,92,252,0.2)" }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Category</label>
                  <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-white" style={{ borderColor: "rgba(124,92,252,0.2)" }}>
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Outerwear">Outerwear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Color</label>
                  <input type="text" value={editColor} onChange={(e) => setEditColor(e.target.value)} required
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "rgba(124,92,252,0.2)" }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Season</label>
                  <input type="text" value={editSeason} onChange={(e) => setEditSeason(e.target.value)} required
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "rgba(124,92,252,0.2)" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1.5">Occasion</label>
                  <input type="text" value={editOccasion} onChange={(e) => setEditOccasion(e.target.value)} required
                    className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none" style={{ borderColor: "rgba(124,92,252,0.2)" }} />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setEditingItem(null)} className="flex-1 py-3 border rounded-2xl text-sm font-semibold hover:bg-gray-50">Cancel</button>
                <PBtn type="submit" className="flex-1">Save Changes</PBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
