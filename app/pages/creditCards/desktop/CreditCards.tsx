import { Inter } from 'next/font/google';
import React from 'react';

import CreditCard from '@/app/components/dashboard/CreditCard';
import EMVChip from '@/app/components/dashboard/EMVChip';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import { Card, CardContent } from '@/app/components/shared/common/card';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { useCardsData } from '@/pages/creditCards/useCardsData';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Loading Skeleton
const CardsSkeleton = () => (
  <div className={`${inter.variable} font-sans min-h-screen bg-gray-50 flex`}>
    <Sidenav />
    <div className='ml-64 flex-1'>
      <TopBar title='Credit Cards'/>
      <main className='p-8'>
        <div className='mb-6'>
          <div className='h-7 w-32 bg-gray-200 rounded animate-pulse' />
        </div>
        <Card className='rounded-[25px]'>
          <CardContent>
            <div className='flex flex-wrap justify-center gap-6 p-6'>
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className='w-[350px] h-[235px] bg-gray-200 rounded-2xl animate-pulse' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  </div>
);

interface CreditCardsProps {
  initialCardsData: any[] | null;
  ssrConfig: {
    CARDS_SSR_ENABLED: boolean;
  };
}

const CreditCards: React.FC<CreditCardsProps> = ({ initialCardsData, ssrConfig }) => {
  const { cardsData, isLoading, error } = useCardsData({
    initialData: initialCardsData,
    ssrConfig
  });

  if (isLoading) {
    return <CardsSkeleton />;
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-red-500'>Error loading cards: {error.message}</div>
      </div>
    );
  }

  return (
    <div className={`${inter.variable} font-sans min-h-screen bg-gray-50 flex`}>
      <Sidenav />
      <div className='ml-64 flex-1'>
        <TopBar title='Credit Cards'/>
        <main className='p-8'>
          {/* Single White Card Container */}
          <Card className='rounded-[25px]'>
            <CardContent>
              {/* Flex Container for 3-column grid */}
              <div className='flex flex-wrap justify-center gap-6 p-6'>
                {cardsData.map((card) => {
                  const ChipImage = card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack;
                  
                  // Add creditProviderLogo to the card theme
                  const cardWithLogo = {
                    ...card,
                    theme: {
                      ...card.theme,
                      creditProviderLogo: (
                        <MasterCardLogo 
                          fillColor={card.theme.bgColor === 'bg-[#31304D]' ? 'white' : '#1a1f36'}/>
                      )
                    }
                  };

                  return (
                    <div key={card.id}>
                      <CreditCard
                        card={cardWithLogo}
                        ChipImage={ChipImage}/>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CreditCards;