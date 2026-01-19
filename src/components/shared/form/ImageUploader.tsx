import { ReactNode } from 'react';

import { DropzoneOptions } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { FileInput, FileUploader } from '@/components/ui/file-upload';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import ImageUploaderPlaceholder from './ImageUploaderPlaceholder';

type ImageUploaderProps = {
  fieldName: string;
  label?: string;
  imageUrl?: string;
  dropZoneConfig?: DropzoneOptions;
  children?: ReactNode;
};

const ImageUploader = ({
  fieldName,
  label,
  imageUrl,
  dropZoneConfig = {
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/svg+xml': ['.svg'],
    },
    maxSize: 1024 * 1024 * 5,
    multiple: false,
  },
  children,
}: ImageUploaderProps) => {
  const form = useFormContext();
  const { setValue, trigger, watch } = form;

  // WATCH THE FORM VALUE
  const fieldValue = watch(fieldName);

  // BUILD PREVIEW FROM RHF VALUE
  const previewImage =
    fieldValue && fieldValue.length > 0
      ? URL.createObjectURL(fieldValue[0])
      : imageUrl || '';

  const handleRemoveImage = async () => {
    setValue(fieldName, [], { shouldValidate: true });
    await trigger(fieldName);
  };

  const handleImageChange = async (newFile: File[] | null) => {
    setValue(fieldName, newFile ?? [], { shouldValidate: true });
    await trigger(fieldName);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <FileUploader
              value={field.value}
              onValueChange={handleImageChange}
              dropzoneOptions={dropZoneConfig}
              className='relative rounded-lg bg-background p-2'
            >
              <FileInput id='imageInput'>
                {previewImage ? (
                  <div className='text-center'>
                    <img
                      src={previewImage}
                      alt='Preview'
                      className='mx-auto mb-2 size-24 rounded-lg object-cover'
                    />
                    <button
                      type='button'
                      onClick={handleRemoveImage}
                      className='text-sm text-red-500 hover:text-red-700'
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  children || <ImageUploaderPlaceholder label='Upload image' />
                )}
              </FileInput>
            </FileUploader>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUploader;
