
import { NavItemConfig } from './routes';

const STORAGE_KEY = 'rpt_navigation_menu';

export const DEFAULT_NAV: NavItemConfig[] = [
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

export const NavigationService = {
  getDefaultMenu: (): NavItemConfig[] => {
    return DEFAULT_NAV;
  },

  getMenu: (): NavItemConfig[] => {
    if (typeof window === 'undefined') {
      return DEFAULT_NAV;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NAV));
      return DEFAULT_NAV;
    }
    return JSON.parse(stored);
  },

  saveMenu: (items: NavItemConfig[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Trigger a custom event so other components can refresh
    window.dispatchEvent(new Event('navigationUpdate'));
  },

  resetToDefault: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NAV));
    window.dispatchEvent(new Event('navigationUpdate'));
  }
};
