'use client';

import { ReactNode } from 'react';
import Sidebar from '@/src/components/layout/Sidebar';
import { useAuth } from '@/src/hooks/useAuth';
import { useClient } from '@/src/hooks/useClient';
import { signOut } from 'next-auth/react';
import Button from '@/src/components/ui/Button';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { client } = useClient();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="client" />
      <main className="flex-1">
        {/* Enhanced Header */}
        <header className="sticky top-0 z-10 bg-white" style={{ borderBottom: '1px solid #DCDCDC' }}>
          <div className="flex items-center justify-between px-8 py-4">
            {/* Left Section */}
            <div className="flex-1">
              {user && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Welcome back, {user.name || user.email?.split('@')[0] || 'User'}!
                  </h2>
                  {client && (
                    <p className="mt-0.5 text-sm text-gray-600">
                      {client.companyName} • <span className="font-medium capitalize">{client.packageTier}</span> Plan
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Notifications */}
              <button className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white">
                  {user?.name?.[0] || user?.email?.[0] || 'U'}
                </div>
                <div className="hidden text-left lg:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">Client</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>

              {/* Sign Out */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="hidden xl:inline-flex"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

