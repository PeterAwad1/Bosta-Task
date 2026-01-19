import { cn } from '@/lib/utils';

export const RenderPercent = (value?: number | null) => {
  if (value === null || value === undefined || value === 0) {
    return <span className='text-neutral-400'>--</span>;
  }

  return (
    <span
      className={cn(
        'font-medium',
        value > 0 && 'text-success-600',
        value < 0 && 'text-red-600',
      )}
    >
      {value.toFixed(2)} %
    </span>
  );
};
