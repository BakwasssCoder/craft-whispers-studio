import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { ProductCardSkeleton } from '@/components/skeletons/ProductCardSkeleton';
import { motion } from 'framer-motion';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    if (categorySlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categorySlug);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products?.filter(p => p.category?.slug === selectedCategory);

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
            Shop Our Collection
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Unique handmade pieces crafted with love
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap gap-2 justify-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => handleCategoryChange('all')}
            className="text-sm"
          >
            All Products
          </Button>
          {!categoriesLoading && categories?.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.slug ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(cat.slug)}
              className="text-sm"
            >
              {cat.name}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {productsLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : (
            filteredProducts?.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <ProductCard 
                  id={product.slug}
                  name={product.name}
                  price={Number(product.price)}
                  discountPrice={product.discount_price ? Number(product.discount_price) : null}
                  image={product.images?.[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800'}
                  category={product.category?.name || 'Handmade'}
                />
              </motion.div>
            ))
          )}
        </div>

        {!productsLoading && filteredProducts?.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => handleCategoryChange('all')}
            >
              View All Products
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
