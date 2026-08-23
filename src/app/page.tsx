"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import TrustBadges from "@/components/TrustBadges";
import { 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Heart, 
  Star,
  FileText,
  Activity,
  PhoneCall,
  UserCheck,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  MapPin,
  Sparkles,
  ShoppingBag,
  HeartCrack,
  Moon,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Award,
  ShieldAlert,
  Coins,
  Smile,
  GraduationCap,
  Library,
  BookOpen,
  Calendar,
  Layers,
  Flame,
  CheckCircle2,
  Mail,
  Bug,
  Pill,
  Zap,
  Syringe,
  Shield,
  Stethoscope,
  BadgeCheck,
  Thermometer,
  Plane,
  Clock,
  Truck
} from "lucide-react";

export default function Home() {
  const { addToCart, cartItems, openInquiryModal } = useCart();
const router = useRouter();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [settings, setSettings] = useState({
    heroSubTitle: "Trusted by Healthcare. Chosen Worldwide.",
    heroTitle: "Global Importer & Exporter of Quality Medicines",
    heroTitleHighlight: "Quality Medicines",
    heroDescription: "trustedmedshop is a leading pharmaceutical company specialized in the import and export of authentic, high-quality medicines to healthcare markets worldwide.",
    heroBenefits: [
      "WHO-GMP Certified Products",
      "Wide Range of Trusted Brands",
      "Safe, Secure & Timely Delivery"
    ],
    heroImage: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop",
    whatsappLink: "https://wa.me/919876543210",
    telegramLink: "https://t.me/trustedmedshop",
    statCountries: "50+",
    statProducts: "500+",
    statClients: "100+",
    statYears: "10+",
    newsletterTitle: "Stay Updated",
    newsletterSub: "Get health tips and offers in your inbox."
  });

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.error(err));

    fetch("/api/homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const renderTitle = () => {
    const fullTitle = settings.heroTitle;
    const highlight = settings.heroTitleHighlight;
    if (!highlight || !fullTitle.includes(highlight)) {
      return fullTitle;
    }
    const parts = fullTitle.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-[#00A877]">{highlight}</span>
        {parts[1]}
      </>
    );
  };
  
  // Show 5 products as featured on the landing page matching mockup
  const featuredProducts = productsList.slice(0, 5);

  const categories = [
    {
      title: "Anti Parasite",
      desc: "Ivermectin, Albendazole",
      icon: <Bug className="w-6 h-6" />,
      colorClass: "text-emerald-600 bg-emerald-50/70 group-hover:bg-emerald-100",
      link: "/products?category=anti-parasite"
    },
    {
      title: "Antibiotics",
      desc: "Doxycycline, Azithromycin",
      icon: <Pill className="w-6 h-6" />,
      colorClass: "text-rose-600 bg-rose-50/70 group-hover:bg-rose-100",
      link: "/products?category=antibiotics"
    },
    {
      title: "Contraceptives",
      desc: "Mifepristone, Misoprostol",
      icon: <Shield className="w-6 h-6" />,
      colorClass: "text-pink-600 bg-pink-50/70 group-hover:bg-pink-100",
      link: "/products?category=contraceptives"
    },
    {
      title: "Erectile Dysfunction",
      desc: "Sildenafil, Tadalafil",
      icon: <Zap className="w-6 h-6" />,
      colorClass: "text-amber-600 bg-amber-50/70 group-hover:bg-amber-100",
      link: "/products?category=erectile-dysfunction"
    },
    {
      title: "Hormone Therapy",
      desc: "Testosterone, HCG",
      icon: <Syringe className="w-6 h-6" />,
      colorClass: "text-blue-600 bg-blue-50/70 group-hover:bg-blue-100",
      link: "/products?category=hormone-therapy"
    },
    {
      title: "Pain Relief",
      desc: "Tramadol, Codeine",
      icon: <Activity className="w-6 h-6" />,
      colorClass: "text-purple-600 bg-purple-50/70 group-hover:bg-purple-100",
      link: "/products?category=pain-relief"
    },
    {
      title: "Sleeping Disorder",
      desc: "Alprazolam, Zolpidem",
      icon: <Moon className="w-6 h-6" />,
      colorClass: "text-indigo-600 bg-indigo-50/70 group-hover:bg-indigo-100",
      link: "/products?category=sleeping-disorder"
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#F8FAF9] font-sans pb-10">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#E6F3EE] via-[#F1F7F4] to-[#FFFFFF] overflow-hidden py-14 sm:py-20 border-b border-slate-100">
        
        {/* World Map Outline SVG Vector Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" stroke="#005B41" strokeWidth="0.8">
            {/* World continents contour simplified */}
            <path d="M150 150 Q180 100 230 110 T300 130 T320 200 T280 250 T200 240 Z" />
            <path d="M400 120 Q480 80 550 100 T650 110 T720 150 T680 250 T550 300 T480 250 Z" />
            <path d="M180 280 Q220 320 250 380 T200 450 T150 420 Z" />
            <path d="M750 250 Q800 280 850 300 T900 350 T880 440 T780 400 Z" />
            {/* Coordinates grids */}
            <circle cx="220" cy="180" r="3" fill="#00A877" />
            <circle cx="580" cy="190" r="3" fill="#00A877" />
            <circle cx="820" cy="310" r="3" fill="#00A877" />
            <circle cx="490" cy="220" r="3" fill="#00A877" />
            <path d="M220 180 L490 220 M490 220 L580 190 M580 190 L820 310" strokeDasharray="3,3" stroke="#00A877" strokeWidth="1" />
          </svg>
        </div>

        {/* Floating Passenger Plane Image Graphics */}
        <div className="absolute right-10 top-10 sm:right-24 sm:top-14 w-32 sm:w-60 opacity-90 pointer-events-none select-none z-10 animate-pulse">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&auto=format&fit=crop" 
            alt="Aircraft" 
            className="w-full h-auto object-contain mix-blend-multiply rotate-[-6deg]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
            
            {/* Badge pill */}
            <div className="inline-flex items-center gap-1.5 bg-[#005b41]/5 text-[#005B41] py-1.5 px-4 rounded-full text-xs font-bold border border-[#005b41]/10">
              <Globe className="w-3.5 h-3.5 text-[#00A877]" />
              <span>{settings.heroSubTitle}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight whitespace-pre-line">
              {renderTitle()}
            </h1>

            {/* Paragraph Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              {settings.heroDescription}
            </p>

            {/* Check points benefits list */}
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
              {settings.heroBenefits.map((benefit, bidx) => (
                <div key={bidx} className="flex items-center gap-2.5">
                  <div className="bg-[#00A877] text-white p-0.5 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp / Telegram / Email cards grid layout row */}
            <div className="grid grid-cols-3 gap-3.5 w-full max-w-lg mt-2 text-xs font-semibold">
              <a 
                href={settings.whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white hover:bg-slate-50 border border-slate-100 p-3 sm:p-4 rounded-2xl flex flex-col gap-1 items-start shadow-sm hover:shadow transition-all group"
              >
                <div className="text-[#25D366] bg-[#25D366]/15 p-2 rounded-xl group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
                  </svg>
                </div>
                <span className="block font-bold text-slate-700 leading-none mt-1">WhatsApp</span>
                <span className="block text-[9px] text-[#00A877] uppercase tracking-wider font-extrabold">Chat Now</span>
              </a>

              <a 
                href={settings.telegramLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white hover:bg-slate-50 border border-slate-100 p-3 sm:p-4 rounded-2xl flex flex-col gap-1 items-start shadow-sm hover:shadow transition-all group"
              >
                <div className="text-[#0088cc] bg-[#0088cc]/15 p-2 rounded-xl group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.13-.05-.19-.06-.05-.14-.04-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.98.36-.32-.01-.94-.18-1.4-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.12.09.08.12.18.13.26.01.07.01.14 0 .22z" />
                  </svg>
                </div>
                <span className="block font-bold text-slate-700 leading-none mt-1">Telegram</span>
                <span className="block text-[9px] text-[#00A877] uppercase tracking-wider font-extrabold">Message Us</span>
              </a>

              <Link 
                href="/contact" 
                className="bg-white hover:bg-slate-50 border border-slate-100 p-3 sm:p-4 rounded-2xl flex flex-col gap-1 items-start shadow-sm hover:shadow transition-all group"
              >
                <div className="text-[#005B41] bg-[#005B41]/15 p-2 rounded-xl group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-[#005B41]" />
                </div>
                <span className="block font-bold text-slate-700 leading-none mt-1">Email Us</span>
                <span className="block text-[9px] text-[#00A877] uppercase tracking-wider font-extrabold">Send Inquiry</span>
              </Link>
            </div>

          </div>

          {/* Right Product Collage Block */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-0">
            <div className="relative max-w-md sm:max-w-lg w-full flex items-center justify-center p-6 border-2 border-dashed border-[#005b41]/10 rounded-[40px] bg-white/20 backdrop-blur-sm">
              <img 
                src={settings.heroImage} 
                alt="Medicine sourcing collection" 
                className="rounded-3xl shadow-2xl border border-white/60 w-full h-auto object-cover max-h-[360px] animate-float-slow"
              />

              {/* Quality Stamps Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-[#00A877] text-white p-3.5 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center border-[6px] border-white shadow-2xl text-center leading-none select-none z-10 animate-pulse-glow hover:scale-110 transition-transform duration-300">
                <span className="block text-[9px] uppercase font-black tracking-widest text-[#0b241e]/70">Quality</span>
                <span className="block text-[11px] sm:text-xs font-black tracking-tight uppercase leading-snug my-0.5">Approved</span>
                <span className="block text-[7px] uppercase font-black text-[#0b241e]/50">Guaranteed</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SUB-HERO INFO STRIP (DARK FOREST GREEN) */}
      <section className="w-full bg-[#0b241e] text-white border-y border-[#005B41]/20 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-left">
          
          <div className="flex items-center gap-3.5">
            <div className="bg-[#00A877]/10 p-2 rounded-xl text-[#00A877]">
              <UserCheck className="w-5 h-5 text-[#00A877]" />
            </div>
            <div>
              <span className="block font-black tracking-wide text-white uppercase text-[10px]">Trusted by Thousands</span>
              <span className="block text-slate-400 text-[10px] mt-0.5">Customers Worldwide</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="bg-[#00A877]/10 p-2 rounded-xl text-[#00A877]">
              <Activity className="w-5 h-5 text-[#00A877]" />
            </div>
            <div>
              <span className="block font-black tracking-wide text-white uppercase text-[10px]">Quality Assured</span>
              <span className="block text-slate-400 text-[10px] mt-0.5">Lab Tested Products</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="bg-[#00A877]/10 p-2 rounded-xl text-[#00A877]">
              <Globe className="w-5 h-5 text-[#00A877]" />
            </div>
            <div>
              <span className="block font-black tracking-wide text-white uppercase text-[10px]">Delivering Health</span>
              <span className="block text-slate-400 text-[10px] mt-0.5">Across 50+ Countries</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="bg-[#00A877]/10 p-2 rounded-xl text-[#00A877]">
              <ShieldCheck className="w-5 h-5 text-[#00A877]" />
            </div>
            <div>
              <span className="block font-black tracking-wide text-white uppercase text-[10px]">Your Health, Our Priority</span>
              <span className="block text-slate-400 text-[10px] mt-0.5">Thank you for trusting us.</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THERAPEUTIC CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center w-full">
        <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-8">
          <div className="text-left flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Shop by Therapeutic Category
            </h2>
            <div className="h-1 w-12 bg-[#00A877] rounded-full mt-1.5"></div>
          </div>
          <Link href="/products" className="text-xs font-bold text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-1">
            <span>View all categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.link}
              className="bg-white border border-slate-150 rounded-2xl p-4 flex flex-col items-center justify-between gap-3 text-center hover:border-[#005B41] hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`p-3 rounded-xl group-hover:scale-105 transition-transform flex items-center justify-center ${cat.colorClass}`}>
                {cat.icon}
              </div>
              <div>
                <span className="block text-xs font-black text-slate-800 leading-tight group-hover:text-[#005B41] transition-colors">{cat.title}</span>
                <span className="block text-[9px] text-slate-400 leading-tight mt-1 font-semibold">{cat.desc}</span>
              </div>
              <span className="text-[9px] font-bold text-[#005B41] group-hover:text-[#00A877] transition-all flex items-center gap-0.5 mt-1 leading-none uppercase tracking-wider">
                <span>Shop Now</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. PRODUCT GRID / CAROUSEL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 bg-white rounded-[40px] border border-slate-100/50 shadow-sm p-6 sm:p-10 w-full text-center">
        
        <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-8">
          <div className="text-left flex flex-col gap-1">
            <span className="text-[#00A877] text-[10px] font-extrabold uppercase tracking-widest leading-none">Primary Inventory</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight mt-1">
              Most Requested This Month
            </h2>
            <div className="h-1 w-12 bg-[#00A877] rounded-full mt-1.5"></div>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/products" className="text-xs font-bold text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-1">
              <span>See full catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <button className="bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg border border-slate-200 cursor-pointer">
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </button>
              <button className="bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg border border-slate-200 cursor-pointer">
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Carousel Grid (Exact Mockup Layout - 5 cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 sm:gap-5">
          {featuredProducts.map((product) => {
            const isItemInCart = cartItems.some((item) => item.product.id === product.id);
            
            // Generate exact mockup badge classes
            const getBadgeClass = (badge: string) => {
              const b = badge.toLowerCase();
              if (b.includes("hot")) return "bg-rose-500 text-white";
              if (b.includes("popular")) return "bg-sky-500 text-white";
              if (b.includes("seller")) return "bg-amber-500 text-white";
              return "bg-[#005B41] text-white";
            };

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl border border-slate-100 hover:border-[#005B41]/30 shadow-sm hover-lift transition-all duration-300 overflow-hidden flex flex-col group relative text-left"
              >
                {/* Image panel */}
                <div className="relative h-40 min-h-[160px] w-full bg-slate-50 flex items-center justify-center p-3 flex-shrink-0">
                  <Link href={`/products/${product.id}`} className="block h-full w-full">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl cursor-pointer"
                    />
                  </Link>
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                      {product.badges.map((badge, idx) => (
                        <span key={idx} className={`text-[8px] font-black py-0.5 px-2 rounded-full uppercase tracking-wider ${getBadgeClass(badge)}`}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                  <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-1.5 rounded-full shadow text-slate-400 hover:text-red-500 transition-colors z-10">
                    <Heart className="w-3.5 h-3.5 fill-transparent hover:fill-red-500 transition-all" />
                  </button>
                </div>

                {/* Info panel */}
                <div className="p-4 flex flex-col flex-1 gap-2 border-t border-slate-50">
                  <span className="text-[9px] text-[#00A877] font-extrabold uppercase tracking-widest leading-none">{product.category}</span>
                  <Link href={`/products/${product.id}`} className="text-xs sm:text-sm font-bold text-slate-800 hover:text-[#005B41] transition-colors leading-tight min-h-[36px] block">
                    {product.name}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-semibold leading-none">{product.substance}</span>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-black text-slate-700">{product.rating}</span>
                    <span className="text-[9px] text-slate-400">({product.reviewsCount})</span>
                  </div>

                  <div className="border-t border-slate-50 pt-3 mt-1 flex flex-col gap-2.5">
                    <div className="text-left">
                      <span className="block text-base font-black text-[#005B41]">₹{product.price.toFixed(2)}</span>
                      <span className="block text-[9px] text-slate-400 font-bold uppercase -mt-0.5">{product.unit}</span>
                    </div>
                    
                    {/* Action Bar (Exact UI Mockup: Left Cart icon, Right Buy Now) */}
                    <div className="flex items-center gap-1.5 w-full mt-1">
                      <button 
                        onClick={() => addToCart(product, 1)}
                        title="Add to Cart"
                        className={`py-2 px-3 border rounded-xl flex items-center justify-center transition-all ${
                          isItemInCart 
                            ? "bg-emerald-50 text-[#00A877] border-emerald-500/20" 
                            : "bg-white text-slate-500 border-slate-200 hover:text-[#005B41] hover:bg-slate-50"
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openInquiryModal(product)}
                        className="flex-1 bg-[#005B41] hover:bg-[#004833] text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all text-center hover:scale-[1.02] cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 5. WHY CHOOSE US & STATS SECTION */}
      <section id="why-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Green Block */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2e25] to-[#005B41] text-white rounded-[32px] p-8 sm:p-10 text-left shadow-xl relative overflow-hidden flex flex-col gap-5 justify-between self-stretch">
          <div className="flex flex-col gap-4">
            <span className="text-[#00A877] text-xs font-black uppercase tracking-wider">Quality First</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Why Choose <br />trusted<span className="text-[#00A877]">medshop?</span>
            </h2>
            <div className="h-1 w-12 bg-[#00A877] rounded-full mt-0.5"></div>
            
            <div className="flex flex-col gap-3.5 text-xs text-slate-200 mt-3 font-semibold">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00A877] mt-0.5 flex-shrink-0" />
                <span>WHO-GMP & ISO Certified sourcing lines.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00A877] mt-0.5 flex-shrink-0" />
                <span>Authentic Medicines from Trusted Manufacturers.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00A877] mt-0.5 flex-shrink-0" />
                <span>Competitive Prices & Best Value wholesale rates.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00A877] mt-0.5 flex-shrink-0" />
                <span>Secure Payments & Discreet Packaging.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#00A877] mt-0.5 flex-shrink-0" />
                <span>Fast & Reliable Global Shipping coordinates.</span>
              </div>
            </div>
          </div>

          <Link 
            href="/about"
            className="bg-[#00A877] text-[#0b241e] hover:bg-[#00c28a] py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-center mt-4 transition-all hover:scale-[1.02]"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Right Stats Grid (Exact Mockup) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6 self-stretch">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 flex flex-col gap-3 text-center justify-center items-center shadow-sm hover:shadow transition-all duration-300">
            <div className="bg-[#E6F3EE] p-4 rounded-full text-[#005B41]">
              <Globe className="w-6 h-6 text-[#005B41]" />
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">{settings.statCountries}</span>
              <span className="block text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Countries Served</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 flex flex-col gap-3 text-center justify-center items-center shadow-sm hover:shadow transition-all duration-300">
            <div className="bg-[#E6F3EE] p-4 rounded-full text-[#005B41]">
              <Layers className="w-6 h-6 text-[#005B41]" />
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">{settings.statProducts}</span>
              <span className="block text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Products Available</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 flex flex-col gap-3 text-center justify-center items-center shadow-sm hover:shadow transition-all duration-300">
            <div className="bg-[#E6F3EE] p-4 rounded-full text-[#005B41]">
              <Smile className="w-6 h-6 text-[#005B41]" />
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">{settings.statClients}</span>
              <span className="block text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Happy Clients</span>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 flex flex-col gap-3 text-center justify-center items-center shadow-sm hover:shadow transition-all duration-300">
            <div className="bg-[#E6F3EE] p-4 rounded-full text-[#005B41]">
              <Award className="w-6 h-6 text-[#005B41]" />
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">{settings.statYears}</span>
              <span className="block text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Years of Experience</span>
            </div>
          </div>

        </div>

      </section>

      {/* NEW SECTION 1: QUALITY & COMPLIANCE ASSURANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-6 mb-8">
            <div className="flex flex-col gap-1.5 max-w-xl">
              <span className="text-xs font-black text-[#00A877] uppercase tracking-widest leading-none">
                100% Quality & Regulatory Assurance
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                Global Pharmaceutical Standards & Cold-Chain Shipping
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Compliant with WHO-GMP, ISO 9001 & GDP Guidelines
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 hover:border-[#005B41] transition-all hover:shadow-md group">
              <div className="bg-emerald-50 text-[#005B41] p-3 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <BadgeCheck className="w-6 h-6 text-[#00A877]" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800">WHO-GMP Procurement</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Directly sourced from WHO-GMP certified facilities with verified Certificates of Analysis (COA).
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 hover:border-[#005B41] transition-all hover:shadow-md group">
              <div className="bg-cyan-50 text-cyan-600 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Thermometer className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800">Cold-Chain Packaging</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Strict 2°C–8°C thermal insulation for sensitive bio-therapeutics, oncology, and specialty medicines.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 hover:border-[#005B41] transition-all hover:shadow-md group">
              <div className="bg-amber-50 text-amber-600 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800">Batch Verification</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                QR and serial barcode authentication on every carton ensuring 100% genuine pharma supply.
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 flex flex-col gap-3 hover:border-[#005B41] transition-all hover:shadow-md group">
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform">
                <Plane className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800">Express Customs Air Clearance</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Fast-track customs clearance documentation for delivery into 107+ countries without delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 2: HOW SOURCING WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full text-left">
        <div className="bg-gradient-to-br from-[#005B41]/5 via-[#00A877]/5 to-white border border-[#005b41]/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black text-[#00A877] uppercase tracking-widest">Simple & Secure Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
              How Medicine Sourcing Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-2">
              From inquiry to express global door delivery in 4 effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3 relative z-10 hover:shadow-lg transition-all">
              <span className="text-xs font-black text-[#00A877] bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center border border-emerald-500/20">01</span>
              <h3 className="text-sm font-extrabold text-slate-800">Submit Product Inquiry</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Browse catalog or click "Inquire Now" on any medicine card to submit your custom requirement.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3 relative z-10 hover:shadow-lg transition-all">
              <span className="text-xs font-black text-[#00A877] bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center border border-emerald-500/20">02</span>
              <h3 className="text-sm font-extrabold text-slate-800">Price Quote & Batch Check</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Our clinical team verifies COA batch, stock availability, and issues quote in ₹ INR.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3 relative z-10 hover:shadow-lg transition-all">
              <span className="text-xs font-black text-[#00A877] bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center border border-emerald-500/20">03</span>
              <h3 className="text-sm font-extrabold text-slate-800">Insulated Packaging</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Order is packed in temperature-monitored, tamper-evident thermal boxes with complete docs.
              </p>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3 relative z-10 hover:shadow-lg transition-all">
              <span className="text-xs font-black text-[#00A877] bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center border border-emerald-500/20">04</span>
              <h3 className="text-sm font-extrabold text-slate-800">Express Global Delivery</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Tracked air cargo shipping delivered safely to your hospital, clinic, or destination country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: GLOBAL PHARMACEUTICAL & WAREHOUSING INFRASTRUCTURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-black text-[#00A877] uppercase tracking-widest">State-of-the-Art Facilities</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
              Global Infrastructure & Quality Assurance
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Our temperature-monitored distribution hubs and certified cleanrooms ensure 100% authentic medicine delivery.
            </p>
          </div>
          <Link 
            href="/about" 
            className="text-xs font-black text-[#005B41] hover:text-[#00A877] transition-colors flex items-center gap-1.5 bg-emerald-50 py-2.5 px-5 rounded-xl border border-emerald-500/10"
          >
            <span>Explore Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover-lift group flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop" 
                alt="Cold Chain Warehousing" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 bg-[#005B41] text-white text-[9px] font-black uppercase tracking-wider py-1 px-3 rounded-full">
                Cold Chain Storage
              </span>
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-[#005B41] transition-colors">
                2°C - 8°C Temperature Controlled Hubs
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Biologics and temperature-sensitive therapeutics preserved under continuous IoT temperature monitoring.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover-lift group flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop" 
                alt="Cleanroom Packaging" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 bg-[#00A877] text-white text-[9px] font-black uppercase tracking-wider py-1 px-3 rounded-full">
                WHO-GMP Cleanroom
              </span>
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-[#005B41] transition-colors">
                Tamper-Evident Insulated Packaging
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Every consignment is packed with batch documentation, COA clearance certificates, and security seals.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover-lift group flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1586528116493-a029325540fa?w=600&auto=format&fit=crop" 
                alt="Global Air Cargo Freight" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 bg-[#005B41] text-white text-[9px] font-black uppercase tracking-wider py-1 px-3 rounded-full">
                107+ Countries
              </span>
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-[#005B41] transition-colors">
                Express Global Air Freight Network
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Priority customs-cleared international cargo flights dispatching medicines daily across all continents.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover-lift group flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600&auto=format&fit=crop" 
                alt="Analytical Quality Lab" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-3 left-3 bg-[#00A877] text-white text-[9px] font-black uppercase tracking-wider py-1 px-3 rounded-full">
                Analytical QC
              </span>
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-[#005B41] transition-colors">
                Analytical Quality & Batch Testing
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                In-house clinical specialists verify active pharmaceutical ingredients (API) purity and expiration dates.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* NEW SECTION 3: CLIENT TESTIMONIALS & TRUST SHOWCASE */}
      <section className="w-full bg-[#03221a] text-white py-14 px-4 sm:px-6 lg:px-8 my-6 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-black text-[#00A877] uppercase tracking-widest">
                Global B2B & Clinical Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                Trusted by Hospitals, Clinics & Importers Worldwide
              </h2>
            </div>
            <button 
              onClick={() => openInquiryModal()}
              className="bg-[#00A877] hover:bg-[#008f64] text-white py-3 px-6 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer"
            >
              Start Custom Bulk Inquiry
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between gap-6 hover:bg-white/10 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "TrustedMedShop provided authentic oncology therapeutics with fast customs clearance when local stock was unavailable. Extremely professional documentation and genuine products every time!"
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#00A877] rounded-full flex items-center justify-center font-bold text-xs">
                  DV
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">Dr. Marcus Vance</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">Director of Sourcing, St. Jude Medical Clinic (USA)</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between gap-6 hover:bg-white/10 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Exceptional batch tracking, temperature-controlled shipping logs, and transparent INR pricing. They are our primary import partner for specialized medicines in the Middle East."
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#00A877] rounded-full flex items-center justify-center font-bold text-xs">
                  ER
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">Elena Rostova</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">Chief Pharmacist, Apex Pharma Importers (UAE)</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between gap-6 hover:bg-white/10 transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Prompt response to inquiries via their portal and WhatsApp. Smooth customs paperwork and genuine WHO-GMP certified supplies delivered straight to our distribution warehouse."
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#00A877] rounded-full flex items-center justify-center font-bold text-xs">
                  RS
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">Rajesh Sharma</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">Managing Director, Global Health Distributors (UK)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. EXPLORE RESOURCES SECTION */}
      <section id="resources" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-center">
        
        <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-8">
          <div className="text-left flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Explore Our Resources
            </h2>
            <div className="h-1 w-12 bg-[#00A877] rounded-full mt-1.5"></div>
          </div>
          <Link href="/products" className="text-xs font-bold text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-1">
            <span>Browse all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left font-semibold">
          
          <div className="bg-white border border-slate-150 rounded-2xl p-5 flex items-start gap-4 hover:border-[#005B41] hover:shadow-lg transition-all duration-300 group">
            <div className="bg-cyan-50 text-cyan-600 p-3 rounded-xl group-hover:scale-105 transition-transform flex-shrink-0">
              <Library className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <span className="block font-black text-slate-800 text-sm">Medicine Library</span>
              <span className="block text-slate-500 leading-normal">In-depth guides on our medicines & uses.</span>
              <Link href="/products" className="text-[10px] font-black text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-0.5 mt-2 uppercase tracking-wider leading-none">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-150 rounded-2xl p-5 flex items-start gap-4 hover:border-[#005B41] hover:shadow-lg transition-all duration-300 group">
            <div className="bg-rose-50 text-rose-600 p-3 rounded-xl group-hover:scale-105 transition-transform flex-shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <span className="block font-black text-slate-800 text-sm">Health Conditions Hub</span>
              <span className="block text-slate-500 leading-normal">Conditions our products help manage.</span>
              <Link href="/products" className="text-[10px] font-black text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-0.5 mt-2 uppercase tracking-wider leading-none">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-150 rounded-2xl p-5 flex items-start gap-4 hover:border-[#005B41] hover:shadow-lg transition-all duration-300 group">
            <div className="bg-emerald-55 bg-emerald-50 text-emerald-700 p-3 rounded-xl group-hover:scale-105 transition-transform flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <span className="block font-black text-slate-800 text-sm">Health Guides Hub</span>
              <span className="block text-slate-500 leading-normal">Prevention & travel health tips.</span>
              <Link href="/products" className="text-[10px] font-black text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-0.5 mt-2 uppercase tracking-wider leading-none">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-slate-150 rounded-2xl p-5 flex items-start gap-4 hover:border-[#005B41] hover:shadow-lg transition-all duration-300 group">
            <div className="bg-amber-50 text-amber-600 p-3 rounded-xl group-hover:scale-105 transition-transform flex-shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <span className="block font-black text-slate-800 text-sm">Countries Hub</span>
              <span className="block text-slate-500 leading-normal">Country-specific shipping information.</span>
              <Link href="/products" className="text-[10px] font-black text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-0.5 mt-2 uppercase tracking-wider leading-none">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* 7. STAY UPDATED NEWSLETTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="bg-gradient-to-br from-[#E6F3EE] via-[#EAF5F1] to-white border border-slate-100 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
          
          {/* Plane & Letter Vector artwork on right */}
          <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 opacity-25 w-44 pointer-events-none hidden lg:block z-0">
            <svg className="w-full h-auto text-[#005B41]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,40 L100,0 L50,60 L20,50 Z" />
              <path d="M50,60 L100,0 L80,90 Z" />
            </svg>
          </div>

          <div className="flex flex-col gap-2 relative z-10 max-w-lg text-left">
            <h3 className="text-xl sm:text-2xl font-black text-[#005B41] tracking-tight leading-none">{settings.newsletterTitle}</h3>
            <span className="block text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed mt-2.5">
              {settings.newsletterSub}
            </span>
          </div>

          <div className="w-full md:w-auto relative z-10 flex flex-col sm:flex-row items-center gap-3 max-w-md flex-1">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full border border-slate-200 rounded-xl p-3 px-4 bg-white text-slate-800 font-semibold outline-none focus:border-[#005B41] text-xs"
            />
            <button className="w-full sm:w-auto bg-[#0b241e] text-white hover:bg-slate-800 py-3 px-8 rounded-xl text-xs font-black uppercase tracking-wider transition-all select-none cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* 8. TRUST BADGES STRIP */}
      <section className="w-full mt-10">
        <TrustBadges />
      </section>

    </div>
  );
}
