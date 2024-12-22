import type { ReactNode } from 'react';
import React from 'react';
import { Card, CardContent } from '@/app/components/shared/common/card';

// Improved type safety with template literal types
interface CardTheme {
  bgColor: `bg-${string}`;
  textPrimaryColor: `text-${string}`;
  labelColor: `text-${string}`;
  valueColor: `text-${string}`;
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
  ChipImage?: React.ComponentType;
  width?: string;
  height?: string;
  className?: string;
  onCardClick?: () => void;
}

// Common styles as constants
const baseCardStyles = 'flex-1 rounded-2xl border transition-all duration-200 hover:shadow-lg';
const baseTextStyles = 'font-medium';
const baseLabelStyles = 'text-xs';

const CreditCard: React.FC<CreditCardProps> = React.memo(({ 
  card,
  ChipImage = () => null, // Default empty component
  width = 'w-[350px]',
  height = 'h-[235px]',
  className = '',
  onCardClick
}: CreditCardProps) => {
  const {
    balance,
    holder,
    validThru,
    cardNumber,
    theme = defaultCardTheme,
    labels = defaultCardLabels
  } = card;

  const { 
    bgColor, 
    labelColor, 
    valueColor,
    creditProviderLogo 
  } = theme;

  // Format card number with spaces for readability
  const formattedCardNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim();

  const cardClassName = `${bgColor} ${baseCardStyles} border-[#e6efff] ${className}`;
  const labelClass = `${baseLabelStyles} ${labelColor}`;
  const valueClass = `${baseTextStyles} ${valueColor}`;

  return (
    <Card 
      className={cardClassName}
      role="article"
      aria-label="Credit Card"
      onClick={onCardClick}
      tabIndex={onCardClick ? 0 : undefined}
    >
      <CardContent 
        className={`p-6 ${width} ${height} flex flex-col relative group`}
      >
        {/* Top Row - Balance and Chip */}
        <div className='flex-1 flex justify-between' aria-label="Card Header">
          <div>
            <p className={labelClass}>{labels.balance}</p>
            <h2 className={`text-2xl font-bold ${valueColor}`} aria-label="Balance">
              ${balance}
            </h2>
          </div>
          <div className='w-12 h-12 transition-transform group-hover:scale-105'>
            <ChipImage />
          </div>
        </div>

        {/* Middle Row - Card Holder and Valid Info */}
        <div className='flex-[2] flex justify-between items-center' aria-label="Card Details">
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
        <div className='flex-1 flex justify-between items-center' aria-label="Card Footer">
          <p 
            className={`text-xl tracking-wider mb-4 ${valueColor}`}
            aria-label="Card Number"
          >
            {formattedCardNumber}
          </p>
          <div className="transition-transform group-hover:scale-105">
            {creditProviderLogo}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CreditCard.displayName = 'CreditCard';

export default CreditCard;