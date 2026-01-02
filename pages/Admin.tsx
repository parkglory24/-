
import React, { useState, useRef } from 'react';
import { Project, Category, SiteSettings } from '../types.ts';

interface AdminProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
}

type AdminTab = 'Works' | 'About' | 'Contact';

const Admin: React.FC<AdminProps> = ({ projects, setProjects, settings, setSettings }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('Works');
  const [isAdding, setIsAdding] = useState(false);
  
  const [newProject, setNewProject] = useState<Partial<Project>>({
    category: 'Film',
    year: new Date().getFullYear().toString(),
    stillCuts: [],
  });

  const [editSettings, setEditSettings] = useState<SiteSettings>(settings);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '7230') {
      setIsAuthenticated(true);
    } else {
      alert('접근 코드가 일치하지 않습니다.');
      setPassword('');
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setNewProject({ ...newProject, thumbnailUrl: base64 });
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const base64Promises = Array.from(files).map(file => fileToBase64(file as File));
      const base64s = await Promise.all(base64Promises);
      setNewProject({ 
        ...newProject, 
        stillCuts: [...(newProject.stillCuts || []), ...base64s] 
      });
    }
  };

  const removeStillCut = (index: number) => {
    const updated = [...(newProject.stillCuts || [])];
    updated.splice(index, 1);
    setNewProject({ ...newProject, stillCuts: updated });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title || 'Untitled',
      category: (newProject.category as Category) || 'Film',
      client: newProject.client || '',
      year: newProject.year || '',
      role: newProject.role || '',
      description: newProject.description || '',
      approach: newProject.approach || '',
      videoUrl: newProject.videoUrl || '',
      thumbnailUrl: newProject.thumbnailUrl || 'https://picsum.photos/seed/thumb/800/1000',
      stillCuts: newProject.stillCuts || [],
    };
    setProjects([project, ...projects]);
    setIsAdding(false);
    setNewProject({ category: 'Film', year: new Date().getFullYear().toString(), stillCuts: [] });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(editSettings);
    alert('설정이 저장되었습니다.');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('아카이브에서 영구적으로 삭제하시겠습니까?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-48 px-12 flex flex-col items-center justify-center min-h-[75vh] bg-white">
        <div className="w-full max-w-sm space-y-16 fade-in">
          <div className="text-center">
            <h1 className="text-xs tracking-[0.8em] text-zinc-300 uppercase font-light mb-8">Secure Access</h1>
            <div className="h-[0.5px] w-full bg-black opacity-10 mb-8"></div>
          </div>
          <form onSubmit={handleLogin} className="space-y-12">
            <input 
              type="password" 
              placeholder="ENTER ACCESS CODE"
              className="w-full bg-transparent border-b border-zinc-100 p-6 text-black outline-none focus:border-black transition-all text-center tracking-[1em] text-[10px] placeholder:text-zinc-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" className="w-full py-5 bg-black text-white text-[9px] tracking-[0.6em] uppercase font-light hover:bg-zinc-800 transition-all shadow-sm">
              Authorize
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-52 pb-40 px-12 max-w-6xl mx-auto bg-white fade-in">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-zinc-100 pb-12">
        <div>
          <h1 className="text-4xl font-serif text-black uppercase mb-4 font-light tracking-widest">Console</h1>
          <div className="flex gap-8 mt-6">
            {(['Works', 'About', 'Contact'] as AdminTab[]).map(tab => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setIsAdding(false); }}
                className={`text-[10px] tracking-[0.4em] uppercase transition-all ${activeTab === tab ? 'text-black font-semibold underline underline-offset-8' : 'text-zinc-300 hover:text-black'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {activeTab === 'Works' && (
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="mt-8 md:mt-0 px-12 py-3 border border-black text-[9px] tracking-[0.5em] text-black uppercase hover:bg-black hover:text-white transition-all duration-700"
          >
            {isAdding ? 'Close Editor' : 'Create New Entry'}
          </button>
        )}
      </div>

      {activeTab === 'Works' && (
        <>
          {isAdding && (
            <form onSubmit={handleAdd} className="mb-40 space-y-16 p-12 bg-zinc-50 border border-zinc-100 fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <input required placeholder="TITLE" className="w-full bg-transparent border-b border-zinc-200 p-3 text-black outline-none focus:border-black text-[10px] tracking-widest uppercase placeholder:text-zinc-300" value={newProject.title || ''} onChange={(e) => setNewProject({...newProject, title: e.target.value})} />
                  <input placeholder="CLIENT" className="w-full bg-transparent border-b border-zinc-200 p-3 text-black outline-none focus:border-black text-[10px] tracking-widest uppercase placeholder:text-zinc-300" value={newProject.client || ''} onChange={(e) => setNewProject({...newProject, client: e.target.value})} />
                </div>
                <div className="space-y-12">
                  <select className="w-full bg-transparent border-b border-zinc-200 p-3 text-black outline-none focus:border-black text-[10px] tracking-widest uppercase cursor-pointer" value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value as Category})}>
                    <option value="Film">Film</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                  <input placeholder="ROLE (E.G. DIRECTOR)" className="w-full bg-transparent border-b border-zinc-200 p-3 text-black outline-none focus:border-black text-[10px] tracking-widest uppercase placeholder:text-zinc-300" value={newProject.role || ''} onChange={(e) => setNewProject({...newProject, role: e.target.value})} />
                </div>
              </div>
              <textarea placeholder="PROJECT NARRATIVE / APPROACH" className="w-full bg-white border border-zinc-200 p-8 text-black outline-none focus:border-black text-[10px] h-40 resize-none leading-relaxed tracking-widest uppercase placeholder:text-zinc-300" value={newProject.approach || ''} onChange={(e) => setNewProject({...newProject, approach: e.target.value})} />
              
              <div className="space-y-12 bg-white p-8 border border-zinc-100">
                <div className="flex flex-col gap-6">
                  <label className="text-[9px] tracking-[0.4em] text-zinc-400 uppercase">Project Thumbnail</label>
                  <div className="flex gap-4 items-center">
                    <input 
                      placeholder="THUMBNAIL IMAGE URL" 
                      className="flex-1 bg-transparent border-b border-zinc-200 p-3 text-black outline-none focus:border-black text-[10px] tracking-widest placeholder:text-zinc-300" 
                      value={newProject.thumbnailUrl || ''} 
                      onChange={(e) => setNewProject({...newProject, thumbnailUrl: e.target.value})} 
                    />
                    <button 
                      type="button" 
                      onClick={() => thumbInputRef.current?.click()}
                      className="px-4 py-2 bg-zinc-100 text-[8px] tracking-widest uppercase hover:bg-black hover:text-white transition-all"
                    >
                      Upload File
                    </button>
                    <input ref={thumbInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
                  </div>
                  {newProject.thumbnailUrl && (
                    <div className="w-24 h-24 border border-zinc-100 overflow-hidden">
                      <img src={newProject.thumbnailUrl} className="w-full h-full object-cover" alt="Thumb Preview" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-6 mt-12">
                  <label className="text-[9px] tracking-[0.4em] text-zinc-400 uppercase">Still Cuts (Gallery)</label>
                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => galleryInputRef.current?.click()}
                      className="w-full py-4 border border-dashed border-zinc-200 text-[9px] tracking-[0.4em] uppercase text-zinc-400 hover:text-black hover:border-black transition-all"
                    >
                      Add Images to Gallery
                    </button>
                    <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {newProject.stillCuts?.map((cut, idx) => (
                      <div key={idx} className="relative group aspect-square border border-zinc-100 overflow-hidden">
                        <img src={cut} className="w-full h-full object-cover" alt="" />
                        <button 
                          type="button" 
                          onClick={() => removeStillCut(idx)}
                          className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] uppercase tracking-widest"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <input placeholder="VIDEO URL (MP4)" className="w-full bg-transparent border-b border-zinc-200 p-3 text-black outline-none focus:border-black text-[10px] tracking-widest placeholder:text-zinc-300" value={newProject.videoUrl || ''} onChange={(e) => setNewProject({...newProject, videoUrl: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full py-6 bg-black text-white text-[10px] tracking-[0.6em] font-light uppercase hover:bg-zinc-800 transition-all duration-700">Publish to Archive</button>
            </form>
          )}

          <div className="space-y-12">
            <h2 className="text-[10px] tracking-[0.5em] text-zinc-300 uppercase mb-12">Entries List</h2>
            {projects.length === 0 ? (
              <p className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase py-10">No entries in archive.</p>
            ) : (
              projects.map((p) => (
                <div key={p.id} className="group flex justify-between items-center p-10 bg-white border border-zinc-100 hover:border-black transition-all duration-700">
                  <div className="flex gap-16 items-center">
                    <div className="w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-1000 overflow-hidden border border-zinc-50 shadow-sm">
                      <img src={p.thumbnailUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-black font-serif text-2xl font-light uppercase tracking-tight">{p.title}</h3>
                      <div className="flex gap-8 items-center">
                        <span className="text-[8px] tracking-[0.5em] text-zinc-300 uppercase font-light">{p.category}</span>
                        <div className="w-1 h-1 bg-zinc-200 rounded-full"></div>
                        <span className="text-[8px] tracking-[0.5em] text-zinc-300 uppercase font-light">{p.year}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(p.id)} 
                    className="px-6 py-2 border border-zinc-100 text-[8px] tracking-[0.4em] text-zinc-300 hover:text-red-500 hover:border-red-500 uppercase transition-all"
                  >
                    Delete Project
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === 'About' && (
        <form onSubmit={handleSaveSettings} className="space-y-16 fade-in max-w-4xl">
          <div className="space-y-6">
            <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">Philosophy Heading</label>
            <input 
              className="w-full bg-transparent border-b border-zinc-100 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-black transition-all"
              value={editSettings.aboutPhilosophy}
              onChange={(e) => setEditSettings({...editSettings, aboutPhilosophy: e.target.value})}
            />
          </div>
          <div className="space-y-6">
            <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">Main Title (Supports Newlines)</label>
            <textarea 
              rows={4}
              className="w-full bg-transparent border border-zinc-100 p-6 text-xl font-serif text-black outline-none focus:border-black transition-all resize-none leading-relaxed"
              value={editSettings.aboutTitle}
              onChange={(e) => setEditSettings({...editSettings, aboutTitle: e.target.value})}
            />
          </div>
          <div className="space-y-6">
            <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">Description Text</label>
            <textarea 
              rows={6}
              className="w-full bg-transparent border border-zinc-100 p-6 text-[10px] tracking-widest uppercase text-zinc-400 outline-none focus:border-black transition-all resize-none leading-loose"
              value={editSettings.aboutDescription}
              onChange={(e) => setEditSettings({...editSettings, aboutDescription: e.target.value})}
            />
          </div>
          <button type="submit" className="px-16 py-5 bg-black text-white text-[9px] tracking-[0.6em] uppercase hover:bg-zinc-800 transition-all font-light">Update About Page</button>
        </form>
      )}

      {activeTab === 'Contact' && (
        <form onSubmit={handleSaveSettings} className="space-y-16 fade-in max-w-4xl">
          <div className="space-y-6">
            <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">Contact Punchline</label>
            <input 
              className="w-full bg-transparent border-b border-zinc-100 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-black transition-all"
              value={editSettings.contactPunchline}
              onChange={(e) => setEditSettings({...editSettings, contactPunchline: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-zinc-50">
            <div className="space-y-6">
              <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">Email Address</label>
              <input 
                className="w-full bg-transparent border-b border-zinc-100 p-4 text-[10px] tracking-widest outline-none focus:border-black transition-all"
                value={editSettings.email}
                onChange={(e) => setEditSettings({...editSettings, email: e.target.value})}
              />
            </div>
            <div className="space-y-6">
              <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">Phone Number</label>
              <input 
                className="w-full bg-transparent border-b border-zinc-100 p-4 text-[10px] tracking-widest outline-none focus:border-black transition-all"
                value={editSettings.phone}
                onChange={(e) => setEditSettings({...editSettings, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-zinc-50">
            <div className="space-y-6">
              <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">Instagram URL</label>
              <input 
                className="w-full bg-transparent border-b border-zinc-100 p-4 text-[10px] tracking-widest outline-none focus:border-black transition-all"
                value={editSettings.instagramUrl}
                onChange={(e) => setEditSettings({...editSettings, instagramUrl: e.target.value})}
              />
            </div>
            <div className="space-y-6">
              <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">YouTube URL</label>
              <input 
                className="w-full bg-transparent border-b border-zinc-100 p-4 text-[10px] tracking-widest outline-none focus:border-black transition-all"
                value={editSettings.youtubeUrl}
                onChange={(e) => setEditSettings({...editSettings, youtubeUrl: e.target.value})}
              />
            </div>
            <div className="space-y-6">
              <label className="text-[9px] tracking-[0.4em] text-zinc-300 uppercase">Vimeo URL</label>
              <input 
                className="w-full bg-transparent border-b border-zinc-100 p-4 text-[10px] tracking-widest outline-none focus:border-black transition-all"
                value={editSettings.vimeoUrl}
                onChange={(e) => setEditSettings({...editSettings, vimeoUrl: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="px-16 py-5 bg-black text-white text-[9px] tracking-[0.6em] uppercase hover:bg-zinc-800 transition-all font-light">Update Links & Content</button>
        </form>
      )}
    </div>
  );
};

export default Admin;
