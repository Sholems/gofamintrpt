
import React from 'react';
import { Navbar } from '../components/nav/Navbar';
import { Footer } from '../components/layout/Footer';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['700'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: 'Royal Priesthood Tabernacle | GOFAMINT',
  description: 'Raising believers who are grounded in the Word, transformed by God\'s presence, and established in their royal priesthood in Christ.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
