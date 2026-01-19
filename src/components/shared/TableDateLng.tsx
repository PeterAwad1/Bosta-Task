import { format, parse } from 'date-fns';
import { ar } from 'date-fns/locale';

import useLocale from '@/i18n/useLocale';

type TableDateLngProps = {
  date: string;
  time?: boolean;
};

const TableDateLng = ({ date, time = false }: TableDateLngProps) => {
  const { isEnglish } = useLocale();

  let parsedDate: Date;

  // Detect ISO format automatically
  const isoDate = new Date(date);
  if (!isNaN(isoDate.getTime())) {
    parsedDate = isoDate; // ISO case
  } else {
    // Otherwise parse dd-MM-yyyy
    parsedDate = parse(date, 'dd-MM-yyyy', new Date());
  }

  // Final fallback
  if (isNaN(parsedDate.getTime())) {
    return <p>Invalid Date</p>;
  }

  const formattedDate = format(parsedDate, 'd MMM yyyy', {
    locale: isEnglish ? undefined : ar,
  });

  const formattedTime = format(parsedDate, 'h:mm a', {
    locale: isEnglish ? undefined : ar,
  });

  return (
    <>
      <p>{formattedDate}</p>
      {time && <p>{formattedTime}</p>}
    </>
  );
};

export default TableDateLng;
