import { Inter } from 'next/font/google';
import React from 'react';

import type { CardTheme } from '@/app/components/dashboard/CreditCard';
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
      <TopBar />
      <main className='p-8'>
        <div className='mb-6'>
          <div className='h-6 w-32 bg-gray-200 rounded animate-pulse' />
        </div>
        <Card className='rounded-[25px]'>
          <CardContent>
            <div className='flex flex-wrap gap-6 p-6'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='basis-[calc(33.333%-1rem)] flex-grow'>
                  <div className='h-48 bg-gray-200 rounded-lg animate-pulse' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  </div>
);

const CreditCards: React.FC = () => {
  const { cardsData, isLoading, error } = useCardsData();

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
        <TopBar />
        <main className='p-8'>
          {/* Page Header */}
          <div className='mb-6'>
            <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
              Credit Cards
            </h2>
          </div>

          {/* Single White Card Container */}
          <Card className='rounded-[25px]'>
            <CardContent>
              {/* Flex Container for 3-column grid */}
              <div className='flex flex-wrap gap-6 p-6'>
                {cardsData.map((card, index) => {
                  const chipImage = card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack;
                  const creditProviderLogo = (
                    <MasterCardLogo
                      fillColor={card.theme.bgColor === 'bg-[#31304D]' ? 'white' : '#1a1f36'}/>
                  );

                  return (
                    <div key={index} className='basis-[calc(33.333%-1rem)] flex-grow'>
                      <CreditCard
                        balance={card.balance}
                        holder={card.holder}
                        validThru={card.validThru}
                        cardNumber={card.cardNumber}
                        ChipImage={chipImage}
                        theme={{ ...card.theme, creditProviderLogo }}/>
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