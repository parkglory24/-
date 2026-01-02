
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative h-screen w-full bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Structural Thin Lines - 0.5px aesthetic */}
      <div className="absolute inset-x-0 top-1/2 h-[0.5px] bg-black opacity-10"></div>
      <div className="absolute inset-y-0 left-1/2 w-[0.5px] bg-black opacity-10"></div>
      
      {/* Top Frame Line */}
      <div className="absolute top-24 inset-x-12 h-[0.5px] bg-black opacity-5"></div>
      {/* Bottom Frame Line */}
      <div className="absolute bottom-24 inset-x-12 h-[0.5px] bg-black opacity-5"></div>

      <div className="z-10 text-center fade-in px-8">
        <h1 className="text-3xl md:text-5xl font-serif text-black mb-16 font-light tracking-tight leading-relaxed">
          이미지가 아닌 맥락을 설계합니다.
        </h1>
        
        <Link 
          to="/works" 
          className="group relative inline-block text-[10px] tracking-[1em] text-black uppercase transition-all duration-1000"
        >
          Archive
          <span className="absolute -bottom-3 left-0 w-full h-[0.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"></span>
        </Link>
      </div>

      <div className="absolute bottom-10 w-full text-center">
        <span className="text-[7px] tracking-[1em] text-zinc-300 uppercase">Studio Yeodam</span>
      </div>
    </div>
  );
};

export default Home;
