import { useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill-new';

import { FormField, FormLabel, FormMessage } from '@/components/ui/form';

import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';

// util to clean empty HTML
const stripRichText = (html: string) => {
  if (!html) return '';
  return html
    .replace(/<(.|\n)*?>/g, '')
    .replace(/&nbsp;/g, '')
    .trim();
};

const TextToolBar = ({
  fieldName,
  onContentChange,
  label,
}: {
  fieldName: string;
  onContentChange?: () => void;
  label?: string;
}) => {
  const { control } = useFormContext();

  const toolbarOptions = [
    ['bold', 'link'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ direction: 'rtl' }],
    [{ color: [] }],
    [{ align: [] }],
  ];

  const modules = { toolbar: toolbarOptions };

  return (
    <FormField
      name={fieldName}
      control={control}
      defaultValue=''
      render={({ field: { onChange, value } }) => (
        <div className='flex flex-col gap-2'>
          {label && <FormLabel>{label}</FormLabel>}

          <ReactQuill
            modules={modules}
            theme='snow'
            value={value}
            onChange={(content) => {
              // convert empty <p><br></p> to empty string
              const cleanedContent = stripRichText(content) ? content : '';
              onChange(cleanedContent);

              if (onContentChange) onContentChange();
            }}
            placeholder='Start typing...'
            className='h-[400px]'
          />

          <FormMessage />
        </div>
      )}
    />
  );
};

export default TextToolBar;
