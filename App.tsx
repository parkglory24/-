
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Works from './pages/Works';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { Project, SiteSettings } from './types';
import { INITIAL_PROJECTS, INITIAL_SETTINGS } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const links = [
    { path: '/works', label: 'Archive' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-10 ${isHome ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md'}`}>
      <Link to="/" className="text-lg font-serif tracking-[0.4em] font-light uppercase">
        스튜디오 여담
      </Link>
      
      <div className="flex gap-10 md:gap-14">
        {links.map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className={`text-[9px] tracking-[0.5em] uppercase transition-colors duration-500 ${
              location.pathname === link.path ? 'text-black font-medium' : 'text-zinc-400 hover:text-black'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="py-20 px-12 border-t border-zinc-100 flex justify-between items-center bg-white">
    <p className="text-[8px] text-zinc-300 tracking-[0.5em] uppercase">Studio Yeodam © 2026</p>
    <div className="h-[0.5px] w-12 bg-zinc-100"></div>
  </footer>
);

const AdminAccess: React.FC = () => (
  <Link 
    to="/admin" 
    className="fixed bottom-6 right-6 z-[100] text-[7px] tracking-[0.4em] uppercase text-black opacity-20 hover:opacity-100 transition-opacity duration-700"
  >
    Console
  </Link>
);

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);

  useEffect(() => {
    const savedProjects = localStorage.getItem('cv_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem('cv_projects', JSON.stringify(INITIAL_PROJECTS));
    }

    const savedSettings = localStorage.getItem('cv_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else {
      setSettings(INITIAL_SETTINGS);
      localStorage.setItem('cv_settings', JSON.stringify(INITIAL_SETTINGS));
    }
  }, []);

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('cv_projects', JSON.stringify(newProjects));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem('cv_settings', JSON.stringify(newSettings));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home projects={projects} />} />
            <Route path="/works" element={<Works projects={projects} settings={settings} />} />
            <Route path="/project/:id" element={<ProjectDetail projects={projects} />} />
            <Route path="/about" element={<About settings={settings} />} />
            <Route path="/contact" element={<Contact settings={settings} />} />
            <Route path="/admin" element={<Admin projects={projects} setProjects={updateProjects} settings={settings} setSettings={updateSettings} />} />
          </Routes>
        </main>
        <Footer />
        <AdminAccess />
      </div>
    </Router>
  );
};

export default App;
