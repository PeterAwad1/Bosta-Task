import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useLocale from '@/i18n/useLocale';

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

  return (
    <div className="flex flex-wrap gap-4">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={isEnglish ? 'All Categories' : 'جميع الفئات'}
          />
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

      <Select
        value={sortOption}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={isEnglish ? 'Sort by' : 'ترتيب حسب'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">
            {isEnglish ? 'No Sort' : 'بدون ترتيب'}
          </SelectItem>
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
