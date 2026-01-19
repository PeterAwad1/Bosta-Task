import Icon from '@/components/shared/Icon';
import { Card, CardContent } from '@/components/ui/card';
type ImportProps = {
  text: string;
};

const ImportButton = ({ text }: ImportProps) => {
  return (
    <Card
      style={{
        borderWidth: '2px',
      }}
      className='flex h-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-secondary-200 bg-transparent transition-colors duration-200 hover:border-transparent hover:bg-white'
    >
      <CardContent className='flex flex-col items-center justify-center gap-2 px-[13px] py-4'>
        <Icon
          name='add'
          className='w-[40px]'
        />
        <p className='text-secondary-400'>{text}</p>
      </CardContent>
    </Card>
  );
};

export default ImportButton;
