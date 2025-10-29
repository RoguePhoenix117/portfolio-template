import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { NavigationItem, SocialLink, UserConfig } from './types';

let userConfig: UserConfig | null = null;

export async function loadUserConfig(): Promise<UserConfig> {
  if (userConfig) {
    return userConfig;
  }

  try {
    const response = await fetch('/user.json');
    if (!response.ok) {
      throw new Error(`Failed to load user config: ${response.statusText}`);
    }
    
    const config = await response.json();
    userConfig = config as UserConfig;
    return userConfig;
  } catch (error) {
    console.error('Error loading user configuration:', error);
    // Return default configuration as fallback
    return getDefaultConfig();
  }
}

export function getDefaultConfig(): UserConfig {
  return {
    personal: {
      name: "Your Name",
      initials: "YN",
      title: "Full-Stack Developer",
      email: "your.email@example.com",
      location: "Your City, Country"
    },
    social: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername",
      email: "mailto:your.email@example.com"
    },
    content: {
      hero: {
        greeting: "Hi, I'm",
        nameHighlight: "Your Name",
        subtitle1: "Developer passionate about creating",
        subtitle2: "and turning ideas into",
        subtitleHighlight1: "innovative solutions",
        subtitleHighlight2: "digital reality",
        description: "I specialize in React, Next.js, Node.js, and modern web technologies. I love building scalable applications and sharing knowledge through my blog.",
        ctaButtons: {
          viewWork: "View My Work",
          downloadResume: "Download Resume"
        },
        resumeUrl: "/resume.pdf"
      },
      navigation: {
        projects: "/projects",
        about: "#about"
      }
    },
    features: {
      enableBlog: true,
      enableProjects: true,
      enableAbout: true,
      enableContact: true
    },
    branding: {
      logoText: "Your Name",
      logoInitial: "Y"
    },
    repository: {
      url: "https://github.com/yourusername/portfolio-template.git",
      homepage: "https://github.com/yourusername/portfolio-template#readme",
      issues: "https://github.com/yourusername/portfolio-template/issues"
    }
  };
}

export function getSocialLinks(config: UserConfig): SocialLink[] {
  return [
    { name: 'GitHub', href: config.social.github, icon: Github },
    { name: 'LinkedIn', href: config.social.linkedin, icon: Linkedin },
    { name: 'Twitter', href: config.social.twitter, icon: Twitter },
    { name: 'Email', href: config.social.email, icon: Mail },
  ];
}

export function getNavigationItems(config: UserConfig): NavigationItem[] {
  const items: NavigationItem[] = [
    { name: 'Home', href: '/', enabled: true },
    { name: 'About', href: '/#about', enabled: config.features.enableAbout },
    { name: 'Projects', href: '/projects', enabled: config.features.enableProjects },
    { name: 'Blog', href: '/blog', enabled: config.features.enableBlog },
    { name: 'Contact', href: '/#contact', enabled: config.features.enableContact },
  ];

  return items.filter(item => item.enabled);
}
