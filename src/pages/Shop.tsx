import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fabric', name: 'Fabric Art' },
    { id: 'hampers', name: 'Gift Hampers' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'home', name: 'Home Decor' },
  ];

  // Mock products
  const products = [
    {
      id: '1',
      name: 'Embroidered Wall Hanging',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
      category: 'fabric',
    },
    {
      id: '2',
      name: 'Custom Gift Hamper',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop',
      category: 'hampers',
    },
    {
      id: '3',
      name: 'Handcrafted Jewelry Set',
      price: 899,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
      category: 'jewelry',
    },
    {
      id: '4',
      name: 'Fabric Coasters Set',
      price: 449,
      image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500&h=500&fit=crop',
      category: 'home',
    },
    {
      id: '5',
      name: 'Macrame Wall Art',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=500&fit=crop',
      category: 'fabric',
    },
    {
      id: '6',
      name: 'Wedding Gift Hamper',
      price: 3299,
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&h=500&fit=crop',
      category: 'hampers',
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Shop Our Collection
          </h1>
          <p className="text-muted-foreground text-lg">
            Unique handmade pieces crafted with love
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} category={categories.find(c => c.id === product.category)?.name || ''} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
