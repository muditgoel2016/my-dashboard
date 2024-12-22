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
const baseCardStyles = 'flex-1 rounded-[1.5rem] border transition-all duration-200 hover:shadow-lg';
const baseTextStyles = 'font-medium';
const baseLabelStyles = 'text-xs';

const CreditCard: React.FC<CreditCardProps> = React.memo(({ 
  card,
  ChipImage = () => null,
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

  const formattedCardNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim();
  const cardClassName = `${bgColor} ${baseCardStyles} border-[#e6efff] ${className}`;
  const labelClass = `${baseLabelStyles} ${labelColor}`;
  const valueClass = `${baseTextStyles} ${valueColor}`;

  // Enhanced keyboard interaction handlers
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onCardClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onCardClick();
    }
  };

  return (
    <Card 
      className={cardClassName}
      role='region'
      aria-label={`Credit card ending in ${cardNumber.slice(-4)}`}
      onClick={onCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={onCardClick ? 0 : undefined}
      aria-describedby={`card-${card.id}-details`}>
      <CardContent 
        className={`p-6 ${width} ${height} flex flex-col relative group`}
        id={`card-${card.id}-details`}>
        {/* Top Row - Balance and Chip */}
        <div 
          className='flex-1 flex justify-between' 
          role='group' 
          aria-label='Card balance and chip'>
          <div>
            <p className={labelClass} id={`balance-label-${card.id}`}>
              {labels.balance}
            </p>
            <h2 
              className={`text-2xl font-bold ${valueColor}`}
              aria-labelledby={`balance-label-${card.id}`}>
              {/* Use actual number for better screen reader support */}
              <span aria-label={`${parseFloat(balance).toLocaleString()} dollars`}>
                ${balance}
              </span>
            </h2>
          </div>
          <div 
            className='w-12 h-12 transition-transform group-hover:scale-105'
            aria-hidden='true'>
            <ChipImage />
          </div>
        </div>

        {/* Middle Row - Card Holder and Valid Info */}
        <div 
          className='flex-[2] flex justify-between items-center' 
          role='group'
          aria-label='Card holder and validity information'>
          <div>
            <p className={labelClass} id={`holder-label-${card.id}`}>
              {labels.cardHolder}
            </p>
            <p 
              className={valueClass}
              aria-labelledby={`holder-label-${card.id}`}>
              {holder}
            </p>
          </div>
          <div>
            <p className={labelClass} id={`valid-label-${card.id}`}>
              {labels.validThru}
            </p>
            <p 
              className={valueClass}
              aria-labelledby={`valid-label-${card.id}`}>
              {validThru}
            </p>
          </div>
          <div className='spacer'>
          </div>
        </div>

        {/* Bottom Row - Card Number and Logo */}
        <div 
          className='flex-1 flex justify-between items-center'
          role='group'
          aria-label='Card number and provider logo'>
          <p 
            className={`text-xl tracking-wider mb-4 ${valueColor}`}
            aria-label={`Card number: ${formattedCardNumber.split(' ').join(' digit ')} digit`}>
            {formattedCardNumber}
          </p>
          <div 
            className='transition-transform group-hover:scale-105'
            aria-hidden={!creditProviderLogo}>
            {creditProviderLogo}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CreditCard.displayName = 'CreditCard';

export default CreditCard;