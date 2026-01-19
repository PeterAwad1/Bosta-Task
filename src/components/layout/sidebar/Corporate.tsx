import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';

export function Corporate() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <span className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            LS
          </span>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{corporate.name}</span>
            <span className='truncate text-xs'>{corporate.plan}</span>
          </div>
        </SidebarMenuButton> */}
        <div className='w-full px-3 py-4 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0'>
          <img
            src='/svg/logo-text.svg'
            className='group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:object-contain'
            alt='Logo'
          />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
