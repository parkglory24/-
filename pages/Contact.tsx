
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { SiteSettings } from '../types';

interface ContactProps {
  settings: SiteSettings;
}

const Contact: React.FC<ContactProps> = ({ settings }) => {
  const [form, setForm] = useState({ name: '', company: '', type: 'Film', content: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-48 h-[80vh] flex flex-col items-center justify-center text-center fade-in">
        <h2 className="text-3xl font-serif text-black mb-10 font-light tracking-widest">SENT</h2>
        <button onClick={() => setSubmitted(false)} className="text-[9px] tracking-[0.6em] text-zinc-400 hover:text-black uppercase border-b border-zinc-100 pb-2">Back</button>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-32 px-8 max-w-3xl mx-auto bg-white">
      <header className="mb-24 text-center">
        <h1 className="text-4xl font-serif text-black mb-8 uppercase tracking-[0.3em] font-light">Contact</h1>
        <p className="text-zinc-300 text-[9px] tracking-[0.5em] uppercase font-light">{settings.contactPunchline}</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-16 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <input 
            required
            className="w-full bg-transparent border-b border-zinc-100 focus:border-black py-4 text-black outline-none transition-all placeholder:text-zinc-200 text-[10px] tracking-widest uppercase"
            placeholder="Name / Brand"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
          />
          <select 
            className="w-full bg-transparent border-b border-zinc-100 focus:border-black py-4 text-black outline-none appearance-none text-[10px] tracking-widest uppercase"
            value={form.type}
            onChange={(e) => setForm({...form, type: e.target.value})}
          >
            {CATEGORIES.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <textarea 
          required
          rows={3}
          className="w-full bg-transparent border-b border-zinc-100 focus:border-black py-4 text-black outline-none resize-none placeholder:text-zinc-200 text-[10px] tracking-widest uppercase leading-loose"
          placeholder="Brief narrative of your project."
          value={form.content}
          onChange={(e) => setForm({...form, content: e.target.value})}
        />
        <div className="flex justify-center pt-10">
          <button type="submit" className="px-16 py-5 bg-black text-white text-[9px] tracking-[0.8em] uppercase hover:bg-zinc-800 transition-all font-light">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
