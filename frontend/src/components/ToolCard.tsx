'use client';

import Link from 'next/link';
import { Tool } from '@/lib/tools';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { IconMap } from '@/lib/icons';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = IconMap[tool.iconName] || ArrowRight;

  return (
    <Link href={`/tools/${tool.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group block p-6 bg-white rounded-xl border hover:border-blue-500 hover:shadow-lg transition-all duration-300 h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-600 transition-colors">
            <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-gray-900">{tool.name}</h3>
        <p className="text-sm text-gray-500">{tool.description}</p>
      </motion.div>
    </Link>
  );
}
