import { P_GRAD } from "../../constants/data";

export default function PBtn({ children, onClick, className = "", size = "md" }) {
  const s = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };
  return (
    <button onClick={onClick} className={`font-semibold rounded-2xl text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${s[size]} ${className}`} style={{ background: P_GRAD }}>
      {children}
    </button>
  );
}
