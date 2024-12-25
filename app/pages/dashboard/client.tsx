// app/pages/dashboard/client.tsx
'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopDashboard from './desktop/Dashboard';
import MobileDashboard from './mobile/Dashboard';

interface Props {
  initialIsMobile: boolean;
  initialDashboardData?: any;
  ssrConfig?: any;
}

const ClientDashboard = ({ initialIsMobile }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);
  const DashboardComponent = isMobile ? MobileDashboard : DesktopDashboard;
  return <DashboardComponent />;
};

export default ClientDashboard;
