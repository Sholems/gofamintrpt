
import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'gold' | 'red';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'purple', className }) => {
  const variants = {
    purple: 'bg-brand-primary/10 text-brand-primary',
    gold: 'bg-brand-gold/20 text-brand-primary font-bold',
    red: 'bg-brand-red/10 text-brand-red',
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
