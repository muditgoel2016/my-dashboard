import type { ReactNode } from 'react';
import React from 'react';
import { Card, CardContent } from '@/app/components/shared/common/card';
interface CardTheme {
  bgColor: string;
  textPrimaryColor: string;
  labelColor: string;
  valueColor: string;
  creditProviderLogo?: ReactNode;
}

interface Card {
  id: number;
  balance: string;
  holder: string;
  validThru: string;
  cardNumber: string;
  theme: CardTheme;
  labels?: {
    balance: string;
    cardHolder: string;
    validThru: string;
  };
}

// Default values
export const defaultCardTheme: CardTheme = {
  bgColor: 'bg-[#f8faff]',
  textPrimaryColor: 'text-[#1a1f36]',
  labelColor: 'text-[#6B7280]',
  valueColor: 'text-[#1a1f36]'
};

export const defaultCardLabels = {
  balance: 'Balance',
  cardHolder: 'CARD HOLDER',
  validThru: 'VALID THRU'
};

export interface CreditCardProps {
  card: Card;
  ChipImage: React.ComponentType;
}

const CreditCard: React.FC<CreditCardProps> = React.memo(({ 
  card,
  ChipImage,
}: CreditCardProps) => {
  const {
    balance,
    holder,
    validThru,
    cardNumber,
    theme,
    labels = defaultCardLabels
  } = card;

  const { 
    bgColor, 
    labelColor, 
    valueColor,
    creditProviderLogo 
  } = theme;

  const cardClassName = `${bgColor} flex-1 rounded-2xl border-[#e6efff]`;
  const labelClass = `text-xs ${labelColor}`;
  const valueClass = `font-medium ${valueColor}`;

  return (
    <Card className={cardClassName}>
      <CardContent className='p-6 h-[235px] flex flex-col'>
        {/* Top Row - Balance and Chip */}
        <div className='flex-1 flex justify-between'>
          <div>
            <p className={labelClass}>{labels.balance}</p>
            <h2 className={`text-2xl font-bold ${valueColor}`}>${balance}</h2>
          </div>
          <div className='w-12 h-12'>
            <ChipImage />
          </div>
        </div>

        {/* Middle Row - Card Holder and Valid Info */}
        <div className='flex-[2] flex justify-between items-center'>
          <div>
            <p className={labelClass}>{labels.cardHolder}</p>
            <p className={valueClass}>{holder}</p>
          </div>
          <div>
            <p className={labelClass}>{labels.validThru}</p>
            <p className={valueClass}>{validThru}</p>
          </div>
        </div>

        {/* Bottom Row - Card Number and creditProviderLogo */}
        <div className='flex-1 flex justify-between items-center'>
          <p className={`text-xl tracking-wider mb-4 ${valueColor}`}>
            {cardNumber}
          </p>
          {creditProviderLogo}
        </div>
      </CardContent>
    </Card>
  );
});

CreditCard.displayName = 'CreditCard';

export default CreditCard;