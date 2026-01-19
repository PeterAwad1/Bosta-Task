import Logo from './Logo';
import NavLinks from './NavLinks';

const SideBar = () => {
  return (
    <aside
      className='group fixed inset-y-0 z-10 hidden w-20 flex-col overflow-hidden bg-white md:flex md:gap-40 ltr:left-0 rtl:right-0'
      style={{ boxShadow: '4px 0px 19px 0px #0000000A' }}
    >
      <nav className='flex flex-col items-center pt-4'>
        <Logo className='mb-8' />
        <NavLinks />
      </nav>
    </aside>
  );
};

export default SideBar;
