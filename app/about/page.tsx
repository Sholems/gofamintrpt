
import React from 'react';
import { Section } from '../../components/ui/Section';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <h1 className="mb-8 text-4xl font-bold">About Us</h1>
        <div className="grid gap-12 lg:grid-cols-2">
          <Card className="h-80 bg-slate-100 flex items-center justify-center border-dashed">
            Image Placeholder
          </Card>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
            <p className="mb-6 text-slate-600 leading-relaxed">
              Section placeholder for mission statement. Content will be added here to describe the core values and objectives.
            </p>
            <h2 className="mb-4 text-2xl font-semibold">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              Section placeholder for vision statement. More information about the long-term goals of the organization.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
