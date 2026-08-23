"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  Loader2,
  CheckCircle,
  ShieldCheck
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(true);
      const user = {
        name: email.split("@")[0].toUpperCase() || "John Doe",
        email: email,
        phone: "+91 98765 43210",
        company: "Healthcare Solutions"
      };
      localStorage.setItem("tms_user", JSON.stringify(user));
      setTimeout(() => {
        router.push("/account");
      }, 1000);
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
            <span className="text-slate-600">Sign In</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Customer Sign In</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider -mt-1">
            Access your sourcing account, track active inquiries & bulk quotes.
          </p>
        </div>
      </section>

      {/* Main Login Box */}
      <section className="max-w-md mx-auto px-4 w-full py-12">
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-left relative">
          
          {/* Header icon */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="bg-[#005B41] text-white p-3 rounded-2xl shadow-sm">
              <LogIn className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Welcome Back</h3>
              <span className="text-xs text-slate-400 font-semibold">Sign in to your trustedmedshop account</span>
            </div>
          </div>

          {successMsg ? (
            <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
              <CheckCircle className="w-12 h-12 text-[#00A877]" />
              <h4 className="text-xl font-black text-[#005B41]">Signed In Successfully!</h4>
              <p className="text-xs text-slate-500">Redirecting to your Account Dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs font-semibold">
              
              <div className="flex flex-col gap-1.5">
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

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-slate-600 font-bold">Password *</label>
                  <a href="#" className="text-[11px] text-[#005B41] font-bold hover:underline">Forgot password?</a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full border border-slate-200 rounded-xl p-3 pl-10 pr-10 bg-slate-50 text-slate-800 font-semibold outline-none focus:border-[#005B41] focus:bg-white transition-all text-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#005B41] hover:bg-[#004833] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 hover:scale-[1.02]"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <span>Sign In to Account</span>}
              </button>

              {/* Registration Link */}
              <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500 font-semibold">
                Don&apos;t have a sourcing account?{" "}
                <Link href="/register" className="text-[#005B41] font-black hover:underline">
                  Create New Account
                </Link>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  );
}
