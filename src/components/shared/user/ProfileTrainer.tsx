import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import Icon from '../Icon';

import AVATAR from './../../../../public/svg/avatar.svg';

import { cn } from '@/lib/utils';

type UserAvatarProps = {
  name: string;
  imageUrl?: string;
  desc?: string;
  time?: string;
  isLinked?: boolean;
  className?: string;
  classNameAvatar?: string;
  descClassName?: string;
  nameClassName?: string;
};
const ProfileTrainer = ({
  name,
  imageUrl,
  desc,
  time = '',
  isLinked = false,
  className,
  classNameAvatar,
  descClassName = '',
  nameClassName,
}: UserAvatarProps) => {
  return (
    <div className={cn('group flex items-center gap-x-2.5', className)}>
      <div className='relative'>
        <Avatar className={cn('size-20 rounded-full', classNameAvatar)}>
          <AvatarImage
            src={imageUrl || AVATAR}
            alt={name}
          />
          <AvatarFallback className='rounded-lg'>
            {name.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {isLinked && (
          <Icon
            name='linked'
            className='absolute -right-2 top-0'
            fill='#EA5F27'
            stroke='#FDEFE9'
          />
        )}
      </div>

      <div className='flex flex-col items-start'>
        <div className='flex justify-between gap-10'>
          <h3
            className={cn(
              'font-Sora text-2xl font-semibold text-secondary-900',
              nameClassName,
            )}
          >
            {name}
          </h3>
          <p className='text-secondary-400'>{time}</p>
        </div>

        <p className={cn('text-secondary-400', descClassName)}>{desc}</p>
      </div>
    </div>
  );
};

export default ProfileTrainer;
