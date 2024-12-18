'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopCreditCards from './desktop/CreditCards';
import MobileCreditCards from './mobile/CreditCards';

/**
 *
 */
export default function CreditCards() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileCreditCards /> : <DesktopCreditCards />;
}
