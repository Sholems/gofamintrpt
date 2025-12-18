
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { ContactService } from '../../lib/contact-service';
import { AdminAuthService } from '../../lib/admin-auth';
import AdminLogin from './login';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication on mount
    setIsAuthenticated(AdminAuthService.isAuthenticated());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Load unread count
    setUnreadCount(ContactService.getUnreadCount());
    
    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      setUnreadCount(ContactService.getUnreadCount());
    }, 30000);
    
    return () => clearInterval(interval);
  }, [pathname, isAuthenticated]); // Refresh when pathname changes

  const handleLogout = () => {
    AdminAuthService.logout();
    setIsAuthenticated(false);
  };

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-brand-gold border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-white/60 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: '📊' },
    { label: 'Messages', href: '/admin/messages', icon: '💬' },
    { label: 'Manage Blog', href: '/admin/blog', icon: '✍️' },
    { label: 'Navigation', href: '/admin/navigation', icon: '🗺️' },
    { label: 'Ministries', href: '/admin/ministries', icon: '🏛️' },
    { label: 'Subscribers', href: '/admin/subscribers', icon: '📧' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-primary text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl overflow-hidden border border-white/10">
              <img 
                src="/churchlogo.jpeg" 
                alt="Royal Priesthood Tabernacle Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black italic text-white font-serif">Royal CMS</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold">Control Center</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all relative",
                pathname === item.href 
                  ? "bg-brand-gold text-brand-primary shadow-lg shadow-brand-gold/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
              {item.href === '/admin/messages' && unreadCount > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-4">
          <Link href="/" className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-brand-gold transition-colors">
            ← Back to Website
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full text-left text-[10px] font-black uppercase tracking-[0.3em] text-red-400 hover:text-red-300 transition-colors"
          >
            🔒 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-12 sticky top-0 z-40">
          <div>
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">
              {navItems.find(i => i.href === pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleLogout}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
            <div className="text-right">
              <p className="text-xs font-black text-brand-primary">Admin User</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Master Access</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-brand-primary/5 border border-slate-100 flex items-center justify-center text-xl">👑</div>
          </div>
        </header>

        <div className="p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
