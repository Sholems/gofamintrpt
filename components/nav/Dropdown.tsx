
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { NavItemConfig } from '../../lib/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

interface DropdownProps {
  item: NavItemConfig;
}

export const Dropdown: React.FC<DropdownProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const isActive = item.children?.some(child => pathname === child.href);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative" ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1 px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-all hover:text-brand-primary relative group',
          isActive ? 'text-brand-primary' : 'text-slate-800'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        <span className={cn(
          'absolute bottom-0 left-0 h-0.5 bg-brand-gold transition-all duration-300',
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        )} />
        <svg
          className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
        >
          {item.children?.map((child) => (
            child.isExternal ? (
              <a
                key={child.href}
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-brand-primary hover:text-white transition-colors"
              >
                {child.label}
                <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            ) : (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  'block rounded-lg px-4 py-3 text-sm font-semibold transition-colors',
                  pathname === child.href ? 'bg-brand-primary text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-brand-primary'
                )}
              >
                <div className="flex items-center justify-between">
                  {child.label}
                  {child.isComingSoon && (
                    <span className="text-[9px] uppercase bg-brand-gold/20 text-brand-primary px-1.5 py-0.5 rounded font-bold">Soon</span>
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
