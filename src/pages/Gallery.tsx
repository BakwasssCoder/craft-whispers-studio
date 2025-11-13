import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop',
      alt: 'Embroidered wall art',
      category: 'Fabric Art',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=800&fit=crop',
      alt: 'Gift hamper',
      category: 'Hampers',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
      alt: 'Handcrafted jewelry',
      category: 'Jewelry',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&h=800&fit=crop',
      alt: 'Fabric coasters',
      category: 'Home Decor',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=800&fit=crop',
      alt: 'Macrame wall art',
      category: 'Fabric Art',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=800&fit=crop',
      alt: 'Wedding hamper',
      category: 'Hampers',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Gallery
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our collection of handcrafted pieces
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-background text-sm font-semibold">
                    {image.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-full rounded-2xl shadow-2xl animate-scale-in"
          />
        </div>
      )}
    </div>
  );
}
