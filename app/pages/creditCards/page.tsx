import { type NextPage } from 'next';
import { headers } from 'next/headers';
import { isMobileUserAgent } from '@/app/services/otherServices/utils';
import { dashboardDataService } from '@/app/services/dataServices/dashboard/dashboardDataService';
import ClientCCList from './client';

const CONFIG = {
  CARDS_SSR_ENABLED: true
} as const;

const CreditCards: NextPage = async (): Promise<JSX.Element> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = isMobileUserAgent(userAgent);

  let preFetchedData = null;

  if (CONFIG.CARDS_SSR_ENABLED) {
    try {
      const cards = await dashboardDataService.getCardsData(true);
      if (cards) preFetchedData = cards;
    } catch (error) {
      console.error('Failed to fetch cards data:', error);
    }
  }

  return (
    <ClientCCList 
      initialIsMobile={initialIsMobile}
      initialCardsData={preFetchedData}
      ssrConfig={CONFIG}
    />
  );
};

export default CreditCards;