'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Settings,
  BarChart3,
  Users,
  Cog,
  Zap,
  HelpCircle,
  Bell,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const clientNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Reports', href: '/reports', icon: FileText },
  { title: 'Campaigns', href: '/campaigns', icon: BarChart3 },
  { title: 'Settings', href: '/settings', icon: Settings },
];

const adminNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Clients', href: '/admin/clients', icon: Users },
  { title: 'Reports', href: '/admin/reports', icon: FileText },
  { title: 'Config', href: '/admin/config', icon: Cog },
];

interface SidebarProps {
  role?: 'admin' | 'client' | 'team_member';
}

export default function Sidebar({ role = 'client' }: SidebarProps) {
  const pathname = usePathname();
  const navItems = role === 'admin' ? adminNavItems : clientNavItems;

  return (
    <aside className="flex w-72 flex-col text-white" style={{ backgroundColor: '#555454', borderRight: '1px solid #535252' }}>
      {/* Logo/Brand */}
      <div className="p-6" style={{ borderBottom: '1px solid #535252' }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">MarketingHub</h2>
            <p className="text-xs text-slate-400">Enterprise Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/50'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 transition-transform',
                isActive ? 'scale-110' : 'group-hover:scale-110'
              )} />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-xs font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4" style={{ borderTop: '1px solid #535252' }}>
        <div className="space-y-1">
          <Link
            href="/help"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700/50 hover:text-white"
          >
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700/50 hover:text-white">
            <Bell className="h-5 w-5" />
            Notifications
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              3
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}

