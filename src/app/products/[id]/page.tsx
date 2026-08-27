"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { 
  Star, 
  Plus, 
  Minus, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Award, 
  Truck, 
  Package, 
  HeadphonesIcon, 
  Send, 
  ArrowRight,
  Clock,
  Shield,
  Globe,
  Home,
  ChevronRight,
  CheckCircle2,
  Mail
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { openInquiryModal, formatUsdPrice, currency } = useCart();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>("/images/products/fenbendazole-main.jpg");
  const [activeTab, setActiveTab] = useState<string>("description");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1
  });

  const relatedProducts = [
    { id: "rel-1", name: "Ivermectin 12mg", unit: "10 Tablets", price: 18, image: "/images/products/related-ivermectin.jpg", substance: "Ivermectin" },
    { id: "rel-2", name: "Albendazole 400mg", unit: "10 Tablets", price: 12, image: "/images/products/related-albendazole.jpg", substance: "Albendazole" },
    { id: "rel-3", name: "Mebendazole 100mg", unit: "10 Tablets", price: 14, image: "/images/products/related-mebendazole.jpg", substance: "Mebendazole" },
    { id: "rel-4", name: "Praziquantel 600mg", unit: "6 Tablets", price: 32, image: "/images/products/related-praziquantel.jpg", substance: "Praziquantel" },
  ];

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          setProduct(data.product);
          if (data.product.image) {
            setActiveImage(data.product.image);
          }
        }
      })
      .catch((err) => console.error(err));

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleQuantityChange = (index: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + delta)
    }));
  };

  const currentProductName = product?.name || "Fenbendazole for Humans 150 mg (Wormentel)";
  const currentCategory = product?.category || "Antiparasitic";
  const currentSubstance = product?.substance || product?.composition || "Fenbendazole";
  const currentBrand = product?.manufacturer || product?.brand || "Kachhela Medex Private Limited";
  const currentPackaging = product?.packaging || product?.unit || "10 tablets in 1 strip";
  const currentDescription = product?.description || "High-quality, genuine generic medication manufactured under strict GMP compliance, suitable for global healthcare and distributor markets.";

  const basePrice = product?.price || 28;
  const tierOptions = [
    { packSize: "30 Tablet/s", price: Math.round(basePrice * 2.8) },
    { packSize: "50 Tablet/s", price: Math.round(basePrice * 4.2) },
    { packSize: "100 Tablet/s", price: Math.round(basePrice * 7.5) },
    { packSize: "200 Tablet/s", price: Math.round(basePrice * 14.0) },
    { packSize: "300 Tablet/s", price: Math.round(basePrice * 19.5) },
    { packSize: "500 Tablet/s", price: Math.round(basePrice * 30.0) },
    { packSize: "1000 Tablet/s", price: Math.round(basePrice * 54.0) },
  ];

  const displayThumbnails = (product?.thumbnails && product.thumbnails.length > 0)
    ? product.thumbnails
    : [activeImage, "/images/products/fenbendazole-thumb-2.jpg", "/images/products/fenbendazole-thumb-3.jpg", "/images/products/fenbendazole-thumb-4.jpg"];

  const handleOptionInquiry = (tier: { packSize: string; price: number }, qty: number) => {
    openInquiryModal({
      id: product?.id || id || "prod-inquiry",
      name: `${currentProductName} (${tier.packSize})`,
      price: tier.price * qty,
      substance: currentSubstance,
      category: currentCategory,
      unit: `${qty} x ${tier.packSize}`,
      rating: 5,
      reviewsCount: 0,
      isAvailable: true,
      badges: [],
      description: "",
      precautions: "",
      dosageAndUsage: "",
      sideEffects: ""
    } as any);
  };

  return (
    <div className="w-full flex flex-col bg-white font-sans text-slate-800">
      
      {/* 1. BREADCRUMBS */}
      <div className="w-full bg-[#F8FAFC] border-b border-slate-200/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#00A86B] flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/products" className="hover:text-[#00A86B]">All Medicines</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href={`/products?category=${currentCategory.toLowerCase()}`} className="hover:text-[#00A86B] text-slate-600">
            {currentCategory}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold truncate max-w-md">{currentProductName}</span>
        </div>
      </div>

      {/* 2. PRODUCT OVERVIEW & 3-COLUMN HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Gallery (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-center h-80 sm:h-96 shadow-sm overflow-hidden group">
              <img 
                src={activeImage} 
                alt={currentProductName} 
                className="max-h-full max-w-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* 4 Thumbnails */}
            <div className="grid grid-cols-4 gap-2.5">
              {displayThumbnails.slice(0, 4).map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(thumb)}
                  className={`h-16 rounded-xl border p-1 bg-white flex items-center justify-center transition-all cursor-pointer ${
                    activeImage === thumb 
                      ? "border-2 border-[#00A86B] shadow-sm" 
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Center Column: Meta & Specifications Table (5 cols) */}
          <div className="lg:col-span-5 flex flex-col text-left gap-3.5">
            <div>
              <span className="bg-[#E8F8F0] text-[#00A86B] text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                {currentCategory}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0A3981] tracking-tight leading-tight mt-2">
                {currentProductName}
              </h1>
            </div>

            {/* Stars & Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-slate-200 fill-slate-200" />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-medium">(There are no reviews yet.)</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {currentDescription}
            </p>

            {/* Specifications Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm mt-1">
              <div className="divide-y divide-slate-100 text-xs">
                <div className="grid grid-cols-12 p-2.5 bg-white">
                  <span className="col-span-5 font-bold text-[#0A3981]">Active Ingredient (Generic Name)</span>
                  <span className="col-span-7 text-slate-600 font-medium">{currentSubstance}</span>
                </div>
                <div className="grid grid-cols-12 p-2.5 bg-[#F8FAFC]">
                  <span className="col-span-5 font-bold text-[#0A3981]">Strength</span>
                  <span className="col-span-7 text-slate-600 font-medium">{product?.composition || "Clinical Standard"}</span>
                </div>
                <div className="grid grid-cols-12 p-2.5 bg-white">
                  <span className="col-span-5 font-bold text-[#0A3981]">Manufacturer</span>
                  <span className="col-span-7 text-slate-600 font-medium">{currentBrand}</span>
                </div>
                <div className="grid grid-cols-12 p-2.5 bg-[#F8FAFC]">
                  <span className="col-span-5 font-bold text-[#0A3981]">Packaging</span>
                  <span className="col-span-7 text-slate-600 font-medium">{currentPackaging}</span>
                </div>
                <div className="grid grid-cols-12 p-2.5 bg-white">
                  <span className="col-span-5 font-bold text-[#0A3981]">Usage/Application</span>
                  <span className="col-span-7 text-slate-600 font-medium">Clinical</span>
                </div>
                <div className="grid grid-cols-12 p-2.5 bg-[#F8FAFC]">
                  <span className="col-span-5 font-bold text-[#0A3981]">Delivery Time</span>
                  <span className="col-span-7 text-slate-600 font-medium">10 to 15 days</span>
                </div>
                <div className="grid grid-cols-12 p-2.5 bg-white">
                  <span className="col-span-5 font-bold text-[#0A3981]">SKU</span>
                  <span className="col-span-7 text-slate-600 font-medium">{product?.id || id || "MED-EXPORT"}</span>
                </div>
                <div className="grid grid-cols-12 p-2.5 bg-[#F8FAFC]">
                  <span className="col-span-5 font-bold text-[#0A3981]">Category</span>
                  <span className="col-span-7 text-slate-600 font-medium">{currentCategory}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send Inquiry Sidebar Card (3 cols) */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-md flex flex-col gap-4 text-left">
            <div>
              <h3 className="text-lg font-black text-[#0A3981] flex items-center gap-1.5">
                <span className="text-[#00A86B]">Send</span> Inquiry
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                Get best price, availability and shipping details.
              </p>
            </div>

            {/* 3 Inquiry Buttons */}
            <div className="flex flex-col gap-2.5">
              <a 
                href={`https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20sourcing%20${encodeURIComponent(currentProductName)}.`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="text-sm">💬</span>
                <span>Inquiry on WhatsApp</span>
              </a>

              <a 
                href={`https://t.me/trustedmedshop?text=Hi%2C%20I%20am%20interested%20in%20sourcing%20${encodeURIComponent(currentProductName)}.`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#0088cc] hover:bg-[#0077b5] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquiry on Telegram</span>
              </a>

              <button 
                onClick={() => openInquiryModal({ name: currentProductName, substance: currentSubstance, category: currentCategory } as any)}
                className="w-full bg-white hover:bg-slate-50 text-[#0A3981] border border-slate-300 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#0A3981]" />
                <span>Inquiry on Email</span>
              </button>
            </div>

            {/* 3 Trust Features */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-[#00A86B]/10 text-[#00A86B] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-slate-800 leading-tight">Fast Response</span>
                <span className="text-[9px] text-slate-400">Within 24 hours</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-[#00A86B]/10 text-[#00A86B] flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-slate-800 leading-tight">Secure &amp;</span>
                <span className="text-[9px] text-slate-400">Confidential</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-[#00A86B]/10 text-[#00A86B] flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-slate-800 leading-tight">Export</span>
                <span className="text-[9px] text-slate-400">Support</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. AVAILABLE OPTIONS TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm text-left">
          
          <div className="bg-white px-6 py-4 border-b border-slate-200">
            <h3 className="text-base sm:text-lg font-black text-[#0A3981]">
              Available Options
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3 px-6">Pack Size</th>
                  <th className="py-3 px-6">Price ({currency})</th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {tierOptions.map((tier, idx) => {
                  const qty = quantities[idx] || 1;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-6 font-semibold text-slate-800">{tier.packSize}</td>
                      <td className="py-3 px-6 font-bold text-[#0A3981]">{formatUsdPrice(tier.price)}</td>
                      <td className="py-3 px-6">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                            <button 
                              type="button" 
                              onClick={() => handleQuantityChange(idx, -1)}
                              className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 font-bold text-xs text-slate-800 min-w-[28px] text-center">
                              {qty}
                            </span>
                            <button 
                              type="button" 
                              onClick={() => handleQuantityChange(idx, 1)}
                              className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          onClick={() => handleOptionInquiry(tier, qty)}
                          className="bg-[#00A86B] hover:bg-[#008f5a] text-white py-1.5 px-6 rounded-lg font-bold text-xs transition-all inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Inquiry</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 4. DETAILED TABS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full text-left">
        <div className="border border-slate-200 rounded-2xl p-6 shadow-sm">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-6 text-xs sm:text-sm font-bold pb-2">
            {[
              { id: "description", name: "Description" },
              { id: "benefits", name: "Benefits" },
              { id: "sideEffects", name: "Side Effects" },
              { id: "howToUse", name: "How to Use" },
              { id: "shippingReturns", name: "Shipping & Returns" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2.5 transition-all relative whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id 
                    ? "text-[#00A86B] font-black border-b-2 border-[#00A86B]" 
                    : "text-slate-500 hover:text-[#0A3981]"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Body Content */}
          <div className="pt-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {activeTab === "description" && (
              <div className="flex flex-col gap-3">
                <p>
                  Wormentel 150 mg (Fenbendazole) is an antiparasitic medication used to treat various parasitic infections such as roundworm infections, tapeworms, hookworms, strongyloidiasis, and more. It works by binding to parts inside the parasite, eventually paralyzing and killing them, which helps clear the infection from your body.
                </p>
                <p>
                  Fenbendazole is widely used due to its effectiveness, safety profile, and broad-spectrum activity. It is manufactured under strict quality standards, ensuring high purity and effectiveness.
                </p>
              </div>
            )}

            {activeTab === "benefits" && (
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <span>Broad-spectrum eradication of common and complex parasitic infections.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <span>High bioavailability and established clinical safety profile.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <span>WHO-GMP certified manufacturing with strict batch quality verification.</span>
                </div>
              </div>
            )}

            {activeTab === "sideEffects" && (
              <div className="flex flex-col gap-2">
                <p>Most individuals tolerate Fenbendazole well. Mild and temporary side effects may include:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-500">
                  <li>Mild abdominal discomfort or nausea</li>
                  <li>Occasional dizziness or headache</li>
                  <li>Temporary diarrhea during parasite clearance</li>
                </ul>
                <p className="text-xs text-slate-400 mt-2">Always consult a qualified healthcare provider before starting any new therapeutic regimen.</p>
              </div>
            )}

            {activeTab === "howToUse" && (
              <div className="flex flex-col gap-2">
                <p>Take this medicine in the dose and duration as advised by your doctor. Swallow it as a whole with water. Do not chew, crush or break the tablet. Take with meals for optimal absorption.</p>
              </div>
            )}

            {activeTab === "shippingReturns" && (
              <div className="flex flex-col gap-2">
                <p>We deliver globally with tracked express and standard shipping options (10-15 business days). Discrete, temperature-controlled packaging ensures product integrity. 100% full refund or replacement guarantee if the parcel is damaged or lost.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. YOU MAY ALSO LIKE (RELATED PRODUCTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex justify-between items-end mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-[#0A3981]">
            You May Also Like
          </h2>
          <Link href="/products" className="text-xs sm:text-sm font-bold text-[#00A86B] hover:text-[#008f5a] transition-all flex items-center gap-1">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedProducts.map((rel) => (
            <div key={rel.id} className="bg-white rounded-2xl border border-slate-200 hover:border-[#00A86B]/50 p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col text-left group">
              <div className="h-28 w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2">
                <img src={rel.image} alt={rel.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0A3981] group-hover:text-[#00A86B] transition-colors leading-tight line-clamp-1">
                {rel.name}
              </h4>
              <span className="text-[10px] text-slate-400 mt-0.5">{rel.unit}</span>
              
              <div className="mt-auto pt-2 flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-black text-[#00A86B]">
                  {formatUsdPrice(rel.price)}
                </span>
                <button
                  onClick={() => openInquiryModal({ name: rel.name, substance: rel.substance, price: rel.price } as any)}
                  className="w-full bg-[#00A86B] hover:bg-[#008f5a] text-white py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Inquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRUST BADGES 4 PILLARS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full mb-4">
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
                <p className="text-[10.5px] text-slate-500 font-medium">For hospitals, distributors &amp; pharmacies</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-left">
              <div className="w-11 h-11 rounded-full bg-[#0A3981]/15 text-[#0A3981] flex items-center justify-center flex-shrink-0">
                <HeadphonesIcon className="w-5 h-5 text-[#0A3981]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#0A3981]">Dedicated Support</h4>
                <p className="text-[10.5px] text-slate-500 font-medium">Quick response &amp; professional assistance</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
