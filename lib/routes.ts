
export interface NavItemConfig {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItemConfig[];
  isComingSoon?: boolean;
}

export const NAV_ROUTES: NavItemConfig[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'How We Started', href: '/about/how-we-started' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Resources', href: '/resources' },
      { 
        label: 'Members Database', 
        href: 'https://forms.gle/2G4e9M5PBAcByBFL9', 
        isExternal: true 
      },
      { label: 'Sermons', href: '/resources/sermons', isComingSoon: true },
      { label: 'Gallery', href: '/resources/gallery', isComingSoon: true },
    ],
  },
  { label: 'Ministries', href: '/ministries' },
  { label: 'Watch Live', href: '/watch-live' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];
