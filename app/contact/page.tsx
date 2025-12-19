'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Section } from '../../components/ui/Section';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const contactInfo = [
    {
      title: "Visit Us",
      details: "1400 Saratoga Ave, Morgantown, WV 26505",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      link: "https://www.google.com/maps/search/?api=1&query=1400+Saratoga+Ave,+Morgantown,+WV+26505",
      copyable: false
    },
    {
      title: "Email Us",
      details: "welcome@gofamintrpt.org",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      link: "mailto:welcome@gofamintrpt.org",
      copyable: true,
      copyText: "welcome@gofamintrpt.org"
    },
    {
      title: "Social Media",
      details: "@gofamintrpt",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      ),
      isSocial: true,
      copyable: false
    }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/gofamintrpt',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/gofamintrpt',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      name: 'Youtube', 
      url: 'https://www.youtube.com/@gofamintrpt',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save message to localStorage for admin dashboard
      if (typeof window !== 'undefined') {
        const messages = JSON.parse(localStorage.getItem('gofamintrpt_contact_messages') || '[]');
        const newMessage = {
          id: Date.now().toString(),
          ...formData,
          timestamp: new Date().toISOString(),
          read: false
        };
        messages.unshift(newMessage);
        localStorage.setItem('gofamintrpt_contact_messages', JSON.stringify(messages));
      }
      
      // Send directly to Web3Forms using FormData
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '660977c7-1efc-4f71-a554-08f60a45274d');
      formDataToSend.append('name', formData.fullName);
      formDataToSend.append('email', formData.email);
      if (formData.phone) {
        formDataToSend.append('phone', formData.phone);
      }
      formDataToSend.append('subject', `${formData.subject} - Contact Form`);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('from_name', 'Royal Priesthood Tabernacle');
      formDataToSend.append('replyto', formData.email);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
        });
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. However, it has been saved for our team to review. We will get back to you soon!');
      
      // Still show success since we saved it locally
      setShowSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => firstInputRef.current?.focus(), 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-brand-offwhite min-h-screen">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-8 right-8 z-50 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-slideInRight">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-bold">Message Sent!</p>
            <p className="text-sm opacity-90">We&apos;ll get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <Section className="bg-brand-primary text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?q=90&w=2560&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary via-brand-primary/90 to-brand-primary" />
        
        <Container className="relative z-10 text-center">
          <Badge variant="gold" className="mb-6 px-6 py-2 bg-white/20 text-white border border-white/30">Get In Touch</Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-sans uppercase tracking-tighter leading-none mb-6">
            Contact <span className="text-brand-gold">The Tabernacle</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-serif italic text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
            Whether you have a question, a prayer request, or want to join our family, we are here for you.
          </p>
          <button 
            onClick={scrollToForm}
            className="mt-8 bg-brand-gold text-brand-primary px-8 py-4 rounded-2xl font-bold hover:bg-brand-gold/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            aria-label="Scroll to contact form"
          >
            Send Us a Message
          </button>
        </Container>
      </Section>

      {/* Contact Grid */}
      <Section className="-mt-16 relative z-20 pb-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactInfo.map((info, i) => (
              <Card key={i} className="fade-in-section group p-8 sm:p-10 border-none shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 rounded-[2.5rem] bg-white text-center hover:-translate-y-2">
                <div className="mx-auto mb-8 h-20 w-20 rounded-3xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                  {info.icon}
                </div>
                <h3 className="text-base sm:text-lg font-black text-brand-primary uppercase font-sans tracking-tight mb-4">{info.title}</h3>
                
                {info.isSocial ? (
                  <div className="flex justify-center gap-3 flex-wrap">
                    {socialLinks.map((social) => (
                      <a 
                        key={social.name} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="h-12 w-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-brand-gold hover:text-brand-primary transition-all shadow-sm hover:shadow-md hover:scale-110"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">{info.details}</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mt-4">
                      <a 
                        href={info.link} 
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-block text-[10px] font-black uppercase tracking-widest text-brand-gold hover:text-brand-primary transition-colors"
                      >
                        View Details →
                      </a>
                      {info.copyable && (
                        <button
                          onClick={() => copyToClipboard(info.copyText!, info.title)}
                          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-gold transition-colors flex items-center gap-1"
                          aria-label={`Copy ${info.title}`}
                        >
                          {copiedField === info.title ? (
                            <>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Main Contact Form Section */}
      <Section className="py-24">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
            {/* Form Side */}
            <div ref={formRef} className="lg:w-3/5 fade-in-section">
              <div className="bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-6 sm:p-8 md:p-16 shadow-3xl border border-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-8xl font-black text-brand-primary pointer-events-none uppercase tracking-tighter">
                  Message
                </div>
                
                <header className="mb-12 space-y-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-primary uppercase font-sans tracking-tighter">
                    Send a <span className="text-brand-gold">Divine Note</span>
                  </h2>
                  <p className="text-slate-500 font-medium text-sm sm:text-base">Fill out the form below and our team will get back to you within 24 hours.</p>
                </header>

                <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
                  <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 ml-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        ref={firstInputRef}
                        id="fullName"
                        name="fullName"
                        type="text" 
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full rounded-2xl bg-slate-50 border-2 p-4 sm:p-5 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all placeholder:text-slate-400 font-semibold text-slate-900 ${errors.fullName ? 'border-red-500' : 'border-transparent'}`}
                        placeholder="John Doe"
                        aria-label="Full Name"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs ml-2 flex items-center gap-1" role="alert">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 ml-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-2xl bg-slate-50 border-2 p-4 sm:p-5 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all placeholder:text-slate-400 font-semibold text-slate-900 ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                        placeholder="john@example.com"
                        aria-label="Email Address"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs ml-2 flex items-center gap-1" role="alert">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 ml-2">
                        Phone Number <span className="text-slate-500">(Optional)</span>
                      </label>
                      <input 
                        id="phone"
                        name="phone"
                        type="tel" 
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full rounded-2xl bg-slate-50 border-2 p-4 sm:p-5 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all placeholder:text-slate-400 font-semibold text-slate-900 ${errors.phone ? 'border-red-500' : 'border-transparent'}`}
                        placeholder="+1 (304) 123-4567"
                        aria-label="Phone Number"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs ml-2 flex items-center gap-1" role="alert">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 ml-2">Subject</label>
                      <select 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full rounded-2xl bg-slate-50 border-transparent p-4 sm:p-5 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all font-semibold text-slate-900 appearance-none cursor-pointer"
                        aria-label="Subject"
                      >
                        <option>General Inquiry</option>
                        <option>Prayer Request</option>
                        <option>Testimony</option>
                        <option>Membership</option>
                        <option>Media/Press</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="message" className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 ml-2">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-xs font-bold mr-2 ${formData.message.length > 500 ? 'text-red-500' : 'text-slate-600'}`}>
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={500}
                      className={`w-full rounded-2xl bg-slate-50 border-2 p-4 sm:p-5 h-40 sm:h-48 focus:bg-white focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all placeholder:text-slate-400 font-semibold text-slate-900 resize-none ${errors.message ? 'border-red-500' : 'border-transparent'}`}
                      placeholder="How can we serve you today? Share your prayer request, testimony, or inquiry..."
                      aria-label="Your Message"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs ml-2 flex items-center gap-1" role="alert">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary" 
                    className="w-full h-14 sm:h-16 rounded-2xl text-xs uppercase tracking-[0.3em] font-black group shadow-2xl shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-4">
                        Send Message
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-2/5 flex flex-col gap-6 sm:gap-8 fade-in-section">
              <div className="flex-1 bg-brand-primary rounded-[2.5rem] lg:rounded-[3.5rem] p-8 sm:p-10 lg:p-12 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative z-10 space-y-6 sm:space-y-8">
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight font-sans">Our Service Times</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
                      <span className="text-brand-gold font-bold uppercase text-[10px] tracking-widest">Crown of Thanksgiving</span>
                      <span className="font-light text-sm sm:text-base">First Sunday</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
                      <span className="text-brand-gold font-bold uppercase text-[10px] tracking-widest">Royal Word & Prayer</span>
                      <span className="font-light text-sm sm:text-base">Wed, 6:00 PM</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-brand-gold font-bold uppercase text-[10px] tracking-widest">The King&apos;s Altar</span>
                      <span className="font-light text-sm sm:text-base">Last Sunday</span>
                    </div>
                  </div>
                  <div className="pt-6 sm:pt-8">
                    <p className="text-slate-300 font-serif italic text-base sm:text-lg leading-relaxed">
                      &ldquo;For where two or three are gathered together in my name, there am I in the midst of them.&rdquo;
                    </p>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-brand-gold">— Matthew 18:20</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-gold rounded-[2.5rem] lg:rounded-[3.5rem] p-8 sm:p-10 lg:p-12 text-brand-primary text-center group transition-all hover:shadow-2xl">
                <h3 className="text-lg sm:text-xl font-black uppercase font-sans tracking-tight mb-4">Prayer Line</h3>
                <p className="text-brand-primary/80 font-light mb-6 sm:mb-8 text-sm sm:text-base">Reach out for immediate spiritual support.</p>
                <a href="tel:+13040000000" className="text-2xl sm:text-3xl font-black tracking-tighter block mb-4 underline decoration-brand-primary/20 hover:decoration-brand-primary transition-all underline-offset-8">+1 (304) 000-0000</a>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                  <a 
                    href="tel:+13040000000"
                    className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-primary/90 transition-all text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                    Call Now
                  </a>
                  <a 
                    href="https://wa.me/13040000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Available for urgent needs</p>
              </div>

              {/* Google Maps */}
              <div className="rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl h-64 sm:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3050.0!2d-79.9559!3d39.6295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1400%20Saratoga%20Ave%2C%20Morgantown%2C%20WV%2026505!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
