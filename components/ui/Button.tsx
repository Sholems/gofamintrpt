
import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primaryLight shadow-md transition-all duration-300',
    secondary: 'bg-slate-800 text-white hover:bg-slate-900',
    outline: 'border-2 border-brand-primary bg-transparent hover:bg-brand-primary/5 text-brand-primary font-bold',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
    gold: 'bg-brand-gold text-slate-900 font-bold hover:bg-brand-goldLight shadow-lg transition-all duration-300',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
