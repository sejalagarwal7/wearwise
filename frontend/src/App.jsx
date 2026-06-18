import { useState } from "react";
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

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [collapsed, setCollapsed] = useState(false);

  if (screen === "landing") return <LandingPage onNavigate={setScreen} />;
  if (screen === "login") return <LoginPage onNavigate={setScreen} />;
  if (screen === "register") return <RegisterPage onNavigate={setScreen} />;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#FAFAFC", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar screen={screen} onNavigate={setScreen} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar screen={screen} onNavigate={setScreen} onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          {screen === "dashboard" && <DashboardPage onNavigate={setScreen} />}
          {screen === "wardrobe" && <WardrobePage />}
          {screen === "upload" && <UploadPage />}
          {screen === "outfits" && <OutfitsPage />}
          {screen === "shopping" && <ShoppingPage />}
          {screen === "profile" && <ProfilePage onNavigate={setScreen} />}
        </main>
      </div>
      <MobileNav screen={screen} onNavigate={setScreen} />
    </div>
  );
}
