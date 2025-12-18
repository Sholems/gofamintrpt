'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogService, BlogPost } from '../../../../lib/blog-service';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';

export default function NewBlogPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    title: '',
    subtitle: '',
    category: 'Prophetic Word',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    image: '',
    scripture: '',
    scriptureText: '',
    points: [''],
    closing: '',
    isPublished: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalId = formData.title.toLowerCase().replace(/\s+/g, '-');
    BlogService.savePost({ ...formData, id: finalId });
    router.push('/admin/blog');
  };

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...formData.points];
    newPoints[index] = value;
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ''] });
  };

  const removePoint = (index: number) => {
    const newPoints = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: newPoints });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <Link href="/admin/blog" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand-primary transition-colors flex items-center gap-2">
          <span>←</span> Back to List
        </Link>
        <h2 className="text-3xl font-black text-brand-primary uppercase font-sans tracking-tighter">
          New Article
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-12 border-none shadow-2xl rounded-[3rem] space-y-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Title</label>
              <input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. December 2025"
                className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Subtitle</label>
              <input 
                required
                value={formData.subtitle}
                onChange={e => setFormData({...formData, subtitle: e.target.value})}
                placeholder="Our Month of..."
                className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary"
              />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary appearance-none"
              >
                <option>Prophetic Word</option>
                <option>Teaching</option>
                <option>Testimony</option>
                <option>Announcement</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date</label>
              <input 
                type="date"
                required
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Status</label>
              <select 
                value={formData.isPublished ? 'published' : 'draft'}
                onChange={e => setFormData({...formData, isPublished: e.target.value === 'published'})}
                className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary appearance-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Featured Image URL</label>
            <input 
              required
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Excerpt</label>
            <textarea 
              required
              rows={3}
              value={formData.excerpt}
              onChange={e => setFormData({...formData, excerpt: e.target.value})}
              placeholder="Brief introduction or preview..."
              className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary resize-none"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Scripture Reference</label>
              <input 
                required
                value={formData.scripture}
                onChange={e => setFormData({...formData, scripture: e.target.value})}
                placeholder="e.g. Genesis 13:14-16"
                className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Scripture Text</label>
              <textarea 
                required
                rows={3}
                value={formData.scriptureText}
                onChange={e => setFormData({...formData, scriptureText: e.target.value})}
                placeholder="Full scripture verse..."
                className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary resize-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prophetic Points</label>
              <button type="button" onClick={addPoint} className="text-xs font-black uppercase tracking-widest text-brand-gold hover:text-brand-primary transition-colors">+ Add Point</button>
            </div>
            {formData.points.map((point, index) => (
              <div key={index} className="flex gap-4 items-start">
                <span className="flex-shrink-0 h-10 w-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-primary font-bold mt-1">{index + 1}</span>
                <textarea 
                  rows={2}
                  value={point}
                  onChange={e => handlePointChange(index, e.target.value)}
                  placeholder="Enter prophetic declaration..."
                  className="flex-1 bg-slate-50 border-transparent p-4 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all text-brand-primary resize-none"
                />
                {formData.points.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removePoint(index)}
                    className="flex-shrink-0 h-10 w-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center mt-1"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Closing Statement</label>
            <textarea 
              required
              rows={2}
              value={formData.closing}
              onChange={e => setFormData({...formData, closing: e.target.value})}
              placeholder="Concluding declaration or blessing..."
              className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary resize-none"
            />
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/blog">
            <Button variant="outline" className="px-8 py-4 rounded-2xl">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary" className="px-12 py-4 rounded-2xl shadow-2xl">
            Publish Article
          </Button>
        </div>
      </form>
    </div>
  );
}
