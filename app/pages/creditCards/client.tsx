// app/pages/settings/client.tsx
'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopCreditCardList from './desktop/CreditCards';
import MobileCreditCardList from './mobile/CreditCards';

interface Props {
 initialIsMobile: boolean;
}

/**
 * Client component that renders either mobile or desktop view
 * @param {object} props - Component props
 * @param {boolean} props.initialIsMobile - Initial mobile state from server-side detection
 */
const ClientCCList = ({ initialIsMobile }: Props) => {
 const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);
 return isMobile ? <MobileCreditCardList /> : <DesktopCreditCardList />;
};

export default ClientCCList;