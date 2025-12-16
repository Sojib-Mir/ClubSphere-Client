import React from "react";
import { Globe, ShieldCheck, Zap } from "lucide-react";

const About = () => {
  return (
    <section className="min-h-[600px] flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-500">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
            About ClubSphere
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            Connecting the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-blue-600">
              Spheres
            </span>{" "}
            of Passion.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            ClubSphere is more than a management tool; it's a digital ecosystem
            designed to scale communities. We bridge the gap between passion and
            organization.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full font-bold hover:scale-105 transition-transform active:scale-95 cursor-pointer">
              Our Vision
            </button>
          </div>
        </div>

        {/* Right Side: Animated Card */}
        <div className="relative group perspective-1000">
          {/* Animated Glow Background */}
          <div className="absolute -inset-1 bg-linear-to-r from-emerald-600 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-45 transition duration-1000 group-hover:duration-200"></div>

          {/* Main Card */}
          <div
            className="relative flex flex-col justify-between h-[450px] w-full 
            bg-linear-to-br from-emerald-900 to-blue-900 
            dark:bg-linear-to-br dark:from-emerald-400/20 dark:to-blue-500/20 
            backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] 
            shadow-2xl transform-gpu transition-all duration-500 
            group-hover:rotate-x-2 group-hover:rotate-y-6 group-hover:-translate-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                <Globe className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              <div className="text-right">
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                  Est. 2025
                </p>
                <div className="h-1 w-12 bg-emerald-400 ml-auto mt-1 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white tracking-tight">
                Empowering 10k+ <br />
                Global Communities
              </h3>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-emerald-900 bg-slate-800 flex items-center justify-center text-[10px] text-white font-bold"
                  >
                    U{i}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-emerald-900 bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">
                  +
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-between items-center">
              <div>
                <p className="text-white font-bold">ClubSphere Pro</p>
                <p className="text-white/40 text-xs uppercase">
                  Enterprise Grade
                </p>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
