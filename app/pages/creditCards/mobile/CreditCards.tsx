import { Inter } from 'next/font/google';
import React, { useState } from 'react';

import CreditCard from '@/app/components/dashboard/CreditCard';
import EMVChip from '@/app/components/dashboard/EMVChip';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import MobileNav from '@/app/components/shared/mobile/nav';
import TopBar from '@/app/components/shared/mobile/top-bar';
import { useCardsData } from '@/pages/creditCards/useCardsData';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Loading Skeleton Component
const CardsSkeleton: React.FC = () => (
  <div 
    className={`${inter.variable} font-sans min-h-screen bg-gray-50`}
    aria-label='Loading credit cards'>
    <TopBar title='Credit Cards' onMenuClick={() => {}} />
    <main 
      className='px-4 py-6'
      aria-busy='true'>
      <div className='mb-4'>
        <div 
          className='h-6 w-28 bg-gray-200 rounded animate-pulse'
          aria-hidden='true'/>
      </div>
      <div 
        className='space-y-4'
        role='status'
        aria-label='Loading credit card details'>
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className='w-full h-[235px] bg-gray-200 rounded-2xl animate-pulse'
            aria-hidden='true'/>
        ))}
      </div>
    </main>
  </div>
);

// Error Display Component
const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div 
    className='min-h-screen flex items-center justify-center'
    role='alert'
    aria-live='assertive'>
    <div className='text-red-500'>
      Error loading cards: {message}
    </div>
  </div>
);

// Credit Card Item Component
interface CreditCardItemProps {
  card: any;
  index: number;
}

const CreditCardItem: React.FC<CreditCardItemProps> = ({ card, index }) => {
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
      className='w-full'
      role='listitem'
      aria-label={`Credit card ${index + 1} of ${card.totalCards}, ending in ${card.lastFourDigits}`}>
      <CreditCard
        card={cardWithLogo}
        ChipImage={ChipImage}/>
    </div>
  );
};

interface MobileCreditCardsProps {
  initialCardsData: any[] | null;
  ssrConfig: {
    CARDS_SSR_ENABLED: boolean;
  };
}

const MobileCreditCards: React.FC<MobileCreditCardsProps> = ({
  initialCardsData,
  ssrConfig
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { cardsData, isLoading, error } = useCardsData({
    initialData: initialCardsData,
    ssrConfig
  });

  if (isLoading) {
    return <CardsSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <div 
      className={`${inter.variable} font-sans min-h-screen bg-gray-50`}
      role='application'
      aria-label='Credit Cards Dashboard'>
      <TopBar 
        title='Credit Cards' 
        onMenuClick={() => setIsMobileMenuOpen(true)}/>
      <main 
        className='px-4 py-6 pb-24'
        role='main'
        aria-label='Credit Cards Overview'>
        {/* Page Header */}
        <div className='mb-6'>
          <h1 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
            Credit Cards
          </h1>
        </div>

        {/* Cards Stack */}
        <div 
          className='space-y-4'
          role='list'
          aria-label={`${cardsData.length} credit cards available`}>
          {cardsData.map((card, index) => (
            <CreditCardItem 
              key={card.id} 
              card={{...card, totalCards: cardsData.length}}
              index={index}/>
          ))}
        </div>
      </main>
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}/>
    </div>
  );
};

export default MobileCreditCards;