
import React from 'react';
import { Container } from './Container';
import { NAV_ROUTES } from '../../lib/routes';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-brand-primary text-slate-300 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/abina.jpg" 
          alt="Footer Background" 
          className="w-full h-full object-cover opacity-20"
        />
        {/* Color Overlay */}
        <div className="absolute inset-0 bg-brand-primary/90"></div>
      </div>
      <Container className="py-20 relative z-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
             <div className="mb-6">
                <div className="h-16">
                  <img 
                    src="/footer-logo.png" 
                    alt="Royal Priesthood Tabernacle" 
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
            <p className="text-sm leading-relaxed opacity-70">
              A royal community of believers called out to show forth the praises of Him who called us out of darkness into His marvelous light.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">Navigation</h3>
            <ul className="space-y-4">
              {NAV_ROUTES.slice(0, 7).map((route) => (
                <li key={route.href}>
                  <Link href={route.href} className="text-sm hover:text-white transition-colors flex items-center group">
                    <span className="h-0.5 w-0 bg-brand-gold group-hover:w-3 mr-0 group-hover:mr-2 transition-all" />
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">Connect</h3>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <span className="text-brand-gold mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>
                <span>1400 Saratoga Ave, <br/>Morgantown, WV 26505</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-gold mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <span>welcome@gofamintrpt.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">Follow Us</h3>
            <div className="flex flex-col gap-4">
               <div className="flex space-x-4">
                {[
                  { 
                    id: 'facebook', 
                    url: 'https://www.facebook.com/gofamintrpt',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  },
                  { 
                    id: 'instagram', 
                    url: 'https://www.instagram.com/gofamintrpt',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  },
                  { 
                    id: 'youtube', 
                    url: 'https://www.youtube.com/@gofamintrpt',
                    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  }
                ].map((social) => (
                  <a 
                    key={social.id} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-brand-gold hover:text-brand-primary transition-all cursor-pointer border border-white/10"
                    aria-label={social.id}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-[10px] opacity-50 mt-4 leading-loose uppercase tracking-widest">Gospel Faith Mission International</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] opacity-50 uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Royal Priesthood Tabernacle. All rights reserved.</p>
          <div>
            <a href="https://digitaltricks.com.ng/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
              Developed by DigitalTricks
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
