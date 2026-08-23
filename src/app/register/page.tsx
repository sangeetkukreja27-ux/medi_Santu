"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  Phone, 
  Building, 
  User, 
  Loader2, 
  CheckCircle,
  ShieldCheck
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(true);
      const user = {
        name: fullName,
        email: email,
        phone: phone,
        company: company
      };
      localStorage.setItem("tms_user", JSON.stringify(user));
      setTimeout(() => {
        router.push("/account");
      }, 1200);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col bg-[#F8FAF9] font-sans pb-16 min-h-[80vh]">
      
      {/* Breadcrumbs */}
      <section className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-2 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-[#005B41] transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-600">Register</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Create Sourcing Account</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider -mt-1">
            Register your pharmacy, clinic, or personal sourcing profile for bulk rates & inquiry tracking.
          </p>
        </div>
      </section>

      {/* Main Registration Box */}
      <section className="max-w-md mx-auto px-4 w-full py-12">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-left relative">
          
          {/* Header icon */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="bg-[#005B41] text-white p-3 rounded-2xl shadow-sm">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">New Registration</h3>
              <span className="text-xs text-slate-400 font-semibold">Join 10,000+ global healthcare partners</span>
            </div>
          </div>

          {successMsg ? (
            <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
              <CheckCircle className="w-12 h-12 text-[#00A877]" />
              <h4 className="text-xl font-black text-[#005B41]">Account Created Successfully!</h4>
              <p className="text-xs text-slate-500">Redirecting to your Account Dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-3.5 text-xs font-semibold">
              
              <div className="flex flex-col gap-1">
                <label className="text-slate-600 font-bold">Full Name *</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input 
                    type="text" 
                    required 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-slate-200 rounded-xl p-3 pl-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-600 font-bold">Email Address *</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full border border-slate-200 rounded-xl p-3 pl-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-600 font-bold">Mobile / WhatsApp Number *</label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input 
                    type="text" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full border border-slate-200 rounded-xl p-3 pl-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-600 font-bold">Company / Clinic Name (Optional)</label>
                <div className="relative flex items-center">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input 
                    type="text" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Apex Healthcare Ltd"
                    className="w-full border border-slate-200 rounded-xl p-3 pl-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-slate-600 font-bold">Password *</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full border border-slate-200 rounded-xl p-3 pl-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 hover:scale-[1.02]"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Create Account</span>}
              </button>

              {/* Login Link */}
              <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500 font-semibold">
                Already have an account?{" "}
                <Link href="/login" className="text-[#005B41] font-black hover:underline">
                  Sign In Here
                </Link>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
}
