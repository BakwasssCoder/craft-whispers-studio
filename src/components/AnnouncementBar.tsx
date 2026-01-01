import { Link } from 'react-router-dom';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function AnnouncementBar() {
  const { data: announcements, isLoading } = useAnnouncements();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const activeAnnouncements = announcements?.filter(a => a.is_active) || [];

  useEffect(() => {
    if (activeAnnouncements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeAnnouncements.length]);

  if (isLoading || activeAnnouncements.length === 0 || !isVisible) {
    return null;
  }

  const current = activeAnnouncements[currentIndex];

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 relative overflow-hidden">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center text-sm font-medium flex items-center gap-2 flex-wrap justify-center"
          >
            <span>{current.message}</span>
            {current.link_url && current.link_text && (
              <Link 
                to={current.link_url}
                className="underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold"
              >
                {current.link_text}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {activeAnnouncements.length > 1 && (
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-1">
          {activeAnnouncements.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-primary-foreground' : 'bg-primary-foreground/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
