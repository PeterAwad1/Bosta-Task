interface ComingSoonProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  showCountdown?: boolean;
  countdownDate?: string;
}

const ComingSoon = ({
  title = 'Coming Soon',
  description = 'We are working hard to bring you something amazing. Stay tuned!',

  imageSrc = '/images/coming.png',
  imageAlt = 'Coming Soon',
  className = '',
  showCountdown = false,
  countdownDate,
}: ComingSoonProps) => {
  return (
    <div className={`flex justify-center p-8 ${className}`}>
      <div className='max-w-md text-center'>
        <div className='mb-2'>
          <img
            src={imageSrc}
            alt={imageAlt}
            className='mx-auto'
          />
        </div>

        <h2 className='mb-4 text-2xl font-semibold text-gray-800'>{title}</h2>
        <p className='mb-6 leading-relaxed text-gray-600'>{description}</p>

        {showCountdown && countdownDate && (
          <div className='mb-6 inline-block rounded-lg border border-slate-200 bg-slate-50 px-4 py-2'>
            <p className='text-sm text-gray-500'>Launching</p>
            <p className='font-medium text-gray-800'>
              {new Date(countdownDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
