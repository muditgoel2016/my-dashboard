import { type NextPage } from 'next';
import { headers } from 'next/headers';

import { SettingsProvider } from '@/app/contexts/SettingsContext';
import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';

import ClientSettings from './client';

const CONFIG = {
  SETTINGS_SSR_ENABLED: true,
} as const;

const SettingsPage: NextPage = async (): Promise<JSX.Element> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = /mobile/i.test(userAgent);

  let preFetchedData = null;

  if (CONFIG.SETTINGS_SSR_ENABLED) {
    try {
      preFetchedData = await settingsDataService.getSettingsData(true);
    } catch (error) {
      console.error('Failed to fetch settings data:', error);
    }
  }

  return (
    <SettingsProvider initialData={preFetchedData} ssrConfig={CONFIG}>
      <ClientSettings initialIsMobile={initialIsMobile} />
    </SettingsProvider>
  );
};

export default SettingsPage;
