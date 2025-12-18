
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItemConfig } from '../../lib/routes';
import { NavigationService } from '../../lib/navigation-service';
import { Dropdown } from './Dropdown';
import { cn } from '../../lib/utils';

export const DesktopNav: React.FC = () => {
  const pathname = usePathname();
  const [menu, setMenu] = useState<NavItemConfig[]>([]);

  const fetchMenu = () => {
    setMenu(NavigationService.getMenu());
  };

  useEffect(() => {
    fetchMenu();
    window.addEventListener('navigationUpdate', fetchMenu);
    return () => window.removeEventListener('navigationUpdate', fetchMenu);
  }, []);

  return (
    <nav className="hidden lg:flex lg:items-center lg:gap-2">
      {menu.map((route, i) => (
        route.children && route.children.length > 0 ? (
          <Dropdown key={`${route.label}-${i}`} item={route} />
        ) : (
          <Link
            key={`${route.href}-${i}`}
            href={route.href}
            className={cn(
              'px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-all hover:text-brand-primary relative group',
              pathname === route.href ? 'text-brand-primary' : 'text-slate-800'
            )}
          >
            {route.label}
            <span className={cn(
              'absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300',
              pathname === route.href ? 'w-full' : 'w-0 group-hover:w-full'
            )} />
          </Link>
        )
      ))}
      
      {/* CTA Button */}
      <div className="flex items-center ml-4 pl-4 border-l border-slate-200">
        <Link
          href="/contact"
          className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-brand-gold text-brand-primary rounded-lg hover:bg-brand-gold/90 transition-all shadow-md hover:shadow-lg hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Give
        </Link>
      </div>
    </nav>
  );
};
