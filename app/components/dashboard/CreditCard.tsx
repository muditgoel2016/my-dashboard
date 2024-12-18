import React, { ReactNode } from 'react';

import { Card, CardContent } from '@/app/components/shared/common/card';

export interface CardTheme {
  bgColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  creditProviderLogo: ReactNode;
}

export const defaultCardTheme: CardTheme = {
  bgColor: 'bg-[#f8faff]',
  textPrimaryColor: 'text-[#1a1f36]',
  textSecondaryColor: 'text-[#1a1f36]',
  creditProviderLogo: null
};

const CreditCard = ({
  balance,
  holder,
  validThru,
  cardNumber,
  ChipImage,
  theme = defaultCardTheme,
}) => {
  const {
    bgColor,
    textPrimaryColor,
    textSecondaryColor,
    creditProviderLogo,
  } = theme;

  return (
    <Card className={`${bgColor} flex-1 rounded-2xl border-[#e6efff]`}>
      <CardContent className='p-6 h-[235px] flex flex-col'>
        {/* Top Row - Balance and Chip */}
        <div className='flex-1 flex justify-between'>
          <div>
            <p className={`text-sm ${textPrimaryColor}`}>Balance</p>
            <h2 className={`text-2xl font-bold ${textPrimaryColor}`}>${balance}</h2>
          </div>
          <div className='w-12 h-12'>
            <ChipImage />
          </div>
        </div>

        {/* Middle Row - Card Holder and Valid Info */}
        <div className='flex-[2] flex justify-between items-center'>
          <div>
            <p className={`text-xs ${textSecondaryColor}`}>CARD HOLDER</p>
            <p className={`font-medium ${textSecondaryColor}`}>{holder}</p>
          </div>
          <div>
            <p className={`text-xs ${textSecondaryColor}`}>VALID THRU</p>
            <p className={`font-medium ${textSecondaryColor}`}>{validThru}</p>
          </div>
        </div>

        {/* Bottom Row - Card Number and creditProviderLogo */}
        <div className='flex-1 flex justify-between items-center'>
          <p className={`text-xl tracking-wider mb-4 ${textPrimaryColor}`}>
            {cardNumber}
          </p>
          {creditProviderLogo}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCard;