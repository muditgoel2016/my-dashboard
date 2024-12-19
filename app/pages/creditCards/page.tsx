'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopCreditCards from './desktop/CreditCards';
import MobileCreditCards from './mobile/CreditCards';

/**
 * Determines whether to render mobile or desktop view of CreditCards based on screen size.
 * @returns {JSX.Element} The appropriate CreditCards component based on screen size.
 */
const CreditCards: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileCreditCards /> : <DesktopCreditCards />;
};

export default CreditCards;
