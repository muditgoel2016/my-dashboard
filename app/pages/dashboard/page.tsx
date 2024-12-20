import { type NextPage } from 'next';
import { headers } from 'next/headers';

import { isMobileUserAgent } from '@/app/services/otherServices/utils';

import ClientDashboard from './client';

/**
 * Server Component for the Dashboard page.
 * @returns {Promise<any>} Dashboard page component with appropriate mobile/desktop view.
 */
const DashboardPage: NextPage = async (): Promise<any> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = isMobileUserAgent(userAgent);

  return <ClientDashboard initialIsMobile={initialIsMobile} />;
};

export default DashboardPage;
