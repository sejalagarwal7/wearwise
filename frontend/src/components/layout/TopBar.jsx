import { Search, Bell, Menu } from "lucide-react";

export default function TopBar({ screen, onNavigate, onToggleSidebar }) {
  const titles = {
    landing: "",
    login: "",
    register: "",
    dashboard: "Dashboard",
    wardrobe: "My Wardrobe",
    upload: "Upload Clothing",
    outfits: "Outfit AI",
    shopping: "Shopping Assistant",
    profile: "Profile"
  };

  return (
    <header className="flex-shrink-0 h-16 flex items-center justify-between px-6 border-b bg-white" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hidden md:flex">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{titles[screen]}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search wardrobe..." className="pl-9 pr-4 py-2 text-sm rounded-2xl border outline-none w-48 transition-all"
            style={{ borderColor: "rgba(124,92,252,0.15)", background: "#F9F8FF" }}
            onFocus={(e) => { e.target.style.borderColor = "#7C5CFC"; e.target.style.boxShadow = "0 0 0 3px rgba(124,92,252,0.08)"; e.target.style.width = "200px"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(124,92,252,0.15)"; e.target.style.boxShadow = "none"; e.target.style.width = "192px"; }} />
        </div>
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-50 text-gray-500">
          <Bell className="w-5 h-5" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500" />
        </button>
        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&auto=format" alt="User"
          className="w-9 h-9 rounded-full object-cover cursor-pointer ring-2 ring-purple-100" onClick={() => onNavigate("profile")} />
      </div>
    </header>
  );
}
