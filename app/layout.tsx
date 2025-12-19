
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
  title: 'Royal Priesthood Tabernacle | A Dwelling Place of God\'s Presence',
  description: 'Welcome to Royal Priesthood Tabernacle - Raising believers grounded in the Word, transformed by God\'s presence, and established in their royal priesthood in Christ. Join us for worship, fellowship, and spiritual growth in Morgantown, WV.',
  metadataBase: new URL('https://gofamintrpt.org'),
  keywords: ['Royal Priesthood Tabernacle', 'GOFAMINT', 'Church Morgantown WV', 'Christian Church', 'Worship', 'Bible Study', 'Prayer', 'Kingdom Purpose', 'Royal Identity'],
  authors: [{ name: 'Royal Priesthood Tabernacle' }],
  openGraph: {
    title: 'Royal Priesthood Tabernacle | A Dwelling Place of God\'s Presence',
    description: 'Raising believers grounded in the Word, transformed by God\'s presence, and established in their royal priesthood in Christ.',
    url: 'https://gofamintrpt.org',
    siteName: 'Royal Priesthood Tabernacle',
    images: [
      {
        url: 'https://gofamintrpt.org/royalpriesthood.png',
        width: 1200,
        height: 630,
        alt: 'Royal Priesthood Tabernacle',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Priesthood Tabernacle | A Dwelling Place of God\'s Presence',
    description: 'Raising believers grounded in the Word, transformed by God\'s presence, and established in their royal priesthood in Christ.',
    images: ['https://gofamintrpt.org/royalpriesthood.png'],
  },
  icons: {
    icon: '/royalpriesthood.png',
    shortcut: '/royalpriesthood.png',
    apple: '/royalpriesthood.png',
  },
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
