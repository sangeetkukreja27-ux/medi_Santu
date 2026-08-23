"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import TrustBadges from "@/components/TrustBadges";
import { 
  Star, 
  Plus, 
  Minus, 
  FileText, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  MessageCircle,
  ShoppingCart,
  ArrowRight
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, cartItems, openInquiryModal } = useCart();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  // Fetch product from dynamic API
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
          setActiveImage(data.product.image);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch all products for related slider
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!product) {
    return (
      <div className="flex flex-col flex-grow items-center justify-center py-24 bg-[#F8FAF9]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-[#005B41] mb-4"></div>
        <span className="text-sm font-bold text-slate-600 font-semibold">Locating sourced product details...</span>
      </div>
    );
  }

  // Get related products (same category, excluding current)
  const relatedProducts = productsList
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openInquiryModal(product);
  };

  // Pre-filled messages for quick communication channels
  const encodedName = encodeURIComponent(product.name);
  const encodedSub = encodeURIComponent(product.substance);
  const whatsappUrl = `https://wa.me/919876543210?text=Hi%20TrustedMedShop%2C%20I%20am%20interested%20in%20sourcing%20${encodedName}%20(${encodedSub})%20in%20bulk.%20Please%20provide%20pricing%20details.`;
  const telegramUrl = `https://t.me/trustedmedshop?text=Hi%20TrustedMedShop%2C%20I%20am%20interested%20in%20sourcing%20${encodedName}%20(${encodedSub})%20in%20bulk.%20Please%20provide%20pricing%20details.`;
  const emailUrl = `mailto:info@trustedmedshop.com?subject=Bulk%20Inquiry%20-%20${product.name}&body=Hello%20TrustedMedShop%2C%0A%0AI%20would%20like%20to%20request%20a%20price%20quote%20for%20the%20following%20product%3A%0A-%20Product%3A%20${product.name}%0A-%20Substance%3A%20${product.substance}%0A-%20Desired%20Quantity%3A%20[Please%20enter%20quantity]%20Boxes%0A%0APlease%20let%20me%20know%20availability%20and%20shipping%20times.%0A%0AThanks%21`;

  const tabs = [
    { id: "description", name: "Description" },
    { id: "benefits", name: "Benefits" },
    { id: "sideEffects", name: "Side Effects" },
    { id: "howToUse", name: "How to Use" },
    { id: "shippingReturns", name: "Shipping & Returns" }
  ];

  const isItemInCart = cartItems.some((item) => item.product.id === product.id);

  return (
    <div className="w-full flex flex-col bg-[#F8FAF9] font-sans pb-12">
      
      {/* Breadcrumbs Banner */}
      <section className="bg-white border-b border-slate-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-400 text-left">
          <Link href="/" className="hover:text-[#005B41] transition-colors">Home</Link>
          <span>&gt;</span>
          <Link href="/products" className="hover:text-[#005B41] transition-colors">Products</Link>
          <span>&gt;</span>
          <span className="text-slate-400 hover:text-[#005B41] transition-colors">{product.category}</span>
          <span>&gt;</span>
          <span className="text-slate-600">{product.name}</span>
        </div>
      </section>

      {/* Main product card layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        
        {/* Left Column: Image previews */}
        <div className="lg:col-span-5 flex flex-col gap-4 text-left">
          <div className="bg-white rounded-3xl border border-slate-150 p-6 flex items-center justify-center h-[340px] sm:h-[420px] shadow-sm relative group">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="h-full max-w-full object-contain rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
            />
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-6 right-6 bg-slate-50 hover:bg-slate-100 p-2.5 rounded-full shadow text-slate-400 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 transition-all ${isWishlisted ? "fill-red-500 text-red-500 scale-110" : "fill-transparent"}`} />
            </button>
            <div className="absolute bottom-6 left-6 bg-[#005B41] text-white text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider shadow">
              Original Packaging
            </div>
          </div>
          
          {/* Thumbnails Carousel */}
          {product.thumbnails && product.thumbnails.length > 1 && (
            <div className="flex gap-3.5 overflow-x-auto py-1 scrollbar-none items-center justify-start">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(thumb)}
                  className={`w-20 h-20 bg-white border rounded-xl flex items-center justify-center p-1 flex-shrink-0 shadow-sm transition-all hover:scale-105 ${
                    activeImage === thumb 
                      ? "border-2 border-[#005B41] ring-2 ring-[#005B41]/10 scale-102" 
                      : "border-slate-200"
                  }`}
                >
                  <img src={thumb} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center Column: Spec sheet & Details */}
        <div className="lg:col-span-4 flex flex-col text-left gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black text-[#00A877] uppercase tracking-widest leading-none">{product.category}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mt-1">
              {product.name}
            </h1>
            <span className="text-sm font-semibold text-slate-500">{product.substance}</span>
          </div>

          {/* Review Stars */}
          <div className="flex items-center gap-1.5 border-y border-slate-100 py-3 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviewsCount} reviews & verified clearances)</span>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap gap-2.5 my-1">
            <div className="flex items-center gap-1.5 bg-[#F4F7F6] text-[#005B41] py-1.5 px-3 rounded-full text-xs font-bold border border-[#005b41]/5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A877]" />
              <span>100% Genuine</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F4F7F6] text-[#005B41] py-1.5 px-3 rounded-full text-xs font-bold border border-[#005b41]/5">
              <Award className="w-3.5 h-3.5 text-[#00A877]" />
              <span>WHO-GMP Approved</span>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {product.description.slice(0, 190)}...
          </p>

          {/* Specs Sheet */}
          <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm mt-2 flex flex-col gap-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">Technical Specifications</span>
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs font-semibold">
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Manufacturer</span>
                <span className="text-slate-800 font-bold">{product.brand}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Composition</span>
                <span className="text-slate-800 font-bold">{product.composition}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Packaging</span>
                <span className="text-slate-800 font-bold">{product.packaging}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Shelf Life</span>
                <span className="text-slate-800 font-bold">{product.shelfLife}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry checkout Card */}
        <aside className="lg:col-span-3 w-full bg-white rounded-3xl border border-slate-100 p-6 flex flex-col gap-5 text-left shadow-md relative">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-2xl font-black text-[#005B41]">₹{product.price.toFixed(2)}</span>
              <span className="text-xs font-bold text-slate-400">/ {product.unit.split(" ")[1] || "Box"}</span>
            </div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{product.unit}</span>
          </div>

          <div className="flex items-center justify-between border-y border-slate-100 py-3.5">
            <span className="text-xs font-bold text-slate-500">Sourcing Availability</span>
            <span className="bg-[#00A877]/10 text-[#00A877] font-extrabold text-[10px] py-1 px-3 rounded-full uppercase tracking-wider">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Form wrapper */}
          <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-500">Order Quantity (Boxes)</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button 
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2 text-slate-500 hover:text-[#005B41] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="flex-1 text-center font-bold text-slate-800 text-sm bg-transparent outline-none border-none py-1"
                />
                <button 
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-2 text-slate-500 hover:text-[#005B41] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => {
                if (product) {
                  addToCart(product, quantity);
                  router.push("/cart");
                }
              }}
              className="bg-[#005B41] hover:bg-[#004833] text-white py-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-[#005b41]/10 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer mt-1"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span>Add to Cart & View Basket</span>
            </button>
          </form>

          {/* Direct channels */}
          <div className="flex flex-col gap-2.5 mt-2 border-t border-slate-100 pt-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Inquire via direct channels</span>
            
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </div>
              <span className="text-[9px] uppercase text-slate-400 font-extrabold tracking-wider">Chat with us</span>
            </a>

            <a 
              href={telegramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="border border-[#0088cc]/20 bg-[#0088cc]/5 hover:bg-[#0088cc]/10 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#0088cc] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.62.15-.15 2.72-2.5 2.77-2.7.01-.03.01-.13-.05-.19-.06-.05-.14-.04-.2-.02-.08.02-1.35.86-3.82 2.53-.36.25-.69.37-.98.36-.32-.01-.94-.18-1.4-.33-.56-.18-1-.28-.96-.59.02-.16.24-.33.67-.5 2.62-1.14 4.37-1.89 5.25-2.25 2.5-1.02 3.02-1.2 3.36-1.2.07 0 .24.02.35.12.09.08.12.18.13.26.01.07.01.14 0 .22z" />
                </svg>
                <span>Telegram</span>
              </div>
              <span className="text-[9px] uppercase text-slate-400 font-extrabold tracking-wider">Message us</span>
            </a>

            <a 
              href={emailUrl} 
              className="border border-[#dd4b39]/20 bg-[#dd4b39]/5 hover:bg-[#dd4b39]/10 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#dd4b39]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Sourcing</span>
              </div>
              <span className="text-[9px] uppercase text-slate-400 font-extrabold tracking-wider">Send Inquiry</span>
            </a>
          </div>

          {/* Share */}
          <div className="flex items-center gap-2.5 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 justify-center">
            <Share2 className="w-4 h-4 text-slate-400" />
            <span>Share Product Profile</span>
          </div>
        </aside>

      </section>

      {/* Detail Tabs Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full text-left">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
          
          {/* Tab buttons */}
          <div className="flex flex-wrap border-b border-slate-100 gap-6 text-sm font-bold text-slate-500 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3.5 relative tracking-wide cursor-pointer ${
                  activeTab === tab.id 
                    ? "text-[#005B41] font-black" 
                    : "hover:text-[#005B41]"
                }`}
              >
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00A877] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-4xl">
            {activeTab === "description" && (
              <div className="flex flex-col gap-4">
                <p>{product.description}</p>
                <p className="font-semibold text-slate-800">Please note: Sourcing quantities are subject to export compliance certifications. Consult our support division for paperwork assistance.</p>
              </div>
            )}
            {activeTab === "benefits" && (
              <div className="flex flex-col gap-3">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-1">Key Clinical Benefits</h4>
                <p>{product.benefits}</p>
              </div>
            )}
            {activeTab === "sideEffects" && (
              <div className="flex flex-col gap-3">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-1">Identified Potential Side Effects</h4>
                <p>{product.sideEffects}</p>
              </div>
            )}
            {activeTab === "howToUse" && (
              <div className="flex flex-col gap-3">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-1">Administration Guidelines</h4>
                <p>{product.howToUse}</p>
              </div>
            )}
            {activeTab === "shippingReturns" && (
              <div className="flex flex-col gap-3">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base mb-1">Global Logistics & Returns Policy</h4>
                <p>{product.shippingReturns}</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* You May Also Like Slider */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full text-center">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">You May Also Like</h2>
            <Link href="/products" className="text-xs sm:text-sm font-bold text-[#005B41] hover:text-[#00A877] transition-colors flex items-center gap-1.5">
              <span>View All Products</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
            {relatedProducts.map((p) => {
              const itemInCart = cartItems.some((item) => item.product.id === p.id);
              return (
                <div 
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col group text-left"
                >
                  <div className="relative h-36 bg-slate-50 flex items-center justify-center p-2 rounded-xl mb-4">
                    <img src={p.image} alt={p.name} className="h-full object-contain rounded-lg" />
                  </div>
                  <span className="text-[9px] text-[#00A877] font-extrabold uppercase tracking-wider mb-0.5">{p.category}</span>
                  <Link href={`/products/${p.id}`} className="text-xs sm:text-sm font-bold text-slate-800 hover:text-[#005B41] transition-colors leading-tight line-clamp-2 min-h-[36px] mb-1">
                    {p.name}
                  </Link>
                  <span className="text-[10px] text-slate-400 font-semibold mb-3">{p.substance}</span>
                  <div className="flex justify-between items-center mt-auto border-t border-slate-50 pt-3">
                    <div>
                      <span className="block text-sm sm:text-base font-black text-[#005B41]">${p.price.toFixed(2)}</span>
                      <span className="block text-[8px] text-slate-400 font-semibold uppercase -mt-0.5">{p.unit}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(p, 1)}
                      className={`px-3 py-2 rounded-lg text-[10px] font-bold shadow-sm transition-all ${
                        itemInCart 
                          ? "bg-[#00A877] text-white" 
                          : "bg-[#005B41] text-white hover:bg-[#004833]"
                      }`}
                    >
                      {itemInCart ? "Added" : "Inquire"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Trust Badges bottom */}
      <TrustBadges />

    </div>
  );
}
