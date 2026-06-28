import { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const handlePrev = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-20 bg-zinc-950 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-red-500 font-bold uppercase tracking-widest text-[11px] inline-flex items-center space-x-1.5 mb-2 bg-red-500/10 px-4 py-1.5 rounded-full">
            <Camera className="w-3.5 h-3.5" />
            <span>Kitchen Visuals</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Behind the <span className="text-yellow-400">Scenes</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Take a visual tour of our busy kitchen! From hand-stretching dough to grilling beef patties, watch where the magic happens.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActivePhotoIdx(idx)}
              className="group relative h-72 rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer shadow-lg bg-zinc-900"
              id={`gallery-item-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10" />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-1" />

              {/* Hover actions and text */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <div className="bg-yellow-400 text-zinc-950 p-2.5 rounded-xl shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-widest bg-zinc-900/80 px-2 py-1 rounded-md border border-white/5">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 tracking-tight line-clamp-1 group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <div className="fixed inset-0 bg-zinc-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setActivePhotoIdx(null)}
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row"
            >
              {/* Visual Frame */}
              <div className="flex-1 max-h-[500px] overflow-hidden bg-black flex items-center justify-center relative group">
                <img
                  src={GALLERY_ITEMS[activePhotoIdx].image}
                  alt={GALLERY_ITEMS[activePhotoIdx].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-950/80 hover:bg-red-600 text-white p-2.5 rounded-full border border-white/10 hover:border-transparent transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-950/80 hover:bg-red-600 text-white p-2.5 rounded-full border border-white/10 hover:border-transparent transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Description Panel */}
              <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-zinc-900">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-black text-red-500 uppercase tracking-widest bg-zinc-950 border border-white/10 px-2 py-1 rounded">
                      {GALLERY_ITEMS[activePhotoIdx].category}
                    </span>
                    <button
                      onClick={() => setActivePhotoIdx(null)}
                      className="text-zinc-400 hover:text-red-500 p-1 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight leading-snug">
                    {GALLERY_ITEMS[activePhotoIdx].title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Captured live inside Foodie's Hub flagship kitchen. We maintain the highest standards of culinary hygiene, temperature controls, and recipe consistency.
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span>Hygienic prep</span>
                  </span>
                  <span>Photo {activePhotoIdx + 1} of {GALLERY_ITEMS.length}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
