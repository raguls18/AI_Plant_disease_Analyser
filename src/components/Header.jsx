import React from 'react';
import * as FiIcons from 'react-icons/fi';
const { FiLeaf, FiGithub } = FiIcons;
import SafeIcon from '../common/SafeIcon';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <SafeIcon icon={FiLeaf} className="text-white text-xl" />
          </div>
          <span className="font-bold text-xl text-emerald-900 tracking-tight">CropGuard AI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-700">
          <a href="#" className="hover:text-emerald-500 transition-colors">Home</a>
          <a href="#detector" className="hover:text-emerald-500 transition-colors">Detect</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">Resources</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-emerald-600 hover:text-emerald-700">
            <SafeIcon icon={FiGithub} className="text-xl" />
          </button>
          <button className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;