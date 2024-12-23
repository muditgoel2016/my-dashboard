'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';
import DesktopSettings from './desktop/Settings';
import MobileSettings from './mobile/Settings';

interface Props {
  initialIsMobile: boolean;
  initialSettingsData: any | null;
  ssrConfig: {
    SETTINGS_SSR_ENABLED: boolean;
  };
}

const ClientSettings = ({ 
  initialIsMobile, 
  initialSettingsData, 
  ssrConfig 
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);
  
  return isMobile ? (
    <MobileSettings 
      initialSettingsData={initialSettingsData} 
      ssrConfig={ssrConfig} 
    />
  ) : (
    <DesktopSettings 
      initialSettingsData={initialSettingsData} 
      ssrConfig={ssrConfig} 
    />
  );
};

export default ClientSettings;