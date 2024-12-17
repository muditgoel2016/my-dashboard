import React, { useState } from "react";
import { Inter } from "next/font/google";
import TopBar from "@/app/components/shared/mobile/top-bar";
import MobileNav from "@/app/components/shared/mobile/nav";
import { Card, CardContent } from "@/app/components/shared/common/card";
import CreditCard from "@/app/components/dashboard/CreditCard";
import MasterCardLogo from "@/app/components/dashboard/MasterCardLogo";
import EMVChip from "@/app/components/dashboard/EMVChip";
import EMVChipBlack from "@/app/components/dashboard/EMVChipBlack";
import { dashboardDataService } from "@/app/services/dataServices/dashboard/dashboardDataService";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function CreditCards() {
  const [cardsData, setCardsData] = React.useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  React.useEffect(() => {
    const fetchCards = async () => {
      try {
        const cards = await dashboardDataService.getCardsData();
        setCardsData(cards);
      } catch (error) {
        console.error('Error fetching cards data:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className={`${inter.variable} font-sans min-h-screen bg-gray-50 pb-16`}>
      {/* Mobile TopBar */}
      <TopBar 
        title="Credit Cards" 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <main className="px-4 py-4">
        {/* Single White Card Container */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            {/* Vertically stacked cards */}
            <div className="flex flex-col gap-4">
              {cardsData.map((card, index) => (
                <div key={index}>
                  <CreditCard
                    balance={card.balance}
                    holder={card.holder}
                    validThru={card.validThru}
                    cardNumber={card.cardNumber}
                    ChipImage={card.theme.bgColor === "bg-[#31304D]" ? EMVChip : EMVChipBlack}
                    theme={{
                      ...card.theme,
                      creditProviderLogo: <MasterCardLogo 
                        fillColor={card.theme.bgColor === "bg-[#31304D]" ? "white" : "#1a1f36"} 
                      />
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}