import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0b0b] transition-colors">
      <Navbar />
      <Outlet />
    </div>
  );
}
