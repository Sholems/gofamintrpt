
'use client';

import React, { useState, useEffect } from 'react';
import { BlogService, BlogPost } from '../../../lib/blog-service';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import Link from 'next/link';
import { cn } from '../../../lib/utils';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(BlogService.getAllPosts());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      BlogService.deletePost(id);
      setPosts(BlogService.getAllPosts());
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-brand-primary uppercase font-sans tracking-tighter">Manage Articles</h2>
          <p className="text-slate-500 text-sm mt-1">Create, edit, and organize your prophetic words and teachings.</p>
        </div>
        <Link href="/admin/blog/new">
          <Button variant="gold" className="px-8 py-4 rounded-2xl shadow-xl shadow-brand-gold/20">
            <span className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
              Add New Post
              <span className="text-lg">+</span>
            </span>
          </Button>
        </Link>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-xl rounded-[2.5rem] bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Post Details</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                      <img src={post.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-brand-primary group-hover:text-brand-gold transition-colors">{post.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <Badge variant="purple" className="text-[9px]">{post.category}</Badge>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", post.isPublished ? "bg-green-500" : "bg-slate-300")} />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      {post.isPublished ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <button className="p-3 rounded-xl bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-white transition-all">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="text-4xl">📭</div>
            <p className="text-slate-400 font-bold uppercase tracking-widest">No articles found</p>
          </div>
        )}
      </Card>
    </div>
  );
}
