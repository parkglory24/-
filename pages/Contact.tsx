
import React from 'react';
import { SiteSettings } from '../types';

interface ContactProps {
  settings: SiteSettings;
}

const Contact: React.FC<ContactProps> = ({ settings }) => {
  return (
    <div className="pt-48 pb-32 px-8 max-w-4xl mx-auto bg-white min-h-[85vh] flex flex-col justify-center">
      <header className="mb-32 text-center fade-in">
        <h1 className="text-xs tracking-[0.8em] text-zinc-300 mb-12 uppercase font-light">Inquiry</h1>
        <p className="text-black text-2xl md:text-4xl font-serif italic font-light leading-relaxed max-w-2xl mx-auto">
          {settings.contactPunchline}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 fade-in delay-300">
        <div className="space-y-6 border-t border-zinc-100 pt-10">
          <h2 className="text-[9px] tracking-[0.5em] text-zinc-300 uppercase">Electronic Mail</h2>
          <a 
            href={`mailto:${settings.email}`} 
            className="block text-2xl md:text-3xl font-serif text-black hover:text-zinc-400 transition-colors duration-700"
          >
            {settings.email}
          </a>
        </div>
        
        <div className="space-y-6 border-t border-zinc-100 pt-10">
          <h2 className="text-[9px] tracking-[0.5em] text-zinc-300 uppercase">Telephone</h2>
          <a 
            href={`tel:${settings.phone.replace(/\s/g, '')}`} 
            className="block text-2xl md:text-3xl font-serif text-black hover:text-zinc-400 transition-colors duration-700"
          >
            {settings.phone}
          </a>
        </div>
      </div>

      <div className="mt-40 pt-20 border-t border-zinc-50 flex flex-col items-center gap-8 fade-in">
        <span className="text-[7px] tracking-[1em] text-zinc-200 uppercase">Available for Global Projects</span>
      </div>
    </div>
  );
};

export default Contact;
