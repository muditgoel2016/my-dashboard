import React from "react";
import { Inter } from "next/font/google";
import Sidenav from "@/app/components/shared/desktop/nav";
import TopBar from "@/app/components/shared/desktop/top-bar";
import { Card, CardContent } from "@/app/components/shared/common/card";
import CreditCard from "@/app/components/dashboard/CreditCard";
import MasterCardLogo from "@/app/components/dashboard/MasterCardLogo";
import EMVChip from "@/app/components/dashboard/EMVChip";
import EMVChipBlack from "@/app/components/dashboard/EMVChipBlack";
import { dashboardDataService } from "@/app/services/dataServices/dashboard/dashboardDataService";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function CreditCards() {
  const [cardsData, setCardsData] = React.useState([]);

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
    <div className={`${inter.variable} font-sans min-h-screen bg-gray-50 flex`}>
      <Sidenav />
      <div className="ml-64 flex-1">
        <TopBar />
        <main className="p-8">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-[22px] font-semibold leading-[20.57px] text-[#343C6A]">
              Credit Cards
            </h2>
          </div>

          {/* Single White Card Container */}
          <Card className="rounded-[25px]">
            <CardContent>
              {/* Flex Container for 3-column grid */}
              <div className="flex flex-wrap gap-6 p-6">
                {cardsData.map((card, index) => (
                  <div key={index} className="basis-[calc(33.333%-1rem)] flex-grow">
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
      </div>
    </div>
  );
}