//import { Link } from 'react-router-dom';

import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import Icon from '@/components/shared/Icon';
import { FileInput, FileUploader } from '@/components/ui/file-upload';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

type FileUploadedProps = {
  fieldName: string;
  label?: string;
  isFile?: boolean;
  maxFiles?: number;
  maxSize?: number;
  imagePlaceholder?: string;
  sideText?: string;
  icon?: string;
};

const UploadImageInput = ({
  fieldName,
  label,
  maxFiles = 1,
  maxSize = 4,
  imagePlaceholder,
  sideText,
  icon = '',
}: FileUploadedProps) => {
  const { control, setValue, formState } = useFormContext();
  const { isSubmitting } = formState;

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const acceptedTypes = { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] };

  const dropzoneOptions = {
    maxFiles,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    multiple: maxFiles > 1,
    accept: acceptedTypes as any,
  };

  const handleFileChange = (newFiles: File[] | null) => {
    const updatedFiles = [...files];
    const newPreviews = { ...previews };

    newFiles?.forEach((newFile) => {
      const isDuplicate = updatedFiles.some(
        (file) => file.name === newFile.name && file.size === newFile.size,
      );
      if (!isDuplicate) {
        updatedFiles.push(newFile);

        if (newFile.type.startsWith('image/')) {
          newPreviews[newFile.name] = URL.createObjectURL(newFile);
        }
      }
    });

    setFiles(updatedFiles);
    setPreviews(newPreviews);
    setValue(fieldName, updatedFiles); // Update form value
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const removedFile = files[index];
    const { [removedFile.name]: _, ...updatedPreviews } = previews;

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);

    setValue(fieldName, updatedFiles); // Update form value
  };

  return (
    <FormField
      control={control}
      name={fieldName}
      disabled={isSubmitting}
      render={() => (
        <FormItem>
          {label && (
            <FormLabel
              className={cn(
                'ps-4 text-start text-sm capitalize text-secondary-900',
              )}
            >
              {label} <Icon name={icon} />
            </FormLabel>
          )}

          <FileUploader
            value={files}
            onValueChange={handleFileChange}
            dropzoneOptions={dropzoneOptions}
            reSelect
            className='w-fit bg-inherit [&_div]:opacity-100'
          >
            <FileInput className='opacity-100'>
              <div className='flex items-center gap-x-4'>
                {previews[files?.[0]?.name] ? (
                  <img
                    src={previews[files?.[0]?.name]}
                    className='h-20 w-20 rounded-full object-cover'
                    onClick={() => handleRemoveFile(0)}
                  />
                ) : imagePlaceholder ? (
                  <div>
                    <img
                      src={imagePlaceholder}
                      className='h-20 w-20 rounded-full object-cover'
                    />
                  </div>
                ) : (
                  <div className='w-50 flex items-center justify-center gap-1 rounded-full bg-transparent text-primary-500'>
                    <Icon
                      name='logoPlaceholder'
                      className='w-10'
                    />
                    {sideText}
                    <Icon name={icon} />
                  </div>
                )}
              </div>
            </FileInput>
          </FileUploader>

          <FormMessage className='px-4' />
        </FormItem>
      )}
    />
  );
};

export default UploadImageInput;
