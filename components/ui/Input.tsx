'use client';

import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <input
        className={clsx(
          'p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
    </div>
  );
}
