'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors disabled:opacity-50';
  const variantStyles = clsx({
    'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
    'bg-gray-600 text-white hover:bg-gray-700': variant === 'secondary',
    'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
  });

  return (
    <button className={clsx(baseStyles, variantStyles, className)} {...props}>
      {children}
    </button>
  );
}
