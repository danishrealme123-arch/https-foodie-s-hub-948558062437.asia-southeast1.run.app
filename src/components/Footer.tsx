import React, { useState } from 'react';
import { UtensilsCrossed, Facebook, Instagram, Twitter, Youtube, ArrowUp, Send, Check, Heart } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-white/5 relative z-10 overflow-hidden">
      {/* Upper Brand & Newsletter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Logo & Pitch */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#home" className="flex items-center space-x-2 group w-max">
              <div className="bg-red-600 text-white p-2 rounded-xl group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-all duration-300">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-black uppercase tracking-wider text-white">
                Foodie's<span className="text-red-600 group-hover:text-yellow-400 transition-colors"> Hub</span>
              </span>
            </a>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Award-winning flame-grilled gourmet beef burgers, hand-stretched woodfired pizzas, and thick hand-spun caramel shakes. Freshly prepared to satisfy your deepest culinary cravings.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-zinc-900 border border-white/5 p-6 rounded-[2.5rem] space-y-4 max-w-2xl lg:ml-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Subscribe to our newsletter</h4>
                <p className="text-xs text-zinc-500">Get secret coupons, chef recipes, and 15% off your next order.</p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-zinc-950 border border-white/10 focus:border-red-500 text-white text-xs rounded-xl px-4 py-3 focus:outline-none transition-colors"
                disabled={isSubscribed}
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                  isSubscribed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Middle Links and Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li><a href="#home" className="hover:text-yellow-400 transition-colors uppercase tracking-wider">Home Base</a></li>
              <li><a href="#offers" className="hover:text-yellow-400 transition-colors uppercase tracking-wider">Sizzling Offers</a></li>
              <li><a href="#menu" className="hover:text-yellow-400 transition-colors uppercase tracking-wider">Interactive Menu</a></li>
              <li><a href="#gallery" className="hover:text-yellow-400 transition-colors uppercase tracking-wider">Behind The Scenes</a></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">
              Our Story
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li><a href="#about" className="hover:text-yellow-400 transition-colors uppercase tracking-wider">About Hub</a></li>
              <li><a href="#reviews" className="hover:text-yellow-400 transition-colors uppercase tracking-wider">Verified Reviews</a></li>
              <li><a href="#contact" className="hover:text-yellow-400 transition-colors uppercase tracking-wider">Find Flagship</a></li>
            </ul>
          </div>

          {/* Opening Hours Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">
              Opening Hours
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
              <li className="flex justify-between"><span>Monday - Friday</span><span className="text-white">10:00 AM - 11:30 PM</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="text-white">10:00 AM - 12:00 AM</span></li>
              <li className="flex justify-between"><span>Sunday</span><span className="text-white">10:00 AM - 11:00 PM</span></li>
              <li className="flex justify-between text-yellow-400"><span>Delivery line opens</span><span>At 10:30 AM</span></li>
            </ul>
          </div>

          {/* Social Links and Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/5 pb-2">
              Follow Our Kitchen
            </h4>
            <p className="text-xs text-zinc-400">Join our digital culinary family for secret updates and fast notifications.</p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 hover:bg-red-600 hover:text-white p-2.5 rounded-xl border border-white/5 hover:border-transparent transition-all duration-300 text-zinc-400 cursor-pointer">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 hover:bg-red-600 hover:text-white p-2.5 rounded-xl border border-white/5 hover:border-transparent transition-all duration-300 text-zinc-400 cursor-pointer">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 hover:bg-red-600 hover:text-white p-2.5 rounded-xl border border-white/5 hover:border-transparent transition-all duration-300 text-zinc-400 cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-zinc-900 hover:bg-red-600 hover:text-white p-2.5 rounded-xl border border-white/5 hover:border-transparent transition-all duration-300 text-zinc-400 cursor-pointer">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-zinc-950 border-t border-white/5 py-6 text-center text-xs text-zinc-500 relative px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Foodie's Hub Ltd. All rights reserved. Handcrafted with precision.</p>

          <p className="flex items-center space-x-1 justify-center">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-600 fill-red-600" />
            <span>for authentic flavor lovers</span>
          </p>

          {/* Scroll To Top button */}
          <button
            onClick={scrollToTop}
            className="bg-zinc-900 border border-white/10 hover:border-red-600 text-zinc-400 hover:text-white p-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center group"
            title="Scroll to Top"
            id="scroll-to-top-btn"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
