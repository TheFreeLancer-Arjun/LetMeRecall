// components/ui/Loader.tsx
"use client";

import { motion } from "framer-motion";

export const LandingLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-500 dark:bg-gray-900">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};