import { P_SOFT } from "../../constants/data";

export default function StatCard({ icon: Icon, label, value, change }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "rgba(124,92,252,0.1)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: P_SOFT }}>
          <Icon className="w-6 h-6" style={{ color: "#7C5CFC" }} />
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{change}</span>
      </div>
      <div className="text-3xl font-bold mb-1" style={{ color: "#111827", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
