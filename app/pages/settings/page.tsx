'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopSettings from './desktop/Settings';
import MobileSettings from './mobile/Settings';

/**
 *
 */
export default function SettingsPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileSettings /> : <DesktopSettings />;
}
