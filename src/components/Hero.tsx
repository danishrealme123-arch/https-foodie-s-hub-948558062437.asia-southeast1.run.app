import { Flame, Clock, Sparkles, ChevronRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
// @ts-ignore
import heroBg from '../assets/images/burger_hero_bg_1782300588068.jpg';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-20"
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Flame Grilled Gourmet Burger Background"
          className="w-full h-full object-cover object-center scale-105 select-none"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to keep typography highly readable */}
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-zinc-950/20 via-zinc-950/70 to-zinc-950 z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-transparent z-1 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-1" />
      </div>

      {/* Abstract Burger Shape Background Overlay matching the theme mockup */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-3xl z-1 pointer-events-none hidden lg:block"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-24 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:max-w-xl">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center md:justify-start gap-3"
            >
              <span className="inline-flex items-center space-x-1.5 bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md shadow-red-900/30">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                <span>PREMIUM QUALITY</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-yellow-400 text-black text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md shadow-yellow-400/20">
                <Clock className="w-3.5 h-3.5" />
                <span>20 Min Express Delivery</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.85] italic"
              >
                The Ultimate <br />
                <span className="text-yellow-400">
                  Burger Hub
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed max-w-md"
              >
                Experience the explosion of flavors with our 100% grass-fed beef, premium melted cheddar, fresh organic greens, and our legendary secret sauce.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2"
            >
              <a
                href="#menu"
                className="inline-flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black font-extrabold uppercase tracking-wider text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-yellow-400/10 transition-all-custom cursor-pointer"
                id="hero-order-now-btn"
              >
                <span>View Menu</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center space-x-2 border border-white/25 hover:bg-white/5 active:scale-95 text-white font-extrabold uppercase tracking-wider text-sm px-8 py-3.5 rounded-2xl transition-all-custom cursor-pointer"
                id="hero-offers-btn"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Our Story</span>
              </a>
            </motion.div>

            {/* Quick Stats Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-800"
            >
              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-black text-yellow-400">4.9★</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">12k+ Reviews</span>
              </div>
              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-black text-red-500">20m</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">Fast delivery</span>
              </div>
              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-black text-white">100%</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">Fresh Quality</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Interactive Product Card (Visual Accent for Mobile/Desktop) */}
          <div className="hidden md:flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
              className="bg-zinc-900 rounded-[2.5rem] border border-white/5 p-6 max-w-sm shadow-2xl relative group overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                Bestseller
              </div>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=350&q=80"
                alt="Hub Double Stack burger"
                className="w-full h-48 object-cover rounded-3xl mb-4 group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">Hub Double Stack</h3>
                <span className="font-mono text-yellow-400 font-extrabold">₹299</span>
              </div>
              <p className="text-xs text-zinc-400 mb-4 line-clamp-2">
                Double flame-grilled beef patties, melted cheddar, lettuce, tomatoes, and secret hub signature house sauce.
              </p>
              <a
                href="#menu"
                className="w-full flex items-center justify-center space-x-1 bg-zinc-950 border border-white/10 group-hover:border-red-600 group-hover:bg-red-600 text-white py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                <span>Customize & Order</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave/Splat Transition */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 text-zinc-950"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
