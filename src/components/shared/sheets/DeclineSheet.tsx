import Icon from '@/components/shared/Icon';

type DeclineSheetProps = {
  text: string;
};
const DeclineSheet = ({
  text,
  children,
}: React.PropsWithChildren<DeclineSheetProps>) => {
  return (
    <div className='my-auto flex flex-col items-center justify-center gap-8 rounded-l-2xl'>
      <Icon name='declined' />
      <p className='mb-2 text-center font-Sora text-2xl font-semibold text-secondary-900'>
        {text}
      </p>

      {children}
    </div>
  );
};

export default DeclineSheet;
