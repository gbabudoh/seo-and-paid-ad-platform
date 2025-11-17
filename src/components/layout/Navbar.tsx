'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Button from '@/src/components/ui/Button';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-white" style={{ borderColor: '#DCDCDC' }}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">MarketingHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard" className="text-sm text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <span className="text-sm text-gray-500">{session.user?.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/pricing" className="text-sm text-gray-700 hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

