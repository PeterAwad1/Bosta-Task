import { Paperclip, Trash2 } from 'lucide-react';
import { DropzoneOptions } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import FilePlaceholder from './FilePlaceholder';

type CustomFileUploaderProps = {
  fieldName: string;
  label: string;
  dropZoneConfig?: DropzoneOptions;
  className?: string;
  fileUrl?: string | null;
  fileName?: string;
  isVideo?: boolean;
};

const CustomFileUploader = ({
  fieldName,
  className,
  label,
  fileUrl,
  fileName,
  isVideo = false,
  dropZoneConfig = {
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
    multiple: true,
  },
}: CustomFileUploaderProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FileUploader
              value={field.value}
              onValueChange={field.onChange}
              dropzoneOptions={dropZoneConfig}
              className={`relative rounded-lg bg-background p-1 ${className}`}
            >
              <FileInput
                id='fileInput'
                className='outline-dashed outline-1 outline-slate-500'
              >
                <FilePlaceholder isVideo={isVideo} />
              </FileInput>

              <FileUploaderContent>
                {field.value?.length > 0 &&
                  field.value.map((file: File, i: number) => {
                    const removeFile = () => {
                      const newFiles = [...field.value];
                      newFiles.splice(i, 1);
                      field.onChange(newFiles);
                    };

                    return (
                      <FileUploaderItem
                        key={i}
                        index={i}
                        className='flex w-full items-center justify-between gap-2'
                      >
                        <div className='flex items-center gap-2'>
                          <Paperclip className='h-4 w-4' />
                          <span className='text-sm'>{file.name}</span>
                        </div>

                        <button
                          type='button'
                          onClick={removeFile}
                          className='text-red-500 hover:text-red-700'
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </FileUploaderItem>
                    );
                  })}

                {(!field.value || field.value.length === 0) && fileUrl && (
                  <FileUploaderItem
                    index={0}
                    className='mt-2 flex w-full items-center justify-between gap-2'
                  >
                    <div className='flex items-center gap-2'>
                      <Paperclip className='h-4 w-4' />
                      <a
                        href={fileUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-blue-600 underline'
                      >
                        {fileName || fileUrl.split('/').pop()}{' '}
                      </a>
                    </div>

                    {!fileUrl && (
                      <button
                        type='button'
                        onClick={() => field.onChange([])}
                        className='text-red-500 hover:text-red-700'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    )}
                  </FileUploaderItem>
                )}
              </FileUploaderContent>
            </FileUploader>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFileUploader;
