'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';
import DesktopSettings from './desktop/Settings';
import MobileSettings from './mobile/Settings';

interface Props {
  initialIsMobile: boolean;
  initialSettingsData: any; // Pre-fetched data
}

/**
 * Client component that renders either mobile or desktop view
 * @param {object} props - Component props
 * @param {boolean} props.initialIsMobile - Initial mobile state from server-side detection
 * @param {boolean} props.initialSettingsData - Initial settings data from server-side detection
 */
const ClientSettings = ({ initialIsMobile, initialSettingsData }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);

  return isMobile ? (
    <MobileSettings initialSettingsData={initialSettingsData} />
  ) : (
    <DesktopSettings initialSettingsData={initialSettingsData} />
  );
};

export default ClientSettings;
