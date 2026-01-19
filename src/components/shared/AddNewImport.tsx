import Icon from '@/components/shared/Icon';
import UploadImageInput from '@/components/shared/UploadImageInput';
import { Card, CardContent } from '@/components/ui/card';
type Import = {
  text: string;
  gallary: string;
};
function AddNewImport({ text, gallary }: Import) {
  return (
    <Card
      style={{
        borderWidth: '2px',
      }}
      className='flex h-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-secondary-200 bg-secondary-50 transition-colors duration-200 hover:border-transparent hover:bg-white'
    >
      <CardContent className='flex flex-col items-center justify-center gap-2 px-[13px] py-4'>
        <Icon
          name='add'
          className='w-[40px]'
        />

        <UploadImageInput
          fieldName={gallary}
          maxFiles={1}
          maxSize={1}
          imagePlaceholder={''}
          sideText={text}
          icon=''
        />
      </CardContent>
    </Card>
  );
}

export default AddNewImport;
