"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { User, Phone, Mail, Building, FileText, CheckCircle, Loader2, ArrowLeft } from "lucide-react";

function InquiryFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = searchParams.get("productId") || "";

  const [product, setProduct] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState("");

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.product) {
            setProduct(data.product);
            // Also auto-add to cart state
            addToCart(data.product, 1);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const items = product ? [{
      id: product.id,
      name: product.name,
      substance: product.substance,
      price: product.price,
      quantity,
      total: product.price * quantity
    }] : [];

    const payload = {
      customer: {
        fullName,
        mobile,
        email,
        company,
        message
      },
      items,
      totalValue: product ? product.price * quantity : 0
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedId(data.inquiryId);
      } else {
        alert("Failed to submit inquiry.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedId) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl flex flex-col items-center gap-5">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-[#00A877]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#005B41]">Inquiry Submitted!</h2>
          <span className="bg-slate-50 text-slate-600 text-xs font-bold py-1.5 px-4 rounded-full border">
            Ref ID: {submittedId}
          </span>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
            Your inquiry for {product ? product.name : "medicines"} has been registered in our database. Our team will contact you shortly.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="/products" className="bg-[#005B41] text-white py-2.5 px-6 rounded-xl text-xs font-bold">
              Back to Catalog
            </Link>
            <Link href="/admin" className="border border-[#005B41] text-[#005B41] py-2.5 px-6 rounded-xl text-xs font-bold">
              Check in Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-left">
      <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#005B41] mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Selected Product Card */}
        {product && (
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
            <span className="text-[10px] font-black text-[#00A877] uppercase tracking-widest">Auto-Selected Medicine</span>
            <div className="h-40 bg-slate-50 rounded-2xl p-2 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="h-full object-contain rounded-xl" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">{product.name}</h3>
              <span className="text-xs font-semibold text-slate-400">{product.substance}</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-500">Unit Price</span>
              <span className="text-lg font-black text-[#005B41]">₹{product.price.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Inquiry Form */}
        <div className={`${product ? "lg:col-span-7" : "lg:col-span-12"} bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-5`}>
          <div className="border-b border-slate-50 pb-3">
            <h2 className="text-xl font-extrabold text-[#005B41]">Quick Medicine Inquiry</h2>
            <p className="text-xs text-slate-400 mt-0.5">Submit your details to request custom pricing and export availability.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-semibold">
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
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 outline-none focus:border-[#005B41] focus:bg-white text-sm"
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
                placeholder="Enter mobile number with country code" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 outline-none focus:border-[#005B41] focus:bg-white text-sm"
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
                placeholder="Enter email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 outline-none focus:border-[#005B41] focus:bg-white text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#00A877]" />
                <span>Company Name (Optional)</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter company or pharmacy name" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 outline-none focus:border-[#005B41] focus:bg-white text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-500 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[#00A877]" />
                <span>Message / Sourcing Requirements</span>
              </label>
              <textarea 
                rows={3} 
                placeholder="Write specific requirements or quantity..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-slate-800 outline-none focus:border-[#005B41] focus:bg-white text-sm resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <span>Submit Product Inquiry</span>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default function InquirePage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#005B41]" />
      </div>
    }>
      <InquiryFormContent />
    </Suspense>
  );
}
