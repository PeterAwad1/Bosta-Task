import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import Icon from '../Icon';

import { cn } from '@/lib/utils';

type UserAvatarProps = {
  name: string;
  imageUrl?: string;
  desc?: string;
  time?: string;
  isLinked?: boolean;
  className?: string;
  avatarClassName?: string;
  descClassName?: string;
  nameClassName?: string;
};
const UserAvatar = ({
  name,
  imageUrl,
  desc,
  time = '',
  avatarClassName,
  isLinked = false,
  className,
  descClassName = '',
  nameClassName,
}: UserAvatarProps) => {
  return (
    <div className={cn('group flex items-center gap-x-2.5', className)}>
      <div className='relative'>
        <Avatar className={cn('size-12 rounded-full', avatarClassName)}>
          <AvatarImage
            src={imageUrl || '/svg/avatar.svg'}
            alt={name}
          />
          <AvatarFallback className='rounded-lg'>
            {name?.slice(0, 1).toUpperCase()}
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
          <h3 className={cn('text-secondary-500', nameClassName)}>{name}</h3>
          <p className='text-secondary-400'>{time}</p>
        </div>

        <p className={cn('text-sm text-secondary-400', descClassName)}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;
