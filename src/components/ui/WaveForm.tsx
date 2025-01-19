import { motion } from "framer-motion";
// import LotusIcon from '/images/lotus-divider.svg';
import React from 'react';

const WaveForm: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-900">
      {/* Animated Waveform Bars */}
      <div className="flex space-x-2">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="w-2 md:w-3 lg:w-4 h-16 lg:h-20 rounded bg-gradient-to-b from-green-300 to-blue-600"
            animate={{
              scaleY: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          />
        ))}
      </div>

      {/* Animated Lotus SVG */}
      {/* <motion.img 
        src={LotusIcon} 
        alt="Lotus Icon" 
        className="h-16 my-4"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      /> */}

      {/* Loading Text */}
      <p className="mt-2 text-lg lg:text-2xl font-bold text-white">
        Loading...
      </p>

      {/* Supporting Text */}
      <p className="mt-2 text-sm lg:text-base text-gray-300">
        LEMA is personalizing your experience
      </p>

      {/* Screen Reader-Only Label for Accessibility */}
      <span className="sr-only">Loading Wave Form animation</span>
    </div>
  );
};

export default WaveForm;