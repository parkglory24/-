
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Project } from '../types.ts';

interface ProjectDetailProps {
  projects: Project[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) return <Navigate to="/works" />;

  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // YouTube
    const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/);
    if (ytMatch) {
      const id = ytMatch[1].split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
    }

    // Vimeo
    const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(.+)/);
    if (vimeoMatch) {
      const id = vimeoMatch[1].split('?')[0];
      return `https://player.vimeo.com/video/${id}`;
    }

    return null;
  };

  const embedUrl = getVideoEmbedUrl(project.videoUrl);

  return (
    <div className="bg-white min-h-screen pt-40">
      {/* Narrative Section */}
      <section className="py-20 px-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-48">
          <div className="flex-1">
            <span className="text-[10px] tracking-[0.6em] text-zinc-300 uppercase block mb-12">{project.category}</span>
            <h1 className="text-5xl md:text-7xl font-serif text-black mb-16 uppercase leading-tight font-light">{project.title}</h1>
            <p className="text-zinc-500 text-lg leading-[1.8] max-w-2xl font-light">
              {project.description}
            </p>
          </div>
          <div className="w-full md:w-72 flex flex-col gap-12 border-l border-zinc-100 pl-12 pt-4">
            <div>
              <h5 className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase mb-4">Client</h5>
              <p className="text-xs text-black tracking-widest uppercase">{project.client}</p>
            </div>
            <div>
              <h5 className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase mb-4">Year</h5>
              <p className="text-xs text-black tracking-widest">{project.year}</p>
            </div>
            <div>
              <h5 className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase mb-4">Role</h5>
              <p className="text-xs text-black tracking-widest uppercase font-medium">{project.role}</p>
            </div>
          </div>
        </div>

        {/* The Why (Approach) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-60">
          <div className="md:col-span-4">
            <h2 className="text-[10px] tracking-[0.5em] text-zinc-300 uppercase mb-8">Approach</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl md:text-3xl font-serif text-black leading-[1.6] font-light">
              "{project.approach}"
            </p>
          </div>
        </div>

        {/* Still Gallery */}
        <div className="space-y-40 mb-60">
          {project.stillCuts.map((cut, idx) => (
            <div key={idx} className="bg-white overflow-hidden shadow-sm border border-zinc-50 group">
              <img 
                src={cut} 
                alt={`${project.title} Still ${idx + 1}`} 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          ))}
        </div>

        {/* Video Presentation (Moved to Bottom) */}
        {project.videoUrl && (
          <section className="relative w-full aspect-video bg-zinc-50 overflow-hidden mb-32 group">
            <div className="absolute inset-0 border border-zinc-100 z-10 pointer-events-none"></div>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={project.title}
              ></iframe>
            ) : (
              <video 
                className="w-full h-full object-contain"
                controls
                src={project.videoUrl}
              />
            )}
          </section>
        )}

        {/* Navigation */}
        <div className="mt-40 pt-20 border-t border-zinc-100 flex justify-between items-center">
          <Link to="/works" className="text-[10px] tracking-[0.5em] text-zinc-400 hover:text-black uppercase transition-colors">
            Archive
          </Link>
          <Link to="/contact" className="text-[10px] tracking-[0.5em] text-zinc-400 hover:text-black uppercase transition-colors">
            Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
