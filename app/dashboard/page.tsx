"use client";

import useMediaQuery from "../../lib/useMediaQuery";
import MobileDashboard from "./MobileDashboard";
import DesktopDashboard from "./DesktopDashboard";

export default function DashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}
