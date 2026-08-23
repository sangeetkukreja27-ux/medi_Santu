"use client";

import React, { useState } from "react";
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
  Truck,
  Loader2,
  Clock,
  Building
} from "lucide-react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<string>("profile");
  
  // Profile edit states
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@email.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [company, setCompany] = useState("HealthPlus Pharmaceutical");
  const [country, setCountry] = useState("United States");
  const [language, setLanguage] = useState("English");
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 1200);
  };

  const sidebarLinks = [
    { id: "profile", name: "My Profile", sub: "Account Settings", icon: <User className="w-4 h-4" /> },
    { id: "orders", name: "My Orders", sub: "Track & Manage Orders", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "addresses", name: "Address Book", sub: "Manage Shipping Addresses", icon: <MapPin className="w-4 h-4" /> },
    { id: "inquiries", name: "Inquiry List", sub: "Track Sourcing Quotes", icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: "wishlist", name: "Wishlist", sub: "Saved Products", icon: <Heart className="w-4 h-4" /> },
    { id: "payment", name: "Payment Methods", sub: "Saved Cards & Methods", icon: <CreditCard className="w-4 h-4" /> },
    { id: "notifications", name: "Notifications", sub: "Manage Alerts", icon: <Bell className="w-4 h-4" /> }
  ];

  const recentOrders = [
    { id: "#TMS38492", date: "May 20, 2026", total: "$120.00", status: "Delivered", color: "bg-emerald-500/10 text-emerald-600" },
    { id: "#TMS38410", date: "May 10, 2026", total: "$250.00", status: "Shipped", color: "bg-blue-500/10 text-blue-600" },
    { id: "#TMS38277", date: "Apr 28, 2026", total: "$85.00", status: "Processing", color: "bg-amber-500/10 text-amber-600" }
  ];

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
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">My Account</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider -mt-1.5">
            Manage your sourcing profile, active inquiries, and corporate order history.
          </p>
        </div>
      </section>

      {/* Main dashboard grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        
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
            
            <button className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 hover:text-red-700 transition-all text-left mt-2 border-t border-slate-50 pt-4 cursor-pointer">
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
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
              <HelpCircle className="w-24 h-24 text-white" />
            </div>
            
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
                JD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-slate-800 leading-tight">John Doe</h3>
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
              <span className="text-2xl font-black text-[#005B41]">16</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Orders Placed</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
              <span className="text-2xl font-black text-[#005B41]">3</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Inquiries Sent</span>
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

          {/* Conditional Content based on activeTab */}
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
                
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500">Country *</label>
                  <select 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-bold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  >
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500">Language Preference *</label>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-bold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
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
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Orders History Tab */}
          {(activeTab === "orders" || activeTab === "profile") && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
              <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-50 pb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#005B41]" />
                  <span>Recent Orders</span>
                </span>
                <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-[#005B41] hover:underline">
                  View All Orders
                </button>
              </h3>

              <div className="w-full overflow-x-auto">
                <table className="w-full text-xs text-slate-600 font-semibold border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                      <th className="pb-3 px-4">Order ID</th>
                      <th className="pb-3 px-4">Date</th>
                      <th className="pb-3 px-4">Total</th>
                      <th className="pb-3 px-4">Status</th>
                      <th className="pb-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((ord) => (
                      <tr key={ord.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-800">{ord.id}</td>
                        <td className="py-4 px-4 text-slate-500">{ord.date}</td>
                        <td className="py-4 px-4 font-bold text-slate-800">{ord.total}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block py-1 px-2.5 rounded-full font-bold text-[9px] uppercase tracking-wider ${ord.color}`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="text-[#005B41] hover:text-[#00A877] font-bold text-xs">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>

      </section>

    </div>
  );
}
