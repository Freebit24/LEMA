import React from 'react';
import { motion } from 'framer-motion';

export const DeletingAnimation: React.FC = () => {
  const text = 'Deleting...';

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-lg font-semibold text-white mb-4 flex">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.1,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="mr-0.5"
          >
            {char}
          </motion.span>
        ))}
      </div>
      <motion.div
        className="w-12 h-1 bg-white rounded-full"
        animate={{
          opacity: [1, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </div>
  );
};