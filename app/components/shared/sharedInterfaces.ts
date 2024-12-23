export interface MenuItem {
  icon: React.ReactNode;  // More generic type for any icon system
  label: string;
  href: string;
}

export interface NavProps {
  className?: string;
  defaultPath?: string;
}

export interface TopBarProps {
  title?: string;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  onMenuClick?: () => void;
  userName?: string;
}