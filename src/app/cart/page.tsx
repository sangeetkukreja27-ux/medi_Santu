"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import TrustBadges from "@/components/TrustBadges";
import { 
  Trash2, 
  Heart, 
  Plus, 
  Minus, 
  ArrowRight, 
  MessageSquare,
  Globe,
  Loader2,
  CheckCircle,
  FileText,
  User,
  Phone,
  Mail,
  Building
} from "lucide-react";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart, formatPrice } = useCart();
  
  // Sourcing Inquiry Form States
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryRef, setInquiryRef] = useState("");

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    
    // Prepare inquiry payload
    const payload = {
      customer: {
        fullName,
        mobile,
        email,
        company,
        message
      },
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        substance: item.product.substance,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity
      })),
      totalValue: cartTotal
    };

    try {
      // Post to nextjs node api route
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setInquiryRef(data.inquiryId);
        setInquirySuccess(true);
        clearCart();
        // Reset form
        setFullName("");
        setMobile("");
        setEmail("");
        setCompany("");
        setMessage("");
      } else {
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Inquiry post error:", error);
      alert("Error submitting inquiry. Sourcing server is offline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const youMayAlsoLike = products.slice(4, 8);

  // Prefilled links for alternative instant options
  const whatsappUrl = `https://wa.me/919876543210?text=Hi%20TrustedMedShop%2C%20I%20want%20to%20place%20a%20bulk%20sourcing%20inquiry%20for%20the%20following%20products%3A%20${cartItems.map(item => `%0A-%20${encodeURIComponent(item.product.name)}%20x%20${item.quantity}%20boxes`).join("")}`;
  const telegramUrl = `https://t.me/trustedmedshop?text=Hi%20TrustedMedShop%2C%20I%20want%20to%20place%20a%20bulk%20sourcing%20inquiry%20for%20the%20following%20products%3A%20${cartItems.map(item => `%0A-%20${encodeURIComponent(item.product.name)}%20x%20${item.quantity}%20boxes`).join("")}`;

  if (inquirySuccess) {
    return (
      <div className="w-full flex flex-col bg-[#F8FAF9] font-sans py-16 px-4 items-center justify-center flex-grow text-center">
        <div className="max-w-xl bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col items-center gap-5 text-center">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full border border-emerald-500/10 shadow-inner">
            <CheckCircle className="w-12 h-12 text-[#00A877]" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#005B41]">Inquiry Submitted!</h2>
          <span className="bg-slate-50 text-slate-600 text-xs font-bold py-1.5 px-4 rounded-full border border-slate-200">
            Reference ID: {inquiryRef}
          </span>
          
          <p className="text-slate-500 text-sm leading-relaxed mt-2">
            Thank you for your sourcing request. Our wholesale medicine division has received your list. A clinical representative will review your credentials and contact you within 2-4 hours with a custom commercial quotation.
          </p>
          
          <div className="flex flex-col gap-3.5 w-full mt-4 border-t border-slate-100 pt-6">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 text-left">Alternative instant actions</span>
            
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25d366]/10"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.631-1.019-5.105-2.876-6.964a9.813 9.813 0 0 0-6.99-2.883c-5.441 0-9.867 4.422-9.87 9.854-.002 1.761.472 3.479 1.374 5.01l-1.025 3.74 3.864-1.013c1.513.826 3.185 1.258 4.717 1.258zm5.409-12.78c-.27-.604-.554-.616-.81-.627-.21-.008-.45-.008-.69-.008-.24 0-.63.09-1.01.5-.38.41-1.44 1.41-1.44 3.43s1.47 3.98 1.67 4.26c.2.28 2.9 4.43 7.03 6.21 1 .43 1.78.69 2.39.88.94.3 1.8.26 2.48.16.76-.11 2.33-.95 2.66-1.87.33-.92.33-1.71.23-1.87-.1-.16-.38-.26-.81-.47-.43-.21-2.54-1.25-2.93-1.39-.39-.14-.68-.21-.97.21-.29.42-1.12 1.39-1.37 1.67-.25.28-.5.31-.93.1-.43-.21-1.8-1.02-3.43-2.47-1.27-1.13-2.13-2.53-2.38-2.96-.25-.43-.03-.66.19-.87.2-.19.43-.51.65-.76.22-.25.3-.43.45-.72.15-.29.07-.55-.04-.76-.11-.21-.81-1.95-1.11-2.68z" />
              </svg>
              <span>Instant Follow-Up on WhatsApp</span>
            </a>
            
            <Link 
              href="/products" 
              className="border border-[#005B41] text-[#005B41] hover:bg-[#005B41] hover:text-white py-3 rounded-xl text-xs font-bold transition-all"
            >
              Back to Product Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-[#F8FAF9] font-sans pb-16">
      
      {/* Breadcrumbs Banner */}
      <section className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-2 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-[#005B41] transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-600">Inquiry List</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Your Inquiry List</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider -mt-1.5">
            Review selected medicines and fill details to request custom wholesale export quotes.
          </p>
        </div>
      </section>

      {cartItems.length === 0 ? (
        <section className="max-w-xl mx-auto py-20 px-6 text-center flex flex-col items-center gap-5">
          <span className="text-5xl">📋</span>
          <h2 className="text-xl font-extrabold text-slate-800">Your Inquiry List is Empty</h2>
          <p className="text-slate-500 text-xs sm:text-sm -mt-2 leading-relaxed">
            Select high-quality medicines from our catalog first. Rest assured, sourcing requires zero payment upfront.
          </p>
          <Link 
            href="/products" 
            className="bg-[#005B41] text-white hover:bg-[#004833] py-3.5 px-8 rounded-xl text-xs font-bold uppercase tracking-wider shadow transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <span>Browse Products Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          
          {/* Left Column: Cart Sourced Items */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col gap-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                Sourced Items ({cartItems.length})
              </span>
              
              <div className="flex flex-col gap-4 divider-y">
                {cartItems.map((item) => (
                  <div 
                    key={item.product.id}
                    className="flex flex-col sm:flex-row items-center gap-5 justify-between py-4 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-4 text-left w-full sm:w-auto">
                      <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl p-1 flex-shrink-0 flex items-center justify-center">
                        <img src={item.product.image} alt={item.product.name} className="h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <span className="block text-[9px] text-[#00A877] font-extrabold uppercase tracking-wider leading-none">{item.product.category}</span>
                        <Link href={`/products/${item.product.id}`} className="block text-sm font-bold text-slate-800 hover:text-[#005B41] transition-colors leading-tight mt-1">
                          {item.product.name}
                        </Link>
                        <span className="block text-xs text-slate-500 font-semibold mt-1 leading-none">{item.product.substance}</span>
                        <span className="block text-[10px] text-slate-400 font-semibold mt-1.5 uppercase leading-none">{item.product.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 mt-4 sm:mt-0">
                      
                      {/* Quantity counter */}
                      <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 scale-90">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:text-[#005B41]"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-[#005B41]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-right min-w-[70px]">
                        <span className="block text-base font-black text-[#0A3981]">{formatPrice(item.product.price * item.quantity)}</span>
                        <span className="block text-[9px] text-slate-400 font-semibold uppercase -mt-0.5">Sourcing value</span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 pl-2">
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center gap-2.5 text-xs font-semibold text-slate-500">
                <CheckCircle className="w-5 h-5 text-[#00A877] flex-shrink-0" />
                <span>All medicines are 100% authentic and sourced from verified global manufacturers.</span>
              </div>
            </div>
            
            {/* You May Also Like Row */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col gap-5 text-left">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                Frequently Sourced Together
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {youMayAlsoLike.map((p) => (
                  <div key={p.id} className="border border-slate-100 hover:border-slate-200 rounded-xl p-3 flex flex-col gap-2 hover:shadow-md transition-all group">
                    <div className="h-20 bg-slate-50 rounded-lg flex items-center justify-center p-1">
                      <img src={p.image} alt={p.name} className="h-full object-cover rounded" />
                    </div>
                    <Link href={`/products/${p.id}`} className="font-bold text-slate-800 hover:text-[#005B41] line-clamp-2 leading-snug min-h-[32px]">
                      {p.name}
                    </Link>
                    <span className="text-[10px] text-slate-400 font-bold">{formatPrice(p.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Details Form */}
          <aside className="lg:col-span-5 flex flex-col gap-6 text-left w-full">
            
            {/* Sourcing details form */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-md flex flex-col gap-5">
              <div className="flex flex-col gap-1 border-b border-slate-50 pb-3">
                <span className="text-xs font-black text-[#00A877] uppercase tracking-widest leading-none">Export-Import</span>
                <h3 className="text-lg font-extrabold text-slate-800 tracking-tight leading-tight mt-1">Sourcing Inquiry Form</h3>
                <p className="text-xs text-slate-400 mt-1">Provide your credentials and requirements for price quote validation.</p>
              </div>

              <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4 text-xs font-semibold">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#00A877]" />
                    <span>Full Name *</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#00A877]" />
                    <span>Mobile / WhatsApp Number *</span>
                  </label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Enter phone with country code (e.g. +91 9876543210)" 
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#00A877]" />
                    <span>Email Address *</span>
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-[#00A877]" />
                    <span>Company / Clinic / Hospital Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter organization (optional)" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#00A877]" />
                    <span>Custom Message / Delivery Notes</span>
                  </label>
                  <textarea 
                    rows={3} 
                    placeholder="Mention any custom quantity, destination country, or delivery urgency..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm resize-none"
                  />
                </div>

                {/* Pricing Summary inside form */}
                <div className="bg-[#F4F7F6]/50 border border-[#005b41]/5 rounded-2xl p-4 mt-2 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
                    <span>Sourced Subtotal ({cartItems.length} items)</span>
                    <span className="font-extrabold text-slate-700">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
                    <span>Custom Clearance & Shipping</span>
                    <span className="text-[#00A877] font-extrabold text-[10px] bg-[#00A877]/10 py-0.5 px-2.5 rounded-full uppercase tracking-wider">Quote on Inquiry</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline font-black text-[#0A3981]">
                    <span className="text-sm">Total Sourcing Value</span>
                    <span className="text-xl">{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#005B41] hover:bg-[#004833] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#005b41]/10 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Sourcing Inquiry</span>
                  )}
                </button>

              </form>

              {/* Direct Inquiry triggers */}
              <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-4 mt-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">Alternative Quick Sourcing</span>
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="border border-[#25D366]/20 bg-[#25D366]/5 hover:bg-[#25D366]/10 text-slate-700 py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href={telegramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="border border-[#0088cc]/20 bg-[#0088cc]/5 hover:bg-[#0088cc]/10 text-slate-700 py-2.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#0088cc]" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

            </div>
          </aside>

        </section>
      )}

      {/* Trust Badges */}
      <TrustBadges />

    </div>
  );
}
