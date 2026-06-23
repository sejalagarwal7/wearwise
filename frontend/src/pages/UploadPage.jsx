import { useState, useRef } from "react";
import { Upload, Camera, X, Plus, Wand2, Sparkles, Tag, Globe, Check } from "lucide-react";
import { P_GRAD, P_SOFT } from "../constants/data";
import PBtn from "../components/common/PBtn";
import { api } from "../api";

export default function UploadPage({ onNavigate }) {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const fileRef = useRef(null);

  // Form states for AI analysis overrides
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500");
  const [category, setCategory] = useState("Outerwear");
  const [color, setColor] = useState("Floral");
  const [season, setSeason] = useState("Summer");
  const [occasion, setOccasion] = useState("College");
  const [loading, setLoading] = useState(false);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);
    setUploaded([{ url: objectUrl, name: file.name }]);
    setAnalyzing(true);
    setAnalyzed(false);

    try {
      const data = await api.analyzeImage(file);
      setAnalyzing(false);
      setAnalyzed(true);
      // Pre-fill fields with the actual uploaded file's Cloudinary URL and AI analysis tags!
      setImageUrl(data.imageUrl);
      setCategory(data.category || "Tops");
      setColor(data.color || "Casual Styled");
      setSeason(data.season || "Summer");
      setOccasion(data.occasion || "Casual");
    } catch (err) {
      console.error("AI Analysis failed:", err);
      alert("AI analysis failed: " + err.message);
      setAnalyzing(false);
      // fallback so user can still enter details manually
      setImageUrl(objectUrl);
      setAnalyzed(true);
    }
  };

  const handleSaveToWardrobe = async () => {
    setLoading(true);
    try {
      await api.addWardrobeItem({
        imageUrl,
        category,
        color,
        season,
        occasion,
      });
      onNavigate("wardrobe");
    } catch (err) {
      alert("Failed to save item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Upload Clothing</h2>
          <p className="text-sm text-gray-500 mb-6">Our AI auto-detects category, colors, and style tags.</p>
          <div className="border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all mb-4"
            style={{ borderColor: dragging ? "#7C5CFC" : "rgba(124,92,252,0.25)", background: dragging ? "#F3F0FF" : "#FAFAFC" }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileRef.current?.click()}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: dragging ? P_GRAD : P_SOFT }}>
              <Upload className="w-8 h-8" style={{ color: dragging ? "white" : "#7C5CFC" }} />
            </div>
            <div className="font-semibold text-gray-800 mb-1">{dragging ? "Drop to upload" : "Drag & drop photos here"}</div>
            <div className="text-sm text-gray-400 mb-4">or click to browse files</div>
            <div className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white px-4 py-2 rounded-full border" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <Camera className="w-3.5 h-3.5" /> JPG, PNG, HEIC up to 50MB
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </div>

          {uploaded.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {uploaded.map((f, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-square bg-gray-100 col-span-3">
                  <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-lg"
                    onClick={() => { setUploaded([]); setAnalyzed(false); }}>
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AI Analysis</h2>
          <p className="text-sm text-gray-500 mb-6">Automatically detected attributes from your photo.</p>

          {!uploaded.length && !analyzed && (
            <div className="bg-white rounded-3xl border p-10 flex flex-col items-center text-center" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: P_SOFT }}>
                <Wand2 className="w-8 h-8" style={{ color: "#7C5CFC" }} />
              </div>
              <div className="font-semibold text-gray-700 mb-2">Upload an image to analyze</div>
              <div className="text-sm text-gray-400">AI will detect category, colors, style, and more.</div>
            </div>
          )}

          {analyzing && (
            <div className="bg-white rounded-3xl border p-8" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: P_GRAD }}>
                  <Sparkles className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div><div className="font-semibold text-gray-900">Analyzing with AI...</div><div className="text-sm text-gray-400">Detecting attributes</div></div>
              </div>
              <div className="space-y-3">
                {["Detecting category", "Analyzing colors", "Identifying style", "Generating tags"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `rgba(124,92,252,${0.15 + i * 0.2})` }}>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#7C5CFC", animationDelay: `${i * 200}ms` }} />
                    </div>
                    <span className="text-sm text-gray-500">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analyzed && (
            <div className="bg-white rounded-3xl border shadow-sm overflow-hidden" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Image URL</label>
                  <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required
                    className="w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none" style={{ borderColor: "rgba(124,92,252,0.2)", background: "#F9F8FF" }} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none bg-white" style={{ borderColor: "rgba(124,92,252,0.2)" }}>
                      <option value="Tops">Tops</option>
                      <option value="Bottoms">Bottoms</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Outerwear">Outerwear</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Season</label>
                    <input value={season} onChange={(e) => setSeason(e.target.value)} required
                      className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none" style={{ borderColor: "rgba(124,92,252,0.2)" }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Color / Style</label>
                    <input value={color} onChange={(e) => setColor(e.target.value)} required
                      className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none" style={{ borderColor: "rgba(124,92,252,0.2)" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Occasion</label>
                    <input value={occasion} onChange={(e) => setOccasion(e.target.value)} required
                      className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none" style={{ borderColor: "rgba(124,92,252,0.2)" }} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">AI Confidence</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: "96%", background: P_GRAD }} />
                    </div>
                    <span className="text-sm font-bold" style={{ color: "#7C5CFC" }}>96%</span>
                  </div>
                </div>

                <PBtn onClick={handleSaveToWardrobe} disabled={loading} className="w-full block justify-center">
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> {loading ? "Saving Item..." : "Save to Wardrobe"}
                  </span>
                </PBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
