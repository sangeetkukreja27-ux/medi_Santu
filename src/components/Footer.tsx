"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  const [siteLogo, setSiteLogo] = React.useState<string>("");
  const [siteLogoHeight, setSiteLogoHeight] = React.useState<number>(55);

  React.useEffect(() => {
    fetch(`/api/cms?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const logo = data.cms?.homepage?.siteLogoImage || data.settings?.siteLogoImage || data.settings?.homepage?.siteLogoImage;
        const height = data.cms?.homepage?.siteLogoHeight || data.settings?.siteLogoHeight || data.settings?.homepage?.siteLogoHeight;
        if (logo) setSiteLogo(logo);
        if (height) setSiteLogoHeight(Number(height));
      })
      .catch((err) => console.error("CMS Logo load error in Footer:", err));
  }, []);

  return (
    <footer className="bg-[#020A14] text-slate-300 font-sans border-t border-[#0C1E36]">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 border-b border-[#0C1E36]">
        
        {/* Column 1: Brand & Info (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 text-left">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#00A86B] p-2 rounded-xl text-white shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-0.5">
                trusted<span className="text-[#00A86B]">medshop</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-semibold tracking-wider -mt-1">Verified medicine delivery</span>
            </div>
          </Link>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-1">
            trustedmedshop is a global pharmaceutical company specializing in the export of high-quality, affordable and life-saving medicines worldwide.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-2 mt-2">
            {/* LinkedIn */}
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0077B5] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-sm" title="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="w-8 h-8 rounded-lg bg-[#1877F2] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-sm" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0E1E33] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-sm border border-[#16365C]" title="X">
              <span className="font-bold text-xs">𝕏</span>
            </a>
            {/* YouTube */}
            <a href="#" className="w-8 h-8 rounded-lg bg-[#FF0000] hover:opacity-90 text-white flex items-center justify-center transition-all shadow-sm" title="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2 flex flex-col gap-3.5 text-left">
          <span className="text-sm font-bold text-white tracking-wide">Quick Links</span>
          <nav className="flex flex-col gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-[#00A86B] transition-colors">Home</Link>
            <Link href="/products" className="hover:text-[#00A86B] transition-colors">All Medicines</Link>
            <Link href="/products" className="hover:text-[#00A86B] transition-colors">By Category</Link>
            <Link href="/products" className="hover:text-[#00A86B] transition-colors">By Brand</Link>
            <Link href="/about" className="hover:text-[#00A86B] transition-colors">Export</Link>
            <Link href="/about" className="hover:text-[#00A86B] transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-[#00A86B] transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Column 3: Our Services */}
        <div className="lg:col-span-3 flex flex-col gap-3.5 text-left">
          <span className="text-sm font-bold text-white tracking-wide">Our Services</span>
          <nav className="flex flex-col gap-2 text-xs text-slate-400">
            <span className="hover:text-white transition-colors cursor-default">Global Export</span>
            <span className="hover:text-white transition-colors cursor-default">Worldwide Supply</span>
            <span className="hover:text-white transition-colors cursor-default">Bulk Supply</span>
            <span className="hover:text-white transition-colors cursor-default">Private Label</span>
            <span className="hover:text-white transition-colors cursor-default">Regulatory Support</span>
            <span className="hover:text-white transition-colors cursor-default">Partnership Opportunities</span>
          </nav>
        </div>

        {/* Column 4: Get in Touch */}
        <div className="lg:col-span-3 flex flex-col gap-3.5 text-left">
          <span className="text-sm font-bold text-white tracking-wide">Get in Touch</span>
          <div className="flex flex-col gap-3 text-xs text-slate-300">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors">
              <span className="w-6 h-6 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center font-bold text-xs">💬</span>
              <span>Chat on WhatsApp</span>
            </a>
            <a href="https://t.me/trustedmedshop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#0088cc] transition-colors">
              <span className="w-6 h-6 rounded-full bg-[#0088cc]/20 text-[#0088cc] flex items-center justify-center font-bold text-xs">✈️</span>
              <span>Join on Telegram</span>
            </a>
            <a href="mailto:info@trustedmedshop.com" className="flex items-center gap-2.5 hover:text-[#00A86B] transition-colors">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">✉️</span>
              <span>info@trustedmedshop.com</span>
            </a>
            <div className="flex items-start gap-2.5 text-slate-400 mt-1">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs mt-0.5">🕒</span>
              <span>Mon - Sat: 9:00 AM - 6:00 PM (GMT +5:30)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Lower Copyright section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
        <div>
          <span>&copy; {new Date().getFullYear()} trustedmedshop. All rights reserved.</span>
        </div>
        <div>
          <span className="text-slate-500">Global Medicines. A Healthier Tomorrow.</span>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-40 group flex items-center justify-center cursor-pointer"
        title="Chat on WhatsApp"
      >
        <span className="absolute inline-flex h-14 w-14 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none" />
        <div className="bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl relative hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center">
          <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
          </svg>
        </div>
      </a>
      
    </footer>
  );
};
export default Footer;
