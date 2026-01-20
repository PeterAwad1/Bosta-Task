import { Link } from 'react-router-dom';

import EmptyCase from '@/components/shared/EmptyCase';
import { Button } from '@/components/ui/button';

type Props = {
  isEnglish: boolean;
};

const ProductNotFound = ({ isEnglish }: Props) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <EmptyCase
        title={isEnglish ? 'Product Not Found' : 'المنتج غير موجود'}
        text={
          isEnglish
            ? 'The product you are looking for does not exist.'
            : 'المنتج الذي تبحث عنه غير موجود.'
        }
        image="/images/coming.png"
      />
      <Link to="/">
        <Button variant="default">
          {isEnglish ? 'Back to Products' : 'العودة للمنتجات'}
        </Button>
      </Link>
    </div>
  );
};

export default ProductNotFound;
