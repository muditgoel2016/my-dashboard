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
  <div className={`${inter.variable} font-sans min-h-screen bg-gray-50`}>
    <TopBar onMenuClick={() => {}} />
    <main className='px-4 py-6'>
      <div className='mb-4'>
        <div className='h-5 w-24 bg-gray-200 rounded animate-pulse' />
      </div>
      <div className='space-y-4'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='h-48 bg-gray-200 rounded-lg animate-pulse' />
        ))}
      </div>
    </main>
  </div>
);

// Error Display Component
const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className='min-h-screen flex items-center justify-center'>
    <div className='text-red-500'>Error loading cards: {message}</div>
  </div>
);

// Credit Card Item Component
const CreditCardItem: React.FC<{ card: any }> = ({ card }) => {
  const ChipImage = card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack;
  const creditProviderLogo = (
    <MasterCardLogo
      fillColor={card.theme.bgColor === 'bg-[#31304D]' ? 'white' : '#1a1f36'}
    />
  );

  return (
    <div>
      <CreditCard
        balance={card.balance}
        holder={card.holder}
        validThru={card.validThru}
        cardNumber={card.cardNumber}
        ChipImage={ChipImage}
        theme={{ ...card.theme, creditProviderLogo }}
      />
    </div>
  );
};

interface MobileCreditCardsProps {
  initialCardsData: CardData[] | null;
  ssrConfig: SSRConfig;
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
    <div className={`${inter.variable} font-sans min-h-screen bg-gray-50`}>
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main className='px-4 py-6 pb-24'>
        {/* Page Header */}
        <div className='mb-6'>
          <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
            Credit Cards
          </h2>
        </div>

        {/* Cards Grid */}
        <div className='space-y-4'>
          {cardsData.map(card => (
            <CreditCardItem key={card.id} card={card} />
          ))}
        </div>
      </main>
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  );
};

export default MobileCreditCards;