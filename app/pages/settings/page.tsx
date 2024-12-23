import { type NextPage } from 'next';
import { headers } from 'next/headers';

import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';
import { isMobileUserAgent } from '@/app/services/otherServices/utils';

import ClientSettings from './client';

const CONFIG = {
  SETTINGS_SSR_ENABLED: true
} as const;

const SettingsPage: NextPage = async (): Promise<JSX.Element> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = isMobileUserAgent(userAgent);

  let preFetchedData = null;

  if (CONFIG.SETTINGS_SSR_ENABLED) {
    try {
      const settings = await settingsDataService.getSettingsData(true);
      if (settings) {preFetchedData = settings;}
    } catch (error) {
      console.error('Failed to fetch settings data:', error);
    }
  }

  return (
    <ClientSettings 
      initialIsMobile={initialIsMobile}
      initialSettingsData={preFetchedData}
      ssrConfig={CONFIG}/>
  );
};

export default SettingsPage;