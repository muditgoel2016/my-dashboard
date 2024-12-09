// components/layout/mobile/nav.tsx
import { 
  Home, 
  CircleDollarSign,
  Users, 
  BarChart2,
  CreditCard,
  Settings
} from 'lucide-react'
import Link from 'next/link'

const MobileNav = () => {
  const navItems = [
    { icon: <Home size={24} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <CircleDollarSign size={24} />, label: 'Transactions', href: '/transactions' },
    { icon: <Users size={24} />, label: 'Accounts', href: '/accounts' },
    { icon: <Settings size={24} />, label: 'Settings', href: '/settings' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <nav className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-gray-600">{item.icon}</span>
            <span className="text-xs text-gray-600">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default MobileNav;