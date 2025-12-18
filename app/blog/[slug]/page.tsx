'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BlogService, BlogPost } from '@/lib/blog-service';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    const foundPost = BlogService.getPostById(slug);
    
    if (!foundPost) {
      setLoading(false);
      return;
    }
    
    setPost(foundPost);
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <Section className="py-20 text-center">
        <Container>
          <h2 className="text-2xl font-black text-brand-primary font-sans uppercase mb-8">
            Post Not Found
          </h2>
          <p className="text-slate-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog">
            <Button variant="primary" className="rounded-2xl px-10 py-5">
              ← Back to Blog
            </Button>
          </Link>
        </Container>
      </Section>
    );
  }

  return (
    <div className="bg-brand-offwhite min-h-screen">
      {/* Hero Section */}
      <Section className="bg-brand-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <Container className="relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-widest mb-8 hover:text-brand-goldLight transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            Back to Blog
          </Link>
          <Badge variant="gold" className="mb-6">{post.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-sans uppercase tracking-tighter leading-none mb-6">
            {post.title}: <br/>
            <span className="text-brand-gold italic font-serif normal-case">
              {post.subtitle}
            </span>
          </h1>
          <p className="text-slate-300 text-sm uppercase tracking-widest">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </Container>
      </Section>

      {/* Featured Image */}
      <Section className="-mt-12 relative z-20 pb-12">
        <Container>
          <div className="rounded-[3rem] overflow-hidden shadow-3xl">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </Container>
      </Section>

      {/* Content */}
      <Section className="pb-20">
        <Container className="max-w-3xl">
          {/* Scripture */}
          <div className="mb-12 p-8 bg-white rounded-3xl border-l-4 border-brand-gold shadow-lg">
            <p className="text-xs font-black uppercase tracking-widest text-brand-gold mb-4">
              {post.scripture}
            </p>
            <p className="text-lg font-serif italic text-slate-700 leading-relaxed">
              &ldquo;{post.scriptureText}&rdquo;
            </p>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-12">
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Points */}
          {post.points && post.points.length > 0 && post.points[0] && (
            <div className="mb-12">
              <h3 className="text-2xl font-black text-brand-primary uppercase mb-8 font-sans">
                Prophetic Declarations
              </h3>
              <div className="space-y-6">
                {post.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-lg text-slate-700 leading-relaxed pt-1">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Closing */}
          {post.closing && (
            <div className="p-8 bg-brand-primary/5 rounded-3xl border border-brand-gold/20">
              <p className="text-lg font-semibold text-brand-primary italic text-center">
                {post.closing}
              </p>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button variant="outline" className="px-8 py-4 rounded-2xl">
                ← Back to All Posts
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
