import { type NextPage } from 'next';
import { headers } from 'next/headers';
import { isMobileUserAgent } from '@/app/services/otherServices/utils';
import { settingsDataService } from '@/app/services/dataServices/settings/settingsDataService';
import ClientSettings from './client';

const SSR_ENABLED = true; // Configurable flag
/**
 * SettingsPage component to render user settings.
 * @returns {Promise<any>} Settings page component with appropriate mobile/desktop view.
 */
const SettingsPage: NextPage = async (): Promise<any> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = isMobileUserAgent(userAgent);

  let preFetchedData = null;
  if (SSR_ENABLED) {
    preFetchedData = await settingsDataService.getSettingsData(SSR_ENABLED);
  }

  return (
    <ClientSettings
      initialIsMobile={initialIsMobile}
      initialSettingsData={SSR_ENABLED ? preFetchedData : null}
    />
  );
};

export default SettingsPage;
