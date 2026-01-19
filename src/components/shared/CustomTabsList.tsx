import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

type TabList = {
  value: string;
  label: string;
};

const CustomTabsList = ({
  tabsList,
  carouselItemClass = '',
}: {
  tabsList: TabList[];
  carouselItemClass?: string;
}) => {
  return (
    <>
      <TabsList
        className={cn(
          'col-span-4 h-fit gap-4 rounded-lg bg-card p-4 max-lg:hidden md:flex md:flex-col lg:col-span-3',
        )}
      >
        {tabsList.map(({ value, label }) => (
          <TabsTrigger
            key={label}
            value={value}
            className='w-full justify-start rounded-lg p-4 text-base'
          >
            <span className='truncate'>{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* //? Mobile Screen */}
      <TabsList className='col-span-12 h-fit gap-4 rounded-lg bg-card p-0 md:hidden'>
        <Carousel className='w-full'>
          <CarouselContent>
            {tabsList.map(({ value, label }) => (
              <CarouselItem
                key={value}
                className={carouselItemClass}
              >
                <TabsTrigger
                  value={value}
                  className='w-full justify-center rounded-lg p-4 text-sm'
                >
                  <span className='truncate'>{label}</span>
                </TabsTrigger>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsList>
    </>
  );
};

export default CustomTabsList;
