
import React from 'react';
import { Section } from '../../../components/ui/Section';
import { Container } from '../../../components/layout/Container';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Divider } from '../../../components/ui/Divider';

export default function HowWeStartedPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <Section className="bg-brand-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=90&w=3840&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <Container className="relative z-10">
          <Badge variant="gold" className="mb-6">Our Heritage</Badge>
          <h1 className="text-4xl md:text-6xl font-black font-sans uppercase tracking-tight leading-none mb-6">
            How We Started
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-brand-gold max-w-2xl">
            How the GOFAMINT became a Global Movement
          </p>
        </Container>
      </Section>

      {/* Early Beginnings */}
      <Section className="pb-12">
        <Container>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-black font-sans text-brand-primary uppercase tracking-tight">Early Beginning</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                The Gospel Faith Mission International, the Church with the Word for the World, founded on the Solid Rock by God, through a small group of committed men and women led by the late <span className="font-bold text-brand-primary">Pastor (Dr) R. A. George</span> in Lagos, Nigeria, has transformed into a divine legacy that has today assumed a global dimension.
              </p>
              <div className="bg-slate-50 p-8 rounded-2xl border-l-4 border-brand-gold italic text-slate-700 font-serif text-lg">
                "It all began with Brother Reuben Akinwalere George, a dynamic leader who had always felt a deep conviction of the call of God on his life."
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1529070538074-18b14b624317?q=90&w=2070&auto=format&fit=crop" 
                  alt="Founding years" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Founding Fathers Timeline */}
      <Section className="bg-slate-50">
        <Container>
          <h2 className="text-3xl font-black font-sans text-brand-primary uppercase tracking-tight mb-12 text-center">Our Founding Fathers & Milestones</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8 border-none shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-2 w-full bg-brand-gold" />
              <div className="flex flex-col md:flex-row gap-8">
                <div className="text-4xl font-black text-brand-gold/30 shrink-0">1956</div>
                <div>
                  <h3 className="text-xl font-bold text-brand-primary mb-3">The Birth of a Fellowship</h3>
                  <p className="text-slate-600 leading-relaxed">
                    R.A. George started a fellowship and Bible Study Group at his residence in Lagos, Nigeria. This group began to grow and later moved to a building in Lagos, eventually spreading to other parts of Nigeria and the world.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-none shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-2 w-full bg-brand-primary" />
              <div className="flex flex-col md:flex-row gap-8">
                <div className="text-4xl font-black text-brand-primary/20 shrink-0">1967</div>
                <div>
                  <h3 className="text-xl font-bold text-brand-primary mb-3">Incorporation & Expansion</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The Gospel Faith Mission International became an incorporated body in Nigeria in October 1967. The first Annual Convention was held in Lagos from November 4 – 7, 1966, with 300 attendees.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-none shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-2 w-full bg-brand-gold" />
              <div className="flex flex-col md:flex-row gap-8">
                <div className="text-4xl font-black text-brand-gold/30 shrink-0">1987</div>
                <div>
                  <h3 className="text-xl font-bold text-brand-primary mb-3">Leadership Transition</h3>
                  <p className="text-slate-600 leading-relaxed">
                    After Pastor George transitioned into glory, his deputy, <span className="font-bold">Pastor (Dr) E.O. Abina</span>, took over the mantle of leadership. Under his guidance, the mission has grown into the global force it is today.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Global Growth */}
      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-sans text-brand-primary uppercase tracking-tight">Church Growth & Expansion</h2>
              <p className="text-slate-600 leading-relaxed">
                The Church that started with barely 20 people has grown so large today with over <span className="font-bold text-brand-primary">2,000 branches</span> under 23 Administrative regions. Branches have been established in many African countries, Britain (since 1983), and the Irish Republic.
              </p>
              <p className="text-slate-600 leading-relaxed">
                GOFAMINT’s first branch in the United States was established in 1984 and has grown into more than 26 branches today. House of Hope in Brentwood, Maryland, serves as the Headquarter church for North America.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-brand-primary/5 rounded-xl text-center">
                  <div className="text-3xl font-black text-brand-primary">2,000+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Global Branches</div>
                </div>
                <div className="p-6 bg-brand-gold/10 rounded-xl text-center">
                  <div className="text-3xl font-black text-brand-gold">26+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">USA Branches</div>
                </div>
              </div>
            </div>
            <div className="bg-brand-primary p-12 rounded-[3rem] text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6 text-brand-gold italic font-serif">Leadership Today</h3>
              <p className="mb-8 opacity-80 leading-relaxed">
                Guided by the Holy Spirit through the Worldwide Executive Council, headed by the current General Overseer, <span className="font-bold text-white">Pastor (Dr.) Elijah Oludele Abina</span>.
              </p>
              <div className="space-y-4 pt-6 border-t border-white/10">
                <p className="text-sm uppercase tracking-[0.2em] font-bold text-brand-gold">North America Leadership</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-brand-gold" />
                    <span className="font-bold">Pastor Taiwo Fagbuyi</span>
                    <span className="text-xs opacity-60">National Overseer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-brand-gold" />
                    <span className="font-bold">Pastor Ebenezer Ikenebomeh</span>
                    <span className="text-xs opacity-60">Associate National Overseer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Local Establishment Section */}
      <Section className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/20" />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="gold" className="mb-8">Morgantown, West Virginia</Badge>
            <h2 className="text-4xl md:text-5xl font-black font-sans uppercase tracking-tight mb-8">
              Establishment of <br/>
              <span className="text-brand-gold">Royal Priesthood Tabernacle</span>
            </h2>
            <div className="space-y-8 text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              <p>
                The Royal Priesthood Tabernacle began as a house fellowship on <span className="text-white font-bold">July 21, 2025</span>, with a small group of about 4 adults and 2 children. 
              </p>
              <p>
                By the grace and help of God, the fellowship has since moved into a small hotel room, marking a new phase of growth and expansion. Under the leadership of <span className="text-brand-gold font-bold">Pastors Christopher and Damilola Fasinu</span>, and with the support of a committed team, the work of God continues to grow and expand.
              </p>
              <p className="text-2xl font-serif italic text-brand-gold pt-8">
                "By His grace, we are still growing and extending. To God be the glory."
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-brand-gold text-2xl mb-4">🏠</div>
                <h4 className="font-bold mb-2">House Fellowship</h4>
                <p className="text-sm opacity-60">Started with 4 adults and 2 children</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-brand-gold text-2xl mb-4">📍</div>
                <h4 className="font-bold mb-2">Growth Phase</h4>
                <p className="text-sm opacity-60">Moved to hotel room for expansion</p>
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-brand-gold text-2xl mb-4">👑</div>
                <h4 className="font-bold mb-2">Royal Vision</h4>
                <p className="text-sm opacity-60">Led by Pastors Christopher & Damilola Fasinu</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
