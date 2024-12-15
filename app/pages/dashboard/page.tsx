"use client";

import useMediaQuery from "@/app/services/otherServices/useMediaQuery";
import MobileDashboard from "./mobile/Dashboard";
import DesktopDashboard from "./desktop/Dashboard";

export default function DashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}
