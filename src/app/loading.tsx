'use client';
import { motion } from 'framer-motion';
import React from 'react';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <div className="spinner-circle"></div>
      </motion.div>
    </div>
  );
};

export default Loading;
