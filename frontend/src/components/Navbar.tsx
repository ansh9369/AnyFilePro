'use client';

import Link from 'next/link';
import { LayoutGrid, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-600">
          <LayoutGrid className="w-6 h-6" />
          <span>FileConv</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">All Tools</Link>
          <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>

          {user ? (
             <Link href="/dashboard" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                   <User className="w-4 h-4" />
                </div>
                <span>Dashboard</span>
             </Link>
          ) : (
            <>
              <Link href="/auth/login" className="hover:text-blue-600 transition-colors">Login</Link>
              <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
