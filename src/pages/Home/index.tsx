import { useMemo, useState } from 'react';

import EmptyCase from '@/components/shared/EmptyCase';
import MainLoader from '@/components/shared/loaders/MainLoader';

import ProductFilters from './_components/ProductFilters';
import ProductHeader from './_components/ProductHeader';
import ProductPagination from './_components/ProductPagination';
import ProductsGrid from './_components/ProductsGrid';

import { useProducts } from '@/hooks/features/products/useProducts';

import { Product } from '@/types';

import useLocale from '@/i18n/useLocale';

type SortOption = 'none' | 'price-asc' | 'price-desc' | 'category';

const PRODUCTS_PER_PAGE = 10;

const Home = () => {
  const { products, isLoading, error } = useProducts();
  const { isEnglish } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  
  const categories = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    const uniqueCategories = Array.from(new Set(products.map((p) => p.category)))
    .filter((c) => c && c.trim().length > 0);
    return uniqueCategories as string[];
  }, [products]);


  const filteredAndSortedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    let filtered: Product[] = products;

    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    
    const sorted = [...filtered];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'category') {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    }

    return sorted;
  }, [products, sortOption, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    endIndex,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-error-500">
            {isEnglish ? 'Failed to load products' : 'فشل تحميل المنتجات'}
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyCase
        title={isEnglish ? 'No Products Found' : 'لا توجد منتجات'}
        text={
          isEnglish
            ? 'There are no products available at the moment.'
            : 'لا توجد منتجات متاحة في الوقت الحالي.'
        }
        image="/images/coming.png"
      />
    );
  }

  return (
    <div className="space-y-6">
      <ProductHeader />

      <ProductFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOption={sortOption}
        onSortChange={setSortOption}
        categories={categories}
      />

      <ProductsGrid products={paginatedProducts} />

      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
