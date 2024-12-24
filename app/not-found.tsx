import { headers } from 'next/headers';
import { isMobileUserAgent } from '@/app/services/otherServices/utils';
import ClientNotFound from '@/app/components/notFound/client-not-found';

const NotFound = async () => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = isMobileUserAgent(userAgent);

  return (
    <ClientNotFound initialIsMobile={initialIsMobile} />
  );
};

export default NotFound;
