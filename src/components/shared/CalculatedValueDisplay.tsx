interface CalculatedValueDisplayProps {
  label: string;
  value: number;
  currency?: string;
  suffix?: string;
  description: string;
  decimalPlaces?: number;
}

const CalculatedValueDisplay = ({
  label,
  value,
  currency = '',
  suffix = '',
  description,
  decimalPlaces = 2,
}: CalculatedValueDisplayProps) => {
  return (
    <div className='rounded-lg bg-neutral-50 p-4'>
      <div className='flex items-center gap-2 text-sm'>
        <span className='font-medium'>{label}:</span>
        {value ? (
          <span className='font-semibold'>
            {currency && `${currency} `}
            {value.toFixed(decimalPlaces)}
            {suffix && ` ${suffix}`}
          </span>
        ) : (
          <span className='font-semibold text-neutral-400'>--</span>
        )}
      </div>

      <p className='mt-1 text-xs text-neutral-500'>{description}</p>
    </div>
  );
};

export default CalculatedValueDisplay;
