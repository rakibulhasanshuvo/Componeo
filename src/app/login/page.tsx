"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Matrix access granted." });
      // Redirect to dashboard logic would happen here or in a useEffect
      // listening to auth state change, or simply window.location.href
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    }
  };

  return (
    <div className="asymmetric-gradient min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 pt-40 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[450px] glass-premium rounded-[20px] p-8 shadow-2xl relative overflow-hidden group"
        >
          {/* Internal Refraction Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/5 blur-[100px] pointer-events-none group-hover:bg-cyan-400/10 transition-colors duration-1000" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
               <h1 className="font-headline text-3xl font-black text-white italic uppercase tracking-tighter chromatic-text">
                  Sign In
               </h1>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-neutral-300 font-semibold mb-2 text-sm">Email</label>
                <div className="relative border-[1.5px] border-white/10 rounded-[10px] h-[50px] flex items-center px-3 transition-colors duration-200 focus-within:border-cyan-400 bg-black/40">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 32 32" height={20} className="text-neutral-400 fill-current"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" /></g></svg>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className="ml-2.5 rounded-[10px] border-none w-full h-full bg-transparent text-white focus:outline-none placeholder:text-neutral-500 text-sm"
                    type="email"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-neutral-300 font-semibold mb-2 text-sm">Password</label>
                <div className="relative border-[1.5px] border-white/10 rounded-[10px] h-[50px] flex items-center px-3 transition-colors duration-200 focus-within:border-cyan-400 bg-black/40">
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="-64 0 512 512" height={20} className="text-neutral-400 fill-current"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="ml-2.5 rounded-[10px] border-none w-full h-full bg-transparent text-white focus:outline-none placeholder:text-neutral-500 text-sm"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex flex-row items-center justify-between text-sm mt-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember-me" className="accent-cyan-400 w-4 h-4 rounded border-white/10 bg-black/40" />
                  <label htmlFor="remember-me" className="text-neutral-300 font-normal cursor-pointer">Remember me</label>
                </div>
                <span className="text-cyan-400 font-medium cursor-pointer hover:underline">Forgot password?</span>
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-xs font-semibold text-center border ${
                  message.type === "success" 
                    ? "bg-emerald-400/5 border-emerald-400/20 text-emerald-400" 
                    : "bg-red-400/5 border-red-400/20 text-red-400"
                }`}>
                  {message.text}
                </div>
              )}

              <button
                disabled={loading}
                type="submit"
                className="mt-5 mb-2.5 bg-white text-black font-semibold text-[15px] rounded-[10px] h-[50px] w-full cursor-pointer hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <p className="text-center text-neutral-400 text-sm my-1.5">
                Don't have an account? <span className="ml-1 text-cyan-400 font-medium cursor-pointer hover:underline">Sign Up</span>
              </p>

              <div className="flex items-center my-2">
                <div className="flex-1 h-px bg-white/10"></div>
                <p className="text-center text-neutral-400 text-sm mx-4">Or With</p>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-2.5">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('google')}
                  disabled={loading}
                  className="w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-white/10 bg-black/40 text-white cursor-pointer transition-colors hover:border-cyan-400 hover:bg-white/5 disabled:opacity-50"
                >
                  <svg xmlSpace="preserve" style={{enableBackground: 'new 0 0 512 512'}} viewBox="0 0 512 512" y="0px" x="0px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" width={20} version="1.1">
                    <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256 c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456 C103.821,274.792,107.225,292.797,113.47,309.408z" style={{fill: '#FBBB00'}} />
                    <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451 c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535 c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style={{fill: '#518EF8'}} />
                    <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512 c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771 c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style={{fill: '#28B446'}} />
                    <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012 c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0 C318.115,0,375.068,22.126,419.404,58.936z" style={{fill: '#F14336'}} />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('apple')}
                  disabled={loading}
                  className="w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-white/10 bg-black/40 text-white cursor-pointer transition-colors hover:border-cyan-400 hover:bg-white/5 disabled:opacity-50"
                >
                  <svg xmlSpace="preserve" style={{enableBackground: 'new 0 0 22.773 22.773'}} viewBox="0 0 22.773 22.773" y="0px" x="0px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Capa_1" width={20} height={20} version="1.1" className="fill-current text-white"> <g> <g> <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" /> <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" /> </g></g></svg>
                  Apple
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
