"use client";

import React from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  MessageCircle
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
    <footer className="bg-[#0b241e] text-slate-300 font-sans border-t border-[#005B41]/30">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-8 border-b border-slate-800">
        
        {/* Column 1: Brand & Info */}
        <div className="flex flex-col gap-5 md:col-span-1 sm:col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            {siteLogo ? (
              <img 
                src={siteLogo} 
                alt="trustedmedshop" 
                style={{ height: `${siteLogoHeight}px` }} 
                className="w-auto object-contain max-w-[280px] transition-all" 
              />
            ) : (
              <>
                <div className="bg-[#00A877] p-2 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#00A877]/10">
                  <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                    trusted<span className="text-[#00A877]">medshop</span>
                  </span>
                  <span className="block text-[9px] text-slate-400 font-semibold uppercase tracking-wider -mt-0.5">Verified medicine delivery</span>
                </div>
              </>
            )}
          </Link>
          <p className="text-xs sm:text-sm text-slate-400 leading-6">
            Global pharmaceutical importer & exporter of quality medicines. Trusted by healthcare providers worldwide. Delivering life-saving medicines to 107+ countries.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3.5 mt-2">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/10 hover:bg-[#25D366] p-2 rounded-full text-[#25D366] hover:text-white transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
              </svg>
            </a>
            <a href="https://t.me/trustedmedshop" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc]/10 hover:bg-[#0088cc] p-2 rounded-full text-[#0088cc] hover:text-white transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.13-.05-.19-.06-.05-.14-.04-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.98.36-.32-.01-.94-.18-1.4-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.12.09.08.12.18.13.26.01.07.01.14 0 .22z" />
              </svg>
            </a>
            <a href="mailto:info@trustedmedshop.com" className="bg-[#dd4b39]/10 hover:bg-[#dd4b39] p-2 rounded-full text-[#dd4b39] hover:text-white transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</span>
          <nav className="flex flex-col gap-2.5 text-xs sm:text-sm">
            <Link href="/" className="hover:text-[#00A877] transition-colors flex items-center gap-1 group">
              <ArrowRight className="w-3 h-3 text-[#00A877] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Home</span>
            </Link>
            <Link href="/about" className="hover:text-[#00A877] transition-colors flex items-center gap-1 group">
              <ArrowRight className="w-3 h-3 text-[#00A877] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>About Us</span>
            </Link>
            <Link href="/products" className="hover:text-[#00A877] transition-colors flex items-center gap-1 group">
              <ArrowRight className="w-3 h-3 text-[#00A877] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Products</span>
            </Link>
            <Link href="/#services" className="hover:text-[#00A877] transition-colors flex items-center gap-1 group">
              <ArrowRight className="w-3 h-3 text-[#00A877] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Services</span>
            </Link>
            <Link href="/#resources" className="hover:text-[#00A877] transition-colors flex items-center gap-1 group">
              <ArrowRight className="w-3 h-3 text-[#00A877] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Resources</span>
            </Link>
            <Link href="/contact" className="hover:text-[#00A877] transition-colors flex items-center gap-1 group">
              <ArrowRight className="w-3 h-3 text-[#00A877] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Contact Us</span>
            </Link>
          </nav>
        </div>

        {/* Column 3: Our Services */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold text-white uppercase tracking-wider">Our Services</span>
          <nav className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-400">
            <span className="hover:text-white transition-colors cursor-default">Pharmaceutical Export</span>
            <span className="hover:text-white transition-colors cursor-default">Pharmaceutical Import</span>
            <span className="hover:text-white transition-colors cursor-default">Third Party Manufacturing</span>
            <span className="hover:text-white transition-colors cursor-default">Private Labeling</span>
            <span className="hover:text-white transition-colors cursor-default">Logistics Support</span>
          </nav>
        </div>

        {/* Column 4: Contact Us */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold text-white uppercase tracking-wider">Contact Us</span>
          <div className="flex flex-col gap-3.5 text-xs sm:text-sm text-slate-400">
            <a href="tel:+919876543210" className="flex items-start gap-2.5 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-[#00A877] mt-0.5" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@trustedmedshop.com" className="flex items-start gap-2.5 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-[#00A877] mt-0.5" />
              <span className="break-all">info@trustedmedshop.com</span>
            </a>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#00A877] mt-0.5 flex-shrink-0" />
              <span>123, Healthcare Street, Andheri East, Mumbai - 400001, India</span>
            </div>
          </div>
        </div>

        {/* Column 5: We Accept */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold text-white uppercase tracking-wider font-semibold">We Accept</span>
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
            <div className="bg-white/5 border border-white/10 rounded py-2 px-3 text-white">VISA</div>
            <div className="bg-white/5 border border-white/10 rounded py-2 px-3 text-white">Mastercard</div>
            <div className="bg-white/5 border border-white/10 rounded py-2 px-3 text-white">PayPal</div>
            <div className="bg-white/5 border border-white/10 rounded py-2 px-3 text-white">Stripe</div>
            <div className="bg-white/5 border border-white/10 rounded py-2.5 px-3 text-[#00A877] font-extrabold border-[#00A877]/20 uppercase tracking-widest text-[9px] col-span-2">UPI</div>
          </div>
        </div>

      </div>

      {/* Lower Copyright section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <div>
          <span>&copy; {new Date().getFullYear()} trustedmedshop. All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="text-slate-700">|</span>
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
        </div>
      </div>

      {/* Floating WhatsApp button with Pulsing Ring Animation & Official Logo */}
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
        <span className="absolute right-16 bg-[#25D366] text-white text-xs font-bold py-1.5 px-3.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden sm:block -translate-x-2 group-hover:translate-x-0">
          Chat on WhatsApp
        </span>
      </a>
      
    </footer>
  );
};
export default Footer;
