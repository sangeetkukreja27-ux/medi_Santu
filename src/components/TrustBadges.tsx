import React from "react";
import { Award, ShieldCheck, Truck, Clock, RefreshCw } from "lucide-react";

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Award className="w-8 h-8 text-[#00A877]" />,
      title: "WHO-GMP Certified",
      desc: "100% genuine medicines from certified makers"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#00A877]" />,
      title: "Secure Sourcing",
      desc: "Safe & discrete packaging for client privacy"
    },
    {
      icon: <Truck className="w-8 h-8 text-[#00A877]" />,
      title: "Worldwide Shipping",
      desc: "Fast delivery tracking to 107+ countries"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-[#00A877]" />,
      title: "Quality Assured",
      desc: "Rigorous quality check before dispatch"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#00A877]" />,
      title: "24/7 Support",
      desc: "Dedicated clinical support team at your service"
    }
  ];

  return (
    <div className="w-full bg-white border-y border-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-[#F4F7F6]/40 transition-colors duration-200">
            <div className="bg-[#F4F7F6] p-3 rounded-full mb-3 shadow-sm">
              {badge.icon}
            </div>
            <h4 className="text-sm font-bold text-slate-800 tracking-wide mb-1">{badge.title}</h4>
            <p className="text-xs text-slate-500 leading-normal max-w-[160px]">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TrustBadges;
