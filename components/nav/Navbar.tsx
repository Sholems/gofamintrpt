'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'border-slate-200 bg-white shadow-lg shadow-brand-primary/5' 
        : 'border-slate-100 bg-white/95 backdrop-blur-xl'
    }`}>
      <Container>
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-24'
        }`}>
          <Link href="/" className="flex items-center group">
            {/* Church Logo */}
            <div className={`relative shrink-0 transition-all duration-300 group-hover:scale-105 ${
              isScrolled ? 'h-12' : 'h-20'
            }`}>
              <img 
                src="https://gofamintrpt.org/royalpriesthood.png" 
                alt="Royal Priesthood Tabernacle" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/royalpriesthood.png';
                }}
              />
            </div>
          </Link>
          <DesktopNav />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
};
