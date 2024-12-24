import { Inter } from 'next/font/google';
import React from 'react';

import CreditCard from '@/app/components/dashboard/CreditCard';
import EMVChip from '@/app/components/dashboard/EMVChip';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import { Card, CardContent } from '@/app/components/shared/common/card';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { useCreditCards } from '@/app/contexts/CreditCardsContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Loading Skeleton
const CardsSkeleton = () => (
  <div 
    className={`${inter.variable} font-sans min-h-screen bg-gray-50 flex`}
    aria-label='Loading credit cards'>
    <Sidenav />
    <div className='ml-64 flex-1'>
      <TopBar title='Credit Cards'/>
      <main 
        className='p-8'
        aria-busy='true'>
        <div className='mb-6'>
          <div 
            className='h-7 w-32 bg-gray-200 rounded animate-pulse'
            aria-hidden='true'/>
        </div>
        <Card className='rounded-[25px]'>
          <CardContent>
            <div 
              className='flex flex-wrap justify-center gap-6 p-6'
              role='status'
              aria-label='Loading credit cards'>
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  aria-hidden='true'>
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

const CreditCards: React.FC = () => {
  const { cardsData, isLoading, error } = useCreditCards();

  if (isLoading) {
    return <CardsSkeleton />;
  }

  if (error) {
    return (
      <div 
        className='min-h-screen flex items-center justify-center'
        role='alert'>
        <div className='text-red-500'>
          Error loading cards: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${inter.variable} font-sans min-h-screen bg-gray-50 flex`}
      role='application'
      aria-label='Credit Cards Dashboard'>
      <Sidenav />
      <div className='ml-64 flex-1'>
        <TopBar title='Credit Cards'/>
        <main 
          className='p-8'
          role='main'
          aria-label='Credit Cards Overview'>
          <Card className='rounded-[25px]'>
            <CardContent>
              <div 
                className='flex flex-wrap justify-center gap-6 p-6'
                role='list'
                aria-label='Available credit cards'>
                {cardsData.map((card) => {
                  const ChipImage = card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack;
                  
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
                    <div 
                      key={card.id}
                      role='listitem'
                      aria-label={`Credit card ending in ${card.lastFourDigits}`}>
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
