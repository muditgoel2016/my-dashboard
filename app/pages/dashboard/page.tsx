'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopDashboard from './desktop/Dashboard';
import MobileDashboard from './mobile/Dashboard';

/**
 * Renders the dashboard page, showing a mobile or desktop version based on the viewport size.
 *
 */
const DashboardPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
};

export default DashboardPage;
