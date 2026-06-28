import { Star, MessageSquare, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-zinc-950 border-b border-white/5 relative">
      {/* Background visual details */}
      <div className="absolute top-1/3 -right-24 w-48 h-48 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-red-500 font-bold uppercase tracking-widest text-[11px] inline-flex items-center space-x-1.5 mb-2 bg-red-500/10 px-4 py-1.5 rounded-full">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Stories</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            What Our Foodies <span className="text-yellow-400">Say</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Don’t just take our word for it! Here are verified testimonials from real food lovers who fell in love with our flame-grilled taste.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => {
            // Generate full stars array
            const fullStars = Math.floor(testimonial.rating);
            const halfStar = testimonial.rating % 1 !== 0;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] relative shadow-xl flex flex-col justify-between hover:border-yellow-400/30 transition-all duration-300 group"
                id={`review-card-${testimonial.id}`}
              >
                {/* Quote Icon watermark */}
                <Quote className="absolute top-6 right-8 w-12 h-12 text-zinc-850/40 group-hover:text-red-600/10 transition-colors" />

                {/* Stars and feedback */}
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${
                          starIdx < fullStars
                            ? 'text-yellow-400 fill-yellow-400'
                            : starIdx === fullStars && halfStar
                            ? 'text-yellow-400 fill-yellow-400 opacity-80'
                            : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-zinc-300 text-sm leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="flex items-center space-x-4 pt-6 mt-8 border-t border-white/5">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border border-zinc-850 group-hover:border-red-500 transition-colors"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide uppercase group-hover:text-yellow-400 transition-colors">
                      {testimonial.name}
                    </h4>
                    <div className="flex justify-between items-center w-full min-w-[180px]">
                      <span className="text-xs text-zinc-400">{testimonial.role}</span>
                      <span className="text-[10px] text-zinc-500 font-mono pr-4">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
