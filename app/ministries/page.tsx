
import React from 'react';
import { Section } from '../../components/ui/Section';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function MinistriesPage() {
  const ministries = [
    {
      name: 'Royal Intercessors',
      desc: 'The prayer engine of the church, standing in the gap to enforce divine will on earth through continuous and spirit-led intercession.',
      icon: '🔥',
      tag: 'Prayer'
    },
    {
      name: 'Royal Sound',
      desc: 'Dedicated to spirit-led worship and technical excellence, creating an atmosphere where the presence of God is honored through music.',
      icon: '🎸',
      tag: 'Worship & Media'
    },
    {
      name: 'Royal Heralds',
      desc: 'The voice of the Kingdom, committed to the Great Commission through strategic outreach, evangelism, and community impact.',
      icon: '📢',
      tag: 'Outreach'
    },
    {
      name: 'Royal Stewards',
      desc: 'Ensuring order and excellence in the house of God through dedicated service in ushering, protocol, and sanctuary management.',
      icon: '🏛️',
      tag: 'Service'
    },
    {
      name: 'Kingdom Ambassadors',
      desc: 'The heart of hospitality, welcoming visitors and new members into our royal family with love and intentional care.',
      icon: '🤝',
      tag: 'Hospitality'
    },
    {
      name: 'Crown Kids',
      desc: 'Nurturing our children in the way of the Lord, helping them discover their identity as little royal priests from a tender age.',
      icon: '👑',
      tag: 'Children'
    },
    {
      name: 'Heirs',
      desc: 'Our dynamic youth ministry, empowering the next generation to lead with faith, purpose, and uncompromised Kingdom values.',
      icon: '🏹',
      tag: 'Youth'
    },
    {
      name: 'Royal Academy',
      desc: 'The school of discipleship and spiritual growth, dedicated to grounding every believer in sound biblical doctrine and wisdom.',
      icon: '📖',
      tag: 'Discipleship'
    },
    {
      name: 'King’s Affairs',
      desc: 'The administrative arm of the church, overseeing operations, logistics, and organizational excellence to ensure that all Kingdom business is conducted decently and in order.',
      icon: '📋',
      tag: 'Administration'
    }
  ];

  return (
    <div className="bg-brand-offwhite min-h-screen">
      {/* Hero Section */}
      <Section className="bg-brand-primary text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2560&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary via-brand-primary/95 to-brand-primary" />
        
        <Container className="relative z-10 text-center">
          <Badge variant="gold" className="mb-6 px-6 py-2 text-white border border-white/10">Our Royal Assignment</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-sans uppercase tracking-tighter leading-none mb-8">
            Kingdom <span className="text-brand-gold">Ministries</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-slate-300 max-w-4xl mx-auto leading-relaxed">
            At GOFAMINT Royal Priesthood Tabernacle, our ministries are expressions of our calling as a royal priesthood, each serving a unique purpose in building God’s house and advancing His Kingdom.
          </p>
        </Container>
      </Section>

      {/* Intro Text & Grid */}
      <Section className="py-24">
        <Container>
          <div className="max-w-3xl mb-20">
            <h2 className="text-2xl md:text-3xl font-black text-brand-primary uppercase font-sans tracking-tight mb-6">
              A Body of <span className="text-brand-gold">Many Parts</span>
            </h2>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              Every ministry is designed to help believers grow, serve, and function effectively according to their gifts, while working together in unity to glorify God and impact lives. Discover where you fit in the royal tapestry.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {ministries.map((min, i) => (
              <Card key={i} className="group relative p-10 border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[3rem] bg-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="mb-8 h-16 w-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-3xl group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {min.icon}
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">{min.tag}</span>
                    <h3 className="text-2xl font-black text-brand-primary font-sans uppercase tracking-tight mt-1">{min.name}</h3>
                  </div>
                  
                  <p className="text-slate-500 font-light leading-relaxed mb-8">
                    {min.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary opacity-40 group-hover:opacity-100 transition-opacity">
                    Join Ministry 
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section className="pb-32">
        <Container>
          <div className="bg-brand-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2560&auto=format&fit=crop')] opacity-10 grayscale" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-black font-sans uppercase tracking-tighter leading-none">
                Ready to find <br/>
                <span className="text-brand-gold italic font-serif lowercase">your place</span> in service?
              </h2>
              <p className="text-slate-300 text-lg font-light leading-relaxed">
                We believe that every member is a minister. Regardless of your background or skill set, there is a place for you to serve and grow in your royal priesthood.
              </p>
              <div className="pt-4">
                <a href="/contact">
                  <button className="px-12 py-5 bg-brand-gold text-brand-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-goldLight shadow-2xl transition-all hover:scale-105 active:scale-95">
                    Connect With a Ministry
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
