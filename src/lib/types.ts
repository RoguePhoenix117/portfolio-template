export interface UserConfig {
  personal: {
    name: string;
    initials: string;
    title: string;
    email: string;
    location: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
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
  };
  features: {
    enableBlog: boolean;
    enableProjects: boolean;
    enableAbout: boolean;
    enableContact: boolean;
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
}

export interface SocialLink {
  name: string;
  href: string;
  icon: any; // Lucide React icon component
}

export interface NavigationItem {
  name: string;
  href: string;
  enabled: boolean;
}
