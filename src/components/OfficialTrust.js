"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cpu, Plane, Compass, Search, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function OfficialTrust({ theme }) {
  const isLight = theme === "light";
  const [activeImport, setActiveImport] = useState("us"); // 'us' or 'uk'
  const [batchInput, setBatchInput] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const mockBatches = {
    "JL-US-9042": {
      status: "verified",
      origin: "New York, USA (Authorized US Distributor)",
      transit: "Emirates Cargo EK202 (NYC -> DXB)",
      nicotine: "5.0% / 3.0% Nicotine Salt",
      seal: "Original Factory Sealed (FDA Compliant)"
    },
    "JL-UK-3810": {
      status: "verified",
      origin: "London, UK (Licensed UK Pharmaceutical)",
      transit: "British Airways BA107 (LHR -> DXB)",
      nicotine: "18mg/mL TPD Compliant Formula",
      seal: "Smart Chip Active (MHRA Registered)"
    }
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (!batchInput.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const code = batchInput.trim().toUpperCase();
      if (mockBatches[code]) {
        setScanResult({ code, ...mockBatches[code] });
      } else {
        setScanResult({
          status: "failed",
          msg: "Unregistered or mismatching batch serial code. Check manual tag or contact support."
        });
      }
      setIsScanning(false);
    }, 1200);
  };

  return (
    <section className={`py-28 transition-colors duration-500 border-b relative overflow-hidden ${
      isLight ? "bg-[#F8F9FA] border-zinc-200" : "bg-[#070708] border-white/5"
    }`}>
      {/* Sci-fi Overlay Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-blue-500/[0.03] dark:bg-blue-500/[0.01] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-500/[0.03] dark:bg-emerald-500/[0.01] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-[0.25em] ${
            isLight ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-emerald-950/20 border-emerald-500/20 text-emerald-400"
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
            Juul Secure Sourcing Vault
          </span>
          <h2 className={`text-4xl sm:text-6xl font-black tracking-tight leading-none ${
            isLight ? "text-zinc-950" : "text-white"
          }`}>
            Guaranteed Authenticity
          </h2>
          <p className={`text-sm sm:text-base ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
            We supply only original factory-sealed products. Use our database scanner below to check your batch cargo details.
          </p>
        </div>

        {/* Interactive Comparison Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Left: Interactive Controls and Specs Comparison (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Toggle Button Switch */}
            <div className={`p-1.5 rounded-2xl border flex gap-2 w-full sm:w-max ${
              isLight ? "bg-zinc-150/80 border-zinc-200" : "bg-white/[0.02] border-white/5"
            }`}>
              <button
                onClick={() => setActiveImport("us")}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                  activeImport === "us"
                    ? isLight ? "bg-zinc-950 text-white shadow-md" : "bg-white text-zinc-950 shadow-lg"
                    : "text-zinc-400 hover:text-zinc-650"
                }`}
              >
                🇺🇸 US Import (JUUL 1)
              </button>
              <button
                onClick={() => setActiveImport("uk")}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                  activeImport === "uk"
                    ? isLight ? "bg-zinc-950 text-white shadow-md" : "bg-white text-zinc-950 shadow-lg"
                    : "text-zinc-400 hover:text-zinc-650"
                }`}
              >
                🇬🇧 UK Import (JUUL 2)
              </button>
            </div>

            {/* Spec Matrix details */}
            <div className={`p-8 rounded-3xl border flex-1 space-y-6 ${
              isLight ? "bg-white border-zinc-200/80 shadow-lg" : "bg-[#0B0B0C] border-white/5 shadow-2xl"
            }`}>
              <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? "text-zinc-950" : "text-white"}`}>
                {activeImport === "us" ? "JUUL 1 US Specification" : "JUUL 2 UK Specification"}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Source Origin</span>
                  <p className={`text-xs font-bold ${isLight ? "text-zinc-850" : "text-zinc-200"}`}>
                    {activeImport === "us" ? "Authorized US Distributors (New York / Florida)" : "Licensed UK Wholesalers (London / Manchester)"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Transit Protocol</span>
                  <p className={`text-xs font-bold ${isLight ? "text-zinc-850" : "text-zinc-200"}`}>
                    {activeImport === "us" ? "Fast Air Cargo Flight (Temp-Regulated to 18°C)" : "LHR direct air cargo routes under MHRA compliance"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Nicotine Strength Range</span>
                  <p className={`text-xs font-bold ${isLight ? "text-zinc-850" : "text-zinc-200"}`}>
                    {activeImport === "us" ? "5.0% (50mg/mL) & 3.0% (30mg/mL) classic salts" : "18mg/mL (approx 1.8%) TPD European standard"}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Product ID Tag</span>
                  <p className={`text-xs font-bold ${isLight ? "text-zinc-850" : "text-zinc-200"}`}>
                    {activeImport === "us" ? "FDA Registered US Batch serial numbers" : "Bluetooth smart signature & QR app registered"}
                  </p>
                </div>
              </div>

              <div className={`h-px w-full ${isLight ? "bg-zinc-200" : "bg-white/5"}`} />

              {/* Guarantees checklist */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className={`text-xs font-bold ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>Sealed retail carton boxes directly from distributor</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className={`text-xs font-bold ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>No clones, counterfeit clones, or duplicate serial cards</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Graphic Device Representation with interactive features (5 cols) */}
          <div className="lg:col-span-5 flex">
            <div className={`w-full p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${
              isLight 
                ? "bg-white border-zinc-200 shadow-lg" 
                : "bg-gradient-to-b from-[#0A0A0B] to-[#0D0D0E] border-white/5 shadow-2xl"
            }`}>
              {/* Country Badge */}
              <div className="flex items-center gap-2">
                <Compass className={`w-4 h-4 ${isLight ? "text-blue-500" : "text-emerald-400"}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                  Import Specifications
                </span>
              </div>

              {/* Central CSS Mockup of Device Container */}
              <div className="h-44 w-full flex items-center justify-center relative my-4">
                <div className="relative w-16 h-36 rounded-md bg-[#161617] border border-white/10 flex flex-col items-center justify-between p-2 shadow-2xl">
                  {/* Pod connection */}
                  <div className="w-full h-10 rounded bg-[#2D2D2E] border-b border-black/40 flex items-center justify-center text-[7px] text-zinc-500 font-bold tracking-widest">
                    JUUL
                  </div>
                  {/* Blinking indicator LED */}
                  <div className="relative">
                    <div className={`w-2 h-2 rounded-full ${
                      activeImport === "us" ? "bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" : "bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]"
                    }`} />
                  </div>
                  {/* Smart chip designator for UK */}
                  {activeImport === "uk" ? (
                    <div className="absolute -right-3 top-1/2 p-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[6px] font-black text-emerald-400">
                      APP LINKED
                    </div>
                  ) : (
                    <div className="absolute -right-3 top-1/2 p-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-[6px] font-black text-blue-400">
                      CLASSIC
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-center">
                <h4 className={`text-sm font-black uppercase tracking-wider ${isLight ? "text-zinc-950" : "text-white"}`}>
                  {activeImport === "us" ? "US FDA Sourced Batch" : "UK MHRA Sourced Batch"}
                </h4>
                <p className="text-[10px] text-zinc-400">
                  {activeImport === "us" ? "Serial Checked & Certified for Export" : "NFC Chip Registered & Certified for App Connect"}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Interactive Batch Scanner Panel */}
        <div className={`p-8 sm:p-10 rounded-[32px] border relative overflow-hidden ${
          isLight ? "bg-white border-zinc-250/60 shadow-md" : "bg-[#09090A] border-white/5 shadow-3xl"
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Input Console (5 cols) */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                SECURE AUTHENTICATION SYSTEM
              </span>
              <h3 className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${isLight ? "text-zinc-950" : "text-white"}`}>
                Logistics Scanner
              </h3>
              <p className={`text-xs ${isLight ? "text-zinc-500" : "text-zinc-450"}`}>
                Input the verification code on your batch packaging to review the flight cargo dispatch log.
              </p>

              {/* Sample codes helper */}
              <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-bold text-zinc-400">
                <span>Try:</span>
                <button 
                  onClick={() => setBatchInput("JL-US-9042")}
                  className={`px-2 py-0.5 rounded border transition-colors hover:text-zinc-800 dark:hover:text-white ${isLight ? "bg-zinc-100 border-zinc-200" : "bg-white/5 border-white/10"}`}
                >
                  JL-US-9042
                </button>
                <button 
                  onClick={() => setBatchInput("JL-UK-3810")}
                  className={`px-2 py-0.5 rounded border transition-colors hover:text-zinc-800 dark:hover:text-white ${isLight ? "bg-zinc-100 border-zinc-200" : "bg-white/5 border-white/10"}`}
                >
                  JL-UK-3810
                </button>
              </div>

              {/* Scanner Form */}
              <form onSubmit={handleScan} className="flex gap-2">
                <div className="relative flex-1 min-w-0">
                  <input
                    type="text"
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    placeholder="Enter Code (e.g., JL-US-9042)"
                    className={`w-full py-3 px-4 rounded-xl border text-xs font-medium transition-all focus:outline-none focus:ring-1 ${
                      isLight 
                        ? "bg-zinc-50 border-zinc-250 text-zinc-900 focus:border-zinc-800 focus:ring-zinc-800/10 placeholder:text-zinc-400" 
                        : "bg-white/5 border-white/10 text-white focus:border-white/20 focus:ring-white/5 placeholder:text-zinc-650"
                    }`}
                  />
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  disabled={isScanning || !batchInput}
                  className={`px-6 py-3 rounded-xl text-xs font-black tracking-wider uppercase transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
                    isLight 
                      ? "bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-50" 
                      : "bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                  }`}
                >
                  {isScanning ? "Scanning..." : "Scan Batch"}
                </button>
              </form>
            </div>

            {/* Right: Simulated Scanner output terminal (7 cols) */}
            <div className="lg:col-span-7">
              <div className={`p-6 rounded-2xl border min-h-[190px] flex flex-col justify-center relative overflow-hidden font-mono ${
                isLight ? "bg-zinc-50 border-zinc-200" : "bg-[#060607] border-white/5"
              }`}>
                {/* Laser scan animation line */}
                {isScanning && (
                  <motion.div 
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10b981] z-20 pointer-events-none"
                  />
                )}

                <AnimatePresence mode="wait">
                  {isScanning ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2 text-left text-[11px] text-zinc-400"
                    >
                      <p className="animate-pulse">&gt; INITIALIZING ENCRYPTED HANDSHAKE...</p>
                      <p className="delay-300 animate-pulse">&gt; DECRYPTING SERIAL SIGNATURE KEYS...</p>
                      <p className="delay-700 animate-pulse">&gt; VERIFYING AIR CARGO BILL LOGS...</p>
                    </motion.div>
                  ) : scanResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 text-left text-xs"
                    >
                      {scanResult.status === "verified" ? (
                        <>
                          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                            <ShieldCheck className="w-4.5 h-4.5" />
                            <span>AUTHENTIC BATCH RECOGNIZED</span>
                          </div>
                          <div className="space-y-1.5 text-[11px] text-zinc-400 pt-1">
                            <p><span className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mr-1">Code:</span> {scanResult.code}</p>
                            <p><span className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mr-1">Origin:</span> {scanResult.origin}</p>
                            <p><span className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mr-1">Transit:</span> {scanResult.transit}</p>
                            <p><span className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mr-1">Formula:</span> {scanResult.nicotine}</p>
                            <p><span className="text-zinc-500 dark:text-zinc-600 font-bold uppercase mr-1">Seal Status:</span> {scanResult.seal}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 text-red-500 font-bold text-xs">
                            <AlertCircle className="w-4.5 h-4.5" />
                            <span>SCAN VERIFICATION FAILED</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 pt-1 font-mono leading-relaxed">
                            {scanResult.msg}
                          </p>
                        </>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-[11px] text-zinc-400 space-y-1.5"
                    >
                      <p>&gt; SECURE SYSTEM READY FOR SCANNING</p>
                      <p className="text-[10px] text-zinc-500">Insert code on box bottom to view logistics chain details.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
