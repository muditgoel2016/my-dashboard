"use client";

import useMediaQuery from "../../lib/useMediaQuery";
import MobileSettings from "./MobileSettings";
import DesktopSettings from "./DesktopSettings";

export default function SettingsPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? <MobileSettings /> : <DesktopSettings />;
}
