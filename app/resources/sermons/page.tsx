
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Section } from '../../../components/ui/Section';
import { Container } from '../../../components/layout/Container';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { BlogService, BlogPost } from '../../../lib/blog-service';

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : undefined;
  const [post, setPost] = useState<BlogPost | undefined>();

  useEffect(() => {
    if (slug) {
      setPost(BlogService.getPostById(slug));
    }
  }, [slug]);

  if (!post) {
    return (
      <Section className="min-h-[70vh] flex items-center justify-center text-center">
        <Container>
          <div className="max-w-xl mx-auto space-y-8">
            <div className="h-20 w-20 bg-brand-gold/10 rounded-3xl mx-auto flex items-center justify-center text-4xl">✨</div>
            <h1 className="text-4xl font-black text-brand-primary uppercase font-sans tracking-tighter">Article Not Found</h1>
            <p className="text-slate-500 font-light text-lg">We couldn&apos;t find the requested prophetic word. It may have been moved or is yet to be published.</p>
            <Link href="/blog">
              <Button variant="outline" className="rounded-2xl px-8 py-4">Back to Chronicles</Button>
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <article className="bg-white min-h-screen">
      {/* Article Header */}
      <Section className="bg-brand-primary text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <Badge variant="gold">{post.category}</Badge>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-sans uppercase tracking-tighter leading-[0.9] mb-8">
              Prophetic Declaration <br/>
              <span className="text-brand-gold italic font-serif lowercase">for the month of</span> <br/>
              {post.title}
            </h1>
            <p className="text-2xl md:text-3xl font-serif italic text-slate-300">
              &ldquo;{post.subtitle}&rdquo;
            </p>
          </div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section className="py-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Sidebar / Scripture Card */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                {post.scripture && (
                  <div className="p-10 rounded-[2.5rem] bg-brand-offwhite border border-slate-100 shadow-xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black text-brand-gold">“</div>
                     <p className="text-xl font-serif italic text-brand-primary leading-relaxed mb-6">
                      {post.scriptureText}
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-brand-gold" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{post.scripture}</span>
                     </div>
                  </div>
                )}

                <div className="p-8 rounded-[2.5rem] bg-brand-primary text-white text-center">
                  <h4 className="text-sm font-black uppercase tracking-widest text-brand-gold mb-4">Share this Word</h4>
                  <div className="flex justify-center gap-4">
                    {['FB', 'TW', 'WA', 'IN'].map(s => (
                      <div key={s} className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-brand-gold hover:text-brand-primary transition-all">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3 space-y-12">
              <div className="prose prose-slate prose-xl max-w-none">
                <ul className="space-y-8 list-none p-0">
                  {post.points.map((point: string, i: number) => (
                    <li key={i} className="flex gap-6 items-start group">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/5 text-brand-gold border border-brand-gold/20 font-black text-xs transition-colors group-hover:bg-brand-gold group-hover:text-brand-primary">
                        {i + 1}
                      </div>
                      <p className="text-lg md:text-xl text-slate-700 font-light leading-relaxed">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {post.closing && (
                <div className="pt-12 border-t border-slate-100">
                  <div className="p-12 rounded-[3rem] bg-brand-offwhite text-center space-y-6">
                    <p className="text-xl md:text-2xl font-serif italic text-brand-primary">
                      &ldquo;{post.closing}&rdquo;
                    </p>
                    <p className="text-4xl font-black text-brand-gold font-sans uppercase tracking-[0.2em]">Amen.</p>
                  </div>
                </div>
              )}

              <div className="pt-12 flex justify-center">
                <Link href="/blog">
                   <Button variant="outline" className="rounded-2xl px-12 py-5 border-slate-200 text-slate-400 hover:text-brand-primary hover:border-brand-primary">
                      Back to All Chronicles
                   </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
