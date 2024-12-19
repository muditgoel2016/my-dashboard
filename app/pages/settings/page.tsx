'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopSettings from './desktop/Settings';
import MobileSettings from './mobile/Settings';

const SettingsPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <MobileSettings /> : <DesktopSettings />;
};

export default SettingsPage;