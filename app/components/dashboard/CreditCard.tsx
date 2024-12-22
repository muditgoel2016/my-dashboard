import type { ReactNode } from 'react';
import React from 'react';

import { Card, CardContent } from '@/app/components/shared/common/card';

// Updated interface to include border configuration
interface CardTheme {
  bgColor: string;
  textPrimaryColor: string;
  labelColor: string;
  valueColor: string;
  creditProviderLogo?: ReactNode;
  border?: {
    enabled: boolean;
    value?: string;
  };
  gradients?: {
    overall?: {
      enabled: boolean;
      value: string;
    };
    footer?: {
      enabled: boolean;
      value: string;
    };
  };
  separator?: {
    enabled: boolean;
    value?: string;
  };
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
  valueColor: 'text-[#1a1f36]',
  border: {
    enabled: true,
    value: 'border border-[#e6efff]'
  },
  gradients: {
    overall: {
      enabled: false,
      value: ''
    },
    footer: {
      enabled: false,
      value: ''
    }
  },
  separator: {
    enabled: true,
    value: 'border-t border-[#e6efff]'
  }
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
const baseCardStyles = 'flex-1 rounded-[1.5rem] transition-all duration-200 hover:shadow-lg';
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
    creditProviderLogo,
    gradients,
    separator,
    border
  } = theme;

  const formattedCardNumber = cardNumber.replace(/(.{4})/g, '$1 ').trim();
  
  const cardClassName = `
    ${gradients.overall.enabled ? gradients.overall.value : bgColor}
    ${border.enabled ? border.value : ''}
    ${baseCardStyles}
    ${className}
  `.trim();

  const labelClass = `${baseLabelStyles} ${labelColor}`;
  const valueClass = `${baseTextStyles} ${valueColor}`;

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
        className={`${width} ${height} flex flex-col relative group overflow-hidden`}
        id={`card-${card.id}-details`}>
        {/* Main Content Area */}
        <div className='flex-1 p-6 flex flex-col'>
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
                <span aria-label={`${parseFloat(balance).toLocaleString()} dollars`}>
                  ${balance}
                </span>
              </h2>
            </div>
            <div 
              className='transition-transform group-hover:scale-105'
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
          </div>
        </div>

        {/* Separator */}
        {separator.enabled && (
          <div className={separator.value} />
        )}

        {/* Footer - Card Number and Logo */}
        <div 
          className={`
            h-[70px] px-6 flex justify-between items-center
            ${gradients.footer.enabled ? gradients.footer.value : ''}
          `.trim()}
          role='group'
          aria-label='Card number and provider logo'>
          <p 
            className={`text-xl tracking-wider ${valueColor}`}
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