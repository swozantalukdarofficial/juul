"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, UserCheck } from "lucide-react";

const AnimatedTruck = ({ isLight }) => (
  <div className="flex items-center justify-center w-6 h-6 relative group-hover:scale-110 transition-transform duration-300">
    <div className="absolute flex flex-col items-center justify-end w-[200px] h-[100px] scale-[0.2] origin-center">
      <div className="w-[130px] mb-[6px]" style={{ animation: "truckMotion 1s linear infinite" }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93">
          <path strokeWidth="3" stroke={isLight ? "#282828" : "#fff"} fill="#F83D3D" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"></path>
          <path strokeWidth="3" stroke={isLight ? "#282828" : "#fff"} fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"></path>
          <path strokeWidth="2" stroke={isLight ? "#282828" : "#fff"} fill={isLight ? "#282828" : "#fff"} d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"></path>
          <rect strokeWidth="2" stroke={isLight ? "#282828" : "#fff"} fill="#FFFCAB" rx="1" height="7" width="5" y="63" x="187"></rect>
          <rect strokeWidth="2" stroke={isLight ? "#282828" : "#fff"} fill={isLight ? "#282828" : "#fff"} rx="1" height="11" width="4" y="81" x="193"></rect>
          <rect strokeWidth="3" stroke={isLight ? "#282828" : "#fff"} fill="#DFDFDF" rx="2.5" height="90" width="121" y="1.5" x="6.5"></rect>
          <rect strokeWidth="2" stroke={isLight ? "#282828" : "#fff"} fill="#DFDFDF" rx="2" height="4" width="6" y="84" x="1"></rect>
        </svg>
      </div>
      <div className="w-[130px] flex items-center justify-between px-[10px] pl-[15px] absolute bottom-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="w-[24px]">
          <circle strokeWidth="3" stroke={isLight ? "#282828" : "#fff"} fill={isLight ? "#282828" : "#fff"} r="13.5" cy="15" cx="15"></circle>
          <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="w-[24px]">
          <circle strokeWidth="3" stroke={isLight ? "#282828" : "#fff"} fill={isLight ? "#282828" : "#fff"} r="13.5" cy="15" cx="15"></circle>
          <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
        </svg>
      </div>
      <div className="w-[110%] h-[2.5px] relative bottom-0 self-end rounded-[3px] overflow-hidden" style={{ backgroundColor: isLight ? "#282828" : "#fff" }}>
        <div className="absolute w-[20px] h-full rounded-[3px] border-l-[10px] border-l-[#F83D3D]" style={{ backgroundColor: isLight ? "#282828" : "#fff", animation: "roadAnimation 1.4s linear infinite", right: "-50%" }} />
        <div className="absolute w-[10px] h-full rounded-[3px] border-l-[4px] border-l-[#F83D3D]" style={{ backgroundColor: isLight ? "#282828" : "#fff", animation: "roadAnimation 1.4s linear infinite", right: "-65%" }} />
      </div>
    </div>
  </div>
);

export default function TrustBar({ theme }) {
  const isLight = theme === "light";

  const items = [
    {
      icon: <AnimatedTruck isLight={isLight} />,
      title: "Free Delivery on AED 150+",
      subtitle: "Across all UAE emirates",
    },
    {
      icon: <ShieldCheck className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isLight ? "text-zinc-800" : "text-zinc-200"}`} />,
      title: "Authentic Products",
      subtitle: "100% genuine guaranteed",
    },
    {
      icon: <Zap className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isLight ? "text-zinc-800" : "text-zinc-200"}`} />,
      title: "Fast Shipping UAE",
      subtitle: "Same day dispatch Dubai",
    },
    {
      icon: <UserCheck className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isLight ? "text-zinc-800" : "text-zinc-200"}`} />,
      title: "Age Verified 21+",
      subtitle: "Strict legal compliance",
    },
  ];

  return (
    <section className={`border-b transition-colors duration-500 overflow-hidden ${
      isLight ? "bg-zinc-50 border-zinc-250/60" : "bg-[#080809] border-white/5"
    }`}>
      <style>{`
        @keyframes truckMotion {
          0% { transform: translateY(0px); }
          50% { transform: translateY(4px); }
          100% { transform: translateY(0px); }
        }
        @keyframes roadAnimation {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-350px); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200/50 dark:divide-white/5">
          {items.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -3 }}
              className={`group flex items-center gap-4 text-left justify-start lg:px-6 pt-4 lg:pt-0 cursor-pointer ${
                index === 0 ? "pt-0" : ""
              }`}
            >
              <div className={`p-3 rounded-2xl border transition-all duration-300 group-hover:shadow-lg ${
                isLight ? "bg-white border-zinc-200 group-hover:border-zinc-300 group-hover:shadow-zinc-200/50" : "bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20"
              }`}>
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className={`text-xs sm:text-sm font-black tracking-tight transition-colors duration-300 ${
                  isLight ? "text-zinc-950 group-hover:text-zinc-700" : "text-white group-hover:text-zinc-200"
                }`}>
                  {item.title}
                </h4>
                <p className={`text-[10px] sm:text-xs font-light ${
                  isLight ? "text-zinc-500" : "text-zinc-400"
                }`}>
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
