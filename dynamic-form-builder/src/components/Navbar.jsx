import { Shield, LayoutDashboard, UserCheck } from "lucide-react";

export default function Navbar({ page, setPage }) {
  const base =
    "flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer transition-all duration-300";

  const active = "bg-blue-600 text-white shadow-lg";

  const inactive =
    "bg-slate-200 text-slate-700 hover:bg-black hover:text-white";

  return (
    <div className="flex justify-center gap-4 mb-6">
      {/* ADMIN */}
      <div
        onClick={() => setPage("admin")}
        className={`${base} ${page === "admin" ? active : inactive}`}
      >
        <Shield size={18} /> Admin
      </div>

      {/* DASHBOARD */}
      <div
        onClick={() => setPage("dashboard")}
        className={`${base} ${page === "dashboard" ? active : inactive}`}
      >
        <LayoutDashboard size={18} /> Dashboard
      </div>

      {/* USER */}
      <div
        onClick={() => setPage("user")}
        className={`${base} ${page === "user" ? active : inactive}`}
      >
        <UserCheck size={18} /> User
      </div>
    </div>
  );
}
