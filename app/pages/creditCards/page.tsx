import { type NextPage } from 'next';
import { headers } from 'next/headers';

import { isMobileUserAgent } from '@/app/services/otherServices/utils';

import ClientCCList from './client';

/**
 * Server Component for the CreditCards page.
 * @returns {Promise<any>} CreditCards page component with appropriate mobile/desktop view.
 */
const CreditCards: NextPage = async (): Promise<any> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = isMobileUserAgent(userAgent);

  return <ClientCCList initialIsMobile={initialIsMobile} />;
};

export default CreditCards;
