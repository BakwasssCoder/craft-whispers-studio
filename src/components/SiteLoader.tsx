import { motion, AnimatePresence } from 'framer-motion';

interface SiteLoaderProps {
  isLoading: boolean;
}

export default function SiteLoader({ isLoading }: SiteLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
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
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  pathLength: { duration: 1, ease: 'easeInOut' },
                }}
              />
              
              {/* Inner accent stroke */}
              <motion.circle
                cx="100"
                cy="100"
                r="60"
                stroke="hsl(var(--secondary))"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  pathLength: { duration: 0.8, ease: 'easeInOut', delay: 0.2 },
                }}
              />
            </motion.svg>
            
            {/* Center logo */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <img 
                src="https://i.postimg.cc/yx3FTNGB/Whats-App-Image-2025-11-13-at-18-15-59-4f01a7d0.jpg" 
                alt="saha's Clout Logo" 
                className="h-24 w-24 object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}