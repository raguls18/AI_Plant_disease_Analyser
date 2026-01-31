import React from 'react';
import * as FiIcons from 'react-icons/fi';
const { FiLeaf, FiTwitter, FiInstagram, FiLinkedin } = FiIcons;
import SafeIcon from '../common/SafeIcon';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-50 py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <SafeIcon icon={FiLeaf} className="text-emerald-400 text-2xl" />
            <span className="font-bold text-2xl tracking-tighter">CropGuard AI</span>
          </div>
          <p className="text-emerald-200/60 max-w-sm mb-8">
            Empowering farmers and gardeners with advanced computer vision to ensure global food security, one leaf at a time.
          </p>
          <div className="flex gap-4">
            <SafeIcon icon={FiTwitter} className="text-xl hover:text-emerald-400 cursor-pointer transition-colors" />
            <SafeIcon icon={FiInstagram} className="text-xl hover:text-emerald-400 cursor-pointer transition-colors" />
            <SafeIcon icon={FiLinkedin} className="text-xl hover:text-emerald-400 cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Resources</h4>
          <ul className="space-y-4 text-sm text-emerald-200/60">
            <li className="hover:text-emerald-400 cursor-pointer">Documentation</li>
            <li className="hover:text-emerald-400 cursor-pointer">API Access</li>
            <li className="hover:text-emerald-400 cursor-pointer">Plant Database</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-4 text-sm text-emerald-200/60">
            <li className="hover:text-emerald-400 cursor-pointer">Community</li>
            <li className="hover:text-emerald-400 cursor-pointer">Contact Us</li>
            <li className="hover:text-emerald-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-emerald-900/50 text-center text-xs text-emerald-500">
        © {new Date().getFullYear()} CropGuard AI. Powered by Google Gemini.
      </div>
    </footer>
  );
};

export default Footer;