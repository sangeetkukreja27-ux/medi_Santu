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
  Globe,
  Coins
} from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, openInquiryModal, currency, setCurrency } = useCart();
  
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
    <header className="w-full flex flex-col z-50 bg-white shadow-sm sticky top-0 md:relative">
      {/* 1. TOP BANNER STRIP */}
      <div className="w-full bg-[#0A3981] text-white py-1.5 px-3 sm:px-6 lg:px-8 text-[11px] sm:text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Shipping Info */}
          <div className="flex items-center gap-1.5 truncate">
            <Globe className="w-3.5 h-3.5 text-[#00A86B] flex-shrink-0" />
            <span className="truncate">Global shipping to 107+ countries | Orders over ₹1499 Free Shipping</span>
          </div>

          {/* Right items */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            <a href="tel:+919876543210" className="hidden sm:flex items-center gap-1 hover:text-[#00A86B] transition-colors">
              <Phone className="w-3 h-3 text-[#00A86B]" />
              <span>+91 98765 43210</span>
            </a>
            
            {/* Currency Selector (INR ↔ USD) */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-lg border border-white/20">
              <Coins className="w-3 h-3 text-[#00A86B]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "INR" | "USD")}
                className="bg-transparent text-white font-bold text-[10px] sm:text-xs outline-none cursor-pointer"
              >
                <option value="INR" className="bg-[#0A3981] text-white font-bold">🇮🇳 INR (₹)</option>
                <option value="USD" className="bg-[#0A3981] text-white font-bold">🇺🇸 USD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="w-full border-b border-slate-100 py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          
          {/* Mobile Top Row: Hamburger + Logo + Cart/User */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Hamburger Button (Mobile Only) */}
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 -ml-1 text-slate-700 hover:text-[#0A3981] rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              {siteLogo ? (
                <img 
                  src={siteLogo} 
                  alt="trustedmedshop" 
                  style={{ height: `${Math.min(siteLogoHeight, 48)}px` }} 
                  className="w-auto object-contain max-w-[190px] sm:max-w-[260px] transition-all" 
                />
              ) : (
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#005B41] flex items-center gap-1">
                  trusted<span className="text-[#00A877]">medshop</span>
                </span>
              )}
            </Link>

            {/* Mobile Actions (Cart & User icons) */}
            <div className="flex items-center gap-1.5 md:hidden">
              <Link href="/login" className="p-2 text-slate-700 hover:text-[#0A3981]">
                <User className="w-5 h-5" />
              </Link>
              <Link href="/cart" className="p-2 text-slate-700 hover:text-[#0A3981] relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#00A86B] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar (Responsive full width on mobile) */}
          <form onSubmit={handleSearchSubmit} className="flex flex-1 w-full max-w-xl border border-slate-200 rounded-full bg-slate-50 hover:border-slate-300 focus-within:border-[#0A3981] focus-within:ring-2 focus-within:ring-[#0A3981]/10 transition-all overflow-hidden items-center">
            <input 
              type="text" 
              placeholder="Search medicines or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 sm:px-5 py-2 text-xs sm:text-sm bg-transparent border-none outline-none text-slate-800 placeholder-slate-400"
            />
            
            {/* Category Dropdown (Desktop/Tablet) */}
            <div className="relative border-l border-slate-200 hidden sm:block">
              <button 
                type="button" 
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                <span className="truncate max-w-[120px]">{selectedCategory}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isCategoryMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-100 bg-white shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-[#F0F5FA] hover:text-[#0A3981] transition-colors ${selectedCategory === cat ? "bg-[#F0F5FA] text-[#0A3981] font-semibold" : ""}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button type="submit" className="bg-[#0A3981] hover:bg-[#072B63] text-white p-2.5 sm:p-3 rounded-full mr-1 transition-colors flex items-center justify-center cursor-pointer">
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>

          {/* Desktop User & Cart Info */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            <Link href="/login" className="flex items-center gap-2 text-slate-700 hover:text-[#0A3981] transition-colors group">
              <div className="bg-slate-50 p-2 rounded-full group-hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm">
                <User className="w-4.5 h-4.5 text-slate-700 group-hover:text-[#0A3981] transition-colors" />
              </div>
              <div className="hidden xl:block text-left text-xs font-medium">
                <span className="block text-slate-400 text-[10px] leading-tight font-semibold">My Account</span>
                <span className="block text-slate-800 font-bold group-hover:text-[#0A3981] text-xs">Sign In / Register</span>
              </div>
            </Link>
            
            <Link href="/cart" className="flex items-center gap-2 text-slate-700 hover:text-[#0A3981] transition-colors group relative">
              <div className="bg-slate-50 p-2 rounded-full group-hover:bg-slate-100 transition-colors relative border border-slate-200 shadow-sm">
                <ShoppingCart className="w-4.5 h-4.5 text-slate-700 group-hover:text-[#0A3981] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#00A86B] text-white font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:block text-left text-xs font-medium">
                <span className="block text-slate-400 text-[10px] leading-tight font-semibold">Your Cart</span>
                <span className="block text-slate-800 font-bold group-hover:text-[#0A3981] text-xs">{cartCount} Items</span>
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* 3. NAVIGATION BAR (Desktop Only Nav + Inquiry CTA) */}
      <div className="w-full border-b border-slate-100 bg-[#F4F7FB]/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-2">
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-xs sm:text-sm font-semibold tracking-wide transition-colors relative py-1.5 ${
                  isActive(link.href) 
                    ? "text-[#0A3981] font-bold" 
                    : "text-slate-600 hover:text-[#0A3981]"
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A86B] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Quick Inquiry & Contact CTAs */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            <button 
              onClick={() => openInquiryModal()}
              className="w-full md:w-auto bg-gradient-to-r from-[#0A3981] to-[#00A86B] hover:opacity-95 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-md shadow-[#0A3981]/15 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <span>Inquiry Now</span>
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-200 pl-3">
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/10 hover:bg-[#25D366]/20 p-1.5 rounded-full text-[#25D366] transition-colors" title="WhatsApp Us">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
                </svg>
              </a>
              <a href="https://t.me/trustedmedshop" target="_blank" rel="noopener noreferrer" className="bg-[#0088cc]/10 hover:bg-[#0088cc]/20 p-1.5 rounded-full text-[#0088cc] transition-colors" title="Telegram Us">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.13-.05-.19-.06-.05-.14-.04-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.98.36-.32-.01-.94-.18-1.4-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.12.09.08.12.18.13.26.01.07.01.14 0 .22z" />
                </svg>
              </a>
              <a href="mailto:info@trustedmedshop.com" className="bg-[#dd4b39]/10 hover:bg-[#dd4b39]/20 p-1.5 rounded-full text-[#dd4b39] transition-colors" title="Email Us">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 4. MOBILE DRAWER NAVIGATION MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-all flex justify-start">
          <div className="bg-white w-4/5 max-w-sm h-full p-5 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200 overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Mobile Drawer Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  {siteLogo ? (
                    <img src={siteLogo} alt="Logo" style={{ height: `${Math.min(siteLogoHeight, 40)}px` }} className="w-auto object-contain max-w-[160px]" />
                  ) : (
                    <span className="text-base font-bold text-[#0A3981]">
                      trusted<span className="text-[#00A86B]">medshop</span>
                    </span>
                  )}
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-between ${
                      isActive(link.href) 
                        ? "bg-[#0A3981]/10 text-[#0A3981] font-extrabold" 
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive(link.href) && <span className="w-2 h-2 rounded-full bg-[#00A86B]" />}
                  </Link>
                ))}
              </nav>

              {/* Mobile Contact & Social Actions */}
              <div className="flex flex-col gap-3.5 border-t border-slate-100 pt-4">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Global Support Direct</span>
                <div className="flex flex-col gap-2.5 text-xs font-semibold text-slate-700">
                  <a href="tel:+919876543210" className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100">
                    <Phone className="w-4 h-4 text-[#00A86B]" />
                    <span>+91 98765 43210</span>
                  </a>
                  <a href="mailto:info@trustedmedshop.com" className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100">
                    <Mail className="w-4 h-4 text-[#00A86B]" />
                    <span>info@trustedmedshop.com</span>
                  </a>
                </div>

                <div className="flex items-center gap-2.5 mt-1">
                  <a 
                    href="https://wa.me/919876543210" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href="https://t.me/trustedmedshop" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0088cc] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.13-.05-.19-.06-.05-.14-.04-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.98.36-.32-.01-.94-.18-1.4-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.12.09.08.12.18.13.26.01.07.01.14 0 .22z" />
                    </svg>
                    <span>Telegram</span>
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
