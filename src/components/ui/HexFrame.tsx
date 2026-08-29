
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HexFrameProps {
  size?: number;
  color?: string;
  children?: React.ReactNode;
  ring?: boolean;
  className?: string;
}

export function HexFrame({ 
  size = 44, 
  color = "#35C29B", 
  children, 
  ring = true,
  className
}: HexFrameProps) {
  return (
    <div
      className={cn("relative flex-shrink-0", className)}
      style={{
        width: size,
        height: size * 1.02,
      }}
    >
      <div
        className="absolute inset-0 k-hex-clip flex items-center justify-center"
        style={{
          background: ring ? color : "#1C2620",
          padding: ring ? 2 : 0,
        }}
      >
        <div
          className="w-full h-full k-hex-clip flex items-center justify-center font-display font-bold text-text bg-ink overflow-hidden"
          style={{
            fontSize: size * 0.36,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
