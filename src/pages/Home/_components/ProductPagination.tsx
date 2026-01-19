import { Button } from '@/components/ui/button';

import useLocale from '@/i18n/useLocale';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) => {
  const { isEnglish } = useLocale();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {isEnglish ? 'Previous' : 'السابق'}
      </Button>
      <span className="text-sm text-muted-foreground">
        {isEnglish
          ? `Page ${currentPage} of ${totalPages}`
          : `صفحة ${currentPage} من ${totalPages}`}
      </span>
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        {isEnglish ? 'Next' : 'التالي'}
      </Button>
    </div>
  );
};

export default ProductPagination;
