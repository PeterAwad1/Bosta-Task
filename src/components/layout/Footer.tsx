import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import useLocale from '@/i18n/useLocale';

const Footer = () => {
  const { isEnglish } = useLocale();

  // Contact Info
  const CONTACT_INFO = [
    {
      icon: <MapPin className="h-5 w-5" />,
      labelEn: 'Address',
      labelAr: 'العنوان',
      value: '123 Main Street, City Center, Country',
      href: '#',
    },
    {
      icon: <Phone className="h-5 w-5" />,
      labelEn: 'Phone',
      labelAr: 'الهاتف',
      value: '+1 234 567 890',
      href: 'tel:+1234567890',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      labelEn: 'Email',
      labelAr: 'البريد الإلكتروني',
      value: 'support@example.com',
      href: 'mailto:support@example.com',
    },
  ];

  // Social Media Links
  const SOCIAL_LINKS = [
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: '#' },
    { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, href: '#' },
  ];

  

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-[72px]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full ">
                  <img
                    src="/svg/logo.svg"
                    alt="Logo"
                    className="h-12 w-12"
                  />
                </div>
                <span className="text-2xl font-bold text-white">
                  {isEnglish ? 'Bosta' : 'بوسطة'}
                </span>
              </div>
            </Link>
            <p className="text-sm text-neutral-400">
              {isEnglish
                ? 'Your trusted partner for quality products and exceptional service. We deliver excellence every day.'
                : 'شريكك الموثوق للمنتجات عالية الجودة والخدمة المتميزة. نقدم التميز كل يوم.'}
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ name, icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-600 hover:text-white"
                  aria-label={name}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        <div/>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {isEnglish ? 'Contact Us' : 'اتصل بنا'}
            </h3>
            <ul className="space-y-4">
              {CONTACT_INFO.map(({ icon, labelEn, labelAr, value, href }) => (
                <li key={labelEn}>
                  <a
                    href={href}
                    className="flex items-start gap-3 text-sm text-neutral-400 transition-colors hover:text-primary-500"
                  >
                    <span className="mt-0.5 text-primary-500">{icon}</span>
                    <div>
                      <p className="mb-1 text-xs text-neutral-500">
                        {isEnglish ? labelEn : labelAr}
                      </p>
                      <p>{value}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/Download App */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {isEnglish ? 'Stay Connected' : 'ابق على اتصال'}
            </h3>
            <p className="mb-4 text-sm text-neutral-400">
              {isEnglish
                ? 'Subscribe to our newsletter for the latest updates and exclusive offers.'
                : 'اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات والعروض الحصرية.'}
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder={isEnglish ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white placeholder-neutral-500 focus:border-primary-500 focus:outline-none"
              />
              <button className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600">
                {isEnglish ? 'Subscribe' : 'اشترك'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col gap-4 text-center text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              {isEnglish ? 'Brand Name' : 'اسم العلامة التجارية'}.{' '}
              {isEnglish ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-end">
              <Link to="/privacy" className="hover:text-primary-500">
                {isEnglish ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </Link>
              <Link to="/terms" className="hover:text-primary-500">
                {isEnglish ? 'Terms of Service' : 'شروط الخدمة'}
              </Link>
              <Link to="/cookies" className="hover:text-primary-500">
                {isEnglish ? 'Cookie Policy' : 'سياسة ملفات الارتباط'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
