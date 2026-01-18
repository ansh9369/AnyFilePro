'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FileText, Clock, User } from 'lucide-react';
import axios from 'axios';

interface ConversionLog {
  id: string;
  tool_id: string;
  original_filename: string;
  timestamp: string;
  status: string;
}

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState<ConversionLog[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
    if (user) {
      // Mock logs for now, or fetch if API exists
      // In real app: axios.get('/api/users/me/logs')
      setLogs([
        { id: '1', tool_id: 'image-to-pdf', original_filename: 'vacation.jpg', timestamp: new Date().toISOString(), status: 'success' },
        { id: '2', tool_id: 'pdf-to-word', original_filename: 'contract.pdf', timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'success' },
      ]);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
              {user.email[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Total Conversions</h3>
                    <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{logs.length}</p>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">Member Since</h3>
                    <User className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-lg font-bold text-gray-900">Just now</p>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.tool_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.original_filename}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
