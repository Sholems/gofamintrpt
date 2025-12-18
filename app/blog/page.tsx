
'use client';

import React, { useState, useEffect } from 'react';
import { Section } from '../../components/ui/Section';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import Link from 'next/link';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { BlogService, BlogPost } from '../../lib/blog-service';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = BlogService.getAllPosts().filter(p => p.isPublished);
    setPosts(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Section className="py-20 text-center">
        <Container>
           <h2 className="text-2xl font-black text-brand-primary font-sans uppercase">No Articles Found</h2>
        </Container>
      </Section>
    );
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="bg-brand-offwhite min-h-screen">
      {/* Blog Header */}
      <Section className="bg-brand-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <Container className="relative z-10">
          <Badge variant="gold" className="mb-6">Journal & Insights</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-sans uppercase tracking-tighter leading-none mb-6">
            The Royal <span className="text-brand-gold">Chronicles</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
            Nourishment for your spirit, wisdom for your journey, and declarations for your destiny.
          </p>
        </Container>
      </Section>

      {/* Featured Post */}
      <Section className="-mt-12 relative z-20 pb-12">
        <Container>
          <Card className="p-0 border-none shadow-3xl overflow-hidden rounded-[3rem] bg-white group">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 overflow-hidden aspect-[16/10] lg:aspect-auto">
                <img 
                  src={featuredPost.image} 
                  className="h-full w-full object-cover transition-transform duration-[10000ms] group-hover:scale-110" 
                  alt={featuredPost.title}
                />
              </div>
              <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-8">
                  <Badge variant="gold">{featuredPost.category}</Badge>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{new Date(featuredPost.date).toLocaleDateString()}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-brand-primary font-sans uppercase tracking-tighter leading-[0.95] mb-6 group-hover:text-brand-gold transition-colors">
                  {featuredPost.title}: <br/>
                  <span className="italic font-serif normal-case text-brand-gold">{featuredPost.subtitle}</span>
                </h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed mb-10 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-auto">
                  <Link href={`/blog/${featuredPost.id}`}>
                    <Button variant="primary" className="rounded-2xl px-10 py-5 group/btn">
                      Read Full Declaration
                      <svg className="ml-3 h-5 w-5 transition-transform group-hover/btn:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Blog Feed */}
      <Section className="py-20">
        <Container>
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-2xl font-black text-brand-primary font-sans uppercase tracking-tighter">Recent Articles</h2>
            <div className="h-px flex-1 bg-slate-200 mx-8 hidden md:block" />
          </div>
          
          <div className="grid gap-12 md:grid-cols-2">
            {otherPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <div className="space-y-6">
                  <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-lg bg-slate-100 border border-slate-50">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="space-y-4 px-2">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">{post.category}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-2xl font-black text-brand-primary font-sans uppercase tracking-tight group-hover:text-brand-gold transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-brand-primary font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Article
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter / CTA */}
      <Section className="pb-32">
        <Container>
          <div className="bg-brand-gold rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-[0.02] transition-opacity duration-1000" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-brand-primary font-sans uppercase tracking-tighter leading-none">
                Never Miss a <br/>
                <span className="italic font-serif normal-case text-white">Divine Word</span>
              </h2>
              <p className="text-brand-primary/70 text-lg font-light">
                Join our mailing list to receive weekly sermons, prophetic declarations, and community updates directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full sm:w-80 px-8 py-5 rounded-2xl bg-white/40 border border-brand-primary/10 placeholder:text-brand-primary/40 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-brand-primary font-bold"
                />
                <Button className="w-full sm:w-auto px-10 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-primaryLight shadow-2xl">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
