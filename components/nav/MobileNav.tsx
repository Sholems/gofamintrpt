
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItemConfig } from '../../lib/routes';
import { NavigationService } from '../../lib/navigation-service';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface AccordionItemProps {
  item: NavItemConfig;
  onClose: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (!item.children || item.children.length === 0) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          'block py-4 text-lg font-bold uppercase tracking-widest border-b border-slate-50',
          pathname === item.href ? 'text-brand-primary' : 'text-slate-900'
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-slate-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-lg font-bold uppercase tracking-widest text-slate-900"
      >
        {item.label}
        <svg
          className={cn('h-5 w-5 transition-transform text-brand-gold', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="bg-slate-50/50 px-4 pb-4 space-y-2">
          {item.children.map((child, i) => (
             child.isExternal ? (
               <a
                 key={`${child.href}-${i}`}
                 href={child.href}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block py-3 text-base font-semibold text-slate-600 flex justify-between items-center"
               >
                 {child.label}
                 <span className="text-xs text-brand-gold">↗</span>
               </a>
             ) : (
              <Link
                key={`${child.href}-${i}`}
                href={child.href}
                onClick={onClose}
                className={cn(
                  'block py-3 text-base font-semibold',
                  pathname === child.href ? 'text-brand-primary' : 'text-slate-600'
                )}
              >
                <div className="flex items-center justify-between">
                  {child.label}
                  {child.isComingSoon && (
                    <span className="text-[10px] uppercase bg-brand-gold/20 text-brand-primary px-2 rounded-full font-bold">Soon</span>
                  )}
                </div>
              </Link>
             )
          ))}
        </div>
      )}
    </div>
  );
};

export const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState<NavItemConfig[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchMenu = () => {
      if (typeof window !== 'undefined') {
        setMenu(NavigationService.getMenu());
      }
    };
    
    fetchMenu();
    window.addEventListener('navigationUpdate', fetchMenu);
    return () => window.removeEventListener('navigationUpdate', fetchMenu);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-brand-primary hover:text-brand-primaryLight focus:outline-none transition-colors"
      >
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-white transition-all animate-in fade-in duration-300">
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-50">
            <div className="flex items-center">
              <div className="h-16 shrink-0">
                <img 
                  src="https://gofamintrpt.org/royalpriesthood.png" 
                  alt="Royal Priesthood Tabernacle" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-brand-red transition-colors"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            {menu.map((route, i) => (
              <AccordionItem key={`${route.label}-${i}`} item={route} onClose={() => setIsOpen(false)} />
            ))}
          </nav>
          <div className="p-8 bg-slate-50 border-t border-slate-100">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full py-4">Contact Us</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
