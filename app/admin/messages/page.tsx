'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { ContactService, ContactMessage } from '../../../lib/contact-service';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    const allMessages = ContactService.getAllMessages();
    setMessages(allMessages);
  };

  const handleMarkAsRead = (id: string) => {
    ContactService.markAsRead(id);
    loadMessages();
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, read: true });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      ContactService.deleteMessage(id);
      loadMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-brand-primary uppercase font-sans tracking-tighter">
            Contact Messages
          </h2>
          <p className="text-slate-500 text-sm">
            Manage messages from the contact form
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="gold" className="bg-red-500 text-white px-6 py-3 text-lg font-black">
            {unreadCount} Unread
          </Badge>
        )}
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {(['all', 'unread', 'read'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all ${
              filter === f
                ? 'text-brand-primary border-b-2 border-brand-gold'
                : 'text-slate-400 hover:text-brand-primary'
            }`}
          >
            {f}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {filteredMessages.length === 0 ? (
        <Card className="p-16 text-center border-none shadow-xl rounded-[2.5rem] bg-white">
          <div className="text-6xl mb-6">📭</div>
          <h3 className="text-2xl font-black text-brand-primary mb-3">No Messages</h3>
          <p className="text-slate-500">
            {filter === 'all' 
              ? "No contact messages yet. They'll appear here when someone submits the contact form."
              : filter === 'unread'
              ? "No unread messages. Great job staying on top of things!"
              : "No read messages yet."}
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-6 cursor-pointer transition-all duration-300 rounded-2xl border-2 ${
                  selectedMessage?.id === msg.id
                    ? 'border-brand-gold shadow-xl shadow-brand-gold/10 bg-brand-offwhite'
                    : msg.read
                    ? 'border-slate-100 bg-white hover:border-slate-200'
                    : 'border-brand-primary/20 bg-brand-primary/5 hover:border-brand-primary/40'
                }`}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.read) {
                    handleMarkAsRead(msg.id);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-brand-primary">{msg.fullName}</h3>
                      {!msg.read && (
                        <span className="h-2 w-2 bg-brand-gold rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{msg.email}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
                
                <div className="mb-3">
                  <Badge variant="gold" className="text-xs px-3 py-1">
                    {msg.subject}
                  </Badge>
                </div>
                
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-8 h-fit">
            {selectedMessage ? (
              <Card className="p-8 border-none shadow-2xl rounded-[2.5rem] bg-white">
                <div className="flex items-center justify-between mb-8">
                  <Badge 
                    variant="gold"
                    className={selectedMessage.read ? "bg-slate-200 text-slate-600" : "bg-brand-gold text-white"}
                  >
                    {selectedMessage.read ? 'Read' : 'Unread'}
                  </Badge>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete message"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">
                      From
                    </label>
                    <p className="text-xl font-black text-brand-primary">{selectedMessage.fullName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">
                        Email
                      </label>
                      <a 
                        href={`mailto:${selectedMessage.email}`}
                        className="text-sm text-brand-gold hover:text-brand-primary transition-colors font-medium"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    
                    {selectedMessage.phone && (
                      <div>
                        <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">
                          Phone
                        </label>
                        <a 
                          href={`tel:${selectedMessage.phone}`}
                          className="text-sm text-brand-gold hover:text-brand-primary transition-colors font-medium"
                        >
                          {selectedMessage.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">
                      Subject
                    </label>
                    <p className="text-sm font-bold text-brand-primary">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 block">
                      Received
                    </label>
                    <p className="text-sm text-slate-600">{formatDate(selectedMessage.timestamp)}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 block">
                      Message
                    </label>
                    <div className="bg-brand-offwhite p-6 rounded-2xl">
                      <p className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button
                      variant="gold"
                      className="flex-1"
                      onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    >
                      Reply via Email
                    </Button>
                    {!selectedMessage.read && (
                      <Button
                        variant="outline"
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-16 text-center border-none shadow-xl rounded-[2.5rem] bg-white">
                <div className="text-6xl mb-6">👈</div>
                <h3 className="text-xl font-black text-brand-primary mb-3">Select a Message</h3>
                <p className="text-slate-500">
                  Click on a message from the list to view its details
                </p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
