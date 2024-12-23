'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopCreditCardList from './desktop/CreditCards';
import MobileCreditCardList from './mobile/CreditCards';

interface Props {
  initialIsMobile: boolean;
  initialCardsData: any[] | null;
  ssrConfig: {
    CARDS_SSR_ENABLED: boolean;
  };
}

const ClientCCList = ({ initialIsMobile, initialCardsData, ssrConfig }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);
  
  return isMobile ? (
    <MobileCreditCardList initialCardsData={initialCardsData} ssrConfig={ssrConfig} />
  ) : (
    <DesktopCreditCardList initialCardsData={initialCardsData} ssrConfig={ssrConfig} />
  );
};

export default ClientCCList;