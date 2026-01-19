import { type LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
  onLinkClick,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      active?: boolean;
    }[];
  }[];
  onLinkClick?: () => void;
}) {
  const location = useLocation();

  return (
    <div className='space-y-2'>
      {items.map((group) => (
        <SidebarGroup
          key={group.title}
          className='p-0'
        >
          {/* Group Label */}
          <SidebarGroupLabel className='px-6 font-inter text-sm font-medium text-gray-600'>
            {group.title}
          </SidebarGroupLabel>

          {/* Group Items */}
          <SidebarMenu>
            {group.items?.map((item) => {
              const isActive =
                item.active !== undefined
                  ? item.active
                  : location.pathname === item.url;
              const Icon = item.icon;
              return (
                <SidebarMenuItem
                  key={item.title}
                  className='px-6 group-data-[collapsible=icon]:px-2'
                >
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={`flex items-center justify-start gap-2 rounded-lg py-2 font-inter text-base font-medium transition-colors hover:bg-primary hover:text-white group-data-[collapsible=icon]:justify-center ${
                      isActive
                        ? 'bg-primary text-white hover:bg-primary'
                        : 'text-gray-700'
                    }`}
                  >
                    <Link
                      to={item.url}
                      onClick={onLinkClick}
                    >
                      <div className='flex items-center gap-2 group-data-[collapsible=icon]:gap-0'>
                        {Icon && <Icon className='h-4 w-4' />}
                        <span className='font-inter font-medium group-data-[collapsible=icon]:hidden'>
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </div>
  );
}
