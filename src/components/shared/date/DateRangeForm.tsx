import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import CustomCalender from '@/components/shared/form/CustomCalender';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import useTranslations from '@/i18n/useTranslations';
import { zodResolver } from '@hookform/resolvers/zod';

type DateRangeFormProps = {
  onClose?: VoidFunction;
};

const DateRangeForm = ({ onClose = () => {} }: DateRangeFormProps) => {
  const [seachParams, setSearchParams] = useSearchParams();
  const fromDate = seachParams.get('selectedFromDate');
  const toDate = seachParams.get('selectedToDate');

  const { t } = useTranslations('forms');
  const FormSchema = z
    .object({
      fromDate: z.date({
        required_error: t('errors.startDate'),
      }),
      toDate: z.date({
        required_error: t('errors.endDate'),
      }),
    })
    .refine(
      (data) => {
        return (
          new Date(data.toDate).getTime() > new Date(data.fromDate).getTime()
        );
      },
      {
        message: t('errors.dateComparison'),
        path: ['toDate'],
      },
    );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fromDate: fromDate ? new Date(fromDate) : undefined,
      toDate: toDate ? new Date(toDate) : undefined,
    },
  });

  function onReset() {
    const params = new URLSearchParams(seachParams);
    params.delete('fromDate');
    params.delete('toDate');
    params.delete('selectedFromDate');
    params.delete('selectedToDate');
    setSearchParams(params);
    form.reset();
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams(seachParams);
    params.set('pageNumber', '1');
    params.set('fromDate', format(data.fromDate, 'dd-MM-yyyy'));
    params.set('toDate', format(data.toDate, 'dd-MM-yyyy'));
    params.set('selectedFromDate', format(data.fromDate, 'dd-MM-yyyy'));
    params.set('selectedToDate', format(data.toDate, 'dd-MM-yyyy'));

    setSearchParams(params);

    onClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4 max-sm:p-4'
      >
        <CustomCalender
          fieldName='fromDate'
          label={t('labels.startDate')}
          placeholder={t('placeholders.pickADate')}
        />

        <CustomCalender
          fieldName='toDate'
          label={t('labels.endDate')}
          placeholder={t('placeholders.pickADate')}
        />

        <div className='mt-6 flex flex-col justify-start'>
          <Button type='submit'> {t('buttonLabels.apply')}</Button>
          <Button
            type='button'
            variant='ghost'
            className='text-primary-500 hover:bg-transparent hover:text-primary-400'
            onClick={onReset}
          >
            {t('buttonLabels.reset')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DateRangeForm;
