import { NAV_ITEMS, P_SOFT } from "../../constants/data";

export default function MobileNav({ screen, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-around py-3 px-2 border-t bg-white z-50" style={{ borderColor: "rgba(124,92,252,0.08)" }}>
      {NAV_ITEMS.slice(0, 5).map(({ id, label, icon: Icon }) => {
        const active = screen === id;
        return (
          <button key={id} onClick={() => onNavigate(id)} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all" style={active ? { background: P_SOFT } : {}}>
              <Icon className="w-5 h-5" style={active ? { color: "#7C5CFC" } : { color: "#9CA3AF" }} />
            </div>
            <span className="text-xs font-semibold" style={active ? { color: "#7C5CFC" } : { color: "#9CA3AF" }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
