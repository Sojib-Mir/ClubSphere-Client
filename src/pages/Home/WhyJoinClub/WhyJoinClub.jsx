import React from "react";
import { Users, Sparkles, Trophy, Camera } from "lucide-react";

const WhyJoinAClub = () => {
  return (
    <section className="md:bg-slate-95 rounded py-24 overflow-hidden max-w-7xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-center items-center mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-center">
            Why Join a Club?
          </h2>
          <div className="h-2 w-48 md:w-65 bg-orange-500 rounded-full text-center mb-6 -ml-35 md:-ml-55"></div>
          <p className="text-slate-400 text-xl max-w-xl text-center">
            Unlock new opportunities, master elite skills, and build lifelong
            friendships.
          </p>
        </div>

        {/* Unique Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* Card 1: The "Tilt" Card (New Connections) */}
          <div className="md:col-span-4 bg-white p-8 rounded-8 flex flex-col justify-between transform md:-rotate-3 hover:rotate-0 transition-all duration-500 shadow-xl group rounded-4xl border border-gray-200">
            <div className="flex justify-end">
              <Users className="w-10 h-10 text-orange-500 group-hover:scale-125 transition-transform" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-900 leading-none mb-4">
                New <br />
                Connections
              </h3>
              <button className="bg-orange-500 text-white px-3 rounded-3xl w-fit hover:pr-10 transition-all">
                →
              </button>
            </div>
          </div>

          {/* Card 2: The "Glass-Progress" Card (Skill Development) */}
          <div className="md:col-span-8 bg-linear-to-br from-emerald-900 to-blue-900 dark:bg-linear-to-br dark:from-emerald-400/20 dark:to-blue-500/20 dark:backdrop-blur-xl backdrop-blur-xl border border-emerald-500/20 dark:border-white/10 p-8 rounded-4xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex justify-between items-start relative z-10">
              <div className="bg-white/10 p-4 rounded-2xl">
                <Sparkles className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-white mb-2">
                Skill Development
              </h3>
              <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-emerald-400 h-full w-2/3 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          </div>

          {/* Card 3: The "Neon Glow" Card (Personal Growth) */}
          <div className="md:col-span-7 bg-slate-900 border-2 border-pink-500/30 p-8 rounded-4xl shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)] hover:shadow-pink-500/20 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent)] group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
              <Trophy className="w-12 h-12 text-pink-500 mb-6 group-hover:bounce transition-transform" />
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                Personal Growth
              </h3>
              <button className="mt-6 px-6 py-2 border border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Card 4: The "Photo" Card (Shared Experiences) */}
          <div className="md:col-span-5 bg-orange-50 p-8 rounded-4xl border-l-16 border-orange-500 flex flex-col justify-between group">
            <div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">
                Shared Experiences
              </h3>
              <p className="text-slate-600 text-sm">
                Capturing moments that define your journey within the sphere.
              </p>
            </div>
            <div className="flex justify-center py-6">
              <div className="bg-slate-200 w-32 h-24 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Camera className="w-10 h-10 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyJoinAClub;
