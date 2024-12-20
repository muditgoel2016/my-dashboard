import { type NextPage } from 'next';
import { headers } from 'next/headers';

import { isMobileUserAgent } from '@/app/services/otherServices/utils';

import ClientSettings from './client';

/**
 * SettingsPage component to render user settings.
 * @returns {Promise<any>} Settings page component with appropriate mobile/desktop view.
 */
const SettingsPage: NextPage = async (): Promise<any> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = isMobileUserAgent(userAgent);

  return <ClientSettings initialIsMobile={initialIsMobile} />;
};

export default SettingsPage;
