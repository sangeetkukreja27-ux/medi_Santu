"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Heart, 
  Star,
  Activity,
  UserCheck,
  ShoppingCart,
  Check,
  ChevronLeft,
  ChevronRight,
  Smile,
  Mail,
  Bug,
  Pill,
  Zap,
  Syringe,
  Shield,
  Stethoscope,
  Plane,
  Truck,
  HeartPulse,
  Ribbon,
  Brain,
  Wind,
  PlusCircle,
  Package,
  HeadphonesIcon
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const { addToCart, cartItems, openInquiryModal, formatPrice } = useCart();
  const router = useRouter();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [settings, setSettings] = useState({
    heroSubTitle: "QUALITY MEDICINES. GLOBAL REACH.",
    heroTitle: "Trusted Medicines Worldwide Exports",
    heroTitleHighlight: "Trusted Medicines",
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
    newsletterSub: "Get the latest product updates, offers and healthcare insights."
  });

  useEffect(() => {
    fetch(`/api/products?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.error(err));

    fetch(`/api/homepage?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const featuredProducts = productsList.slice(0, 5);
  const popularMedicines = productsList.slice(0, 4);
  const topSelling = productsList.slice(4, 8);
  const bestOffers = productsList.slice(2, 6);

  const categories = [
    { title: "Anticancer", icon: <Ribbon className="w-6 h-6" />, colorClass: "text-rose-600 bg-rose-50 group-hover:bg-rose-100", link: "/products?category=anticancer" },
    { title: "Antibiotics", icon: <Pill className="w-6 h-6" />, colorClass: "text-blue-600 bg-blue-50 group-hover:bg-blue-100", link: "/products?category=antibiotics" },
    { title: "Cardiovascular", icon: <HeartPulse className="w-6 h-6" />, colorClass: "text-red-600 bg-red-50 group-hover:bg-red-100", link: "/products?category=cardiovascular" },
    { title: "Diabetes", icon: <Activity className="w-6 h-6" />, colorClass: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-100", link: "/products?category=diabetes" },
    { title: "HIV/AIDS", icon: <Shield className="w-6 h-6" />, colorClass: "text-purple-600 bg-purple-50 group-hover:bg-purple-100", link: "/products?category=hiv-aids" },
    { title: "Hepatitis", icon: <Bug className="w-6 h-6" />, colorClass: "text-amber-600 bg-amber-50 group-hover:bg-amber-100", link: "/products?category=hepatitis" },
    { title: "Hormones", icon: <Syringe className="w-6 h-6" />, colorClass: "text-pink-600 bg-pink-50 group-hover:bg-pink-100", link: "/products?category=hormones" },
    { title: "Neurology", icon: <Brain className="w-6 h-6" />, colorClass: "text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100", link: "/products?category=neurology" },
    { title: "Respiratory", icon: <Wind className="w-6 h-6" />, colorClass: "text-cyan-600 bg-cyan-50 group-hover:bg-cyan-100", link: "/products?category=respiratory" },
    { title: "More", icon: <PlusCircle className="w-6 h-6" />, colorClass: "text-slate-600 bg-slate-50 group-hover:bg-slate-100", link: "/products" },
  ];

  const ProductCard = ({ product, showDiscount = false }: { product: Product, showDiscount?: boolean }) => {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 hover:border-[#005B41]/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col relative text-left">
        <div className="relative h-48 w-full bg-slate-50 flex items-center justify-center p-4">
          <Link href={`/products/${product.id}`} className="block h-full w-full">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-colors z-10">
            <Heart className="w-4 h-4 fill-transparent hover:fill-red-500 transition-all" />
          </button>
          {showDiscount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold py-1 px-2 rounded-md">
              Special Offer
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1 gap-2 border-t border-slate-50">
          <Link href={`/products/${product.id}`} className="text-sm font-bold text-[#0A3981] hover:text-[#005B41] transition-colors leading-tight line-clamp-1">
            {product.name}
          </Link>
          <span className="text-[11px] text-slate-500 font-medium line-clamp-1">{product.substance}</span>
          <span className="text-[10px] text-slate-400 font-medium">{product.unit || "Tablets"}</span>
          
          <div className="mt-auto pt-2 flex flex-col gap-3">
            <span className="block text-lg font-black text-[#0A3981]">{formatPrice(product.price)}</span>
            
            <div className="flex items-center gap-2 w-full">
              <button 
                onClick={() => openInquiryModal(product)}
                className="flex-1 bg-white border border-[#005B41] text-[#005B41] hover:bg-slate-50 py-2 rounded-xl text-xs font-bold transition-all text-center"
              >
                Inquiry
              </button>
              <button
                onClick={() => openInquiryModal(product)}
                className="flex-1 bg-[#005B41] hover:bg-[#004733] text-white py-2 rounded-xl text-xs font-bold transition-all text-center"
              >
                Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col bg-[#F9FAFB] font-sans pb-10">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#F0F7FA] via-[#F8FAFC] to-white overflow-hidden py-10 lg:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="flex flex-col items-start text-left gap-5">
            <span className="text-[#005B41] text-xs font-black uppercase tracking-widest bg-[#005B41]/10 py-1.5 px-3 rounded-full">
              QUALITY MEDICINES. GLOBAL REACH.
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-[#0A3981] tracking-tight leading-tight">
              Trusted Medicines Worldwide Exports
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              {settings.heroDescription}
            </p>
            <Link 
              href="/products"
              className="bg-[#00A877] hover:bg-[#009166] text-white py-3.5 px-8 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:shadow-lg mt-2"
            >
              View Products <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Check className="w-4 h-4 text-[#00A877]" /> Genuine Products
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Globe className="w-4 h-4 text-[#00A877]" /> Worldwide Shipping
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Package className="w-4 h-4 text-[#00A877]" /> Bulk Supply Support
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#00A877]" /> Trusted Partner
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <img 
                src={settings.heroImage} 
                alt="Medicines" 
                className="w-full h-full object-cover rounded-[40px] shadow-2xl border-4 border-white"
              />
              <div className="absolute top-10 -right-6 bg-white p-4 rounded-2xl shadow-xl flex flex-col items-center gap-1 rotate-3 animate-float-slow">
                <span className="text-[#0A3981] font-black text-sm">Better Medicines</span>
                <span className="text-[#00A877] font-black text-sm">Healthier World</span>
              </div>
              <div className="absolute bottom-10 -left-6 bg-[#0A3981] text-white p-4 rounded-2xl shadow-xl flex flex-col items-center gap-1 -rotate-3 animate-float-slow delay-150">
                <span className="font-black text-sm">Healthier People</span>
                <span className="font-black text-sm text-[#00A877]">Stronger Tomorrow</span>
              </div>
              <Plane className="absolute -top-4 -left-4 w-16 h-16 text-[#0A3981] opacity-20 transform -rotate-45" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY ICONS ROW */}
      <section className="w-full bg-white py-8 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-4 sm:gap-8 justify-start lg:justify-between items-center">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={cat.link}
                className="flex flex-col items-center gap-3 group min-w-[80px]"
              >
                <div className={`p-4 rounded-full transition-colors ${cat.colorClass}`}>
                  {cat.icon}
                </div>
                <span className="text-[11px] font-bold text-slate-600 group-hover:text-[#005B41] text-center whitespace-nowrap">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR MEDICINES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex justify-between items-end mb-8">
          <div className="text-left flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A3981]">
              Popular Medicines
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Most searched and widely used medicines across global markets.
            </p>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularMedicines.length > 0 ? (
            popularMedicines.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            [1, 2, 3, 4].map(i => <div key={i} className="bg-slate-100 h-80 rounded-2xl animate-pulse"></div>)
          )}
        </div>
      </section>

      {/* 4. TOP SELLING PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full bg-slate-50/50 rounded-3xl mb-12 border border-slate-100">
        <div className="flex justify-between items-end mb-8">
          <div className="text-left flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A3981]">
              Top Selling Products
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Most in-demand medicines, chosen by our global clients.
            </p>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topSelling.length > 0 ? (
            topSelling.map(product => (
              <ProductCard key={`top-${product.id}`} product={product} />
            ))
          ) : (
            [1, 2, 3, 4].map(i => <div key={i} className="bg-white h-80 rounded-2xl animate-pulse"></div>)
          )}
        </div>
      </section>

      {/* 5. BEST OFFERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full mb-12">
        <div className="flex justify-between items-end mb-6">
          <div className="text-left flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A3981]">
              Best Offers
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Special prices on selected medicines for a limited time.
            </p>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#005B41] hover:text-[#00A877] transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-6">
          {["Flat 20% Off", "Special Price", "Limited Offer", "Save More", "Best Deal"].map((tab, idx) => (
            <button key={idx} className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all ${idx === 0 ? "bg-[#005B41] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-[#005B41] hover:text-[#005B41]"}`}>
              {tab}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestOffers.length > 0 ? (
            bestOffers.map(product => (
              <ProductCard key={`offer-${product.id}`} product={product} showDiscount={true} />
            ))
          ) : (
            [1, 2, 3, 4].map(i => <div key={i} className="bg-slate-100 h-80 rounded-2xl animate-pulse"></div>)
          )}
        </div>
      </section>

      {/* 6. TRUST BADGES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full mb-12">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <div className="flex flex-col items-center text-center gap-3 pt-6 md:pt-0">
              <div className="bg-blue-50 p-4 rounded-full text-[#0A3981]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">100% Genuine Products</h4>
                <p className="text-xs text-slate-500 mt-1">Sourced from trusted manufacturers.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-3 pt-6 md:pt-0">
              <div className="bg-emerald-50 p-4 rounded-full text-[#00A877]">
                <Plane className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Worldwide Shipping</h4>
                <p className="text-xs text-slate-500 mt-1">Delivering to 100+ countries.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-3 pt-6 md:pt-0">
              <div className="bg-amber-50 p-4 rounded-full text-amber-500">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Bulk Supply Available</h4>
                <p className="text-xs text-slate-500 mt-1">For hospitals, distributors & pharmacies.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-3 pt-6 md:pt-0">
              <div className="bg-purple-50 p-4 rounded-full text-purple-500">
                <HeadphonesIcon className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Dedicated Support</h4>
                <p className="text-xs text-slate-500 mt-1">Quick response & professional assistance.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. WHAT OUR CLIENTS SAY (TESTIMONIALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full mb-12">
        <div className="flex justify-between items-end mb-10">
          <div className="text-left flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A3981]">
              What Our Clients Say
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Trusted by healthcare professionals and distributors worldwide.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm font-bold text-[#005B41] hover:text-[#00A877] transition-all hidden sm:flex items-center gap-1">
              <span>View All Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-[#0A3981] hover:border-[#0A3981] transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-[#0A3981] hover:border-[#0A3981] transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 relative">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium flex-1">
              "Trustedmedshop has been an excellent partner for our pharmaceutical needs. Authentic products and timely delivery."
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-sm">
                DK
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Dr. Richard K.</h4>
                <p className="text-[11px] text-slate-500">Hospital Procurement, UK</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 relative">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium flex-1">
              "Reliable supplier with great communication. Highly recommended for bulk orders."
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm">
                SM
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Sarah M.</h4>
                <p className="text-[11px] text-slate-500">Pharmacy Distributor, Canada</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 relative">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium flex-1">
              "Good quality medicines and professional service. Smooth export process."
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-sm">
                AF
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Ahmed Al-Farsi</h4>
                <p className="text-[11px] text-slate-500">Healthcare Importer, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STAY UPDATED NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full mb-8">
        <div className="bg-[#0A3981] rounded-3xl p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 shadow-lg">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col gap-3 relative z-10 text-left max-w-lg">
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{settings.newsletterTitle}</h3>
            <p className="text-sm text-blue-100 font-medium leading-relaxed">
              {settings.newsletterSub}
            </p>
          </div>

          <div className="w-full md:w-auto relative z-10 flex flex-col sm:flex-row gap-3 max-w-md flex-1">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full border-0 rounded-xl p-4 bg-white text-slate-800 font-medium outline-none shadow-inner text-sm"
            />
            <button className="w-full sm:w-auto bg-[#00A877] hover:bg-[#009166] text-white py-4 px-8 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
