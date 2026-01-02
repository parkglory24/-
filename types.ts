
export type Category = 'Film' | 'Music Video' | 'Documentary' | 'Exhibition' | 'Commercial';

export interface Project {
  id: string;
  title: string;
  category: Category;
  client: string;
  year: string;
  role: string;
  description: string;
  approach: string;
  videoUrl: string;
  thumbnailUrl: string;
  stillCuts: string[];
}

export interface SiteSettings {
  aboutTitle: string;
  aboutPhilosophy: string;
  aboutDescription: string;
  contactPunchline: string;
  email: string;
  phone: string;
  instagramUrl: string;
  youtubeUrl: string;
  vimeoUrl: string;
}

export interface ContactMessage {
  name: string;
  company: string;
  type: Category | 'Other';
  schedule: string;
  content: string;
}
