import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-600">
          <LayoutGrid className="w-6 h-6" />
          <span>FileConv</span>
        </Link>
        <div className="space-x-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">All Tools</Link>
          <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Login</a>
        </div>
      </div>
    </nav>
  );
}
