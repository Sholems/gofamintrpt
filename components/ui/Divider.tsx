
import React from 'react';
import { cn } from '../../lib/utils';

export const Divider: React.FC<{ className?: string }> = ({ className }) => (
  <hr className={cn('my-8 border-t border-slate-200', className)} />
);
