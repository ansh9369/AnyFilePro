'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
        >
          Every tool you need to work with PDFs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          All the tools you need to become more productive and work smarter with documents.
          100% Free and Secure.
        </motion.p>
      </section>
  );
}
