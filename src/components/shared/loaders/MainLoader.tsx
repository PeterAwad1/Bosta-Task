import LOADER from '@/assets/gif/loader.gif';

const MainLoader = () => {
  return (
    <div className='relative h-dvh w-full text-center'>
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3'>
        <img
          src={LOADER}
          alt='Loading...'
          width={300}
          height={300}
          className='max-xs:size-56'
          style={{
            filter:
              'brightness(0) saturate(100%) invert(32%) sepia(87%) saturate(3986%) hue-rotate(345deg) brightness(95%) contrast(105%)',
          }}
        />
      </div>
    </div>
  );
};

export default MainLoader;
