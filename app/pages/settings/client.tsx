// app/pages/settings/client.tsx
'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';

import DesktopSettings from './desktop/Settings';
import MobileSettings from './mobile/Settings';

interface Props {
 initialIsMobile: boolean;
}

/**
 * Client component that renders either mobile or desktop view
 * @param {object} props - Component props
 * @param {boolean} props.initialIsMobile - Initial mobile state from server-side detection
 */
const ClientSettings = ({ initialIsMobile }: Props) => {
 const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);
 return isMobile ? <MobileSettings /> : <DesktopSettings />;
};

export default ClientSettings;