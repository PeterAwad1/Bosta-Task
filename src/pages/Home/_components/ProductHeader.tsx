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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {isEnglish ? 'Products' : 'المنتجات'}
      </h1>

      <Link to="/create-product" className="w-full sm:w-auto">
        <Button
          onClick={onCreateProduct}
          className="w-full gap-2 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          {isEnglish ? 'Create Product' : 'إنشاء منتج'}
        </Button>
      </Link>
    </div>
  );
};

export default ProductHeader;
