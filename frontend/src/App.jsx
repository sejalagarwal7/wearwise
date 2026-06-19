import { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import MobileNav from "./components/layout/MobileNav";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import WardrobePage from "./pages/WardrobePage";
import UploadPage from "./pages/UploadPage";
import OutfitsPage from "./pages/OutfitsPage";
import ShoppingPage from "./pages/ShoppingPage";
import ProfilePage from "./pages/ProfilePage";
import { api } from "./api";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const profile = await api.getProfile();
      setUser(profile);
      setScreen("dashboard");
    } catch (err) {
      console.error("Auth check failed:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem("token", data.token);
    await fetchUser();
  };

  const register = async (name, email, password) => {
    const data = await api.register(name, email, password);
    localStorage.setItem("token", data.token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setScreen("landing");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFC]" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
          <span className="text-gray-500 font-semibold text-sm">Loading your wardrobe...</span>
        </div>
      </div>
    );
  }

  if (screen === "landing") return <LandingPage onNavigate={setScreen} />;
  if (screen === "login") return <LoginPage onNavigate={setScreen} onLogin={login} />;
  if (screen === "register") return <RegisterPage onNavigate={setScreen} onRegister={register} />;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#FAFAFC", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar screen={screen} onNavigate={setScreen} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar screen={screen} onNavigate={setScreen} onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          {screen === "dashboard" && <DashboardPage onNavigate={setScreen} />}
          {screen === "wardrobe" && <WardrobePage onNavigate={setScreen} />}
          {screen === "upload" && <UploadPage onNavigate={setScreen} />}
          {screen === "outfits" && <OutfitsPage />}
          {screen === "shopping" && <ShoppingPage />}
          {screen === "profile" && <ProfilePage onNavigate={setScreen} user={user} onUpdateProfile={setUser} onLogout={logout} />}
        </main>
      </div>
      <MobileNav screen={screen} onNavigate={setScreen} />
    </div>
  );
}
