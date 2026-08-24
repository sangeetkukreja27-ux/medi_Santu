"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Building, 
  FileText, 
  CheckCircle, 
  Loader2, 
  Plus, 
  Minus, 
  ShieldCheck,
  Send,
  MessageCircle
} from "lucide-react";

export const InquiryModal: React.FC = () => {
  const { isInquiryModalOpen, closeInquiryModal, inquiryProduct, cartItems } = useCart();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState("");

  // Reset states when modal opens/changes
  useEffect(() => {
    if (isInquiryModalOpen) {
      setSubmittedInquiryId("");
      setQuantity(1);
    }
  }, [isInquiryModalOpen, inquiryProduct]);

  if (!isInquiryModalOpen) return null;

  // Determine active product to display
  const activeProduct = inquiryProduct || (cartItems.length > 0 ? cartItems[cartItems.length - 1].product : null);
  const unitPrice = activeProduct ? activeProduct.price : 0;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const items = activeProduct ? [{
      id: activeProduct.id,
      name: activeProduct.name,
      substance: activeProduct.substance,
      price: activeProduct.price,
      quantity,
      total: totalPrice
    }] : cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      substance: item.product.substance,
      price: item.product.price,
      quantity: item.quantity,
      total: item.product.price * item.quantity
    }));

    const payload = {
      customer: {
        fullName,
        mobile,
        email,
        company,
        message
      },
      items,
      totalValue: activeProduct ? totalPrice : items.reduce((a, b) => a + b.total, 0)
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmittedInquiryId(data.inquiryId);
        // Clear form
        setFullName("");
        setMobile("");
        setEmail("");
        setCompany("");
        setMessage("");
      } else {
        alert("Failed to send inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Modal inquiry submit error:", err);
      alert("Server connection error while placing inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = activeProduct 
    ? `Hi%20TrustedMedShop%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(activeProduct.name)}%20(Qty%3A%20${quantity})`
    : `Hi%20TrustedMedShop%2C%20I%20want%20to%20place%20a%20bulk%20medicine%20inquiry.`;
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeInquiryModal}
    >
      
      {/* Modal Container */}
      <div 
        className="bg-white w-[96vw] sm:w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0A3981] to-[#072B63] text-white p-5 sm:p-6 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-[#00A86B]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight">Product Sourcing Inquiry</h3>
              <span className="block text-[10px] text-slate-300 font-semibold uppercase tracking-wider mt-0.5">
                Verified Medicine Delivery Request
              </span>
            </div>
          </div>
          
          <button 
            onClick={closeInquiryModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col gap-6">
          
          {submittedInquiryId ? (
            
            /* Success View inside Modal */
            <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full border border-emerald-500/20 shadow-inner">
                <CheckCircle className="w-12 h-12 text-[#00A877]" />
              </div>
              
              <h4 className="text-2xl font-black text-[#005B41]">Inquiry Submitted Successfully!</h4>
              <span className="bg-slate-100 text-slate-700 text-xs font-bold py-1.5 px-4 rounded-full border border-slate-200">
                Reference ID: {submittedInquiryId}
              </span>
              
              <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed">
                Your inquiry has been sent to our sourcing team and **recorded in the Admin Panel**. A representative will contact you within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-4 border-t border-slate-100 pt-6">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all flex-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Followup</span>
                </a>
                <button 
                  onClick={closeInquiryModal}
                  className="bg-[#005B41] hover:bg-[#004833] text-white py-3 px-4 rounded-xl text-xs font-bold transition-all flex-1 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>

          ) : (

            /* Main Form + Auto-selected product details */
            <>
              {/* Product Preview Box */}
              {activeProduct && (
                <div className="bg-[#F4F7F6]/60 border border-[#005b41]/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-left w-full sm:w-auto">
                    <div className="w-16 h-16 bg-white border border-slate-100 rounded-xl p-1 flex-shrink-0 flex items-center justify-center shadow-sm">
                      <img src={activeProduct.image} alt={activeProduct.name} className="h-full object-contain rounded-lg" />
                    </div>
                    <div>
                      <span className="block text-[9px] text-[#00A877] font-black uppercase tracking-widest leading-none">
                        Auto-Selected Medicine
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-800 leading-tight mt-1">
                        {activeProduct.name}
                      </h4>
                      <span className="block text-xs text-slate-500 font-semibold mt-0.5">
                        {activeProduct.substance} ({activeProduct.unit})
                      </span>
                    </div>
                  </div>

                  {/* Quantity selector & total */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 border-slate-200/60 pt-3 sm:pt-0">
                    <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                      <button 
                        type="button" 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="p-1.5 text-slate-500 hover:text-[#005B41]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-slate-800">{quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="p-1.5 text-slate-500 hover:text-[#005B41]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="block text-base font-black text-[#005B41]">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                      <span className="block text-[8px] text-slate-400 font-bold uppercase -mt-0.5">
                        Total Value
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form details */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-semibold">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#00A877]" />
                      <span>Full Name *</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter your full name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#00A877]" />
                      <span>Mobile / WhatsApp *</span>
                    </label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Enter phone with country code" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#00A877]" />
                      <span>Email Address *</span>
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="Enter email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-[#00A877]" />
                      <span>Company / Pharmacy (Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter company or clinic name" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#00A877]" />
                    <span>Message / Sourcing Instructions (Optional)</span>
                  </label>
                  <textarea 
                    rows={2} 
                    placeholder="Specific quantity, documentation, or custom packaging notes..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm resize-none"
                  />
                </div>

                {/* Footer Buttons inside Form */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-4 mt-2">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-slate-700 py-3 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#0A3981] to-[#00A86B] hover:opacity-95 text-white py-3.5 px-7 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#0A3981]/20 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry to Admin</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </>
          )}

        </div>

      </div>

    </div>
  );
};
