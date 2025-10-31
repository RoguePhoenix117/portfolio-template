import { LucideIcon } from 'lucide-react';
import { XIcon } from '@/components/icons/XIcon';

export type IconComponent = LucideIcon | typeof XIcon;

export interface UserConfig {
  personal: {
    name: string;
    initials: string;
    title: string;
    email: string;
    location: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
    mastodon?: string;
    youtube?: string;
    tiktok?: string;
    medium?: string;
    dribbble?: string;
    behance?: string;
    discord?: string;
    reddit?: string;
    pinterest?: string;
    snapchat?: string;
    whatsapp?: string;
    threads?: string;
    bluesky?: string;
  };
  socialFlags?: {
    github?: boolean;
    linkedin?: boolean;
    twitter?: boolean;
    email?: boolean;
    facebook?: boolean;
    instagram?: boolean;
    mastodon?: boolean;
    youtube?: boolean;
    tiktok?: boolean;
    medium?: boolean;
    dribbble?: boolean;
    behance?: boolean;
    discord?: boolean;
    reddit?: boolean;
    pinterest?: boolean;
    snapchat?: boolean;
    whatsapp?: boolean;
    threads?: boolean;
    bluesky?: boolean;
  };
  content: {
    hero: {
      greeting: string;
      nameHighlight: string;
      subtitle1: string;
      subtitle2: string;
      subtitleHighlight1: string;
      subtitleHighlight2: string;
      description: string;
      ctaButtons: {
        viewWork: string;
        downloadResume: string;
      };
      resumeUrl: string;
    };
    navigation: {
      projects: string;
      about: string;
    };
    about?: {
      title: string;
      subtitle: string;
      story: string[];
      stats: {
        label: string;
        value: string;
        color: 'blue' | 'purple' | 'green' | 'orange';
      }[];
      skills: {
        name: string;
        description: string;
      }[];
      ctaText: string;
    };
    contact?: {
      title: string;
      subtitle: string;
      description: string;
      email: string;
      phone: string;
      location: string;
      formTitle: string;
      formDescription: string;
    };
  };
  features: {
    enableBlog: boolean;
    enableProjects: boolean;
    enableAbout: boolean;
    enableContact: boolean;
    enableStudio: boolean;
  };
  branding: {
    logoText: string;
    logoInitial: string;
  };
  repository: {
    url: string;
    homepage: string;
    issues: string;
  };
  contactForm?: {
    provider: 'web3forms' | 'generic' | 'custom';
    // Note: web3formsAccessKey should NOT be in user.json - use environment variable WEB3FORMS_ACCESS_KEY instead
    genericApiEndpoint?: string;
    genericApiHeaders?: Record<string, string>;
  };
}

export interface SocialLink {
  name: string;
  href: string;
  icon: IconComponent;
}

export interface NavigationItem {
  name: string;
  href: string;
  enabled: boolean;
}
