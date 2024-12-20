// app/pages/dashboard/client.tsx
'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopDashboard from './desktop/Dashboard';
import MobileDashboard from './mobile/Dashboard';

interface Props {
  initialIsMobile: boolean;
}

/**
 * Renders either mobile or desktop dashboard based on viewport size
 * @param initialIsMobile.initialIsMobile
 * @param initialIsMobile - Initial mobile state from server
 */
const ClientDashboard = ({ initialIsMobile }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);
  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
};

export default ClientDashboard;