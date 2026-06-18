export default function GBtn({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`font-semibold rounded-2xl border transition-all duration-200 hover:bg-purple-50 px-6 py-3 text-sm ${className}`} style={{ color: "#7C5CFC", borderColor: "rgba(124,92,252,0.3)" }}>
      {children}
    </button>
  );
}
