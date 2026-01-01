import { useState } from 'react';
import { useGalleryImages } from '@/hooks/useGallery';
import { GallerySkeleton } from '@/components/skeletons/GallerySkeleton';
import Lightbox from '@/components/Lightbox';
import { motion } from 'framer-motion';

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const { data: galleryImages, isLoading } = useGalleryImages();

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
            Our Gallery
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Explore our collection of handcrafted pieces
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {isLoading ? (
          <GallerySkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {galleryImages?.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl cursor-pointer"
                onClick={() => handleImageClick(index)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={image.image_url}
                  alt={image.title || 'Gallery image'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                  <div>
                    {image.title && (
                      <p className="text-background text-sm font-semibold">{image.title}</p>
                    )}
                    {image.description && (
                      <p className="text-background/80 text-xs mt-1 line-clamp-2">{image.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && galleryImages?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No images in the gallery yet.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && galleryImages && (
        <Lightbox
          images={galleryImages.map(img => img.image_url)}
          initialIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
