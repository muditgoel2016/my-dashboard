'use client'
import DesktopNotFound from '@/app/components/notFound/desktop/NotFound';
import MobileNotFound from '@/app/components/notFound/mobile/NotFound';
import useMediaQuery from '@/app/services/otherServices/useMediaQuery';


const ClientNotFound = ({ initialIsMobile }: { initialIsMobile: boolean }) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);

  return isMobile ? <MobileNotFound /> : <DesktopNotFound />;
};

export default ClientNotFound;
