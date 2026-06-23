import { useState } from "react";
import { ExternalLink, Sparkles, ShoppingBag, Wand2 } from "lucide-react";
import { P_GRAD, P_SOFT } from "../constants/data";
import PBtn from "../components/common/PBtn";
import { api } from "../api";

export default function ShoppingPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Dynamic product analysis states
  const [productDetails, setProductDetails] = useState(null);
  const [exists, setExists] = useState(false);
  const [existingItem, setExistingItem] = useState(null);
  const [compatibility, setCompatibility] = useState(50);
  const [compatibilityText, setCompatibilityText] = useState("");
  const [stylingAdvice, setStylingAdvice] = useState([]);
  const [suggestedOutfits, setSuggestedOutfits] = useState([]);

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setProductDetails(null);
    try {
      const data = await api.analyzeLink(url);
      setProductDetails(data.product);
      setExists(data.exists);
      setExistingItem(data.existingItem);
      setCompatibility(data.compatibility);
      setCompatibilityText(data.compatibilityText);
      setStylingAdvice(data.stylingAdvice);
      setSuggestedOutfits(data.suggestedOutfits);
    } catch (err) {
      console.error("AI Link analysis failed:", err);
      alert("AI analysis failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Shopping Assistant</h2>
        <p className="text-sm text-gray-500 mb-6">Paste a product URL and AI checks if it works with your existing wardrobe.</p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="url" placeholder="https://www.zara.com/en/product/..." value={url} onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyze()}
              className="w-full pl-11 pr-4 py-4 rounded-2xl border text-sm outline-none transition-all bg-white"
              style={{ borderColor: "rgba(124,92,252,0.2)" }}
              onFocus={(e) => { e.target.style.borderColor = "#7C5CFC"; e.target.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.08)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(124,92,252,0.2)"; e.target.style.boxShadow = "none"; }} />
          </div>
          <PBtn onClick={analyze}>Analyze</PBtn>
        </div>
        <button className="mt-3 text-xs font-semibold flex items-center gap-1.5 hover:underline" style={{ color: "#7C5CFC" }}
          onClick={() => setUrl("https://www.zara.com/us/en/satin-blazer-p08082065.html")}>
          <Sparkles className="w-3.5 h-3.5" /> Try a demo product
        </button>
      </div>

      {loading && (
        <div className="bg-white rounded-3xl border p-12 flex flex-col items-center text-center" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: P_GRAD }}>
            <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: "2s" }} />
          </div>
          <div className="font-semibold text-gray-800 mb-2">Analyzing product...</div>
          <div className="text-sm text-gray-400">Checking compatibility and wardrobe duplicates...</div>
        </div>
      )}

      {productDetails && !loading && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border overflow-hidden shadow-sm relative" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
            {exists && (
              <div className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full z-10 shadow-sm border border-white/20 animate-pulse">
                Already in Wardrobe
              </div>
            )}
            <div className="h-72 overflow-hidden bg-gray-100">
              <img src={productDetails.imageUrl} alt="Product" className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <div className="text-xs text-gray-400 mb-1">{productDetails.brand} · {productDetails.category}</div>
              <h3 className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{productDetails.name}</h3>
              <div className="text-2xl font-black mb-3" style={{ color: "#7C5CFC", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{productDetails.price}</div>
              <div className="flex gap-2 flex-wrap">
                {productDetails.colors.map((c) => <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{c}</span>)}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl border p-6 shadow-sm" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Wardrobe Compatibility</h3>
                <div className="text-3xl font-black" style={{ color: "#7C5CFC", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{compatibility}%</div>
              </div>
              <div className="h-3 rounded-full bg-gray-100 overflow-hidden mb-4">
                <div className="h-full rounded-full" style={{ width: `${compatibility}%`, background: P_GRAD }} />
              </div>
              <p className="text-sm text-gray-600">
                {exists ? (
                  <span className="font-semibold text-rose-600">Similar item owned! </span>
                ) : (
                  <span className="font-semibold text-emerald-600">Match recommendation: </span>
                )}
                {compatibilityText}
              </p>
            </div>

            <div className="bg-white rounded-3xl border p-6 shadow-sm" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Wand2 className="w-5 h-5" style={{ color: "#7C5CFC" }} />
                <h3 className="font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AI Styling Advice</h3>
              </div>
              <div className="space-y-3">
                {stylingAdvice.map(({ tip, icon }) => (
                  <div key={tip} className="flex items-start gap-3 p-3 rounded-2xl" style={{ background: "#F9F8FF" }}>
                    <span className="text-lg flex-shrink-0">{icon}</span>
                    <p className="text-sm text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border p-6 shadow-sm" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
              <h3 className="font-bold text-gray-900 mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Suggested Outfit Combinations</h3>
              <div className="grid grid-cols-3 gap-3">
                {suggestedOutfits.map(({ name, items }) => (
                  <div key={name} className="rounded-2xl overflow-hidden border cursor-pointer hover:shadow-md transition-all bg-white" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
                    <div className="grid grid-cols-2 gap-px h-24 bg-gray-200">
                      {items.map((item, idx) => (
                        <img key={item._id || idx} src={item.imageUrl} alt={item.category} className="w-full h-full object-cover" />
                      ))}
                      {items.length < 4 && Array.from({ length: 4 - items.length }).map((_, idx) => (
                        <div key={idx} className="w-full h-full bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 font-bold">Empty</div>
                      ))}
                    </div>
                    <div className="p-2.5 bg-white"><div className="text-xs font-semibold text-gray-800">{name}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!productDetails && !loading && (
        <div className="bg-white rounded-3xl border p-12 flex flex-col items-center text-center" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6" style={{ background: P_SOFT }}>
            <ShoppingBag className="w-10 h-10" style={{ color: "#7C5CFC" }} />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Paste a product URL to get started</h3>
          <p className="text-sm text-gray-400 max-w-xs mb-6">Works with Zara, H&M, ASOS, Nordstrom, Net-a-Porter, and 200+ stores.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Zara", "H&M", "ASOS", "Nordstrom", "Net-a-Porter", "Revolve"].map((store) => (
              <span key={store} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: "#F3F0FF", color: "#7C5CFC" }}>{store}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
