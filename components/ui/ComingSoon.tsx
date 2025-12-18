
import React from 'react';
import { Section } from './Section';
import { Container } from '../layout/Container';

export const ComingSoon: React.FC<{ title: string }> = ({ title }) => (
  <Section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
    <Container>
      <div className="mx-auto max-w-xl p-12 rounded-3xl bg-white shadow-2xl border border-slate-100">
        <div className="mb-6 mx-auto h-20 w-20 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-4xl">
          ✨
        </div>
        <h1 className="mb-4 text-5xl font-black tracking-tight text-brand-primary font-serif">{title}</h1>
        <div className="mb-8 inline-block rounded-full bg-brand-gold/20 px-6 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-brand-primary">
          Excellence in progress
        </div>
        <p className="text-xl text-slate-500 font-light leading-relaxed">
          We are meticulously crafting this experience to bring you something truly premium. Please check back with us soon.
        </p>
      </div>
    </Container>
  </Section>
);
