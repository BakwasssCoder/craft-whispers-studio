import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: 'https://stitched-with-love2.odoo.com/html_editor/image_shape/website.s_image_text_default_image/html_builder/composition/composition_mixed_1.svg?c1=o-color-2&c2=o-color-2&c5=o-color-5',
      alt: 'Our Creations',
      category: 'Embroidery',
    },
    {
      id: 2,
      src: 'https://stitched-with-love2.odoo.com/web/image/1052-a3139396/name.webp',
      alt: 'Our Work',
      category: 'Designs',
    },
    {
      id: 3,
      src: 'https://stitched-with-love2.odoo.com/web/image/website.library_image_10',
      alt: 'Our Collection',
      category: 'Collection',
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