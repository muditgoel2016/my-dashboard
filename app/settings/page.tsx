"use client";

import useMediaQuery from "../../lib/useMediaQuery";
import MobileSettings from "./mobile/Settings";
import DesktopSettings from "./desktop/Settings";

export default function SettingsPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? <MobileSettings /> : <DesktopSettings />;
}
