'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { BlogService } from '../../lib/blog-service';
import { NavigationService } from '../../lib/navigation-service';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

export default function AdminOverviewPage() {
  const [postsCount, setPostsCount] = useState(0);
  const [menuCount, setMenuCount] = useState(0);

  useEffect(() => {
    setPostsCount(BlogService.getAllPosts().length);
    setMenuCount(NavigationService.getMenu().length);
  }, []);

  const stats = [
    { label: 'Published Words', val: postsCount, icon: '📜', color: 'bg-indigo-500' },
    { label: 'Menu Items', val: menuCount, icon: '🗺️', color: 'bg-brand-gold' },
    { label: 'Royal Members', val: '156', icon: '👑', color: 'bg-brand-primary' },
    { label: 'Global Reach', val: '2.4k', icon: '🌍', color: 'bg-emerald-500' },
  ];

  const recentActivity = [
    { type: 'blog', msg: 'New Prophetic Declaration added: December 2025', time: '2 hours ago' },
    { type: 'nav', msg: 'Menu structure updated by Admin', time: '5 hours ago' },
    { type: 'user', msg: 'New member registration from Morgantown', time: '1 day ago' },
    { type: 'blog', msg: 'November 2025 word was edited', time: '2 days ago' },
  ];

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
          <Card key={stat.label} className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white group hover:scale-[1.02] transition-all">
            <div className={`h-12 w-12 rounded-2xl ${stat.color} text-white flex items-center justify-center text-xl mb-6 shadow-lg shadow-black/5 group-hover:rotate-12 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-4xl font-black text-brand-primary tracking-tighter">{stat.val}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-10 border-none shadow-xl rounded-[3rem] bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl font-black pointer-events-none tracking-tighter uppercase">Activity</div>
            <h3 className="text-lg font-black uppercase tracking-widest text-brand-primary mb-8 border-b border-slate-50 pb-4">Recent Activity</h3>
            <div className="space-y-6">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center text-lg",
                      act.type === 'blog' ? 'bg-indigo-50 text-indigo-500' : 
                      act.type === 'nav' ? 'bg-brand-gold/10 text-brand-gold' : 'bg-emerald-50 text-emerald-500'
                    )}>
                      {act.type === 'blog' ? '✍️' : act.type === 'nav' ? '🛠️' : '👤'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-primary group-hover:text-brand-gold transition-colors">{act.msg}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{act.time}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-brand-primary">View</button>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-8">
            <Link href="/admin/blog/new">
              <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-brand-primary text-white hover:bg-brand-primaryLight transition-colors">
                <span className="text-2xl mb-4 block">➕</span>
                <h4 className="font-black uppercase tracking-widest text-xs text-brand-gold">Fast Track</h4>
                <p className="text-xl font-black tracking-tight mt-2">New Article</p>
              </Card>
            </Link>
            <Link href="/admin/navigation">
              <Card className="p-8 border-none shadow-xl rounded-[2.5rem] bg-white text-brand-primary hover:border-brand-gold border transition-all">
                <span className="text-2xl mb-4 block">🗺️</span>
                <h4 className="font-black uppercase tracking-widest text-xs text-brand-gold">Structural</h4>
                <p className="text-xl font-black tracking-tight mt-2">Edit Menu</p>
              </Card>
            </Link>
          </div>
        </div>
        
        {/* System Health */}
        <div className="space-y-8">
          <Card className="p-10 border-none shadow-xl rounded-[3rem] bg-brand-primary text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-[0.03] transition-opacity" />
            <h3 className="text-lg font-black uppercase tracking-widest text-brand-gold mb-8">Pulse Monitor</h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-slate-400">Database Load</span>
                  <span className="text-brand-gold">12%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-gold w-[12%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="text-slate-400">Media Storage</span>
                  <span className="text-emerald-400">4.2 GB</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[60%]" />
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed">System protected by <br/>Royal Encryption Layers</p>
              </div>
            </div>
          </Card>

          <Card className="p-10 border-none shadow-xl rounded-[3rem] bg-white text-center">
             <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-3xl mx-auto mb-6">⚙️</div>
             <h4 className="text-sm font-black text-brand-primary uppercase tracking-widest">Global Settings</h4>
             <p className="text-[10px] text-slate-400 mt-2">Configure site-wide metadata and SEO parameters.</p>
             <Link href="/admin/settings">
               <Button variant="outline" className="mt-6 w-full rounded-xl border-slate-100">Open Panel</Button>
             </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}