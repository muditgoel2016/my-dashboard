'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopSettings from './desktop/Settings';
import MobileSettings from './mobile/Settings';

interface Props {
  initialIsMobile: boolean;
}

const ClientSettings = ({ initialIsMobile }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);

  return isMobile ? <MobileSettings /> : <DesktopSettings />;
};

export default ClientSettings;
