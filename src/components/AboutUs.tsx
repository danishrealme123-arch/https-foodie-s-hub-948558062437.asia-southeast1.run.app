import { Award, ShieldCheck, Heart, ChefHat, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  const USP_ITEMS = [
    {
      icon: <ChefHat className="w-5 h-5 text-red-500" />,
      title: 'Our Master Chefs',
      desc: 'Our chefs carry over a decade of fast-casual culinary expertise, drafting flavor menus with innovative spins.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-yellow-400" />,
      title: '100% Fresh Ingredients',
      desc: 'We source daily farm-fresh tomatoes, organic greens, and local premium beef. Frozen foods are strictly forbidden.'
    },
    {
      icon: <Award className="w-5 h-5 text-red-500" />,
      title: 'Award Winning Taste',
      desc: 'Voted "Best Burger Joint of the Year" for three consecutive years by the Local Food Guild Association.'
    },
    {
      icon: <Heart className="w-5 h-5 text-yellow-400" />,
      title: 'Hygienic Preparation',
      desc: 'Surgical sanitization, medical-grade mask shields, and temperature-controlled grills ensure total safety.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-zinc-900 border-b border-white/5 overflow-hidden relative">
      {/* Decorative vector background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Block: Image Collage */}
          <div className="relative">
            {/* Primary Main Image */}
            <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden border-2 border-white/5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
                alt="Chefs prepping artisanal burger"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </div>

            {/* Float Badge 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-6 -left-6 bg-zinc-950/95 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl hidden sm:flex items-center space-x-3 max-w-xs"
            >
              <div className="bg-red-600 p-2.5 rounded-xl text-white">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display text-lg font-black text-white">100% Handcrafted</span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Every burger is made-to-order</span>
              </div>
            </motion.div>

            {/* Float Badge 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute top-12 -right-6 bg-zinc-950/95 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl hidden sm:flex items-center space-x-3"
            >
              <span className="font-mono text-3xl font-black text-yellow-400">10+</span>
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">Outlets Nationwide</span>
                <span className="text-[9px] text-zinc-500">Expanding rapidly across cities</span>
              </div>
            </motion.div>
          </div>

          {/* Right Block: Narrative and USP Grid */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-yellow-400 font-bold uppercase tracking-widest text-[11px] inline-flex items-center space-x-1.5 bg-yellow-400/10 px-4 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage</span>
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Crafting Joy, One <span className="text-red-500">Flame-Grilled</span> Bite at a Time
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Founded in 2018 with a humble food truck and a single vision: to serve high-end gourmet culinary burgers at fast-food convenience. Today, Foodie’s Hub represents the Gold Standard of casual dining, fusing premium ingredient sourcing, bold seasoning recipes, and outstanding logistics.
              </p>
            </div>

            {/* Grid of USPs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {USP_ITEMS.map((item, index) => (
                <div key={index} className="flex items-start space-x-3.5">
                  <div className="bg-zinc-950 border border-white/5 p-2.5 rounded-xl flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white tracking-wide uppercase">{item.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Brief Quote */}
            <blockquote className="border-l-4 border-red-600 bg-zinc-950/50 p-4 rounded-r-2xl italic text-xs sm:text-sm text-zinc-400">
              "Cooking is like painting or writing a song. Just as there are only so many notes or colors, there are only so many flavors - it is how you combine them that sets you apart."
              <span className="block text-right font-display text-xs font-bold uppercase text-white mt-2 not-italic tracking-wider">— Chef Marcus Vane, Head of Hub Recipes</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
