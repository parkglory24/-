
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project, SiteSettings } from '../types';
import { CATEGORIES } from '../constants';

interface WorksProps {
  projects: Project[];
  settings: SiteSettings;
}

const Works: React.FC<WorksProps> = ({ projects, settings }) => {
  const [filter, setFilter] = useState<string>('All');
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: settings.instagramUrl, 
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ) 
    },
    { 
      name: 'YouTube', 
      url: settings.youtubeUrl, 
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path>
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
        </svg>
      ) 
    },
    { 
      name: 'Vimeo', 
      url: settings.vimeoUrl, 
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.057 10.4c-.651-2.4-1.353-3.601-2.105-3.601-.153 0-.688.324-1.611.968L0 6.48c1.035-.912 2.059-1.824 3.067-2.737 1.411-1.248 2.472-1.896 3.185-1.947 1.68-.12 2.715 1.026 3.102 3.435.439 2.72.738 4.403.893 5.045.466 2.41 1.002 3.615 1.609 3.615.466 0 1.185-.733 2.164-2.204.978-1.47 1.5-2.592 1.564-3.366.128-1.282-.369-1.923-1.488-1.923-.523 0-1.066.115-1.636.347 1.144-3.738 3.328-5.56 6.551-5.466 2.383.07 3.511 1.603 3.386 4.59z"></path>
        </svg>
      ) 
    }
  ];

  return (
    <div className="pt-52 pb-40 px-12 bg-white max-w-[1800px] mx-auto">
      <header className="mb-32 flex flex-col items-center">
        <h1 className="text-3xl font-serif text-black mb-16 uppercase tracking-[0.3em] font-light">Archives</h1>
        
        <div className="flex flex-wrap gap-x-12 gap-y-6 w-full justify-center border-t border-zinc-100 py-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[9px] tracking-[0.4em] uppercase transition-all duration-700 ${
                filter === cat ? 'text-black font-medium' : 'text-zinc-300 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex gap-10 mt-10 justify-center">
          {socialLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-black transition-all duration-500 hover:scale-110"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32">
        {filteredProjects.map((project) => (
          <Link key={project.id} to={`/project/${project.id}`} className="group block">
            <div className="aspect-[4/5] overflow-hidden mb-8 bg-zinc-50 relative border border-zinc-100 shadow-sm">
              <img 
                src={project.thumbnailUrl} 
                alt={project.title}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
            </div>
            <div className="space-y-4 px-1">
              <div className="text-[8px] tracking-[0.4em] text-zinc-300 uppercase">
                <span>{project.category}</span>
              </div>
              <h3 className="text-xl font-serif text-black uppercase font-light tracking-wide">{project.title}</h3>
              <div className="h-[0.5px] w-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 opacity-20"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Works;
