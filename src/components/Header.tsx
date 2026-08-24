"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Phone, 
  Mail, 
  ChevronDown, 
  Menu, 
  X,
  MessageSquare,
  Globe
} from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, openInquiryModal } = useCart();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState<string>("");
  const [siteLogoHeight, setSiteLogoHeight] = useState<number>(55);

  useEffect(() => {
    fetch(`/api/cms?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const logo = data.cms?.homepage?.siteLogoImage || data.settings?.siteLogoImage || data.settings?.homepage?.siteLogoImage;
        const height = data.cms?.homepage?.siteLogoHeight || data.settings?.siteLogoHeight || data.settings?.homepage?.siteLogoHeight;
        if (logo) setSiteLogo(logo);
        if (height) setSiteLogoHeight(Number(height));
      })
      .catch((err) => console.error("CMS Logo load error:", err));
  }, []);

  const categories = [
    "All Categories",
    "Anti Parasite",
    "Antibiotics",
    "Contraceptives",
    "Erectile Dysfunction",
    "Hormone Therapy",
    "Pain Relief",
    "Sleeping Disorder",
    "Vitamins & Supplements"
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let queryParams = [];
    if (searchQuery) {
      queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
    }
    if (selectedCategory !== "All Categories") {
      queryParams.push(`category=${encodeURIComponent(selectedCategory.toLowerCase().replace(/\s+/g, "-"))}`);
    }
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    router.push(`/products${queryString}`);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/#services" },
    { name: "Why Us", href: "/#why-us" },
    { name: "Resources", href: "/#resources" },
    { name: "Contact Us", href: "/contact" }
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full flex flex-col z-50 bg-white">
      {/* Top Banner */}
      <div className="w-full bg-[#005B41] text-white py-2 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#00A877]" />
            <span>Global shipping to 107+ countries | Free shipping on orders over ₹1499</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-[#00A877] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#00A877]" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@trustedmedshop.com" className="flex items-center gap-1.5 hover:text-[#00A877] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#00A877]" />
              <span>info@trustedmedshop.com</span>
            </a>
            <div className="flex items-center gap-2">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] p-1 rounded-full text-white hover:opacity-90 transition-opacity">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
                </svg>
              </a>
              <a href="https://t.me/trustedmedshop" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] p-1 rounded-full text-white hover:opacity-90 transition-opacity">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.13-.05-.19-.06-.05-.14-.04-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.98.36-.32-.01-.94-.18-1.4-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.12.09.08.12.18.13.26.01.07.01.14 0 .22z" />
                </svg>
              </a>
              <a href="mailto:info@trustedmedshop.com" className="bg-[#dd4b39] p-1 rounded-full text-white hover:opacity-90 transition-opacity">
                <Mail className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="w-full border-b border-slate-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {siteLogo ? (
              <img 
                src={siteLogo} 
                alt="trustedmedshop" 
                style={{ height: `${siteLogoHeight}px` }} 
                className="w-auto object-contain max-w-[280px] transition-all" 
              />
            ) : (
              <>
                <div className="bg-[#005B41] p-2 rounded-xl flex items-center justify-center text-white shadow-md shadow-[#005b41]/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#005B41] flex items-center gap-1">
                    trusted<span className="text-[#00A877]">medshop</span>
                  </span>
                  <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider -mt-1">Verified medicine delivery</span>
                </div>
              </>
            )}
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex flex-1 w-full max-w-xl border border-slate-200 rounded-full bg-slate-50 hover:border-slate-300 focus-within:border-[#005B41] focus-within:ring-2 focus-within:ring-[#005B41]/10 transition-all overflow-hidden items-center">
            <input 
              type="text" 
              placeholder="Search medicines or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-5 py-2.5 text-sm bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
            />
            
            {/* Category Dropdown */}
            <div className="relative border-l border-slate-200 hidden sm:block">
              <button 
                type="button" 
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isCategoryMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-100 bg-white shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-[#F4F7F6] hover:text-[#005B41] transition-colors ${selectedCategory === cat ? "bg-[#F4F7F6]/50 text-[#005B41] font-semibold" : ""}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button type="submit" className="bg-[#005B41] hover:bg-[#004833] text-white p-3 rounded-full mr-1 transition-colors flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* User Account & Cart Info */}
          <div className="flex items-center gap-4 lg:gap-6 ml-2">
            <Link href="/login" className="flex items-center gap-2 text-slate-700 hover:text-[#005B41] transition-colors group">
              <div className="bg-slate-50 p-2 rounded-full group-hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm">
                <User className="w-4.5 h-4.5 text-slate-700 group-hover:text-[#005B41] transition-colors" />
              </div>
              <div className="hidden xl:block text-left text-xs font-medium">
                <span className="block text-slate-400 text-[10px] leading-tight font-semibold">My Account</span>
                <span className="block text-slate-800 font-bold group-hover:text-[#005B41] text-xs">Sign In / Register</span>
              </div>
            </Link>
            
            <Link href="/cart" className="flex items-center gap-2 text-slate-700 hover:text-[#005B41] transition-colors group relative">
              <div className="bg-slate-50 p-2 rounded-full group-hover:bg-slate-100 transition-colors relative border border-slate-200 shadow-sm">
                <ShoppingCart className="w-4.5 h-4.5 text-slate-700 group-hover:text-[#005B41] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#00A877] text-white font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:block text-left text-xs font-medium">
                <span className="block text-slate-400 text-[10px] leading-tight font-semibold">Your Cart</span>
                <span className="block text-slate-800 font-bold group-hover:text-[#005B41] text-xs">{cartCount} Items</span>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Navigation & CTAs Bar */}
      <div className="w-full border-b border-slate-100 bg-[#F8FAF9]/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-2.5">
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${
                  isActive(link.href) 
                    ? "text-[#005B41] font-bold" 
                    : "text-slate-600 hover:text-[#005B41]"
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A877] rounded-full" />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-[#005B41]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Quick Inquiry & Social CTAs */}
          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => openInquiryModal()}
              className="bg-[#005B41] hover:bg-[#004833] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-[#005b41]/10 flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <span>Inquiry Now</span>
              <MessageSquare className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-200 pl-3.5">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/10 hover:bg-[#25D366]/20 p-2 rounded-full text-[#25D366] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
                </svg>
              </a>
              <a href="https://t.me/trustedmedshop" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc]/10 hover:bg-[#0088cc]/20 p-2 rounded-full text-[#0088cc] transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.13-.05-.19-.06-.05-.14-.04-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.98.36-.32-.01-.94-.18-1.4-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.12.09.08.12.18.13.26.01.07.01.14 0 .22z" />
                </svg>
              </a>
              <a href="mailto:info@trustedmedshop.com" className="bg-[#dd4b39]/10 hover:bg-[#dd4b39]/20 p-2 rounded-full text-[#dd4b39] transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-all flex justify-start">
          <div className="bg-white w-4/5 max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200 overflow-y-auto">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-[#005B41] p-1.5 rounded-lg text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-base font-bold text-[#005B41]">
                    trusted<span className="text-[#00A877]">medshop</span>
                  </span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-bold py-2 border-b border-slate-100 ${isActive(link.href) ? "text-[#005B41]" : "text-slate-700"}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Details</span>
                <div className="flex flex-col gap-3.5 text-sm text-slate-700">
                  <a href="tel:+919876543210" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#005B41]" />
                    <span>+91 98765 43210</span>
                  </a>
                  <a href="mailto:info@trustedmedshop.com" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#005B41]" />
                    <span>info@trustedmedshop.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-3.5 mt-2">
                  <a href="https://wa.me/919876543210" className="bg-[#25D366] text-white p-2.5 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
                    </svg>
                  </a>
                  <a href="https://t.me/trustedmedshop" className="bg-[#0088cc] text-white p-2.5 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.13-.05-.19-.06-.05-.14-.04-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.98.36-.32-.01-.94-.18-1.4-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.12.09.08.12.18.13.26.01.07.01.14 0 .22z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
