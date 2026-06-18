import { useState, useRef } from "react";
import { Upload, Camera, X, Plus, Wand2, Sparkles, Tag, Globe, Check } from "lucide-react";
import { P_GRAD, P_SOFT } from "../constants/data";
import PBtn from "../components/common/PBtn";

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const fileRef = useRef(null);

  const handleFiles = (files) => {
    if (!files) return;
    const newFiles = Array.from(files).map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setUploaded((prev) => [...prev, ...newFiles]);
    setAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 2500);
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
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
          </div>

          {uploaded.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {uploaded.map((f, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-square bg-gray-100">
                  <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                  <button className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow"
                    onClick={() => setUploaded((prev) => prev.filter((_, idx) => idx !== i))}>
                    <X className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              ))}
              <div className="rounded-2xl border-2 border-dashed aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
                style={{ borderColor: "rgba(124,92,252,0.25)" }} onClick={() => fileRef.current?.click()}>
                <Plus className="w-6 h-6 mb-1" style={{ color: "#7C5CFC" }} />
                <span className="text-xs text-purple-500 font-medium">Add more</span>
              </div>
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
              {uploaded[0] && <div className="h-48 overflow-hidden"><img src={uploaded[0].url} alt="Uploaded" className="w-full h-full object-cover" /></div>}
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Item Name</label>
                  <input defaultValue="Floral Midi Dress" className="w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none" style={{ borderColor: "rgba(124,92,252,0.2)", background: "#F9F8FF" }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Category</label>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: P_SOFT, color: "#7C5CFC" }}>
                      <Tag className="w-4 h-4" /> Dresses
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Season</label>
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "#FEF3C7", color: "#92400E" }}>
                      <Globe className="w-4 h-4" /> Summer
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Detected Colors</label>
                  <div className="flex items-center gap-2">
                    {["#F59E0B", "#FDE68A", "#FBBF24", "#FFFFFF", "#86EFAC"].map((c) => (
                      <div key={c} className="w-7 h-7 rounded-full border-2 border-white shadow-md" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">AI Style Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {["Floral", "Midi", "Feminine", "Party", "Summer", "Casual Chic"].map((tag) => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">{tag}</span>
                    ))}
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
                <PBtn className="w-full block justify-center">
                  <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Save to Wardrobe</span>
                </PBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
