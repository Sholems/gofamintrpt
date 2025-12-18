
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogService, BlogPost } from '../../../../lib/blog-service';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';

export default function BlogEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string | undefined;
  const isEdit = !!id;

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

  useEffect(() => {
    if (isEdit && id) {
      const post = BlogService.getPostById(id);
      if (post) setFormData(post);
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalId = isEdit ? formData.id : formData.title.toLowerCase().replace(/\s+/g, '-');
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
          {isEdit ? 'Edit Article' : 'New Article'}
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
                <option>Kingdom Finance</option>
                <option>Event Update</option>
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
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Featured Image URL</label>
              <input 
                required
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                placeholder="https://..."
                className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Excerpt</label>
            <textarea 
              required
              value={formData.excerpt}
              onChange={e => setFormData({...formData, excerpt: e.target.value})}
              placeholder="Brief summary for listings..."
              className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-slate-600 h-24 resize-none"
            />
          </div>

          <hr className="border-slate-50" />

          <div className="grid gap-8 md:grid-cols-2">
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Primary Scripture</label>
                <input 
                  value={formData.scripture}
                  onChange={e => setFormData({...formData, scripture: e.target.value})}
                  placeholder="e.g. Genesis 1:1"
                  className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Scripture Text</label>
                <textarea 
                  value={formData.scriptureText}
                  onChange={e => setFormData({...formData, scriptureText: e.target.value})}
                  placeholder="The actual verse..."
                  className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-slate-600 h-24 resize-none"
                />
             </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between ml-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prophetic Points</label>
              <button type="button" onClick={addPoint} className="text-[10px] font-black uppercase text-brand-gold hover:text-brand-primary transition-colors">+ Add Point</button>
            </div>
            {formData.points.map((point, i) => (
              <div key={i} className="flex gap-4">
                <input 
                  required
                  value={point}
                  onChange={e => handlePointChange(i, e.target.value)}
                  placeholder={`Point ${i+1}`}
                  className="flex-1 bg-slate-50 border-transparent p-4 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all text-sm font-medium"
                />
                <button 
                  type="button"
                  onClick={() => removePoint(i)}
                  className="p-4 text-red-300 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Closing Statement</label>
            <input 
              value={formData.closing}
              onChange={e => setFormData({...formData, closing: e.target.value})}
              placeholder="Amen..."
              className="w-full bg-slate-50 border-transparent p-5 rounded-2xl focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-bold text-brand-primary"
            />
          </div>

          <div className="pt-8">
            <Button type="submit" variant="gold" className="w-full h-16 rounded-2xl shadow-2xl shadow-brand-gold/20">
              <span className="text-xs font-black uppercase tracking-[0.3em]">
                {isEdit ? 'Update Declaration' : 'Publish to Chronicles'}
              </span>
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
