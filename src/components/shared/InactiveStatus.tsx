import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';

type SessionStatus =
  | 'unassigned'
  | 'notStarted'
  | 'ongoing'
  | 'finished'
  | 'scheduled';

const InactiveStatus = ({
  noOfSession,
  remains,
}: {
  noOfSession?: number;
  remains?: number;
}) => {
  console.log('🚀 ~ SessionStatusCell ~ remains:', remains);
  console.log('🚀 ~ SessionStatusCell ~ noOfSession:', noOfSession);
  const { isEnglish } = useLocale();

  // if (remains <= 0) {
  //   status = 'finished';
  // } else if (remains === noOfSession) {
  //   status = 'scheduled';
  // } else if (remains > 0) {
  //   status = 'ongoing';
  // } else {
  //   status = 'unassigned';
  // }
  const status: SessionStatus = 'unassigned';
  const statusStyle: Record<SessionStatus, string> = {
    notStarted: 'text-secondary-500 bg-secondary-50',
    ongoing: 'text-success-500 bg-success-50',
    finished: 'text-error-500 bg-error-50',
    scheduled: 'text-info-500 bg-info-50',
    unassigned: 'text-warning-700 bg-warning-50',
  };

  const statusLabel: Record<SessionStatus, { en: string; ar: string }> = {
    notStarted: {
      en: 'Not-Assigned',
      ar: 'غير معين',
    },
    ongoing: {
      en: 'Ongoing',
      ar: 'قيد التنفيذ',
    },
    finished: {
      en: 'Finished',
      ar: 'منتهي',
    },
    scheduled: {
      en: 'Scheduled',
      ar: 'مجدول',
    },
    unassigned: {
      en: 'Unassigned',
      ar: 'غير معين',
    },
  };

  return (
    <span
      className={cn(
        'rounded-3xl px-4 py-2 text-sm font-medium',
        statusStyle[status],
      )}
    >
      {isEnglish ? statusLabel[status].en : statusLabel[status].ar}
    </span>
  );
};

export default InactiveStatus;
