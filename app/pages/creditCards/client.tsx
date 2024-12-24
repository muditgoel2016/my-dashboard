'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';
import { useCreditCards } from '@/app/contexts/CreditCardsContext';

import DesktopCreditCardList from './desktop/CreditCards';
import MobileCreditCardList from './mobile/CreditCards';

interface Props {
  initialIsMobile: boolean;
}

const ClientCCList = ({ initialIsMobile }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);
  const { cardsData, isLoading, error } = useCreditCards();

  if (isLoading) {
    return <div aria-busy="true">Loading...</div>;
  }

  if (error) {
    return <div role="alert">Error: {error.message}</div>;
  }

  return isMobile ? (
    <MobileCreditCardList cardsData={cardsData} />
  ) : (
    <DesktopCreditCardList cardsData={cardsData} />
  );
};

export default ClientCCList;