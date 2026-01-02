
import React from 'react';
import { SiteSettings } from '../types';

interface AboutProps {
  settings: SiteSettings;
}

const About: React.FC<AboutProps> = ({ settings }) => {
  return (
    <div className="pt-48 pb-32 px-12 max-w-5xl mx-auto bg-white min-h-[85vh] flex flex-col justify-center">
      <section className="fade-in space-y-24">
        <div className="space-y-8">
          <span className="text-[8px] tracking-[1em] text-zinc-300 uppercase block">{settings.aboutPhilosophy}</span>
          <h2 className="text-3xl md:text-5xl font-serif text-black leading-[1.3] font-light max-w-3xl whitespace-pre-wrap">
            {settings.aboutTitle}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 border-t border-zinc-100 pt-20">
          <div className="space-y-10">
            <p className="text-[10px] text-zinc-400 leading-[2.2] tracking-[0.1em] uppercase font-light">
              {settings.aboutDescription}
            </p>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              {['Research', 'Context', 'Visual Grammar', 'Essential Edit'].map((step, i) => (
                <div key={i} className="flex justify-between items-center text-[9px] tracking-[0.4em] uppercase text-zinc-300 border-b border-zinc-50 pb-3 transition-colors hover:text-black">
                  <span>{step}</span>
                  <span className="text-[7px] font-light">0{i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
