import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';

type SortOption = 'none' | 'price-asc' | 'price-desc' | 'category';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  categories: string[];
}

const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  categories,
}: ProductFiltersProps) => {
  const { isEnglish } = useLocale();
  const { dir } = useTranslations();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-center lg:gap-4">
      {/* Category */}
      <Select value={selectedCategory} onValueChange={onCategoryChange} dir={dir}>
        <SelectTrigger className="w-full bg-white sm:w-auto">
          <SelectValue placeholder={isEnglish ? 'All Categories' : 'جميع الفئات'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {isEnglish ? 'All Categories' : 'جميع الفئات'}
          </SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={sortOption}
        onValueChange={(value) => onSortChange(value as SortOption)}
        dir={dir}
      >
        <SelectTrigger className="w-full bg-white sm:w-auto">
          <SelectValue placeholder={isEnglish ? 'Sort by' : 'ترتيب حسب'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">{isEnglish ? 'No Sort' : 'بدون ترتيب'}</SelectItem>

          <SelectItem value="price-asc">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4" />
              {isEnglish ? 'Price: Low to High' : 'السعر: من الأقل للأعلى'}
            </div>
          </SelectItem>

          <SelectItem value="price-desc">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              {isEnglish ? 'Price: High to Low' : 'السعر: من الأعلى للأقل'}
            </div>
          </SelectItem>

          <SelectItem value="category">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              {isEnglish ? 'Category' : 'الفئة'}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductFilters;
