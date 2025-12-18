
import React from 'react';
import Link from 'next/link';
import { Section } from '../../components/ui/Section';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';

export default function ResourcesPage() {
  return (
    <Section>
      <Container>
        <h1 className="mb-12 text-4xl font-bold">Resources</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/resources/sermons">
            <Card className="hover:border-blue-400 transition-colors">
              <h3 className="text-xl font-bold">Sermon Archive</h3>
              <p className="mt-2 text-slate-600">Explore past teachings and messages.</p>
            </Card>
          </Link>
          <Link href="/resources/gallery">
            <Card className="hover:border-blue-400 transition-colors">
              <h3 className="text-xl font-bold">Photo Gallery</h3>
              <p className="mt-2 text-slate-600">Visual highlights of our community and events.</p>
            </Card>
          </Link>
          <a href="https://forms.gle/2G4e9M5PBAcByBFL9" target="_blank" rel="noopener noreferrer">
            <Card className="hover:border-blue-400 transition-colors border-blue-100 bg-blue-50/30">
              <h3 className="text-xl font-bold text-blue-700">Members Database ↗</h3>
              <p className="mt-2 text-slate-600">Access and update your member information.</p>
            </Card>
          </a>
        </div>
      </Container>
    </Section>
  );
}
