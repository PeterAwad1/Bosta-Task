import { CloudUpload, ImageUp } from 'lucide-react';

import useLocale from '@/i18n/useLocale';

const ImagePlaceholder = ({ isImages = false }: { isImages?: boolean }) => {
  const { isEnglish } = useLocale();
  const isArabic = isEnglish ? false : true;
  return (
    <div
      className={`flex w-full flex-col items-center justify-center p-8 ${
        isArabic ? 'text-right' : 'text-left'
      }`}
    >
      {isImages ? (
        <ImageUp className='h-10 w-10 text-gray-500' />
      ) : (
        <CloudUpload className='h-10 w-10 text-gray-500' />
      )}

      <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
        {isArabic ? (
          <>
            <span className='font-semibold'>انقر لرفع</span>
            &nbsp; أو اسحب وأفلت الملفات هنا
          </>
        ) : (
          <>
            <span className='font-semibold'>Click to upload</span>
            &nbsp; or drag 'n' drop
          </>
        )}
      </p>

      <p className='text-xs text-gray-500 dark:text-gray-400'>
        {isArabic
          ? isImages
            ? 'الأنواع المسموح بها: SVG، PNG، JPEG، JPG'
            : 'الأنواع المسموح بها: PDF، DOC، أو DOCX'
          : isImages
            ? 'SVG, PNG, JPG or JPEG'
            : 'PDF, DOC or DOCX'}
      </p>
    </div>
  );
};

export default ImagePlaceholder;
