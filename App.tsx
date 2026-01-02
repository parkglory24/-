
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Works from './pages/Works.tsx';
import ProjectDetail from './pages/ProjectDetail.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Admin from './pages/Admin.tsx';
import { Project, SiteSettings } from './types.ts';
import { INITIAL_PROJECTS, INITIAL_SETTINGS } from './constants.ts';

// IndexedDB Utility for large data persistence
const DB_NAME = 'StudioYeodamDB';
const STORE_NAME = 'projects';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

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
  const [isDBReady, setIsDBReady] = useState(false);

  // Load Initial Data
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Load Settings from LocalStorage (small data)
        const savedSettings = localStorage.getItem('cv_settings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }

        // 2. Load Projects from IndexedDB (large data)
        const db = await initDB();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          const result = request.result;
          if (result && result.length > 0) {
            // Sort by ID (time) descending
            setProjects(result.sort((a, b) => b.id.localeCompare(a.id)));
          } else {
            setProjects(INITIAL_PROJECTS);
          }
          setIsDBReady(true);
        };
      } catch (error) {
        console.error("Data loading failed:", error);
        setIsDBReady(true); // Proceed anyway to show initial state
      }
    };

    loadData();
  }, []);

  const updateProjects = useCallback(async (newProjects: Project[]) => {
    setProjects(newProjects);
    
    try {
      const db = await initDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Clear existing and add new
      store.clear();
      newProjects.forEach(project => {
        store.add(project);
      });

      transaction.oncomplete = () => {
        console.log("Projects saved to IndexedDB successfully");
      };
    } catch (error) {
      console.error("Failed to save projects to IndexedDB:", error);
      alert("데이터 저장 공간이 부족하거나 오류가 발생했습니다. 이미지 용량을 줄여주세요.");
    }
  }, []);

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem('cv_settings', JSON.stringify(newSettings));
  };

  if (!isDBReady) return null; // Prevent flicker during DB initialization

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-black selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
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
