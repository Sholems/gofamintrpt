'use client';

import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AdminAuthService } from '../../lib/admin-auth';

interface AdminLoginProps {
  onSuccess: () => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (AdminAuthService.login(password)) {
      onSuccess();
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-purple-900 to-brand-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="mx-auto h-20 w-20 rounded-2xl overflow-hidden border-4 border-brand-gold/20 shadow-lg mb-6">
              <img 
                src="/churchlogo.jpeg" 
                alt="Royal Priesthood Tabernacle" 
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-black text-brand-primary uppercase tracking-tight">
              Admin Portal
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Royal Priesthood Tabernacle
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="password" 
                className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-3"
              >
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all text-lg"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="gold"
              className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Access Dashboard'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Protected Area • Authorized Personnel Only
            </p>
          </div>
        </div>

        {/* Back to website */}
        <div className="text-center mt-6">
          <a 
            href="/"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
