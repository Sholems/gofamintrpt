
import React from 'react';
import { Section } from '../../components/ui/Section';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';

export default function WatchLivePage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">Watch Live</h1>
          <Card className="aspect-video flex items-center justify-center bg-slate-900 text-white border-none overflow-hidden">
            <div className="text-center">
              <div className="mb-4 inline-block h-16 w-16 items-center justify-center rounded-full bg-red-600 flex">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Live Stream Placeholder</h2>
              <p className="text-slate-400">The stream will appear here when we go live.</p>
            </div>
          </Card>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Service Times</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <h3 className="font-bold text-blue-600">Sunday Service</h3>
                <p className="text-slate-600">Morning Session: 9:00 AM</p>
              </Card>
              <Card>
                <h3 className="font-bold text-blue-600">Wednesday Bible Study</h3>
                <p className="text-slate-600">Evening Session: 6:00 PM</p>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
