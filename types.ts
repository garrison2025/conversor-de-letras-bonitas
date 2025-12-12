
import React from 'react';

export enum FontCategory {
  ALL = 'bonitas',
  CURSIVE = 'cursivas',
  GOTHIC = 'goticas',
  TATTOO = 'tatuajes',
  GRAFFITI = 'graffiti',
  FACEBOOK = 'facebook',
  AMINO = 'amino'
}

export type ReadabilityLevel = 'high' | 'medium' | 'low';

export interface FontStyle {
  name: string;
  id: string;
  category: FontCategory[];
  converter: (text: string) => string;
  readability: ReadabilityLevel;
  preview?: string;
}

export interface RouteConfig {
  path: string;
  title: string;
  description: string;
  category: FontCategory;
  isPowerPage?: boolean;
  isStatic?: boolean;
  content?: React.ReactNode;
}

// Blog Type Definitions
export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: React.ReactNode;
    date: string;
    author: string;
    category: string;
    coverGradient: string; // New property for unique CSS gradients
    keywords: string; // For SEO meta tag
}
