"use client";

import React from "react";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Clock,
  Send,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Instagram
} from "lucide-react";

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
    <footer className="bg-[#051329] text-slate-300 font-sans border-t border-[#0A3981]/30">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 border-b border-slate-800/80">
        
        {/* Column 1: Brand & Info (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 text-left">
          <Link href="/" className="flex items-center gap-2">
            {siteLogo ? (
              <img 
                src={siteLogo} 
                alt="trustedmedshop" 
                style={{ height: `${siteLogoHeight}px` }} 
                className="w-auto object-contain max-w-[260px]" 
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="bg-[#00A86B] p-2 rounded-xl text-white">
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
              </div>
            )}
          </Link>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-1">
            trustedmedshop is a global pharmaceutical company specializing in the export of high-quality, affordable and life-saving medicines worldwide.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-2.5 mt-2">
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0A3981]/50 hover:bg-[#00A86B] text-white flex items-center justify-center transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0A3981]/50 hover:bg-[#00A86B] text-white flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0A3981]/50 hover:bg-[#00A86B] text-white flex items-center justify-center transition-colors">
              <span className="font-bold text-xs">𝕏</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0A3981]/50 hover:bg-[#00A86B] text-white flex items-center justify-center transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-[#0A3981]/50 hover:bg-[#00A86B] text-white flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links (2.5 cols) */}
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

        {/* Column 3: Our Services (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3.5 text-left">
          <span className="text-sm font-bold text-white tracking-wide">Our Services</span>
          <nav className="flex flex-col gap-2 text-xs text-slate-400">
            <span className="hover:text-white transition-colors cursor-default">Global Shipping</span>
            <span className="hover:text-white transition-colors cursor-default">Bulk Supply</span>
            <span className="hover:text-white transition-colors cursor-default">Private Label</span>
            <span className="hover:text-white transition-colors cursor-default">Regulatory Support</span>
            <span className="hover:text-white transition-colors cursor-default">Quality Assurance</span>
            <span className="hover:text-white transition-colors cursor-default">Partnership Opportunities</span>
          </nav>
        </div>

        {/* Column 4: Get in Touch (3 cols) */}
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
          <span className="text-slate-400">Global Medicines. A Healthier Tomorrow.</span>
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
