'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { BlogService } from '../../lib/blog-service';
import { NavigationService } from '../../lib/navigation-service';
import { ContactService, ContactMessage } from '../../lib/contact-service';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

export default function AdminOverviewPage() {
  const [postsCount, setPostsCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setPostsCount(BlogService.getAllPosts().length);
    setMenuCount(NavigationService.getMenu().length);
    
    const messages = ContactService.getAllMessages();
    setMessagesCount(messages.length);
    setUnreadCount(ContactService.getUnreadCount());
    setRecentMessages(messages.slice(0, 4)); // Get last 4 messages
  }, []);

  const stats = [
    { label: 'Contact Messages', val: messagesCount, icon: '💬', color: 'bg-brand-primary', link: '/admin/messages' },
    { label: 'Unread Messages', val: unreadCount, icon: '📩', color: unreadCount > 0 ? 'bg-red-500' : 'bg-emerald-500', link: '/admin/messages' },
    { label: 'Blog Posts', val: postsCount, icon: '📜', color: 'bg-indigo-500', link: '/admin/blog' },
    { label: 'Menu Items', val: menuCount, icon: '🗺️', color: 'bg-brand-gold', link: '/admin/navigation' },
  ];

  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-brand-primary uppercase font-sans tracking-tighter">Command Center</h2>
          <p className="text-slate-500 text-sm">Welcome back. The Kingdom is flourishing under your management.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Live</span>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.link}>
            <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white group hover:scale-[1.02] transition-all cursor-pointer">
              <div className={`h-12 w-12 rounded-2xl ${stat.color} text-white flex items-center justify-center text-xl mb-6 shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform`}>
                {stat.icon}
              </div>
              <p className="text-4xl font-black text-brand-primary tracking-tighter">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Messages */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-10 border-none shadow-xl rounded-[3rem] bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl font-black pointer-events-none tracking-tighter uppercase">Messages</div>
            <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
              <h3 className="text-lg font-black uppercase tracking-widest text-brand-primary">Recent Messages</h3>
              <Link href="/admin/messages" className="text-[10px] font-black uppercase tracking-widest text-brand-gold hover:text-brand-primary">
                View All →
              </Link>
            </div>
            
            {recentMessages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-slate-400 text-sm">No messages yet</p>
                <p className="text-slate-300 text-xs mt-1">Messages from the contact form will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recentMessages.map((msg) => (
                  <Link key={msg.id} href="/admin/messages" className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center text-lg",
                        msg.read ? 'bg-slate-100 text-slate-400' : 'bg-brand-gold/10 text-brand-gold'
                      )}>
                        {msg.read ? '✉️' : '📩'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-brand-primary group-hover:text-brand-gold transition-colors">
                            {msg.fullName}
                          </p>
                          {!msg.read && (
                            <span className="h-2 w-2 bg-brand-gold rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate max-w-[300px]">{msg.subject}: {msg.message}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">
                          {formatTimeAgo(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-brand-primary">View</span>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          <div className="grid grid-cols-2 gap-8">
            <Link href="/admin/blog/new">
              <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-brand-primary text-white hover:bg-brand-primaryLight transition-colors">
                <span className="text-2xl mb-4 block">➕</span>
                <h4 className="font-black uppercase tracking-widest text-xs text-brand-gold">Fast Track</h4>
                <p className="text-xl font-black tracking-tight mt-2">New Article</p>
              </Card>
            </Link>
            <Link href="/admin/messages">
              <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white text-brand-primary hover:border-brand-gold border transition-all relative">
                <span className="text-2xl mb-4 block">💬</span>
                <h4 className="font-black uppercase tracking-widest text-xs text-brand-gold">Messages</h4>
                <p className="text-xl font-black tracking-tight mt-2">View Inbox</p>
                {unreadCount > 0 && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Card>
            </Link>
          </div>
        </div>
        
        {/* Quick Links & Status */}
        <div className="space-y-8">
          <Card className="p-10 border-none shadow-xl rounded-[3rem] bg-brand-primary text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-[0.03] transition-opacity" />
            <h3 className="text-lg font-black uppercase tracking-widest text-brand-gold mb-8">Quick Actions</h3>
            <div className="space-y-4">
              <Link href="/admin/messages" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xl">💬</span>
                <div className="flex-1">
                  <p className="text-sm font-bold">Messages</p>
                  <p className="text-[10px] text-slate-400">View contact submissions</p>
                </div>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-xs font-black px-2 py-0.5 rounded-full">{unreadCount}</span>
                )}
              </Link>
              <Link href="/admin/blog" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xl">📜</span>
                <div className="flex-1">
                  <p className="text-sm font-bold">Blog Posts</p>
                  <p className="text-[10px] text-slate-400">Manage articles</p>
                </div>
                <span className="text-xs text-brand-gold">{postsCount}</span>
              </Link>
              <Link href="/admin/navigation" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xl">🗺️</span>
                <div className="flex-1">
                  <p className="text-sm font-bold">Navigation</p>
                  <p className="text-[10px] text-slate-400">Edit menu structure</p>
                </div>
                <span className="text-xs text-brand-gold">{menuCount}</span>
              </Link>
            </div>
          </Card>

          <Card className="p-10 border-none shadow-xl rounded-[3rem] bg-white text-center">
             <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-3xl mx-auto mb-6">🌐</div>
             <h4 className="text-sm font-black text-brand-primary uppercase tracking-widest">Visit Website</h4>
             <p className="text-[10px] text-slate-400 mt-2">Preview how visitors see your site.</p>
             <Link href="/" target="_blank">
               <Button variant="outline" className="mt-6 w-full rounded-xl border-slate-100">Open Website</Button>
             </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}