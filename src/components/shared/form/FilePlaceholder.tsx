import { CloudUpload, ImageUp, Video } from 'lucide-react';

import useLocale from '@/i18n/useLocale';

const ImagePlaceholder = ({
  isImages = false,
  isVideo = false,
}: {
  isImages?: boolean;
  isVideo?: boolean;
}) => {
  const { isEnglish } = useLocale();
  const isArabic = !isEnglish;

  const renderIcon = () => {
    if (isImages) return <ImageUp className='h-10 w-10 text-gray-500' />;
    if (isVideo) return <Video className='h-10 w-10 text-gray-500' />;
    return <CloudUpload className='h-10 w-10 text-gray-500' />;
  };

  return (
    <div className='flex w-full flex-col items-center justify-center p-8 text-center'>
      {renderIcon()}

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
            ? 'الأنواع المسموح بها: SVG، PNG، JPEG أو JPG'
            : isVideo
              ? 'الأنواع المسموح بها: MP4 أو MOV'
              : 'الأنواع المسموح بها: PDF، DOC أو DOCX'
          : isImages
            ? 'SVG, PNG, JPG or JPEG'
            : isVideo
              ? 'MP4 or MOV'
              : 'PDF, DOC or DOCX'}
      </p>
    </div>
  );
};

export default ImagePlaceholder;
