import { ChevronRight, ChevronLeft, Shirt } from "lucide-react";
import { NAV_ITEMS, P_GRAD, P_SOFT } from "../../constants/data";

export default function Sidebar({ screen, onNavigate, collapsed, onToggle }) {
  return (
    <aside className="flex-shrink-0 flex-col border-r transition-all duration-300 hidden md:flex"
      style={{ width: collapsed ? 72 : 240, borderColor: "rgba(124,92,252,0.08)", background: "#FFFFFF" }}>
      <div className="flex items-center gap-3 px-4 h-16 border-b flex-shrink-0" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
        <div className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center" style={{ background: P_GRAD }}>
          <Shirt className="w-5 h-5 text-white" />
        </div>
        {!collapsed && <span className="font-bold text-base text-gray-900 whitespace-nowrap" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>WearWise<span style={{ color: "#7C5CFC" }}>AI</span></span>}
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = screen === id;
          return (
            <button key={id} onClick={() => onNavigate(id)} title={collapsed ? label : undefined}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 group"
              style={active ? { background: P_SOFT, color: "#7C5CFC" } : { color: "#6B7280" }}>
              <Icon className="w-5 h-5 flex-shrink-0" style={active ? { color: "#7C5CFC" } : {}} />
              {!collapsed && <span className="whitespace-nowrap overflow-hidden">{label}</span>}
              {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#7C5CFC" }} />}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t flex-shrink-0" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-2xl mb-2 hover:bg-gray-50 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&auto=format" alt="User" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="overflow-hidden"><div className="text-sm font-semibold text-gray-800 truncate">Sophia Chen</div><div className="text-xs text-gray-400 truncate">Pro Plan</div></div>
          </div>
        )}
        <button onClick={onToggle} className="w-full flex items-center justify-center py-2 rounded-2xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
