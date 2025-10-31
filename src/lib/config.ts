import { XIcon } from '@/components/icons/XIcon';
import { MastodonIcon } from '@/components/icons/MastodonIcon';
import { TikTokIcon } from '@/components/icons/TikTokIcon';
import { MediumIcon } from '@/components/icons/MediumIcon';
import { DribbbleIcon } from '@/components/icons/DribbbleIcon';
import { BehanceIcon } from '@/components/icons/BehanceIcon';
import { DiscordIcon } from '@/components/icons/DiscordIcon';
import { RedditIcon } from '@/components/icons/RedditIcon';
import { PinterestIcon } from '@/components/icons/PinterestIcon';
import { SnapchatIcon } from '@/components/icons/SnapchatIcon';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { ThreadsIcon } from '@/components/icons/ThreadsIcon';
import { BlueskyIcon } from '@/components/icons/BlueskyIcon';
import { Github, Linkedin, Mail, Youtube, Instagram, Facebook } from 'lucide-react';
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
      email: "mailto:your.email@example.com"
    },
    socialFlags: {
      github: true,
      linkedin: true,
      email: true,
      twitter: false,
      facebook: false,
      instagram: false,
      mastodon: false,
      youtube: false,
      tiktok: false,
      medium: false,
      dribbble: false,
      behance: false,
      discord: false,
      reddit: false,
      pinterest: false,
      snapchat: false,
      whatsapp: false,
      threads: false,
      bluesky: false
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
      },
      about: {
        title: "About Me",
        subtitle: "I'm a passionate developer with a love for creating innovative solutions and continuous learning.",
        story: [
          "With over 5 years of experience in software development, I've had the privilege of working on diverse projects ranging from small startups to large enterprise applications. My journey began with a curiosity about how websites work, which quickly evolved into a passion for building scalable, user-friendly applications.",
          "I believe in the power of clean code, user-centered design, and continuous learning. When I'm not coding, you'll find me writing technical blog posts, contributing to open-source projects, or exploring new technologies that can solve real-world problems.",
          "My goal is to create digital experiences that not only meet requirements but exceed expectations, making a positive impact on users' lives."
        ],
        stats: [
          { label: "Projects Completed", value: "50+", color: "blue" },
          { label: "Years Experience", value: "5+", color: "purple" },
          { label: "Happy Clients", value: "100+", color: "green" },
          { label: "Support Available", value: "24/7", color: "orange" }
        ],
        skills: [
          { name: "Frontend Development", description: "React, Next.js, TypeScript, Tailwind CSS" },
          { name: "Backend Development", description: "Node.js, Express, Python, PostgreSQL" },
          { name: "Mobile Development", description: "React Native, Flutter" },
          { name: "DevOps & Tools", description: "Docker, AWS, Vercel, Git" },
          { name: "Team Collaboration", description: "Agile, Code Reviews, Mentoring" },
          { name: "Problem Solving", description: "Algorithm Design, System Architecture" }
        ],
        ctaText: "Let's Work Together"
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Have a project in mind or want to collaborate? I'd love to hear from you. Let's discuss how we can work together to bring your ideas to life.",
        description: "I'm always interested in new opportunities and exciting projects. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        formTitle: "Send a Message",
        formDescription: "Fill out the form below and I'll get back to you as soon as possible."
      }
    },
    features: {
      enableBlog: true,
      enableProjects: true,
      enableAbout: true,
      enableContact: true,
      enableStudio: true
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
  const socialFlags = config.socialFlags || {};
  const socialLinks: SocialLink[] = [];

  // Helper function to check if a social link should be included
  const shouldInclude = (key: keyof typeof socialFlags, url?: string): boolean => {
    return socialFlags[key] === true && !!url && url.trim() !== '';
  };

  // Add social links based on feature flags
  if (shouldInclude('github', config.social.github)) {
    socialLinks.push({ name: 'GitHub', href: config.social.github!, icon: Github });
  }
  
  if (shouldInclude('linkedin', config.social.linkedin)) {
    socialLinks.push({ name: 'LinkedIn', href: config.social.linkedin!, icon: Linkedin });
  }
  
  if (shouldInclude('email', config.social.email)) {
    socialLinks.push({ name: 'Email', href: config.social.email!, icon: Mail });
  }
  
  if (shouldInclude('twitter', config.social.twitter)) {
    socialLinks.push({ name: 'X', href: config.social.twitter!, icon: XIcon });
  }
  
  if (shouldInclude('facebook', config.social.facebook)) {
    socialLinks.push({ name: 'Facebook', href: config.social.facebook!, icon: Facebook });
  }
  
  if (shouldInclude('instagram', config.social.instagram)) {
    socialLinks.push({ name: 'Instagram', href: config.social.instagram!, icon: Instagram });
  }
  
  if (shouldInclude('youtube', config.social.youtube)) {
    socialLinks.push({ name: 'YouTube', href: config.social.youtube!, icon: Youtube });
  }
  
  if (shouldInclude('mastodon', config.social.mastodon)) {
    socialLinks.push({ name: 'Mastodon', href: config.social.mastodon!, icon: MastodonIcon });
  }
  
  if (shouldInclude('tiktok', config.social.tiktok)) {
    socialLinks.push({ name: 'TikTok', href: config.social.tiktok!, icon: TikTokIcon });
  }
  
  if (shouldInclude('medium', config.social.medium)) {
    socialLinks.push({ name: 'Medium', href: config.social.medium!, icon: MediumIcon });
  }
  
  if (shouldInclude('dribbble', config.social.dribbble)) {
    socialLinks.push({ name: 'Dribbble', href: config.social.dribbble!, icon: DribbbleIcon });
  }
  
  if (shouldInclude('behance', config.social.behance)) {
    socialLinks.push({ name: 'Behance', href: config.social.behance!, icon: BehanceIcon });
  }
  
  if (shouldInclude('discord', config.social.discord)) {
    socialLinks.push({ name: 'Discord', href: config.social.discord!, icon: DiscordIcon });
  }
  
  if (shouldInclude('reddit', config.social.reddit)) {
    socialLinks.push({ name: 'Reddit', href: config.social.reddit!, icon: RedditIcon });
  }
  
  if (shouldInclude('pinterest', config.social.pinterest)) {
    socialLinks.push({ name: 'Pinterest', href: config.social.pinterest!, icon: PinterestIcon });
  }
  
  if (shouldInclude('snapchat', config.social.snapchat)) {
    socialLinks.push({ name: 'Snapchat', href: config.social.snapchat!, icon: SnapchatIcon });
  }
  
  if (shouldInclude('whatsapp', config.social.whatsapp)) {
    socialLinks.push({ name: 'WhatsApp', href: config.social.whatsapp!, icon: WhatsAppIcon });
  }
  
  if (shouldInclude('threads', config.social.threads)) {
    socialLinks.push({ name: 'Threads', href: config.social.threads!, icon: ThreadsIcon });
  }
  
  if (shouldInclude('bluesky', config.social.bluesky)) {
    socialLinks.push({ name: 'Bluesky', href: config.social.bluesky!, icon: BlueskyIcon });
  }

  return socialLinks;
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
