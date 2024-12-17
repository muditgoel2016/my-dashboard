"use client";

import useMediaQuery from "@/app/services/otherServices/useMediaQuery";
import MobileCreditCards from "./mobile/CreditCards";
import DesktopCreditCards from "./desktop/CreditCards";

export default function CreditCards() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? <MobileCreditCards /> : <DesktopCreditCards />;
}
