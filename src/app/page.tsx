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
  Check,
  ChevronLeft,
  ChevronRight,
  Pill,
  Syringe,
  Shield,
  Truck,
  Ribbon,
  Brain,
  Wind,
  Package,
  HeadphonesIcon,
  Send,
  TrendingUp,
  Tag,
  MessageSquare,
  Building2,
  Droplet,
  Flame,
  LayoutGrid
} from "lucide-react";

export default function Home() {
  const { openInquiryModal, formatPrice, formatUsdPrice, currency } = useCart();
  const router = useRouter();
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`/api/products?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = [
    { title: "Anticancer", icon: <Ribbon className="w-5 h-5" />, colorClass: "text-pink-500 bg-pink-50 hover:bg-pink-100", link: "/products?category=anticancer" },
    { title: "Antibiotics", icon: <Pill className="w-5 h-5" />, colorClass: "text-sky-500 bg-sky-50 hover:bg-sky-100", link: "/products?category=antibiotics" },
    { title: "Cardiovascular", icon: <Heart className="w-5 h-5 fill-rose-400 text-rose-500" />, colorClass: "text-rose-500 bg-rose-50 hover:bg-rose-100", link: "/products?category=cardiovascular" },
    { title: "Diabetes", icon: <Droplet className="w-5 h-5 fill-blue-400 text-blue-500" />, colorClass: "text-blue-500 bg-blue-50 hover:bg-blue-100", link: "/products?category=diabetes" },
    { title: "HIV / AIDS", icon: <Ribbon className="w-5 h-5 text-red-500" />, colorClass: "text-red-500 bg-red-50 hover:bg-red-100", link: "/products?category=hiv-aids" },
    { title: "Hepatitis", icon: <Flame className="w-5 h-5 text-orange-500" />, colorClass: "text-orange-500 bg-orange-50 hover:bg-orange-100", link: "/products?category=hepatitis" },
    { title: "Hormones", icon: <Syringe className="w-5 h-5 text-indigo-500" />, colorClass: "text-indigo-500 bg-indigo-50 hover:bg-indigo-100", link: "/products?category=hormones" },
    { title: "Neurology", icon: <Brain className="w-5 h-5 text-purple-500" />, colorClass: "text-purple-500 bg-purple-50 hover:bg-purple-100", link: "/products?category=neurology" },
    { title: "Respiratory", icon: <Wind className="w-5 h-5 text-teal-500" />, colorClass: "text-teal-500 bg-teal-50 hover:bg-teal-100", link: "/products?category=respiratory" },
    { title: "More", icon: <LayoutGrid className="w-5 h-5 text-slate-500" />, colorClass: "text-slate-600 bg-slate-50 hover:bg-slate-100", link: "/products" },
  ];

  // Dynamic Products with Mockup Fallback
  const popularMedicinesData = productsList.length >= 5
    ? productsList.slice(0, 5).map(p => ({
        id: p.id,
        name: p.name,
        generic: `(${p.substance})`,
        unit: p.unit || p.packaging || "10 Tablets",
        price: p.price,
        image: p.image || "/images/mockup/pop-1-imatinib.png"
      }))
    : [
        { id: "p1", name: "Imatinib 400mg", generic: "(Generic Gleevec)", unit: "10 Tablets", price: 28, image: "/images/mockup/pop-1-imatinib.png" },
        { id: "p2", name: "Sofosbuvir 400mg", generic: "(Generic Sovaldi)", unit: "28 Tablets", price: 45, image: "/images/mockup/pop-2-sofosbuvir.png" },
        { id: "p3", name: "Lenalidomide 25mg", generic: "(Generic Revlimid)", unit: "21 Capsules", price: 62, image: "/images/mockup/pop-3-lenalidomide.png" },
        { id: "p4", name: "Apixaban 5mg", generic: "(Generic Eliquis)", unit: "60 Tablets", price: 38, image: "/images/mockup/pop-4-apixaban.png" },
        { id: "p5", name: "Daclatasvir 60mg", generic: "(Generic Daklinza)", unit: "28 Tablets", price: 40, image: "/images/mockup/pop-5-daclatasvir.png" },
      ];

  const topSellingData = productsList.length >= 10
    ? productsList.slice(5, 10).map(p => ({
        id: p.id,
        name: p.name,
        generic: `(${p.substance})`,
        unit: p.unit || p.packaging || "10 Tablets",
        price: p.price,
        image: p.image || "/images/mockup/top-1-tadalafil.png"
      }))
    : [
        { id: "t1", name: "Tadalafil 20mg", generic: "(Generic Cialis)", unit: "10 Tablets", price: 12, image: "/images/mockup/top-1-tadalafil.png" },
        { id: "t2", name: "Sildenafil 100mg", generic: "(Generic Viagra)", unit: "10 Tablets", price: 10, image: "/images/mockup/top-2-sildenafil.png" },
        { id: "t3", name: "Metformin 500mg", generic: "(Diabetes Care)", unit: "100 Tablets", price: 6, image: "/images/mockup/top-3-metformin.png" },
        { id: "t4", name: "Omeprazole 20mg", generic: "(Acidity Relief)", unit: "100 Capsules", price: 7, image: "/images/mockup/top-4-omeprazole.png" },
        { id: "t5", name: "Amlodipine 5mg", generic: "(Blood Pressure)", unit: "100 Tablets", price: 5, image: "/images/mockup/top-5-amlodipine.png" },
      ];

  const bestOffersData = productsList.length >= 15
    ? productsList.slice(10, 15).map((p, idx) => ({
        id: p.id,
        badge: idx === 0 ? "Flat 20% OFF" : idx === 1 ? "Special Price" : idx === 2 ? "Limited Offer" : idx === 3 ? "Save More" : "Best Deal",
        badgeColor: idx === 0 || idx === 2 ? "bg-[#FF3B30]" : idx === 3 ? "bg-[#00A86B]" : "bg-[#FF9500]",
        name: p.name,
        generic: `(${p.substance})`,
        unit: p.unit || p.packaging || "30 Tablets",
        price: p.price,
        oldPrice: Math.round(p.price * 1.25),
        image: p.image || "/images/mockup/offer-1-everolimus.png"
      }))
    : [
        { id: "o1", badge: "Flat 20% OFF", badgeColor: "bg-[#FF3B30]", name: "Everolimus 10mg", generic: "(Generic Afinitor)", unit: "30 Tablets", price: 70, oldPrice: 88, image: "/images/mockup/offer-1-everolimus.png" },
        { id: "o2", badge: "Special Price", badgeColor: "bg-[#FF9500]", name: "Dasatinib 70mg", generic: "(Generic Sprycel)", unit: "60 Tablets", price: 55, oldPrice: 72, image: "/images/mockup/offer-2-dasatinib.png" },
        { id: "o3", badge: "Limited Offer", badgeColor: "bg-[#FF3B30]", name: "Rivaroxaban 20mg", generic: "(Generic Xarelto)", unit: "30 Tablets", price: 42, oldPrice: 60, image: "/images/mockup/offer-3-rivaroxaban.png" },
        { id: "o4", badge: "Save More", badgeColor: "bg-[#00A86B]", name: "Enzalutamide 40mg", generic: "(Generic Xtandi)", unit: "112 Capsules", price: 95, oldPrice: 120, image: "/images/mockup/offer-4-enzalutamide.png" },
        { id: "o5", badge: "Best Deal", badgeColor: "bg-[#FF9500]", name: "Semaglutide 1mg", generic: "(Diabetes / Weight Loss)", unit: "4 Pens", price: 110, oldPrice: 140, image: "/images/mockup/offer-5-semaglutide.png" },
      ];

  return (
    <div className="w-full flex flex-col bg-white font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-gradient-to-r from-[#EBF5FB] via-[#E6F3FA] to-[#CDE9F9] overflow-hidden py-8 lg:py-12 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-3.5 sm:gap-4">
            <span className="text-[#00897B] text-xs font-black uppercase tracking-widest">
              QUALITY MEDICINES. <span className="text-[#00A86B]">GLOBAL REACH.</span>
            </span>
            
            <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-black text-[#0A3981] tracking-tight leading-tight">
              Trusted Medicines <br />
              Worldwide <span className="text-[#00A86B]">Exports</span>
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md font-medium">
              High-quality, affordable and life-saving medicines for global markets.
            </p>
            
            <Link 
              href="/products"
              className="bg-[#00A86B] hover:bg-[#008f5a] text-white py-3 px-8 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg mt-1"
            >
              <span>View Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* 4 Trust Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full mt-3">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-sky-200/60 shadow-sm text-xs font-bold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-[#00A86B] flex-shrink-0" />
                <span className="text-[10.5px] leading-tight">Genuine Products</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-sky-200/60 shadow-sm text-xs font-bold text-slate-800">
                <Truck className="w-4 h-4 text-[#00A86B] flex-shrink-0" />
                <span className="text-[10.5px] leading-tight">Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-sky-200/60 shadow-sm text-xs font-bold text-slate-800">
                <Building2 className="w-4 h-4 text-[#00A86B] flex-shrink-0" />
                <span className="text-[10.5px] leading-tight">Bulk Supply Support</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-sky-200/60 shadow-sm text-xs font-bold text-slate-800">
                <Shield className="w-4 h-4 text-[#00A86B] flex-shrink-0" />
                <span className="text-[10.5px] leading-tight">Trusted Partner</span>
              </div>
            </div>
          </div>

          {/* Right Hero Graphic - High-Definition Generated Pharma Global Theme */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[16/10] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 group">
              <img 
                src="/images/hero-generated.jpg" 
                alt="Trusted Medicines Worldwide Exports" 
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Top-Right Text Banner */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-sky-100/80 text-right animate-pulse">
                <span className="block text-[11px] sm:text-xs font-serif italic font-bold text-[#0A3981]">Better Medicines</span>
                <span className="block text-[11px] sm:text-xs font-serif italic font-bold text-[#00A86B]">Healthier World</span>
              </div>

              {/* Floating Bottom-Right Card */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-emerald-100 flex items-center gap-2.5">
                <div className="text-left">
                  <span className="block text-[10.5px] font-black text-slate-800 leading-tight">Healthier People</span>
                  <span className="block text-[10.5px] font-black text-[#00A86B] leading-tight">Stronger Tomorrow</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                  🌿
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORY ICONS ROW */}
      <section className="w-full bg-white py-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2.5 sm:gap-4 items-center justify-between">
            {categories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={cat.link}
                className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all shadow-sm group-hover:shadow-md ${cat.colorClass}`}>
                  {cat.icon}
                </div>
                <span className="text-[10.5px] font-bold text-slate-700 group-hover:text-[#00A86B] text-center whitespace-nowrap">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR MEDICINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between items-end mb-5">
          <div className="text-left flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-[#0A3981]">
                Popular Medicines
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Most searched and widely used medicines across global markets.
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-[#00A86B] hover:text-[#008f5a] transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {popularMedicinesData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-150 hover:border-[#00A86B]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-3 text-left group relative">
              <button 
                onClick={() => {}} 
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500 transition-colors z-10"
                title="Wishlist"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <Link href={`/products/${item.id}`} className="block">
                <div className="h-28 w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0A3981] group-hover:text-[#00A86B] transition-colors leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[10.5px] text-slate-500 font-medium line-clamp-1">{item.generic}</span>
                  <span className="text-[9.5px] text-slate-400">{item.unit}</span>
                </div>
              </Link>
                
              <div className="mt-auto pt-2 flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-black text-[#00A86B]">
                  {formatUsdPrice(item.price)}
                </span>
                
                <button 
                  onClick={() => openInquiryModal({ id: item.id, name: item.name, price: item.price, substance: item.generic, category: "Popular", unit: item.unit, rating: 5, reviewsCount: 12, isAvailable: true, badges: [], description: "", precautions: "", dosageAndUsage: "", sideEffects: "" } as any)}
                  className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TOP SELLING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex justify-between items-end mb-5">
          <div className="text-left flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl sm:text-2xl font-black text-[#0A3981]">
                Top Selling Products
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Most in-demand medicines, chosen by our global clients.
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-[#00A86B] hover:text-[#008f5a] transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {topSellingData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-150 hover:border-[#00A86B]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-3 text-left group relative">
              <button 
                onClick={() => {}} 
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500 transition-colors z-10"
                title="Wishlist"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <Link href={`/products/${item.id}`} className="block">
                <div className="h-28 w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0A3981] group-hover:text-[#00A86B] transition-colors leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[10.5px] text-slate-500 font-medium line-clamp-1">{item.generic}</span>
                  <span className="text-[9.5px] text-slate-400">{item.unit}</span>
                </div>
              </Link>
                
              <div className="mt-auto pt-2 flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-black text-[#00A86B]">
                  {formatUsdPrice(item.price)}
                </span>
                
                <button 
                  onClick={() => openInquiryModal({ id: item.id, name: item.name, price: item.price, substance: item.generic, category: "Top Selling", unit: item.unit, rating: 5, reviewsCount: 12, isAvailable: true, badges: [], description: "", precautions: "", dosageAndUsage: "", sideEffects: "" } as any)}
                  className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BEST OFFERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex justify-between items-end mb-5">
          <div className="text-left flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-500 fill-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-[#0A3981]">
                Best Offers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Special prices on selected medicines for a limited time.
            </p>
          </div>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-[#00A86B] hover:text-[#008f5a] transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Offers Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {bestOffersData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-150 hover:border-[#00A86B]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col p-3 text-left group relative">
              
              {/* Badge */}
              <div className={`absolute top-2 left-2 ${item.badgeColor} text-white text-[8.5px] font-extrabold py-0.5 px-2 rounded-md uppercase tracking-wider shadow-sm z-10`}>
                {item.badge}
              </div>

              <button 
                onClick={() => {}} 
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500 transition-colors z-10"
                title="Wishlist"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>

              <Link href={`/products/${item.id}`} className="block">
                <div className="h-28 w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2 mt-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#0A3981] group-hover:text-[#00A86B] transition-colors leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[10.5px] text-slate-500 font-medium line-clamp-1">{item.generic}</span>
                  <span className="text-[9.5px] text-slate-400">{item.unit}</span>
                </div>
              </Link>
                
              <div className="mt-auto pt-2 flex flex-col gap-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs sm:text-sm font-black text-[#FF3B30]">
                    {formatUsdPrice(item.price)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 line-through">
                    {formatUsdPrice(item.oldPrice)}
                  </span>
                </div>
                
                <button 
                  onClick={() => openInquiryModal({ id: item.id, name: item.name, price: item.price, substance: item.generic, category: "Best Offer", unit: item.unit, rating: 5, reviewsCount: 12, isAvailable: true, badges: [item.badge], description: "", precautions: "", dosageAndUsage: "", sideEffects: "" } as any)}
                  className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUST BADGES STRIP (4 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="bg-[#F0F7FA] border border-sky-100 rounded-3xl p-6 sm:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center">
            
            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-full bg-[#00A86B]/15 text-[#00A86B] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#00A86B]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#0A3981]">100% Genuine Products</h4>
                <p className="text-[10.5px] text-slate-500 font-medium">Sourced from trusted manufacturers</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-full bg-[#00A86B]/15 text-[#00A86B] flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-[#00A86B]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#0A3981]">Worldwide Shipping</h4>
                <p className="text-[10.5px] text-slate-500 font-medium">Delivering to 100+ countries</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-full bg-[#0A3981]/15 text-[#0A3981] flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-[#0A3981]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#0A3981]">Bulk Supply Available</h4>
                <p className="text-[10.5px] text-slate-500 font-medium">For hospitals, distributors & pharmacies</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-full bg-[#0A3981]/15 text-[#0A3981] flex items-center justify-center flex-shrink-0">
                <HeadphonesIcon className="w-5 h-5 text-[#0A3981]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#0A3981]">Dedicated Support</h4>
                <p className="text-[10.5px] text-slate-500 font-medium">Quick response & professional assistance</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. WHAT OUR CLIENTS SAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between items-end mb-6">
          <div className="text-left flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-500 fill-sky-400" />
              <h2 className="text-xl sm:text-2xl font-black text-[#0A3981]">
                What Our Clients Say
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Trusted by healthcare professionals and distributors worldwide.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/about" className="text-xs sm:text-sm font-bold text-[#00A86B] hover:text-[#008f5a] transition-all flex items-center gap-1">
              <span>View All Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex gap-1.5 hidden sm:flex">
              <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0A3981] hover:border-[#0A3981] transition-all">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0A3981] hover:border-[#0A3981] transition-all">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          
          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm flex flex-col gap-3 relative">
            <div className="flex justify-between items-center">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <Heart className="w-3.5 h-3.5 text-slate-300 hover:text-rose-500 cursor-pointer" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic flex-1">
              &ldquo;Trustedmedshop has been an excellent partner for our pharmaceutical needs. Authentic products and timely delivery.&rdquo;
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs">
                R
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0A3981]">Dr. Richard K.</h4>
                <span className="text-[9.5px] text-slate-400 font-medium">Hospital Procurement, UK</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm flex flex-col gap-3 relative">
            <div className="flex justify-between items-center">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <Heart className="w-3.5 h-3.5 text-slate-300 hover:text-rose-500 cursor-pointer" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic flex-1">
              &ldquo;Reliable supplier with great communication. Highly recommended for bulk orders.&rdquo;
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-xs">
                S
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0A3981]">Sarah M.</h4>
                <span className="text-[9.5px] text-slate-400 font-medium">Pharmacy Distributor, Canada</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm flex flex-col gap-3 relative">
            <div className="flex justify-between items-center">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <Heart className="w-3.5 h-3.5 text-slate-300 hover:text-rose-500 cursor-pointer" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic flex-1">
              &ldquo;Good quality medicines and professional service. Smooth export process.&rdquo;
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-xs">
                A
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0A3981]">Ahmed Al-Farsi</h4>
                <span className="text-[9.5px] text-slate-400 font-medium">Healthcare Importer, UAE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. DETAILED GENERIC CURES INFORMATION & WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-10 text-left flex flex-col gap-8">
          
          {/* Main Intro */}
          <div className="border-b border-slate-200 pb-6">
            <span className="text-[#00A86B] text-xs font-black uppercase tracking-widest block mb-1">
              Genericcures — Your Trusted Medicine Store
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#0A3981] tracking-tight">
              Why choose Generic Cures Company for an online pharmacy?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-3">
              Welcome to one of the most reputable online pharmacies. Today, we are the world&apos;s best choice for high-quality OTC and generic products. Generic Cures is the most famous pharmacy. You can buy any tested and approved drug there. We provide greater savings than any other retailer, as well as free delivery. Also, we are always adding new deals for our clients. The firm strives to provide FDA-approved medication at a fair price. We promise your complete satisfaction and superior quality. All the medicines available here are quite safe and worthwhile.
            </p>
          </div>

          {/* 8 Feature Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A3981]">💰 Save Money</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Buy generic drugs at a cheaper price. The medicine is vital. With living costs rising, medicine prices have soared. You&apos;ll get the same drugs here at a lower price. You are now a member of our family as a result of this. We make a significant effort to ensure that our customers receive the highest level of care.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A3981]">🛡️ 100% Quality Assurance</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Quality is the last thing you have to worry about. Neither client has complained about quality. We have tested and confirmed all the FDA-approved medications. Also, we have licensed cutting-edge medications on our site in several other countries.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A3981]">✨ Genuine Products</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                If we talk about whether the products are genuine or not? You can trust us completely about the product&apos;s authenticity. Our team always checks the required date before the last dispatch. The members verify the authenticity of the manufacturers.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A3981]">🚚 Better Delivery Options</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                When you order from Generic Cures, we guarantee delivery in 15-30 days at most. You needn&apos;t worry. We will deliver your order to your door. You will get an order number, shipment number, and live tracking info.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A3981]">🔄 Easy Return & Refund</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                We offer the best products, with top-notch, secure packaging. We accept returns if someone changes their mind after ordering. You will get your cashback in the Generic Cures wallet. We accept full responsibility for each product.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A3981]">📦 100% Hassle-Free Delivery</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                We drive the order to your doorsteps. People feel embarrassed to ask for certain drugs; our services make it easy, discrete, and comfortable for clients to get it delivered hassle-free.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A3981]">⭐ Customer Satisfaction</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                We offer our customers 100% satisfaction with our global healthcare services. We work to prioritise our customers and meet their needs with smooth and safe support.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A3981]">🎁 Free Shipping Over $199</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                We offer free shipping on orders over $199. We also provide the best deals on many purchases, coupons, and surprise discounts during the offer period.
              </p>
            </div>

          </div>

          {/* ED Health Information Card */}
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-sky-200/70">
            <h3 className="text-base sm:text-lg font-black text-[#0A3981] mb-2">
              Understanding Men&apos;s Health: What is Erectile Dysfunction (ED)?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Erectile dysfunction is the inability to maintain a firm erection for sex. It is also cited as impotence; yet, the term rarely comes into use now. At times of stress, ED is often uncivil. Yet, it can also be an alert about your body. You need treatment for the same. It might also be a psychological disorder involving anxiety, stress, depression, or post-traumatic stress disorder.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
                <span className="font-bold text-xs text-[#0A3981] block">Cenforce 100</span>
                <span className="text-[11px] text-slate-500">Sildenafil Citrate 100mg for reliable vitality</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
                <span className="font-bold text-xs text-[#0A3981] block">Fildena 100</span>
                <span className="text-[11px] text-slate-500">Fast-acting formulation for enhanced performance</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
                <span className="font-bold text-xs text-[#0A3981] block">Vidalista 20</span>
                <span className="text-[11px] text-slate-500">Tadalafil 20mg long-lasting weekend relief</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-4">
              You need not have any worries with Generic Cures Company. If you do not receive the medicines as ordered, you can return them for a full refund. Meeting your needs is our top priority.
            </p>
          </div>

        </div>
      </section>

      {/* 9. STAY UPDATED NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full mb-6">
        <div className="bg-gradient-to-r from-[#00A86B] via-[#009E60] to-[#38A169] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
          
          <div className="flex items-center gap-3.5 text-left z-10">
            <div className="w-11 h-11 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">Stay Updated</h3>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">
                Get the latest product updates, offers and healthcare insights.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto z-10 flex flex-col sm:flex-row items-center gap-2.5 max-w-md flex-1">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="w-full border-0 rounded-full py-2.5 px-4 bg-white text-slate-800 font-medium outline-none text-xs sm:text-sm shadow-inner"
            />
            <button className="w-full sm:w-auto bg-[#051329] hover:bg-[#0A3981] text-white py-2.5 px-6 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap shadow-md cursor-pointer">
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Leaf vector background */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none text-white text-8xl">
            🌿
          </div>
        </div>
      </section>

    </div>
  );
}
