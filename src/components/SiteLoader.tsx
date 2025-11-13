import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SiteLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function SiteLoader({ isLoading, onComplete }: SiteLoaderProps) {
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading && show) {
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, show, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          {/* Brush stroke animation */}
          <div className="relative w-64 h-64">
            <motion.svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Circular brush stroke */}
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                stroke="hsl(var(--primary))"
                strokeWidth="4"
                fill="none"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1, rotate: 0 }}
                transition={{
                  pathLength: { duration: 1.5, ease: 'easeInOut' },
                  rotate: { duration: 1.5, ease: 'easeInOut' },
                }}
                style={{ originX: '100px', originY: '100px' }}
              />
              
              {/* Inner accent stroke */}
              <motion.circle
                cx="100"
                cy="100"
                r="60"
                stroke="hsl(var(--secondary))"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, rotate: 90 }}
                animate={{ pathLength: 1, rotate: 0 }}
                transition={{
                  pathLength: { duration: 1.2, ease: 'easeInOut', delay: 0.3 },
                  rotate: { duration: 1.2, ease: 'easeInOut', delay: 0.3 },
                }}
                style={{ originX: '100px', originY: '100px' }}
              />
            </motion.svg>
            
            {/* Center text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="text-2xl font-serif font-bold text-primary">
                .sahasclout
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
