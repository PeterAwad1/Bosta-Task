
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomSelect from '@/components/shared/form/CustomSelect';
import CustomTextarea from '@/components/shared/form/CustomTextarea';
import MainLoader from '@/components/shared/loaders/MainLoader';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useGetCategories } from '@/hooks/features/gategory/useGetCategories';
import { useCreateProduct } from '@/hooks/features/products/useCreateProduct';

import useLocale from '@/i18n/useLocale';
import { zodResolver } from '@hookform/resolvers/zod';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { createProduct, isPending } = useCreateProduct();
  const { categories, isLoading: categoriesLoading } = useGetCategories();
  const { isEnglish } = useLocale();

  const productSchema = z.object({
    title: z
      .string({ message: isEnglish ? 'Title is required' : 'العنوان مطلوب' })
      .min(1, isEnglish ? 'Title is required' : 'العنوان مطلوب'),
    description: z
      .string({ message: isEnglish ? 'Description is required' : 'الوصف مطلوب' })
      .min(1, isEnglish ? 'Description is required' : 'الوصف مطلوب'),
    price: z
      .number({ message: isEnglish ? 'Price is required' : 'السعر مطلوب' })
      .positive(isEnglish ? 'Price must be a positive number' : 'يجب أن يكون السعر رقماً موجباً'),
    category: z
      .string({ message: isEnglish ? 'Category is required' : 'الفئة مطلوبة' })
      .min(1, isEnglish ? 'Category is required' : 'الفئة مطلوبة'),
    image: z
      .string({ message: isEnglish ? 'Image URL is required' : 'رابط الصورة مطلوب' })
      .url(isEnglish ? 'Must be a valid URL' : 'يجب أن يكون رابطاً صحيحاً')
      .min(1, isEnglish ? 'Image URL is required' : 'رابط الصورة مطلوب'),
  });

  type ProductFormValues = z.infer<typeof productSchema>;
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      image: '',
    },
  });
  
  const onSubmit = async (values: ProductFormValues) => {
    try {
      await createProduct(values);
      navigate('/');
    } catch (error) {
      console.error('Failed to create/update product:', error);
    }
  };

  if (categoriesLoading) {
    return <MainLoader />;
  }

  const categoryItems =
    categories?.map((cat: string) => ({
      label: cat,
      value: cat,
    })) || [];

  return (
    <div className="mx-auto max-w-2xl space-y-6 border bg-white p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {isEnglish
          ? 'Create New Product'
          : 'إنشاء منتج جديد'}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <CustomInput
            fieldName="title"
            label={isEnglish ? 'Title' : 'العنوان'}
            placeholder={isEnglish ? 'Enter product title' : 'أدخل عنوان المنتج'}
          />

          <CustomTextarea
            fieldName="description"
            label={isEnglish ? 'Description' : 'الوصف'}
            placeholder={
              isEnglish
                ? 'Enter product description'
                : 'أدخل وصف المنتج'
            }
          />

          <CustomInput
            fieldName="price"
            label={isEnglish ? 'Price' : 'السعر'}
            placeholder={isEnglish ? 'Enter price' : 'أدخل السعر'}
            type="number"
          />

          <CustomSelect
            fieldName="category"
            label={isEnglish ? 'Category' : 'الفئة'}
            placeholder={
              isEnglish ? 'Select category' : 'اختر الفئة'
            }
            items={categoryItems}
          />

          <CustomInput
            fieldName="image"
            label={isEnglish ? 'Image URL' : 'رابط الصورة'}
            placeholder={
              isEnglish
                ? 'Enter image URL'
                : 'أدخل رابط الصورة'
            }
            type="url"
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              {isEnglish ? 'Cancel' : 'إلغاء'}
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isPending}
              className="flex-1"
            >
              {isPending ? <Spinner /> : isEnglish ? 'Create Product' : 'إنشاء المنتج'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProduct;
