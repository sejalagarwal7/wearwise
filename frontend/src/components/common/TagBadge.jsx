import { useState } from "react";

export default function TagBadge({ label }) {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn(!on)} className="px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all"
      style={on ? { background: "#7C5CFC", color: "white", borderColor: "#7C5CFC" } : { background: "white", color: "#6B7280", borderColor: "rgba(124,92,252,0.2)" }}>
      {label}
    </button>
  );
}
