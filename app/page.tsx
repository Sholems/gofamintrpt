
import React from 'react';
import Link from 'next/link';
import { Section } from '../components/ui/Section';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export default function HomePage() {
  const coreValues = [
    {
      title: "Outreach",
      subtitle: "The Mission",
      desc: "To communicate God’s word and bring people into the saving knowledge of our Lord Jesus Christ.",
      icon: "📢",
      accent: "#7b1fa2"
    },
    {
      title: "Worship",
      subtitle: "The Connection",
      desc: "We seek and are committed to building relationships and intentional partnerships where we can work alongside God's move in our city.",
      icon: "🙌",
      accent: "#b8860b"
    },
    {
      title: "Fellowship",
      subtitle: "The Community",
      desc: "Following Him by turning our focus to global communities and serving our neighbors exactly where they are.",
      icon: "🤝",
      accent: "#4a148c"
    },
    {
      title: "Discipleship",
      subtitle: "The Growth",
      desc: "To educate God’s people to know their positions and privileges in God and grow into spiritual maturity.",
      icon: "📖",
      accent: "#daa520"
    },
    {
      title: "Service",
      subtitle: "The Heart",
      desc: "To demonstrate the tangible love of God by serving others with humility and excellence.",
      icon: "💝",
      accent: "#e53935"
    }
  ];

  return (
    <div className="overflow-hidden bg-brand-offwhite">
      {/* 1. HERO SECTION */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden bg-brand-primary">
        <div 
          className="absolute inset-0 z-0 scale-105 transition-transform duration-[15000ms] hover:scale-100"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=90&w=3840&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-primary via-brand-primary/95 to-transparent opacity-100" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-primary via-transparent to-brand-primary/70 opacity-95" />
        
        <Container className="relative z-20 pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-16 sm:pb-24 md:pb-32 lg:pb-40">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center rounded-full bg-white/10 px-5 py-2 backdrop-blur-xl border border-white/20 animate-fade-in">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold">
                Welcome to a Dwelling Place of God’s Presence
              </span>
            </div>

            <h1 className="mb-8 sm:mb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-sans uppercase leading-[1.1] text-white animate-slide-in-bottom">
              You Are Called Into <br />
              <span className="text-gradient-gold">Your Royal Identity</span> <br />
              And Kingdom Purpose
            </h1>

            <p className="mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-light opacity-95 animate-fade-in animate-delay-300">
              Raising believers who are grounded in the Word, transformed by God’s presence, and established in their royal priesthood in Christ.
            </p>

            <div className="mb-12 flex items-center gap-4 animate-fade-in animate-delay-500">
              <div className="h-px w-10 bg-brand-gold/60" />
              <p className="text-sm md:text-base font-serif italic text-brand-gold tracking-wide">
                A Place Where Priesthood Meets Royalty (1 Peter 2:9)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-in animate-delay-700">
              <Button variant="gold" size="lg" className="group relative overflow-hidden px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 shadow-2xl rounded-2xl text-xs sm:text-sm md:text-base uppercase tracking-widest font-black min-h-[44px]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  👉 Plan Your Visit
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white/40 hover:bg-white hover:text-brand-primary backdrop-blur-md px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-2xl text-xs sm:text-sm md:text-base uppercase tracking-widest font-black transition-all min-h-[44px]">
                👉 Join Us This Sunday
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. QUICK ACTIONS SECTION */}
      <Section className="relative -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-32 z-30 pb-20 sm:pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {[
              { title: "Worship With Us", desc: "Experience spiritual liftment in our weekly services where God's presence is tangible.", icon: "🕊️" },
              { title: "Grow Together", desc: "Connect with small groups to be grounded in the Word and build lasting relationships.", icon: "🌱" },
              { title: "Kingdom Service", desc: "Step into your priesthood by serving our community and manifesting purpose.", icon: "🤝" }
            ].map((feature, i) => (
              <Card key={i} className="group relative overflow-hidden hover:border-brand-gold transition-all duration-700 hover:shadow-2xl p-6 sm:p-8 md:p-10 bg-white border-slate-100 rounded-[2.5rem] shadow-xl min-h-[280px] sm:min-h-[320px]">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 bg-brand-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-1000" />
                <div className="relative z-10">
                  <div className="mb-6 sm:mb-8 h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-3xl sm:text-4xl group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-black text-brand-primary font-sans uppercase tracking-tight leading-none">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm sm:text-base font-light">{feature.desc}</p>
                  <div className="mt-8 h-1 w-12 bg-brand-gold transition-all duration-700 group-hover:w-full rounded-full" />
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. WELCOME SECTION */}
      <Section className="bg-white py-16 sm:py-24 md:py-32 overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="space-y-8 sm:space-y-12 text-center">
              <header className="space-y-4 sm:space-y-6">
                <Badge variant="gold" className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-brand-primary text-sm sm:text-base">A Message from our Pastors</Badge>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-sans text-brand-primary uppercase tracking-tighter leading-[1.05]">
                  Welcome to GOFAMINT <br/>
                  <span className="text-brand-gold">Royal Priesthood Tabernacle</span>
                </h2>
              </header>
              <div className="space-y-6 text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg font-light max-w-prose mx-auto">
                <p>
                  We are delighted to welcome you to <span className="font-bold text-brand-primary uppercase">GOFAMINT Royal Priesthood Tabernacle</span>, a Christ-centered church under the covering of GOFAMINT North America. Whether you are visiting for the first time, seeking a place to grow spiritually, or looking for a church family, we are honored to have you here.
                </p>
                <p>
                  At our church, you will experience heartfelt worship, sound biblical teaching, and a loving community committed to <span className="italic">living the Word, preaching the Word, and teaching the Word of God</span>. We believe every believer is called into a royal priesthood, chosen to walk in faith, purpose, and service.
                </p>
                <blockquote className="font-serif italic text-brand-primary text-lg sm:text-xl border-l-4 sm:border-l-8 border-brand-gold pl-6 sm:pl-10 py-4 bg-brand-offwhite rounded-r-3xl">
                  &ldquo;This is a place where Priesthood meets Royalty, where lives are transformed, faith is strengthened, and God&apos;s presence is honored.&rdquo;
                </blockquote>
                <p>
                  We invite you to worship with us, connect with our ministries, and become part of what God is doing in our community.
                </p>
                <p className="text-brand-primary font-black text-base uppercase tracking-widest pt-4 border-t border-slate-100">
                  You are welcome, valued, and loved.
                </p>
              </div>
              <div className="pt-8 sm:pt-12 flex justify-center items-center gap-4 sm:gap-6">
                 <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-gold font-serif italic text-3xl sm:text-4xl font-bold border-2 border-brand-gold/10">C&D</div>
                 <div>
                    <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-1">With love and blessings,</p>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-brand-primary italic">Pastors Christopher & Damilola Fasinu</h4>
                 </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. UPCOMING EVENT SECTION */}
      <Section className="bg-gradient-to-br from-brand-primary via-purple-900 to-brand-primary py-16 sm:py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/sunday-special.jpeg')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-brand-primary/50 to-brand-primary/90" />
        <Container>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
              {/* Image Column */}
              <div className="lg:w-1/2 w-full max-w-md lg:max-w-none">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-brand-gold/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <img 
                    src="/sunday-special.jpeg" 
                    alt="Sunday Special Service" 
                    className="relative w-full rounded-2xl shadow-2xl border-4 border-brand-gold/30 transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="lg:w-1/2 w-full space-y-8 text-white">
                <div className="space-y-4">
                  <Badge variant="gold" className="bg-brand-gold text-white px-6 py-3 text-sm font-black tracking-wider">UPCOMING EVENT</Badge>
                  <h2 className="text-3xl md:text-4xl font-black font-sans uppercase tracking-tight leading-tight">
                    Sunday Special <br/>
                    <span className="text-brand-gold">Service</span>
                  </h2>
                  <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
                    We have a seat reserved for you. 😊
                  </p>
                </div>

                <div className="space-y-4 text-lg text-white/90 leading-relaxed">
                  <p>
                    Join us this Sunday as we host our <span className="font-bold text-brand-gold">National Overseer, Pst. Taiwo Fagbuyi</span>, for a powerful Sunday Special Service at GOFAMINT, Royal Priesthood Tabernacle.
                  </p>
                </div>

                {/* Event Details */}
                <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">Date</p>
                      <p className="text-lg font-semibold">Sunday, 21st Dec 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">🕙</span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">Time</p>
                      <p className="text-lg font-semibold">10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">Location</p>
                      <p className="text-lg font-semibold">1400 Saratoga Ave, Morgantown, WV 26505</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">✨</span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-brand-gold">Special Feature</p>
                      <p className="text-lg font-semibold">Carol Service</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-lg font-light">
                    Bring a friend and come expectant. See you there. 🙌
                  </p>
                  <p className="text-brand-gold font-bold text-lg">
                    God bless you!!!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. LEGACY SECTION */}
      <Section className="bg-slate-900 text-white relative py-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold opacity-5 skew-x-12 translate-x-1/4" />
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-6">
                <Badge variant="gold" className="bg-brand-gold text-white px-8 py-3 text-sm font-black tracking-[0.2em] shadow-lg shadow-brand-gold/20">Global Vision</Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-sans uppercase tracking-tighter leading-none">
                  From Lagos to <br/><span className="text-brand-gold italic font-serif lowercase">Morgantown</span>
                </h2>
                <p className="text-xl text-slate-300 font-light leading-relaxed">
                  Founded in 1956, GOFAMINT has grown into a global mission with over 2,000 branches. In 2025, that divine vision took root in Morgantown to raise a holy nation of royal priests.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                {[
                  { label: "Founded", val: "1956" },
                  { label: "Global Reach", val: "2,000+" },
                  { label: "Established locally", val: "2025" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-5xl font-black text-brand-gold tracking-tighter">{stat.val}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link href="/about/how-we-started" aria-label="Learn about our church history">
                <Button variant="gold" className="mt-12 rounded-2xl px-10 py-5 group min-h-[44px]">
                  Discover Our History
                  <svg className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Button>
              </Link>
            </div>
            
            <div className="lg:w-1/2 relative">
               <div className="aspect-square bg-gradient-to-br from-brand-primary to-brand-primaryLight rounded-[4rem] p-1 shadow-2xl overflow-hidden group">
                  <div className="h-full w-full rounded-[3.8rem] bg-slate-900 flex flex-col items-center justify-center text-center p-16">
                     <div className="mb-12 relative">
                        <div className="absolute inset-0 animate-ping bg-brand-gold/20 rounded-full" />
                        <div className="h-40 w-40 rounded-full border-2 border-brand-gold/30 flex items-center justify-center text-7xl font-black text-brand-gold bg-brand-primary/20 backdrop-blur-sm relative z-10 shadow-2xl">G</div>
                     </div>
                     <h3 className="text-3xl font-sans font-black uppercase tracking-tight mb-4">A Royal Priesthood</h3>
                     <div className="h-1 w-20 bg-brand-gold mb-6 rounded-full" />
                     <p className="text-xs font-bold uppercase tracking-[0.6em] text-brand-gold">1 Peter 2:9</p>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. IMPACT SECTION */}
      <Section className="py-28 bg-brand-offwhite">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* KINGDOM SUPPORT CARD */}
            <div className="group relative overflow-hidden rounded-[3rem] bg-brand-primary p-10 md:p-14 shadow-xl transition-all duration-700 hover:shadow-2xl hover:shadow-brand-primary/10">
              <div className="absolute -top-10 -right-10 select-none opacity-[0.03] text-[120px] font-black leading-none text-white pointer-events-none tracking-tighter">
                GIVE
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-10 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur-sm">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Kingdom Support</span>
                </div>

                <h2 className="mb-8 flex flex-col gap-1 text-2xl md:text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white">
                  <span>Support</span>
                  <span className="text-brand-gold">Kingdom</span>
                  <span className="text-brand-gold">Advancement</span>
                </h2>

                <div className="mb-12 space-y-5">
                  <p className="font-serif text-xl md:text-2xl italic leading-snug text-slate-200/90 max-w-[90%]">
                    &ldquo;Whatever you give is acceptable if you give it eagerly. And give according to what you have, not what you don&apos;t have.&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-px w-6 bg-brand-gold/40" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">
                      2 Corinthians 8:12
                    </p>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button variant="gold" className="h-14 px-10 rounded-2xl shadow-lg transition-all hover:translate-y-[-2px] active:translate-y-0 group/btn" aria-label="Give donation to support kingdom work">
                    <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest">
                      Give Now
                      <svg className="h-4 w-4 transition-transform group-hover/btn:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* GLOBAL IMPACT CARD */}
            <div className="group relative overflow-hidden rounded-[3rem] bg-brand-primary p-10 md:p-14 shadow-xl transition-all duration-700">
              <div 
                className="absolute inset-0 z-0 scale-105 opacity-30 transition-transform duration-[12000ms] group-hover:scale-100"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=90&w=2560&auto=format&fit=crop")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-primary via-brand-primary/80 to-brand-primary/40" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-10 inline-flex items-center rounded-full bg-brand-gold px-5 py-1.5">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Global Impact</span>
                </div>

                <h2 className="mb-8 flex flex-col gap-1 text-2xl md:text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white">
                  <span>Be a Part of</span>
                  <span className="text-brand-gold">The Great Work</span>
                </h2>

                <p className="mb-12 max-w-sm text-base md:text-lg font-light leading-relaxed text-slate-200/80">
                  Learn about the various ministries we have at <span className="font-bold text-brand-gold uppercase tracking-wider">Royal Priesthood Tabernacle</span> and how you can be a part of the great work God is doing amongst us.
                </p>

                <div className="mt-auto">
                  <Link href="/ministries" aria-label="Learn more about our ministries">
                    <Button variant="outline" className="h-14 px-10 rounded-2xl border-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-brand-primary">
                      <span className="text-[11px] font-black uppercase tracking-widest">Learn More</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. REFINED CORE VALUES SECTION (SACRED PILLARS) */}
      <Section className="bg-brand-offwhite relative overflow-hidden py-32 md:py-48">
        <Container>
          <div className="flex flex-col md:flex-row items-start justify-between mb-24 gap-12">
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-10 bg-brand-gold rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-gold">Our Sacred Pillars</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-sans text-brand-primary uppercase tracking-tighter leading-[0.9]">
                The Heartbeat <br className="hidden md:block" />
                Of <span className="text-brand-gold">Our Faith</span>
              </h2>
            </div>
            <div className="max-w-md pt-4">
              <p className="text-slate-500 text-lg font-serif italic leading-relaxed text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-brand-gold/20 pl-6 md:pl-0 md:pr-6">
                Our core values are the divine compass guiding every action as we fulfill our royal assignment in Christ.
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, idx) => (
              <div 
                key={idx} 
                className="group relative transition-all duration-700"
              >
                <div className="h-full bg-white/80 backdrop-blur-lg border border-slate-100 rounded-[2.5rem] p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden min-h-[320px]">
                  <div className="mb-10">
                    <div className="h-16 w-16 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-3xl transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                      {value.icon}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold">{value.subtitle}</p>
                    <h3 className="text-2xl font-black text-brand-primary font-sans uppercase tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed font-light text-base">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="group">
               <div className="h-full bg-brand-primary rounded-[2.5rem] p-12 shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">Ready to <br/><span className="text-brand-gold italic font-serif lowercase">Experience</span> This?</h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed">Join our next service and witness these values in action.</p>
                    <Button variant="gold" className="w-full rounded-2xl py-5 font-black uppercase tracking-widest text-xs min-h-[44px]" aria-label="Plan your visit to our church">Plan Your Visit</Button>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
