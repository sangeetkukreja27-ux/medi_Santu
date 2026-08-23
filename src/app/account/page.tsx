"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  User, 
  ShoppingBag, 
  MapPin, 
  FileSpreadsheet, 
  Heart, 
  CreditCard, 
  Bell, 
  LogOut,
  HelpCircle,
  CheckCircle,
  Loader2,
  Building,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  Package,
  Calendar,
  Clock
} from "lucide-react";

interface InquiryItem {
  id: string;
  name: string;
  substance?: string;
  price: number;
  quantity: number;
  total: number;
}

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
  items: InquiryItem[];
  totalValue: number;
}

export default function AccountPage() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // default true for preview
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Registration Form State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // Account Dashboard State
  const [activeTab, setActiveTab] = useState<string>("inquiries");
  
  // Profile edit states
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [company, setCompany] = useState("HealthPlus Pharmaceutical");
  const [country, setCountry] = useState("United States");
  const [language, setLanguage] = useState("English");
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Inquiries State
  const [userInquiries, setUserInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // Load User and Inquiries on Mount
  useEffect(() => {
    // Check if saved user in localStorage
    const savedUser = localStorage.getItem("tms_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setFullName(parsed.name || "John Doe");
        setEmail(parsed.email || "john.doe@email.com");
        setPhone(parsed.phone || "+1 234 567 8900");
        setCompany(parsed.company || "HealthPlus Pharmaceutical");
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
      }
    }

    // Fetch Inquiries
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setUserInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to fetch user inquiries:", err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      const user = {
        name: loginEmail.split("@")[0].toUpperCase() || "John Doe",
        email: loginEmail,
        phone: "+91 98765 43210",
        company: "Corporate Healthcare"
      };
      localStorage.setItem("tms_user", JSON.stringify(user));
      setFullName(user.name);
      setEmail(user.email);
      setIsLoggedIn(true);
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      const user = {
        name: regName,
        email: regEmail,
        phone: regPhone,
        company: regCompany
      };
      localStorage.setItem("tms_user", JSON.stringify(user));
      setFullName(regName);
      setEmail(regEmail);
      setPhone(regPhone);
      setCompany(regCompany);
      setIsLoggedIn(true);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("tms_user");
    setIsLoggedIn(false);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      const updated = { name: fullName, email, phone, company };
      localStorage.setItem("tms_user", JSON.stringify(updated));
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 1200);
  };

  const sidebarLinks = [
    { id: "inquiries", name: "Inquiry List", sub: "Track Sourcing Quotes", icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: "profile", name: "My Profile", sub: "Account Settings", icon: <User className="w-4 h-4" /> },
    { id: "orders", name: "My Orders", sub: "Track & Manage Orders", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "addresses", name: "Address Book", sub: "Manage Shipping Addresses", icon: <MapPin className="w-4 h-4" /> },
    { id: "wishlist", name: "Wishlist", sub: "Saved Products", icon: <Heart className="w-4 h-4" /> },
    { id: "payment", name: "Payment Methods", sub: "Saved Cards & Methods", icon: <CreditCard className="w-4 h-4" /> },
    { id: "notifications", name: "Notifications", sub: "Manage Alerts", icon: <Bell className="w-4 h-4" /> }
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <span className="bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-black py-0.5 px-2.5 rounded-full uppercase tracking-wider">Pending Review</span>;
      case "quoted":
      case "processing":
        return <span className="bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-black py-0.5 px-2.5 rounded-full uppercase tracking-wider">Quote Prepared</span>;
      case "confirmed":
      case "delivered":
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-black py-0.5 px-2.5 rounded-full uppercase tracking-wider">Confirmed</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-black py-0.5 px-2.5 rounded-full uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAF9] font-sans pb-16">
      
      {/* Breadcrumbs Banner */}
      <section className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-2.5 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-[#005B41] transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-600">My Account</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            {isLoggedIn ? "User Account & Inquiries" : "Sign In or Register"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider -mt-1.5">
            Manage your sourcing profile, active product inquiries, and corporate order status.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {!isLoggedIn ? (
          
          /* LOGIN / REGISTRATION FORM VIEW */
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-left">
            
            {/* Form Toggle Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  authMode === "login"
                    ? "bg-[#005B41] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  authMode === "register"
                    ? "bg-[#005B41] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>

            {authMode === "login" ? (
              
              /* SIGN IN FORM */
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-xs font-semibold">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">Email Address *</label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                    <input 
                      type="email" 
                      required 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full border border-slate-200 rounded-xl p-3 pl-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600">Password *</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full border border-slate-200 rounded-xl p-3 pl-10 pr-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={authLoading}
                  className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {authLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Sign In to Account</span>}
                </button>
              </form>

            ) : (

              /* REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5 text-xs font-semibold">
                <div className="flex flex-col gap-1">
                  <label className="text-slate-600">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-slate-600">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-slate-600">Mobile / WhatsApp Number *</label>
                  <input 
                    type="text" 
                    required 
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-slate-600">Company / Clinic Name (Optional)</label>
                  <input 
                    type="text" 
                    value={regCompany}
                    onChange={(e) => setRegCompany(e.target.value)}
                    placeholder="Healthcare Solutions Ltd"
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-slate-600">Create Password *</label>
                  <input 
                    type="password" 
                    required 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={authLoading}
                  className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {authLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Create Account</span>}
                </button>
              </form>

            )}

          </div>

        ) : (

          /* LOGGED IN DASHBOARD VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar Menu */}
            <aside className="lg:col-span-3 flex flex-col gap-6 text-left">
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col gap-1.5">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all text-left group cursor-pointer ${
                      activeTab === link.id
                        ? "bg-[#F4F7F6] text-[#005B41]"
                        : "text-slate-600 hover:bg-[#F4F7F6]/30 hover:text-slate-900"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${
                      activeTab === link.id
                        ? "bg-[#005B41] text-white"
                        : "bg-slate-50 text-slate-500 group-hover:bg-[#F4F7F6]"
                    }`}>
                      {link.icon}
                    </div>
                    <div className="text-xs">
                      <span className={`block font-bold leading-none ${activeTab === link.id ? "text-[#005B41]" : "text-slate-800"}`}>
                        {link.name}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-1">{link.sub}</span>
                    </div>
                  </button>
                ))}
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 hover:text-red-700 transition-all text-left mt-2 border-t border-slate-50 pt-4 cursor-pointer"
                >
                  <div className="bg-red-50 text-red-500 p-2 rounded-lg">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="block font-bold leading-none">Logout</span>
                    <span className="block text-[10px] text-red-400/80 mt-1">Sign out from account</span>
                  </div>
                </button>
              </div>

              {/* Need Help CTA Banner */}
              <div className="bg-[#005B41] text-white rounded-2xl p-5 border border-[#005B41]/10 flex flex-col gap-3 shadow-sm relative overflow-hidden">
                <HelpCircle className="w-7 h-7 text-[#00A877]" />
                <h4 className="font-extrabold text-sm tracking-wide">Need Sourcing Help?</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  If you require customs clearances, commercial invoice certificates, or licensing assistance, reach out directly.
                </p>
                <Link 
                  href="/contact" 
                  className="bg-white hover:bg-slate-50 text-[#005B41] py-2 px-4 rounded-xl text-xs font-bold text-center mt-1 transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </aside>

            {/* Right Dashboard Area */}
            <main className="lg:col-span-9 flex flex-col gap-8 text-left">
              
              {/* User overview card header */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-5 shadow-sm">
                <div className="flex items-center gap-4 text-left w-full sm:w-auto">
                  <div className="bg-[#005B41] text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 border-[#00A877] shadow shadow-[#005b41]/20">
                    {fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-slate-800 leading-tight">{fullName}</h3>
                      <span className="bg-emerald-500/10 text-emerald-600 font-extrabold text-[9px] py-0.5 px-2 rounded-full uppercase tracking-wider border border-emerald-500/5">
                        Verified Buyer
                      </span>
                    </div>
                    <span className="block text-xs text-slate-500 mt-1">{email} | {phone}</span>
                    <span className="block text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wider">Member since Jan 2024</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab("profile")}
                  className="border border-[#005B41] text-[#005B41] hover:bg-[#005B41] hover:text-white transition-all text-xs font-bold py-2 px-5 rounded-xl cursor-pointer w-full sm:w-auto text-center"
                >
                  Edit Profile
                </button>
              </div>

              {/* Sourcing Metrics stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
                  <span className="text-2xl font-black text-[#005B41]">{userInquiries.length}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Inquiries Sent</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
                  <span className="text-2xl font-black text-[#005B41]">16</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Orders Placed</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
                  <span className="text-2xl font-black text-[#005B41]">5</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Wishlist Items</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
                  <span className="text-2xl font-black text-[#005B41]">₹1,245.00</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Total Spent</span>
                </div>
              </div>

              {/* INQUIRIES HISTORY TAB */}
              {activeTab === "inquiries" && (
                <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-[#005B41]" />
                      <span>My Submitted Inquiries</span>
                    </h3>
                    <button 
                      onClick={fetchInquiries}
                      className="text-xs font-bold text-[#005B41] hover:underline flex items-center gap-1"
                    >
                      Refresh List
                    </button>
                  </div>

                  {inquiriesLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#005B41]" />
                      <span className="text-xs font-semibold">Loading your submitted inquiries...</span>
                    </div>
                  ) : userInquiries.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center gap-3 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <Package className="w-10 h-10 text-slate-300" />
                      <h4 className="text-sm font-bold text-slate-700">No Inquiries Submitted Yet</h4>
                      <p className="text-xs text-slate-400 max-w-sm">Browse our medicine catalog and click &quot;Buy Now&quot; or &quot;Add to Cart&quot; to send an inquiry to our sourcing team.</p>
                      <Link href="/products" className="bg-[#005B41] text-white text-xs font-bold py-2.5 px-6 rounded-xl mt-2 hover:bg-[#004833]">
                        Explore Medicines
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {userInquiries.map((inq) => (
                        <div key={inq.id} className="border border-slate-100 rounded-2xl p-5 bg-[#F8FAF9]/50 hover:border-slate-200 transition-all flex flex-col gap-4">
                          
                          {/* Card Header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200/50 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-xs text-[#005B41] bg-emerald-50 py-1 px-3 rounded-lg border border-emerald-500/10">
                                {inq.id}
                              </span>
                              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(inq.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </span>
                            </div>
                            {getStatusBadge(inq.status)}
                          </div>

                          {/* Items List */}
                          <div className="flex flex-col gap-2">
                            {inq.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs font-semibold bg-white p-2.5 rounded-xl border border-slate-150">
                                <div>
                                  <span className="text-slate-800 font-bold block">{item.name}</span>
                                  {item.substance && <span className="text-[10px] text-slate-400 block">{item.substance}</span>}
                                </div>
                                <div className="text-right">
                                  <span className="text-slate-600 block">{item.quantity} x ₹{item.price.toFixed(2)}</span>
                                  <span className="text-[#005B41] font-extrabold block">₹{item.total.toFixed(2)}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Card Footer */}
                          <div className="flex justify-between items-center text-xs border-t border-slate-200/50 pt-3">
                            <span className="text-slate-500 font-semibold">Total Estimated Value:</span>
                            <span className="text-base font-black text-[#005B41]">₹{inq.totalValue.toFixed(2)}</span>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                  <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-50 pb-2.5 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#005B41]" />
                    <span>Personal Information</span>
                  </h3>
                  
                  <form onSubmit={handleSaveChanges} className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full text-xs font-semibold">
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-500">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-500">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-500">Phone / Mobile *</label>
                      <input 
                        type="text" 
                        required 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-500 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>Company Name</span>
                      </label>
                      <input 
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter corporate pharmacy / clinic name"
                        className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2 border-t border-slate-50 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      {saveSuccess && (
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-50 py-2.5 px-4 rounded-xl">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Changes saved successfully! Profile details updated.</span>
                        </div>
                      )}
                      <span className="hidden sm:inline"></span>
                      <button 
                        type="submit"
                        disabled={isSaving}
                        className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 px-8 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto hover:scale-[1.02]"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Save Changes</span>}
                      </button>
                    </div>

                  </form>
                </div>
              )}

            </main>

          </div>

        )}

      </section>

    </div>
  );
}
