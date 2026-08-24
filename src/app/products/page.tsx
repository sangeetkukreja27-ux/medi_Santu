"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import TrustBadges from "@/components/TrustBadges";
import { 
  Heart, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  Check, 
  SlidersHorizontal,
  X,
  Mail,
  Award,
  ShieldCheck,
  Truck,
  Clock,
  ShoppingCart
} from "lucide-react";

// Separate search-dependent logic into a child component wrapped in Suspense
const ProductsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart, cartItems, openInquiryModal, formatPrice } = useCart();

  // Parse query params
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  // State
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(200);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>(["in-stock"]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState<boolean>(false);

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

  // Synchronize with URL params
  useEffect(() => {
    if (categoryParam) {
      const decodedCat = categoryParam.replace(/-/g, " ");
      const matchedCat = categoriesList.find(
        (c) => c.toLowerCase() === decodedCat.toLowerCase()
      );
      if (matchedCat) {
        setSelectedCategory(matchedCat);
      }
    } else {
      setSelectedCategory("All Categories");
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [categoryParam, searchParam]);

  // static lists
  const categoriesList = [
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

  const brandOptions = ["Healing Pharma", "Sun Pharma", "Cipla", "Swiss", "ivylink"];
  const formOptions = ["Tablet", "Capsule", "Injection", "Cream", "Lotion"];

  // Helper count calculator for categories
  const getCategoryCount = (category: string) => {
    if (category === "All Categories") return productsList.length;
    return productsList.filter((p) => p.category === category).length;
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => 
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleFormChange = (form: string) => {
    setSelectedForms((prev) => 
      prev.includes(form) ? prev.filter((f) => f !== form) : [...prev, form]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedForms([]);
    setPriceRange(200);
    setAvailability(["in-stock"]);
    setSelectedCategory("All Categories");
    setSearchQuery("");
    router.push("/products");
  };

  // Filter and Sort Logic
  const filteredProducts = productsList.filter((product) => {
    // 1. Category Filter
    if (selectedCategory !== "All Categories" && product.category !== selectedCategory) {
      return false;
    }
    
    // 2. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSubstance = product.substance.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      if (!matchName && !matchSubstance && !matchCategory) {
        return false;
      }
    }
    
    // 3. Price Filter
    if (product.price > priceRange) {
      return false;
    }
    
    // 4. Brand Filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }
    
    // 5. Form Filter
    if (selectedForms.length > 0 && !selectedForms.includes(product.form)) {
      return false;
    }
    
    // 6. Availability Filter
    if (availability.length > 0) {
      const isAvailable = product.inStock;
      if (availability.includes("in-stock") && !isAvailable) return false;
      if (availability.includes("out-of-stock") && isAvailable) return false;
    }
    
    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.reviewsCount - a.reviewsCount; // sort by number of reviews as popularity proxy
    }
    if (sortBy === "price-low") {
      return a.price - b.price;
    }
    if (sortBy === "price-high") {
      return b.price - a.price;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const catQuery = category === "All Categories" 
      ? "" 
      : `?category=${encodeURIComponent(category.toLowerCase().replace(/\s+/g, "-"))}`;
    router.push(`/products${catQuery}`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAF9] font-sans pb-12">
      
      {/* Breadcrumbs & Title */}
      <section className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-2.5 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-[#005B41] transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-600">Products</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">All Sourced Products</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider -mt-1.5">
            High-quality medicines, trusted by healthcare professionals worldwide.
          </p>
        </div>
      </section>

      {/* Trust Mini Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-100 p-4 rounded-2xl text-slate-700 shadow-sm text-left">
          <div className="flex items-center gap-3 border-r border-slate-100 pr-2">
            <Award className="w-5 h-5 text-[#00A877] flex-shrink-0" />
            <div className="text-xs">
              <span className="block font-bold text-slate-800">WHO-GMP Products</span>
              <span className="block text-slate-400 text-[10px]">Certified standards</span>
            </div>
          </div>
          <div className="flex items-center gap-3 md:border-r border-slate-100 pr-2">
            <ShieldCheck className="w-5 h-5 text-[#00A877] flex-shrink-0" />
            <div className="text-xs">
              <span className="block font-bold text-slate-800">Secure Sourcing</span>
              <span className="block text-slate-400 text-[10px]">Safe logistics packaging</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-r border-slate-100 pr-2">
            <Truck className="w-5 h-5 text-[#00A877] flex-shrink-0" />
            <div className="text-xs">
              <span className="block font-bold text-slate-800">Global Shipping</span>
              <span className="block text-slate-400 text-[10px]">To 107+ countries</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#00A877] flex-shrink-0" />
            <div className="text-xs">
              <span className="block font-bold text-slate-800">24/7 Clinical Support</span>
              <span className="block text-slate-400 text-[10px]">Always available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Listing Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-6 text-left shadow-sm">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <span className="font-extrabold text-slate-800 tracking-wide flex items-center gap-2 text-sm sm:text-base">
              <SlidersHorizontal className="w-4 h-4 text-[#005B41]" />
              <span>Filters</span>
            </span>
            <button 
              onClick={clearAllFilters}
              className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Categories</span>
            <div className="flex flex-col gap-1">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`flex justify-between items-center text-xs py-2 px-3 rounded-lg hover:bg-slate-50 hover:text-[#005B41] font-semibold transition-all text-left ${
                    selectedCategory === cat 
                      ? "bg-[#F4F7F6] text-[#005B41] font-black" 
                      : "text-slate-600"
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full font-bold">
                    {getCategoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Price Range</span>
              <span className="text-xs font-bold text-[#005B41]">₹{priceRange} Max</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="200" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#005B41]"
            />
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mt-0.5">
              <span>₹10 Min</span>
              <span>₹200 Max</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Brand</span>
            <div className="flex flex-col gap-2 text-xs">
              {brandOptions.map((brand) => (
                <label key={brand} className="flex items-center gap-2.5 font-semibold text-slate-600 hover:text-slate-800 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="w-4 h-4 border-slate-200 rounded text-[#005B41] focus:ring-[#005B41] accent-[#005B41] cursor-pointer"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Form Filter */}
          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Form / Sourcing pack</span>
            <div className="flex flex-col gap-2 text-xs">
              {formOptions.map((form) => (
                <label key={form} className="flex items-center gap-2.5 font-semibold text-slate-600 hover:text-slate-800 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedForms.includes(form)}
                    onChange={() => handleFormChange(form)}
                    className="w-4 h-4 border-slate-200 rounded text-[#005B41] focus:ring-[#005B41] accent-[#005B41] cursor-pointer"
                  />
                  <span>{form}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Availability</span>
            <div className="flex flex-col gap-2 text-xs">
              <label className="flex items-center gap-2.5 font-semibold text-slate-600 hover:text-slate-800 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={availability.includes("in-stock")}
                  onChange={() => {
                    setAvailability(prev => prev.includes("in-stock") ? prev.filter(a => a !== "in-stock") : [...prev, "in-stock"])
                  }}
                  className="w-4 h-4 border-slate-200 rounded text-[#005B41] focus:ring-[#005B41] accent-[#005B41] cursor-pointer"
                />
                <span>In Stock</span>
              </label>
              <label className="flex items-center gap-2.5 font-semibold text-slate-600 hover:text-slate-800 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={availability.includes("out-of-stock")}
                  onChange={() => {
                    setAvailability(prev => prev.includes("out-of-stock") ? prev.filter(a => a !== "out-of-stock") : [...prev, "out-of-stock"])
                  }}
                  className="w-4 h-4 border-slate-200 rounded text-[#005B41] focus:ring-[#005B41] accent-[#005B41] cursor-pointer"
                />
                <span>Out of Stock</span>
              </label>
            </div>
          </div>

        </aside>

        {/* Right Product Grid Column */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Header Actions */}
          <div className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-semibold text-slate-500 shadow-sm">
            <div className="text-left w-full sm:w-auto">
              Showing <span className="text-[#005B41] font-bold">{sortedProducts.length}</span> Sourced Products
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-2">
                <span>Sort by:</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 py-1.5 pl-3 pr-8 rounded-lg font-bold text-slate-700 outline-none focus:border-[#005B41] cursor-pointer"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price Low to High</option>
                    <option value="price-high">Price High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${viewMode === "grid" ? "bg-white text-[#005B41] shadow-sm" : "text-slate-400"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded ${viewMode === "list" ? "bg-white text-[#005B41] shadow-sm" : "text-slate-400"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sourced Products Listing */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl py-16 px-6 text-center shadow-sm">
              <span className="block text-4xl mb-4">🔍</span>
              <h3 className="text-lg font-extrabold text-slate-800">No Sourced Medicines Found</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                No items match your active filters. Try lowering requirements or clearing filters to browse again.
              </p>
              <button 
                onClick={clearAllFilters}
                className="mt-6 bg-[#005B41] text-white py-2 px-6 rounded-xl text-xs font-bold shadow hover:bg-[#004833] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            
            // Grid View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => {
                const isItemInCart = cartItems.some((item) => item.product.id === product.id);
                return (
                  <div 
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative text-left"
                  >
                    <div className="relative h-44 min-h-[176px] w-full bg-slate-50 flex items-center justify-center p-4 flex-shrink-0">
                      <Link href={`/products/${product.id}`} className="block h-full w-full">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl cursor-pointer"
                        />
                      </Link>
                      {product.badges && product.badges.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                          {product.badges.map((badge, idx) => (
                            <span key={idx} className="bg-[#005B41] text-white text-[9px] font-extrabold py-0.5 px-2 rounded-full uppercase tracking-wider">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                      <button className="absolute top-4 right-4 bg-white/95 hover:bg-white p-1.5 rounded-full shadow text-slate-400 hover:text-red-500 transition-colors z-10">
                        <Heart className="w-3.5 h-3.5 fill-transparent hover:fill-red-500 transition-all" />
                      </button>
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-2">
                      <span className="text-[10px] text-[#00A877] font-extrabold uppercase tracking-widest leading-none">{product.category}</span>
                      <Link href={`/products/${product.id}`} className="text-sm sm:text-base font-bold text-slate-800 hover:text-[#005B41] transition-colors leading-tight min-h-[38px]">
                        {product.name}
                      </Link>
                      <span className="text-xs text-slate-500 font-semibold leading-none">{product.substance}</span>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                        <span className="text-xs text-slate-400">({product.reviewsCount})</span>
                      </div>

                      <div className="border-t border-slate-50 pt-3.5 mt-2 flex items-center justify-between">
                        <div>
                          <span className="block text-base sm:text-lg font-black text-[#0A3981]">{formatPrice(product.price)}</span>
                          <span className="block text-[9px] text-slate-400 font-semibold uppercase -mt-0.5">{product.unit}</span>
                        </div>
                        
                        {/* Action Bar (Exact UI Mockup: Left Cart icon, Right Buy Now) */}
                        <div className="flex items-center gap-1.5 w-2/3">
                          <button 
                            onClick={() => addToCart(product, 1)}
                            title="Add to Cart"
                            className={`py-2 px-2.5 border rounded-xl flex items-center justify-center transition-all ${
                              isItemInCart 
                                ? "bg-emerald-50 text-[#00A877] border-emerald-500/20" 
                                : "bg-white text-slate-500 border-slate-200 hover:text-[#005B41] hover:bg-slate-50"
                            }`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openInquiryModal(product)}
                            className="bg-[#005B41] hover:bg-[#004833] text-white py-2 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all text-center hover:scale-[1.02] flex-[2] cursor-pointer"
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
          ) : (
            
            // List View
            <div className="flex flex-col gap-4">
              {sortedProducts.map((product) => {
                const isItemInCart = cartItems.some((item) => item.product.id === product.id);
                return (
                  <div 
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col sm:flex-row gap-5 items-center text-left relative"
                  >
                    <div className="relative w-full sm:w-44 h-36 bg-slate-50 flex items-center justify-center p-2 rounded-xl flex-shrink-0">
                      <Link href={`/products/${product.id}`} className="block h-full w-full">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-full w-full object-cover rounded-lg cursor-pointer"
                        />
                      </Link>
                      {product.badges && product.badges.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
                          {product.badges.map((badge, idx) => (
                            <span key={idx} className="bg-[#005B41] text-white text-[8px] font-extrabold py-0.5 px-2 rounded-full uppercase tracking-wider">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-1.5 w-full">
                      <span className="text-[10px] text-[#00A877] font-extrabold uppercase tracking-widest leading-none">{product.category}</span>
                      <Link href={`/products/${product.id}`} className="text-base font-bold text-slate-800 hover:text-[#005B41] transition-colors leading-tight">
                        {product.name}
                      </Link>
                      <span className="text-xs text-slate-500 font-semibold leading-none">{product.substance}</span>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed my-0.5">{product.description}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                        <span className="text-xs text-slate-400">({product.reviewsCount} reviews)</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto gap-4 self-stretch flex-shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="block text-xl font-black text-[#0A3981]">{formatPrice(product.price)}</span>
                        <span className="block text-[10px] text-slate-400 font-semibold uppercase">{product.unit}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => addToCart(product, 1)}
                          title="Add to Cart"
                          className={`p-2.5 border rounded-xl flex items-center justify-center transition-all ${
                            isItemInCart 
                              ? "bg-emerald-50 text-[#00A877] border-emerald-500/20" 
                              : "bg-white text-slate-500 border-slate-200 hover:text-[#005B41] hover:bg-slate-50"
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openInquiryModal(product)}
                          className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm bg-[#005B41] text-white hover:bg-[#004833] hover:scale-[1.02] cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-2 text-xs font-bold">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#005B41] hover:text-[#005B41] disabled:opacity-50 transition-colors cursor-pointer"
            >
              &lt;
            </button>
            <button className="w-8 h-8 rounded-lg border-2 border-[#005B41] bg-white flex items-center justify-center text-[#005B41] transition-colors cursor-default">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#005B41] hover:text-[#005B41] transition-colors cursor-pointer">
              2
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#005B41] hover:text-[#005B41] transition-colors cursor-pointer">
              3
            </button>
            <span className="text-slate-400 px-1 font-bold">...</span>
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#005B41] hover:text-[#005B41] transition-colors cursor-pointer">
              107
            </button>
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-[#005B41] hover:text-[#005B41] transition-colors cursor-pointer"
            >
              &gt;
            </button>
          </div>

        </main>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Newsletter Signup (Stay Updated Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="bg-[#005B41] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden text-left border border-slate-800">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none hidden lg:block">
            <Mail className="w-full h-full text-white" />
          </div>
          
          <div className="flex flex-col gap-2 relative z-10 max-w-xl">
            <h3 className="text-2xl font-extrabold tracking-tight">Stay Sourcing-Updated</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get notified immediately on new approved medicines, global regulatory updates, and bulk export clearance quotas.
            </p>
          </div>
          
          <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto max-w-md bg-white/10 border border-white/20 rounded-xl overflow-hidden p-1 items-center relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-transparent border-none outline-none text-white placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 flex-1 min-w-[200px]"
            />
            <button 
              type="submit"
              className="bg-white hover:bg-slate-100 text-[#005B41] px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex-shrink-0"
            >
              {newsletterSubmitted ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col flex-grow items-center justify-center py-24 bg-[#F8FAF9]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-[#005B41] mb-4"></div>
        <span className="text-sm font-bold text-slate-600">Loading catalog...</span>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
