'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopDashboard from './desktop/Dashboard';
import MobileDashboard from './mobile/Dashboard';

/**
 *
 */
export default function DashboardPage() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}
