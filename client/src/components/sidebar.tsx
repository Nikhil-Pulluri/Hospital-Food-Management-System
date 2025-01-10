'use client'

import { cn } from '@/lib/utils'
import { Users, Truck, LayoutDashboard, ChefHat, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/management',
    icon: LayoutDashboard,
  },
  {
    title: 'Patients',
    href: '/management/patients',
    icon: Users,
  },
  // {
  //   title: 'Diet Plans',
  //   href: '/dashboard/diet-plans',
  //   icon: Utensils,
  // },
  {
    title: 'Pantry',
    href: '/management/pantry',
    icon: ChefHat,
  },
  {
    title: 'Delivery',
    href: '/management/delivery',
    icon: Truck,
  },
  // {
  //   title: 'Settings',
  //   href: '/management/settings',
  //   icon: Settings,
  // },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Hospital Food Manager</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors', isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted')}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
