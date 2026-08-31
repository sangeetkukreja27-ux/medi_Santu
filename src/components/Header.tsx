"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Coins, 
  Send,
  Lock,
  Award,
  Package,
  Headphones,
  Home,
  CheckCircle2
} from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, openInquiryModal, currency, setCurrency } = useCart();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [siteLogo, setSiteLogo] = useState<string>("");
  const [siteLogoHeight, setSiteLogoHeight] = useState<number>(48);

  const categories = [
    "All Categories",
    "Anticancer",
    "Antibiotics",
    "Cardiovascular",
    "Diabetes",
    "HIV / AIDS",
    "Hepatitis",
    "Hormones",
    "Neurology",
    "Respiratory",
    "Antiparasitic",
    "Men's Health"
  ];

  useEffect(() => {
    fetch(`/api/cms?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        const logo = data.cms?.homepage?.siteLogoImage || data.settings?.siteLogoImage || data.settings?.homepage?.siteLogoImage;
        const height = data.cms?.homepage?.siteLogoHeight || data.settings?.siteLogoHeight || data.settings?.homepage?.siteLogoHeight;
        if (logo) setSiteLogo(logo);
        if (height) setSiteLogoHeight(Number(height));
      })
      .catch((err) => console.error("CMS Logo load error in Header:", err));
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory !== "All Categories") {
        url += `&category=${encodeURIComponent(selectedCategory.toLowerCase())}`;
      }
      router.push(url);
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="w-3.5 h-3.5" /> },
    { name: "All Medicines", href: "/products" },
    { name: "By Category", href: "/products" },
    { name: "By Brand", href: "/products" },
    { name: "Export", href: "/about" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full flex flex-col z-50 bg-[#040E1E] text-slate-200 border-b border-[#102A4C] sticky top-0 font-sans shadow-md">
      
      {/* 1. TOP UTILITY STRIP */}
      <div className="w-full bg-[#020A14] text-slate-300 py-1.5 px-3 sm:px-6 lg:px-8 text-[11px] font-medium border-b border-[#0A1C33]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left item */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-[#00A86B]" /> 
              <span>Global Supplier of Genuine Medicines</span>
            </span>
          </div>

          {/* Right items */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0 text-slate-300">
            <span className="hidden md:flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Globe className="w-3 h-3 text-[#00A86B]" /> Export Worldwide
            </span>
            <span className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Package className="w-3 h-3 text-[#00A86B]" /> Bulk Orders
            </span>
            <span className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Headphones className="w-3 h-3 text-[#00A86B]" /> 24/7 Support
            </span>

            {/* Currency Selector (USD / INR) */}
            <div className="flex items-center gap-1 bg-[#0A1D36] px-2 py-0.5 rounded-md border border-[#16375E]">
              <Coins className="w-3 h-3 text-[#00A86B]" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "INR" | "USD")}
                className="bg-transparent text-white font-bold text-[10.5px] outline-none cursor-pointer"
              >
                <option value="USD" className="bg-[#040E1E] text-white font-bold">USD ($)</option>
                <option value="INR" className="bg-[#040E1E] text-white font-bold">INR (₹)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="w-full py-3 px-3 sm:px-6 lg:px-8 bg-[#040E1E]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              {siteLogo ? (
                <img 
                  src={siteLogo} 
                  alt="trustedmedshop" 
                  style={{ height: `${siteLogoHeight}px` }} 
                  className="w-auto object-contain max-w-[190px] sm:max-w-[240px] transition-all" 
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="bg-[#00A86B] p-2 rounded-xl text-white shadow-lg shadow-[#00A86B]/20 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-0.5 leading-none">
                      trusted<span className="text-[#00A86B]">medshop</span>
                    </span>
                    <span className="block text-[9.5px] text-slate-400 font-semibold tracking-wider mt-0.5">Verified medicine delivery</span>
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* Center: 3 Prominent Trust Seals (Circled in mockup screenshot) */}
          <div className="hidden lg:flex items-center gap-3 bg-[#08192E]/80 border border-[#143254] p-1.5 px-3 rounded-2xl shadow-inner">
            
            {/* Seal 1: TrustSeal Verified */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[#0B223D] border border-amber-500/20 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm">
                🛡️
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[11px] font-extrabold text-amber-300">TrustSeal</span>
                <span className="block text-[9px] font-semibold text-slate-400">Verified</span>
              </div>
            </div>

            {/* Seal 2: Payment Protected */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[#0B223D] border border-emerald-500/20 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[11px] font-extrabold text-emerald-300">Payment</span>
                <span className="block text-[9px] font-semibold text-slate-400">Protected</span>
              </div>
            </div>

            {/* Seal 3: IndiaMART Verified Exporter */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[#0B223D] border border-rose-500/20 rounded-xl">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[11px] font-extrabold text-white">IndiaMART</span>
                <span className="block text-[9px] font-semibold text-slate-400">Verified Exporter</span>
              </div>
            </div>

          </div>

          {/* Right: Account & Inquiry Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Account */}
            <Link href="/login" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-full bg-[#0A1F38] border border-[#163B66] flex items-center justify-center group-hover:border-[#00A86B] transition-colors">
                <User className="w-4 h-4 text-slate-300 group-hover:text-white" />
              </div>
              <div className="hidden sm:block text-left text-xs font-semibold">
                <span className="block text-slate-400 text-[10px] leading-tight">My Account</span>
                <span className="block text-white font-bold group-hover:text-[#00A86B]">Account</span>
              </div>
            </Link>

            {/* Inquiry Cart Button */}
            <Link 
              href="/cart" 
              className="flex items-center gap-2 bg-[#00A86B] hover:bg-[#008f5a] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#00A86B]/20 cursor-pointer relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Inquiry</span>
              <span className="bg-white text-[#00A86B] text-[10.5px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            </Link>

          </div>

        </div>
      </div>

      {/* 3. SEARCH & NAVIGATION ROW */}
      <div className="w-full bg-[#030B17] py-2.5 px-3 sm:px-6 lg:px-8 border-t border-[#0C1E36]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex flex-1 w-full max-w-2xl border border-[#173B63] rounded-xl bg-[#07172B] hover:border-[#00A86B]/50 focus-within:border-[#00A86B] transition-all overflow-hidden items-center">
            
            {/* Category Dropdown */}
            <div className="relative border-r border-[#173B63] hidden sm:block">
              <button 
                type="button" 
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white focus:outline-none"
              >
                <span className="truncate max-w-[120px]">{selectedCategory}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isCategoryMenuOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isCategoryMenuOpen && (
                <div className="absolute left-0 mt-2 w-52 rounded-xl border border-[#173B63] bg-[#0A1F38] shadow-2xl z-50 py-1.5 text-left">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-[#00A86B]/20 hover:text-[#00A86B] transition-colors ${selectedCategory === cat ? "bg-[#00A86B]/20 text-[#00A86B] font-bold" : ""}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input 
              type="text" 
              placeholder="Search for medicines, brands, active ingredients or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-xs sm:text-sm bg-transparent border-none outline-none text-white placeholder-slate-500 font-medium"
            />
            
            <button 
              type="submit" 
              className="bg-[#00A86B] hover:bg-[#008f5a] text-white px-4 py-2 mr-1 rounded-lg transition-colors flex items-center justify-center cursor-pointer font-bold text-xs gap-1"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Inquiry CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => openInquiryModal({ id: "bulk-inquiry", name: "General Medicine Sourcing Inquiry", price: 0 } as any)}
              className="bg-[#0A2444] hover:bg-[#0E315C] text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3 h-3" />
              <span>Direct Bulk Inquiry</span>
            </button>
          </div>

        </div>
      </div>

      {/* 4. NAV LINKS ROW */}
      <div className="w-full bg-[#040E1E] py-1.5 px-3 sm:px-6 lg:px-8 border-t border-[#091A2E] hidden lg:block">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto hide-scrollbar text-xs font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isActive(link.href)
                  ? "bg-[#0A2444] text-[#00A86B] border border-[#00A86B]/30"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. MOBILE DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed left-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#040E1E] border-r border-[#143254] p-5 flex flex-col gap-5 overflow-y-auto text-left">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#00A86B] p-1.5 rounded-lg text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-base font-black text-white">trusted<span className="text-[#00A86B]">medshop</span></span>
              </div>
              <button 
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Trust Seals */}
            <div className="flex flex-col gap-2 bg-[#08192E] p-3 rounded-xl border border-[#143254]">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                <span>🛡️</span> <span>TrustSeal Verified Exporter</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                <Lock className="w-3.5 h-3.5" /> <span>100% Payment Protected</span>
              </div>
            </div>

            {/* Nav links list */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 ${
                    isActive(link.href)
                      ? "bg-[#0A2444] text-[#00A86B]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Quick Action Buttons */}
            <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-slate-800">
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#0A2444] text-white text-center py-2.5 rounded-xl text-xs font-bold border border-[#163B66]"
              >
                Sign In / Register
              </Link>
              <Link 
                href="/cart" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#00A86B] text-white text-center py-2.5 rounded-xl text-xs font-bold shadow-md"
              >
                View Inquiry Cart ({cartCount})
              </Link>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
