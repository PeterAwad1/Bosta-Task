import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import useLocale from '@/i18n/useLocale';

interface ProductHeaderProps {
  onCreateProduct?: () => void;
}

const ProductHeader = ({ onCreateProduct }: ProductHeaderProps) => {
  const { isEnglish } = useLocale();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {isEnglish ? 'Products' : 'المنتجات'}
      </h1>

      <Link to="/create-product">
        <Button onClick={onCreateProduct} className="gap-2">
          <Plus className="h-4 w-4" />
          {isEnglish ? 'Create Product' : 'إنشاء منتج'}
        </Button>
      </Link>
    </div>
  );
};

export default ProductHeader;
