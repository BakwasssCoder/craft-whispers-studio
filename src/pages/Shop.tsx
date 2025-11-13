import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'earings', name: 'Earings' },
    { id: 'hijab', name: 'Hijab' },
    { id: 'hijab-pin', name: 'Hijab PIN' },
    { id: 'jewellery', name: 'JEWELLERY' },
  ];

  // New products based on user's request
  const products = [
    {
      id: '1',
      name: 'Earings',
      price: 59,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/2/image_1024/Earings?unique=bf9ba13',
      category: 'earings',
    },
    {
      id: '2',
      name: 'Silver Earings',
      price: 129,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/3/image_1024/Silver%20Earings?unique=26eabc1',
      category: 'earings',
    },
    {
      id: '3',
      name: 'Embroidery Machine Work (customised)',
      price: 1000,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/4/image_1024/Embroidery%20Machine%20Work%20(customised)?unique=8c103ef',
      category: 'jewellery',
    },
    {
      id: '4',
      name: 'Sahaa Earings',
      price: 300,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/5/image_1024/Sahaa%20Earings?unique=6a45268',
      category: 'earings',
    },
    {
      id: '5',
      name: 'Custom Hijab Design',
      price: 800,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/6/image_1024/Custom%20Hijab%20Design?unique=b46a5d9',
      category: 'hijab',
    },
    {
      id: '6',
      name: 'Leaf style brooches',
      price: 200,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/7/image_1024/Leaf%20style%20brooches?unique=d62a7d8',
      category: 'jewellery',
    },
    {
      id: '7',
      name: 'Embroidery hijab',
      price: 1900,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/13/image_1024/Embroidery%20hijab?unique=d86ef6c',
      category: 'hijab',
    },
    {
      id: '8',
      name: 'HANDKERCHIEF',
      price: 266,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/14/image_1024/HANDKERCHIEF?unique=529d99a',
      category: 'hijab',
    },
    {
      id: '9',
      name: 'Black Hijab',
      price: 1600,
      image: 'https://stitched-with-love2.odoo.com/web/image/product.product/15/image_1024/Black%20Hijab?unique=cde27cc',
      category: 'hijab',
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