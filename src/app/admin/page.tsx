"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FileSpreadsheet, 
  Trash2, 
  ChevronRight, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle,
  Building,
  User,
  Phone,
  Mail,
  FileText,
  IndianRupee,
  ArrowLeft,
  Loader2,
  RefreshCw,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  LayoutDashboard,
  Box,
  Users,
  Settings,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";

interface Inquiry {
  id: string;
  date: string;
  status: string;
  customer: {
    fullName: string;
    mobile: string;
    email: string;
    company?: string;
    message?: string;
  };
  items: Array<{
    id: string;
    name: string;
    substance: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  totalValue: number;
}

export default function AdminDashboard() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Navigation states
  const [activeMenu, setActiveMenu] = useState<string>("inquiries");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dashboard states
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFeedback, setUpdateFeedback] = useState("");

  // Product catalog states
  const [productsList, setProductsList] = useState<any[]>([]);
  const [newProdName, setNewProdName] = useState("");
  const [newProdSubstance, setNewProdSubstance] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Anti Parasite");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdBrand, setNewProdBrand] = useState("");
  const [newProdComposition, setNewProdComposition] = useState("");
  const [newProdPackaging, setNewProdPackaging] = useState("");
  const [newProdShelfLife, setNewProdShelfLife] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdInStock, setNewProdInStock] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productAddFeedback, setProductAddFeedback] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Homepage CMS states
  const [siteLogoImage, setSiteLogoImage] = useState("");
  const [heroSubTitle, setHeroSubTitle] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroTitleHighlight, setHeroTitleHighlight] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroBenefits, setHeroBenefits] = useState(""); // comma-separated
  const [heroImage, setHeroImage] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [statCountries, setStatCountries] = useState("");
  const [statProducts, setStatProducts] = useState("");
  const [statClients, setStatClients] = useState("");
  const [statYears, setStatYears] = useState("");
  const [newsletterTitle, setNewsletterTitle] = useState("");
  const [newsletterSub, setNewsletterSub] = useState("");
  const [isSavingHomepage, setIsSavingHomepage] = useState(false);
  const [homepageFeedback, setHomepageFeedback] = useState("");
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // About Us CMS states
  const [aboutCorporateImg, setAboutCorporateImg] = useState("");
  const [aboutScientistImg, setAboutScientistImg] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [aboutFeedback, setAboutFeedback] = useState("");
  const [isUploadingCorporate, setIsUploadingCorporate] = useState(false);
  const [isUploadingScientist, setIsUploadingScientist] = useState(false);

  // Default credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  // Check auth status on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("tms_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
      fetchInquiries();
      fetchProducts();
      fetchHomepageSettings();
    }
    setAuthChecked(true);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    setTimeout(() => {
      if (username.toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem("tms_admin_auth", "true");
        setIsAuthenticated(true);
        fetchInquiries();
        fetchProducts();
        fetchHomepageSettings();
      } else {
        setAuthError("Incorrect username or password. Please try again.");
      }
      setIsLoggingIn(false);
    }, 800);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tms_admin_auth");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setSelectedInquiry(null);
  };

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.inquiries);
        // Automatically select the first one if list is not empty
        if (data.inquiries.length > 0) {
          setSelectedInquiry(data.inquiries[0]);
        }
      }
    } catch (error) {
      console.error("Failed to load admin inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (res.ok && data.success) {
        setProductsList(data.products);
      }
    } catch (e) {
      console.error("Failed to load admin products:", e);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingProduct(true);
    setProductAddFeedback("");

    const payload = {
      name: newProdName,
      substance: newProdSubstance,
      category: newProdCategory,
      price: Number(newProdPrice),
      brand: newProdBrand,
      composition: newProdComposition,
      packaging: newProdPackaging,
      shelfLife: newProdShelfLife,
      description: newProdDesc,
      inStock: newProdInStock,
      image: newProdImage || undefined
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProductAddFeedback("Product cataloged successfully!");
        fetchProducts();
        // Clear fields
        setNewProdName("");
        setNewProdSubstance("");
        setNewProdPrice("");
        setNewProdBrand("");
        setNewProdComposition("");
        setNewProdPackaging("");
        setNewProdShelfLife("");
        setNewProdDesc("");
        setNewProdImage("");
        setNewProdInStock(true);
        
        setTimeout(() => setProductAddFeedback(""), 4000);
      } else {
        setProductAddFeedback(`Error: ${data.error || "Failed to add product"}`);
      }
    } catch (error) {
      console.error(error);
      setProductAddFeedback("Server connection error.");
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setIsUploadingImage(true);
    setProductAddFeedback("");
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setNewProdImage(data.url);
        setProductAddFeedback("Image uploaded successfully!");
        setTimeout(() => setProductAddFeedback(""), 3000);
      } else {
        setProductAddFeedback(`Error: ${data.error || "Failed to upload image"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setProductAddFeedback("Error connecting to upload server.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const fetchHomepageSettings = async () => {
    try {
      const res = await fetch("/api/homepage");
      const data = await res.json();
      if (res.ok && data.success && data.settings) {
        const s = data.settings;
        setSiteLogoImage(s.siteLogoImage || "");
        setHeroSubTitle(s.heroSubTitle || "");
        setHeroTitle(s.heroTitle || "");
        setHeroTitleHighlight(s.heroTitleHighlight || "");
        setHeroDescription(s.heroDescription || "");
        setHeroBenefits(s.heroBenefits ? s.heroBenefits.join(", ") : "");
        setHeroImage(s.heroImage || "");
        setWhatsappLink(s.whatsappLink || "");
        setTelegramLink(s.telegramLink || "");
        setStatCountries(s.statCountries || "");
        setStatProducts(s.statProducts || "");
        setStatClients(s.statClients || "");
        setStatYears(s.statYears || "");
        setNewsletterTitle(s.newsletterTitle || "");
        setNewsletterSub(s.newsletterSub || "");
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingLogo(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.success) {
        setSiteLogoImage(data.url);
        setHomepageFeedback("Logo uploaded successfully!");
        setTimeout(() => setHomepageFeedback(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleHomepageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHomepage(true);
    setHomepageFeedback("");
    
    const benefitsArray = heroBenefits.split(",").map(b => b.trim()).filter(b => b.length > 0);
    
    const payload = {
      siteLogoImage,
      heroSubTitle,
      heroTitle,
      heroTitleHighlight,
      heroDescription,
      heroBenefits: benefitsArray,
      heroImage,
      whatsappLink,
      telegramLink,
      statCountries,
      statProducts,
      statClients,
      statYears,
      newsletterTitle,
      newsletterSub
    };
    
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setHomepageFeedback("Homepage settings saved successfully!");
        setTimeout(() => setHomepageFeedback(""), 3000);
      } else {
        setHomepageFeedback(`Error: ${data.error || "Failed to save settings"}`);
      }
    } catch (err) {
      console.error(err);
      setHomepageFeedback("Error saving settings on server.");
    } finally {
      setIsSavingHomepage(false);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setIsUploadingHero(true);
    setHomepageFeedback("");
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setHeroImage(data.url);
        setHomepageFeedback("Hero image uploaded successfully!");
        setTimeout(() => setHomepageFeedback(""), 3000);
      } else {
        setHomepageFeedback(`Error: ${data.error || "Failed to upload image"}`);
      }
    } catch (err) {
      console.error("Hero upload error:", err);
      setHomepageFeedback("Error connecting to upload server.");
    } finally {
      setIsUploadingHero(false);
    }
  };

  const handleCorporateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingCorporate(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.success) {
        setAboutCorporateImg(data.url);
        setAboutFeedback("Corporate image uploaded successfully!");
        setTimeout(() => setAboutFeedback(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingCorporate(false);
    }
  };

  const handleScientistUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingScientist(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.success) {
        setAboutScientistImg(data.url);
        setAboutFeedback("Scientist image uploaded successfully!");
        setTimeout(() => setAboutFeedback(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingScientist(false);
    }
  };

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAbout(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "about",
          data: {
            title: aboutTitle,
            description: aboutDescription,
            imageCorporate: aboutCorporateImg,
            imageScientist: aboutScientistImg
          }
        })
      });
      if (res.ok) {
        setAboutFeedback("About Us CMS settings and images updated!");
        setTimeout(() => setAboutFeedback(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingAbout(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    setUpdateFeedback("");
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUpdateFeedback("Status updated successfully!");
        
        // Update list state locally
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
        
        // Update selected inquiry state locally
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
        
        setTimeout(() => setUpdateFeedback(""), 3000);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to update status on server.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInquiryDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry permanently?")) return;
    
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Remove from list
        setInquiries(prev => prev.filter(inq => inq.id !== id));
        
        // Clear selected if deleted
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(null);
        }
        
        alert("Inquiry deleted from database.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to delete inquiry.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Calculation stats helper
  const totalInquiriesCount = inquiries.length;
  const pendingCount = inquiries.filter(inq => inq.status === "Pending").length;
  const inProgressCount = inquiries.filter(inq => inq.status === "In Progress").length;
  const totalSourcingValue = inquiries.reduce((sum, inq) => sum + inq.totalValue, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-250";
      case "In Progress":
        return "bg-blue-50 text-blue-600 border-blue-250";
      case "Completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-250";
      case "Cancelled":
        return "bg-rose-50 text-rose-50 border-rose-250";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  // Render loading checker on mount
  if (!authChecked) {
    return (
      <div className="flex flex-col flex-grow items-center justify-center py-32 bg-[#F8FAF9] min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-[#005B41] mb-4" />
        <span className="text-sm font-bold text-slate-600">Verifying session...</span>
      </div>
    );
  }

  // Render Login Panel if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#F8FAF9] font-sans flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand Header */}
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <div className="bg-[#005B41] p-3 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#005b41]/10">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-[#005B41] flex items-center gap-1">
              trusted<span className="text-[#00A877]">medshop</span>
            </span>
            <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Admin Portal Login</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="max-w-md w-full bg-white border border-slate-100 rounded-3xl p-8 shadow-xl text-left">
          <h2 className="text-xl font-extrabold text-[#005B41] leading-tight mb-2">Administrator Access</h2>
          <p className="text-xs text-slate-400 mb-6">Log in with credentials to manage sourcing database and inquiries.</p>

          {authError && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-500/10 rounded-xl p-3 text-xs font-bold mb-4 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-xs font-semibold">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#00A877]" />
                <span>Username *</span>
              </label>
              <input 
                type="text" 
                required 
                placeholder="Enter admin username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#00A877]" />
                <span>Password *</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="Enter admin password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-slate-200 rounded-xl p-3 pr-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 leading-normal flex items-start gap-1.5 bg-slate-50 rounded-xl p-3 mt-1.5 font-bold">
              <AlertCircle className="w-4 h-4 text-[#00A877] flex-shrink-0 mt-0.5" />
              <span>Default Credentials: <br />Username: <code className="text-[#005B41] font-mono">admin</code> | Password: <code className="text-[#005B41] font-mono">admin123</code></span>
            </div>

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#005b41]/10 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer mt-3 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Login as Administrator</span>
              )}
            </button>

          </form>
        </div>

        {/* Back link */}
        <Link href="/" className="mt-8 text-slate-400 hover:text-[#005B41] text-xs font-bold flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

      </div>
    );
  }

  const menuItems = [
    { id: "inquiries", name: "Inquiry Pipeline", icon: <FileSpreadsheet className="w-4 h-4" />, count: pendingCount },
    { id: "products", name: "Medicines Catalog", icon: <Box className="w-4 h-4" /> },
    { id: "homepage", name: "Homepage CMS", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "accounts", name: "Sourced Accounts", icon: <Users className="w-4 h-4" /> },
    { id: "settings", name: "Portal Settings", icon: <Settings className="w-4 h-4" /> }
  ];

  // Render Admin Dashboard Layout with Left Sidebar
  return (
    <div className="w-full min-h-screen bg-[#F8FAF9] font-sans flex flex-col md:flex-row text-left items-stretch">
      
      {/* Left Sidebar Menu (Desktop) */}
      <aside className="w-64 bg-[#0b241e] text-slate-300 flex-shrink-0 flex-col justify-between hidden md:flex border-r border-[#005b41]/20">
        
        <div className="flex flex-col gap-6 p-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-5">
            <div className="bg-[#00A877] p-2 rounded-xl flex items-center justify-center text-white shadow-lg">
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <span className="text-base font-black text-white block leading-tight tracking-tight">
                trusted<span className="text-[#00A877]">medshop</span>
              </span>
              <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Admin Management</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all text-left cursor-pointer ${
                  activeMenu === item.id 
                    ? "bg-[#005B41] text-white shadow-md shadow-[#005b41]/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`py-0.5 px-2 rounded-full font-black text-[9px] ${
                    activeMenu === item.id ? "bg-[#00A877] text-white" : "bg-slate-800 text-slate-400"
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Sidebar details */}
        <div className="p-6 flex flex-col gap-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="bg-[#005b41]/35 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white border border-[#00A877]/20">
              AD
            </div>
            <div className="text-[11px] leading-tight">
              <span className="block font-bold text-white">Admin Account</span>
              <span className="block text-slate-500 mt-0.5">Sourcing Manager</span>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-red-500/10 hover:border-red-500"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Mobile Top Navbar (Visible on Mobile only) */}
      <div className="md:hidden w-full bg-[#0b241e] text-white p-4 flex justify-between items-center z-50 border-b border-[#005b41]/20">
        <div className="flex items-center gap-2">
          <div className="bg-[#00A877] p-1.5 rounded-lg text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-0.5">
            trusted<span className="text-[#00A877]">medshop</span>
          </span>
        </div>
        
        <button 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-1 text-slate-300 hover:text-white"
        >
          {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar overlay */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-slate-900/40 backdrop-blur-sm z-40">
          <div className="bg-[#0b241e] text-slate-300 w-64 h-full p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Navigation Menu</span>
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMenu(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                      activeMenu === item.id 
                        ? "bg-[#005B41] text-white" 
                        : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-red-500/10 text-red-400 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border border-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Right Column: Main Content Frame */}
      <main className="flex-1 flex flex-col overflow-y-auto min-w-0">
        
        {/* Upper Breadcrumb Actions */}
        <section className="bg-white border-b border-slate-100 py-4 px-6 flex justify-between items-center shadow-sm">
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
            <span>Admin</span>
            <span>&gt;</span>
            <span className="text-slate-800 font-bold">{activeMenu}</span>
          </div>

          <div className="flex items-center gap-3">
            {activeMenu === "inquiries" && (
              <button 
                onClick={fetchInquiries}
                className="bg-slate-50 hover:bg-slate-100 text-slate-600 py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sync List</span>
              </button>
            )}
            
            <Link 
              href="/" 
              className="bg-[#005B41] hover:bg-[#004833] text-white py-2 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 hover:scale-[1.02]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Main Site</span>
            </Link>
          </div>
        </section>

        {activeMenu === "inquiries" ? (
          
          /* Inquiries Sourcing Pipeline Dashboard Component */
          <div className="flex flex-col flex-1 pb-10">
            
            {/* Stats Summary row */}
            <section className="px-6 py-6 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <span className="block text-2xl font-black text-[#005B41]">{totalInquiriesCount}</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Total Inquiries</span>
                </div>
                <div className="bg-[#F4F7F6] p-3 rounded-full text-[#005B41]">
                  <FileSpreadsheet className="w-5 h-5 text-[#005B41]" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <span className="block text-2xl font-black text-amber-500">{pendingCount}</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Pending Quotes</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-full text-amber-500">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <span className="block text-2xl font-black text-[#005B41]">₹{totalSourcingValue.toFixed(2)}</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Value Sourced</span>
                </div>
                <div className="bg-[#005b41]/5 p-3 rounded-full text-[#005B41]">
                  <IndianRupee className="w-5 h-5 text-[#005B41]" />
                </div>
              </div>
            </section>

            {/* List and detail grid */}
            <section className="px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
              
              {/* Left Side: list pane */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex flex-col gap-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2.5">
                  Logged Sourcing Requests
                </h4>

                {isLoading ? (
                  <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#005B41] mb-2" />
                    <span className="text-xs font-semibold text-slate-500">Loading database...</span>
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center gap-3">
                    <span className="text-3xl">📭</span>
                    <span className="text-xs font-bold text-slate-500">No inquiries found.</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1">
                    {inquiries.map((inq) => (
                      <button
                        key={inq.id}
                        onClick={() => setSelectedInquiry(inq)}
                        className={`p-4 rounded-2xl border text-left flex justify-between items-center transition-all group ${
                          selectedInquiry?.id === inq.id
                            ? "border-[#005B41] bg-[#F4F7F6]/40 shadow-sm"
                            : "border-slate-100 bg-white hover:border-slate-200"
                        }`}
                      >
                        <div className="flex flex-col gap-1 text-xs font-semibold">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-800 text-sm group-hover:text-[#005B41] transition-colors leading-tight">
                              {inq.customer.fullName}
                            </span>
                            <span className={`py-0.5 px-2 rounded-full font-bold text-[8px] uppercase tracking-wider border ${getStatusColor(inq.status)}`}>
                              {inq.status}
                            </span>
                          </div>
                          <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider mt-0.5 leading-none">
                            Ref: {inq.id.split("-").slice(-2).join("-")} | {new Date(inq.date).toLocaleDateString()}
                          </span>
                          <span className="text-slate-500 block leading-none font-bold mt-1.5">
                            {inq.items.length} item(s) | Value: ${inq.totalValue.toFixed(2)}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side: details card pane */}
              <div className="lg:col-span-7">
                {selectedInquiry ? (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8 flex flex-col gap-6">
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-50 pb-4">
                      <div className="text-left flex flex-col gap-1">
                        <span className="text-xs font-black text-[#00A877] uppercase tracking-widest leading-none">Inquiry profile</span>
                        <h3 className="text-base font-extrabold text-slate-800 leading-tight mt-1">
                          {selectedInquiry.id}
                        </h3>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-1">
                          Submitted Date: {new Date(selectedInquiry.date).toLocaleString()}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleInquiryDelete(selectedInquiry.id)}
                        disabled={isUpdating}
                        className="text-red-500 hover:text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-500/10 flex items-center justify-center cursor-pointer transition-colors shadow-sm disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Status picker */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
                      <div className="text-left w-full sm:w-auto">
                        <span className="block text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Sourcing Status</span>
                        <span className="text-slate-700 font-bold">Manage current inquiry pipeline status:</span>
                      </div>
                      <div className="relative w-full sm:w-auto">
                        <select
                          value={selectedInquiry.status}
                          onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                          disabled={isUpdating}
                          className="appearance-none bg-white border border-slate-200 py-2 pl-4 pr-10 rounded-xl font-bold text-slate-700 outline-none focus:border-[#005B41] cursor-pointer disabled:opacity-50 w-full sm:w-auto"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    
                    {updateFeedback && (
                      <div className="text-emerald-600 bg-emerald-50 py-2 px-4 rounded-xl text-xs font-bold text-center border border-emerald-500/10 -mt-2 animate-pulse">
                        {updateFeedback}
                      </div>
                    )}

                    {/* Customer Info panel */}
                    <div className="flex flex-col gap-4 text-xs font-semibold text-slate-600">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-1.5">
                        Client Credentials
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2.5">
                          <User className="w-4 h-4 text-[#00A877] mt-0.5" />
                          <div>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Full Name</span>
                            <span className="text-slate-800 font-bold">{selectedInquiry.customer.fullName}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Phone className="w-4 h-4 text-[#00A877] mt-0.5" />
                          <div>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Mobile Number</span>
                            <span className="text-slate-800 font-bold">{selectedInquiry.customer.mobile}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Mail className="w-4 h-4 text-[#00A877] mt-0.5" />
                          <div>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Email Address</span>
                            <span className="text-slate-800 font-bold break-all">{selectedInquiry.customer.email}</span>
                          </div>
                        </div>

                        {selectedInquiry.customer.company && (
                          <div className="flex items-start gap-2.5">
                            <Building className="w-4 h-4 text-[#00A877] mt-0.5" />
                            <div>
                              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Company Name</span>
                              <span className="text-slate-800 font-bold">{selectedInquiry.customer.company}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {selectedInquiry.customer.message && (
                        <div className="flex gap-2.5 items-start bg-slate-50 border border-slate-100 p-4 rounded-2xl mt-1">
                          <FileText className="w-4.5 h-4.5 text-[#00A877] mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Sourcing Message / Requirements</span>
                            <p className="text-slate-600 leading-relaxed font-semibold text-xs">{selectedInquiry.customer.message}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sourced items list table */}
                    <div className="flex flex-col gap-4 text-xs font-semibold">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-1.5">
                        Requested Sourced Items ({selectedInquiry.items.length})
                      </span>

                      <div className="w-full border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full border-collapse text-left">
                          <thead>
                            <tr className="bg-slate-50 text-[9px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-100">
                              <th className="py-2.5 px-4">Item Name</th>
                              <th className="py-2.5 px-4 text-center">Qty</th>
                              <th className="py-2.5 px-4 text-right">Price</th>
                              <th className="py-2.5 px-4 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                            {selectedInquiry.items.map((item, index) => (
                              <tr key={index}>
                                <td className="py-3 px-4 font-bold">
                                  <span className="block text-slate-800">{item.name}</span>
                                  <span className="block text-[9px] text-slate-400 font-bold -mt-0.5">{item.substance}</span>
                                </td>
                                <td className="py-3 px-4 text-center font-bold">{item.quantity}</td>
                                <td className="py-3 px-4 text-right">₹{item.price.toFixed(2)}</td>
                                <td className="py-3 px-4 text-right font-bold text-[#005B41]">₹{item.total.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-[#F4F7F6]/50 font-black text-[#005B41] border-t border-slate-100">
                              <td colSpan={3} className="py-3.5 px-4 text-right">Total Sourcing Value</td>
                              <td className="py-3.5 px-4 text-right text-sm">₹{selectedInquiry.totalValue.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm py-28 text-center flex flex-col items-center justify-center gap-3">
                    <span className="text-4xl">🔎</span>
                    <h3 className="text-sm font-bold text-slate-500">No Inquiry Selected</h3>
                    <p className="text-[10px] text-slate-400 max-w-[200px] leading-relaxed">Select a logged customer inquiry from the left side panel to review credentials and details.</p>
                  </div>
                )}
              </div>

            </section>
          </div>
        ) : activeMenu === "products" ? (
          
          /* Medicines Catalog Panel */
          <div className="flex flex-col flex-1 pb-10">
            
            {/* Products Page Header */}
            <section className="px-6 py-6 border-b border-slate-100 bg-white flex justify-between items-center">
              <div>
                <h2 className="text-lg font-extrabold text-slate-800">Medicines Catalog Sourcing</h2>
                <p className="text-xs text-slate-400 mt-1">Manage medicines list and add new products to the public catalog.</p>
              </div>
              <span className="bg-[#F4F7F6] text-[#005B41] font-bold text-xs py-1.5 px-4 rounded-xl border">
                {productsList.length} Sourced Products
              </span>
            </section>

            {/* List and add form grid */}
            <section className="px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
              
              {/* Left Side: Product Table List */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                  Active Products Directory
                </h4>

                <div className="w-full overflow-x-auto">
                  <table className="w-full text-xs text-slate-600 font-semibold border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-left text-slate-400 uppercase text-[9px] tracking-wider font-bold">
                        <th className="pb-3 px-2">Medicine Info</th>
                        <th className="pb-3 px-2">Category</th>
                        <th className="pb-3 px-2 text-right">Price</th>
                        <th className="pb-3 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-[11px]">
                      {productsList.map((prod) => (
                        <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-2 text-slate-800 text-left">
                            <span className="block font-bold text-xs text-slate-800">{prod.name}</span>
                            <span className="block text-[9px] text-slate-400 font-bold -mt-0.5">{prod.substance} ({prod.brand || prod.manufacturer})</span>
                          </td>
                          <td className="py-3 px-2 text-slate-500 text-left">{prod.category}</td>
                          <td className="py-3 px-2 text-right font-extrabold text-slate-700">₹{prod.price.toFixed(2)}</td>
                          <td className="py-3 px-2 text-right">
                            <span className={`inline-block py-0.5 px-2 rounded-full font-bold text-[8px] uppercase tracking-wider ${
                              prod.inStock ? "bg-emerald-50 text-emerald-600 border border-emerald-500/5" : "bg-red-50 text-red-600 border border-red-500/5"
                            }`}>
                              {prod.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Side: Add New Product Form */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8 flex flex-col gap-5">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                  Add New Medicine Product
                </h4>

                {productAddFeedback && (
                  <div className={`p-3.5 rounded-xl text-xs font-bold text-center border ${
                    productAddFeedback.startsWith("Error")
                      ? "text-rose-600 bg-rose-50 border-rose-500/10"
                      : "text-emerald-600 bg-emerald-50 border-emerald-500/10"
                  }`}>
                    {productAddFeedback}
                  </div>
                )}

                <form onSubmit={handleProductSubmit} className="flex flex-col gap-4 text-xs font-semibold text-left">
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-500">Product Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Iverheal 12 Tablet"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Active Substance *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Ivermectin 12mg"
                        value={newProdSubstance}
                        onChange={(e) => setNewProdSubstance(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Category *</label>
                      <select 
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-bold outline-none focus:border-[#005B41] focus:bg-white text-sm cursor-pointer"
                      >
                        <option value="Anti Parasite">Anti Parasite</option>
                        <option value="Antibiotics">Antibiotics</option>
                        <option value="Contraceptives">Contraceptives</option>
                        <option value="Erectile Dysfunction">Erectile Dysfunction</option>
                        <option value="Hormone Therapy">Hormone Therapy</option>
                        <option value="Pain Relief">Pain Relief</option>
                        <option value="Sleeping Disorder">Sleeping Disorder</option>
                        <option value="Vitamins & Supplements">Vitamins & Supplements</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Unit Price (₹ INR) *</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        placeholder="e.g. 40.00"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Manufacturer / Brand *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Healing Pharma"
                        value={newProdBrand}
                        onChange={(e) => setNewProdBrand(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Packaging (Unit Size) *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 100 Tablet Box"
                        value={newProdPackaging}
                        onChange={(e) => setNewProdPackaging(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Shelf Life *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 24 Months"
                        value={newProdShelfLife}
                        onChange={(e) => setNewProdShelfLife(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-500">Composition Formula *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ivermectin 12mg"
                      value={newProdComposition}
                      onChange={(e) => setNewProdComposition(e.target.value)}
                      className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500">Product Sourcing Image (Local PC File) *</label>
                    <div className="flex items-center gap-3.5 border border-slate-200 rounded-xl p-3 bg-slate-50 focus-within:border-[#005B41] focus-within:bg-white transition-all">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-xs text-slate-500 file:mr-3.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#005B41]/10 file:text-[#005B41] hover:file:bg-[#005B41]/20 cursor-pointer flex-1"
                      />
                      {isUploadingImage && <Loader2 className="w-4.5 h-4.5 animate-spin text-[#005B41]" />}
                    </div>
                    {newProdImage && (
                      <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-1">
                        <img src={newProdImage} alt="Uploaded Sourcing" className="w-10 h-10 object-cover rounded-lg border" />
                        <div className="text-[10px] truncate max-w-[200px] text-left">
                          <span className="block font-bold text-slate-700">Image Uploaded</span>
                          <span className="block text-slate-400 font-mono truncate">{newProdImage}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-slate-500">Product Sourcing Description *</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Provide full description, side effects warning indicators, and details..."
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm resize-none"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 font-bold text-slate-700 hover:text-slate-900 cursor-pointer py-1.5 pl-1">
                    <input 
                      type="checkbox" 
                      checked={newProdInStock}
                      onChange={(e) => setNewProdInStock(e.target.checked)}
                      className="w-4.5 h-4.5 border-slate-250 rounded text-[#005B41] focus:ring-[#005B41] accent-[#005B41] cursor-pointer"
                    />
                    <span>Available immediately for Export (In Stock)</span>
                  </label>

                  <button 
                    type="submit"
                    disabled={isAddingProduct}
                    className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#005b41]/10 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {isAddingProduct ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Adding Product...</span>
                      </>
                    ) : (
                      <span>Catalog Medicine Product</span>
                    )}
                  </button>

                </form>
              </div>

            </section>

          </div>
        ) : activeMenu === "homepage" ? (
          
          /* Homepage CMS Sub-dashboard panel */
          <div className="flex flex-col flex-1 pb-10">
            
            {/* Header */}
            <section className="px-6 py-6 border-b border-slate-100 bg-white">
              <h2 className="text-lg font-extrabold text-slate-800">Homepage CMS Settings</h2>
              <p className="text-xs text-slate-400 mt-1">Dynamically edit homepage hero headings, benefits checklists, statistics counters, and banner images.</p>
            </section>

            {/* Config form */}
            <section className="px-6 py-6 max-w-4xl w-full">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col gap-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2.5">
                  Update Storefront Homepage Configuration
                </h4>

                {homepageFeedback && (
                  <div className={`p-3.5 rounded-xl text-xs font-bold text-center border ${
                    homepageFeedback.startsWith("Error")
                      ? "text-rose-600 bg-rose-50 border-rose-500/10"
                      : "text-emerald-600 bg-emerald-50 border-emerald-500/10"
                  }`}>
                    {homepageFeedback}
                  </div>
                )}

                <form onSubmit={handleHomepageSubmit} className="flex flex-col gap-5 text-xs font-semibold text-left">
                  
                  {/* Store Brand Logo Uploader */}
                  <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-500/10">
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#005B41]">1. Store Brand Logo (Header & Footer)</span>
                    <div className="flex items-center gap-3.5 border border-slate-200 rounded-xl p-3 bg-white focus-within:border-[#005B41] transition-all">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="text-xs text-slate-500 file:mr-3.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#005B41]/10 file:text-[#005B41] hover:file:bg-[#005B41]/20 cursor-pointer flex-1"
                      />
                      {isUploadingLogo && <Loader2 className="w-4.5 h-4.5 animate-spin text-[#005B41]" />}
                    </div>
                    {siteLogoImage && (
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 mt-1">
                        <img src={siteLogoImage} alt="Active Logo" className="h-10 w-auto object-contain rounded border p-1" />
                        <div className="text-[10px] truncate max-w-lg text-left">
                          <span className="block font-bold text-slate-700">Active Logo Image URL</span>
                          <span className="block text-slate-400 font-mono truncate">{siteLogoImage}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hero banner credentials */}
                  <div className="flex flex-col gap-4 border-b border-slate-50 pb-5">
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#005B41]">Hero Main Banner</span>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Hero Subtitle Pill *</label>
                      <input 
                        type="text" 
                        required
                        value={heroSubTitle}
                        onChange={(e) => setHeroSubTitle(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Hero Main Title Text *</label>
                        <input 
                          type="text" 
                          required
                          value={heroTitle}
                          onChange={(e) => setHeroTitle(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Title Highlight Text (Green Font) *</label>
                        <input 
                          type="text" 
                          required
                          value={heroTitleHighlight}
                          onChange={(e) => setHeroTitleHighlight(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Hero Sourcing Description *</label>
                      <textarea 
                        required
                        rows={3}
                        value={heroDescription}
                        onChange={(e) => setHeroDescription(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500">Hero Checklist Benefits (Comma Separated) *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. WHO-GMP Certified Products, Wide Range of Trusted Brands"
                        value={heroBenefits}
                        onChange={(e) => setHeroBenefits(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-500">Hero Banner Background Image (Local File Selection) *</label>
                      <div className="flex items-center gap-3.5 border border-slate-200 rounded-xl p-3 bg-slate-50 focus-within:border-[#005B41] focus-within:bg-white transition-all">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleHeroImageUpload}
                          className="text-xs text-slate-500 file:mr-3.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#005B41]/10 file:text-[#005B41] hover:file:bg-[#005B41]/20 cursor-pointer flex-1"
                        />
                        {isUploadingHero && <Loader2 className="w-4.5 h-4.5 animate-spin text-[#005B41]" />}
                      </div>
                      {heroImage && (
                        <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-1">
                          <img src={heroImage} alt="Hero Upload" className="w-16 h-10 object-cover rounded-lg border" />
                          <div className="text-[10px] truncate max-w-lg text-left">
                            <span className="block font-bold text-slate-700">Active Hero Image URL</span>
                            <span className="block text-slate-400 font-mono truncate">{heroImage}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Social media connections */}
                  <div className="flex flex-col gap-4 border-b border-[#005B41]/5 pb-5">
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#005B41]">Social & Sourcing Links</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">WhatsApp Link *</label>
                        <input 
                          type="text" 
                          required
                          value={whatsappLink}
                          onChange={(e) => setWhatsappLink(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Telegram Link *</label>
                        <input 
                          type="text" 
                          required
                          value={telegramLink}
                          onChange={(e) => setTelegramLink(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stat counters */}
                  <div className="flex flex-col gap-4 border-b border-[#005B41]/5 pb-5">
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#005B41]">Homepage Metric Counters</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Countries Served *</label>
                        <input 
                          type="text" 
                          required
                          value={statCountries}
                          onChange={(e) => setStatCountries(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Products Cataloged *</label>
                        <input 
                          type="text" 
                          required
                          value={statProducts}
                          onChange={(e) => setStatProducts(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Happy Clients *</label>
                        <input 
                          type="text" 
                          required
                          value={statClients}
                          onChange={(e) => setStatClients(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Years Experience *</label>
                        <input 
                          type="text" 
                          required
                          value={statYears}
                          onChange={(e) => setStatYears(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Newsletter settings */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#005B41]">Newsletter Card</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Newsletter Heading *</label>
                        <input 
                          type="text" 
                          required
                          value={newsletterTitle}
                          onChange={(e) => setNewsletterTitle(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-slate-500">Newsletter Description *</label>
                        <input 
                          type="text" 
                          required
                          value={newsletterSub}
                          onChange={(e) => setNewsletterSub(e.target.value)}
                          className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSavingHomepage}
                    className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#005b41]/10 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer mt-4 disabled:opacity-50"
                  >
                    {isSavingHomepage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Saving CMS Settings...</span>
                      </>
                    ) : (
                      <span>Save Homepage Settings</span>
                    )}
                  </button>

                </form>
              </div>
            </section>
          </div>
        ) : activeMenu === "cms" ? (
          
          /* About Us & Page Images CMS Sub-dashboard panel */
          <div className="flex flex-col flex-1 pb-10">
            <section className="px-6 py-6 border-b border-slate-100 bg-white">
              <h2 className="text-lg font-extrabold text-slate-800">Page Images & Content CMS</h2>
              <p className="text-xs text-slate-400 mt-1">Upload and replace images for About Us corporate building, scientist lab, and page headers dynamically.</p>
            </section>

            <section className="px-6 py-6 max-w-4xl w-full">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col gap-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2.5">
                  About Us Page Images & Copy Editor
                </h4>

                {aboutFeedback && (
                  <div className={`p-3.5 rounded-xl text-xs font-bold text-center border ${
                    aboutFeedback.startsWith("Error")
                      ? "text-rose-600 bg-rose-50 border-rose-500/10"
                      : "text-emerald-600 bg-emerald-50 border-emerald-500/10"
                  }`}>
                    {aboutFeedback}
                  </div>
                )}

                <form onSubmit={handleAboutSubmit} className="flex flex-col gap-5 text-xs font-semibold text-left">
                  
                  {/* Corporate Image Upload */}
                  <div className="flex flex-col gap-1.5 border-b border-slate-50 pb-5">
                    <label className="text-slate-500 font-bold">1. Corporate HQ Building Image (About Us Page) *</label>
                    <div className="flex items-center gap-3.5 border border-slate-200 rounded-xl p-3 bg-slate-50 focus-within:border-[#005B41] focus-within:bg-white transition-all">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleCorporateUpload}
                        className="text-xs text-slate-500 file:mr-3.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#005B41]/10 file:text-[#005B41] hover:file:bg-[#005B41]/20 cursor-pointer flex-1"
                      />
                      {isUploadingCorporate && <Loader2 className="w-4.5 h-4.5 animate-spin text-[#005B41]" />}
                    </div>
                    {aboutCorporateImg && (
                      <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-1">
                        <img src={aboutCorporateImg} alt="Corporate Upload" className="w-16 h-10 object-cover rounded-lg border" />
                        <div className="text-[10px] truncate max-w-lg text-left">
                          <span className="block font-bold text-slate-700">Active Corporate Image</span>
                          <span className="block text-slate-400 font-mono truncate">{aboutCorporateImg}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Scientist Image Upload */}
                  <div className="flex flex-col gap-1.5 border-b border-slate-50 pb-5">
                    <label className="text-slate-500 font-bold">2. Scientist Lab Testing Image (About Us Quote Card) *</label>
                    <div className="flex items-center gap-3.5 border border-slate-200 rounded-xl p-3 bg-slate-50 focus-within:border-[#005B41] focus-within:bg-white transition-all">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleScientistUpload}
                        className="text-xs text-slate-500 file:mr-3.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#005B41]/10 file:text-[#005B41] hover:file:bg-[#005B41]/20 cursor-pointer flex-1"
                      />
                      {isUploadingScientist && <Loader2 className="w-4.5 h-4.5 animate-spin text-[#005B41]" />}
                    </div>
                    {aboutScientistImg && (
                      <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-1">
                        <img src={aboutScientistImg} alt="Scientist Upload" className="w-16 h-10 object-cover rounded-lg border" />
                        <div className="text-[10px] truncate max-w-lg text-left">
                          <span className="block font-bold text-slate-700">Active Scientist Image</span>
                          <span className="block text-slate-400 font-mono truncate">{aboutScientistImg}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSavingAbout}
                    className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#005b41]/10 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {isSavingAbout ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Saving Page Images...</span>
                      </>
                    ) : (
                      <span>Save About Us Images & Settings</span>
                    )}
                  </button>

                </form>
              </div>
            </section>
          </div>
        ) : (
          
          /* Mock other settings dashboards */
          <div className="p-8 flex flex-col gap-6 text-center items-center justify-center flex-grow py-32">
            <span className="text-5xl">🛠️</span>
            <h3 className="text-lg font-extrabold text-slate-800 uppercase tracking-wider">{activeMenu} Settings</h3>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm">This submenu database panel is reserved for future integration. Current active control resides inside "Inquiry Pipeline".</p>
            <button 
              onClick={() => setActiveMenu("inquiries")}
              className="bg-[#005B41] text-white hover:bg-[#004833] py-2 px-6 rounded-xl text-xs font-bold"
            >
              Back to Inquiry Pipeline
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
