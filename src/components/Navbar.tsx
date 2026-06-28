import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, UtensilsCrossed, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartItemCount: number;
  onCartToggle: () => void;
  activeSection: string;
}

export default function Navbar({ cartItemCount, onCartToggle, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Offers', href: '#offers' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About Us', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-zinc-900/90 backdrop-blur-md shadow-lg border-b border-white/5 py-3'
            : 'bg-gradient-to-b from-zinc-950/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-2 group" id="nav-logo">
              <div className="w-9 h-9 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-xl transition-all-custom group-hover:bg-yellow-400 group-hover:text-black">
                F
              </div>
              <span className="font-display text-xl font-black uppercase tracking-tighter">
                FOODIE'S <span className="text-yellow-400 group-hover:text-red-500 transition-colors">HUB</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-200 relative py-1 ${
                    activeSection === link.href.slice(1)
                      ? 'text-yellow-400 font-black'
                      : 'text-zinc-300 hover:text-red-500'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Actions (Phone + Cart + Mobile menu toggle) */}
            <div className="flex items-center space-x-4">
              {/* Order Phone Number */}
              <a
                href="tel:+18005553663"
                className="hidden md:flex items-center space-x-2 bg-zinc-900 border border-zinc-800 hover:border-red-600 hover:text-red-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all-custom"
                id="phone-contact-button"
              >
                <PhoneCall className="w-4 h-4 text-red-500" />
                <span>+1 (800) 555-FOOD</span>
              </a>

              {/* Shopping Cart Trigger */}
              <button
                onClick={onCartToggle}
                className="relative bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                id="cart-trigger-btn"
                aria-label="Open Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-zinc-950 text-xs font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-zinc-950 shadow-md"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden bg-zinc-900 border border-zinc-850 text-zinc-100 hover:text-yellow-400 p-2.5 rounded-xl transition-colors cursor-pointer"
                id="mobile-menu-btn"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-zinc-950 z-40 lg:hidden"
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-zinc-900 border-l border-zinc-850 z-50 p-6 shadow-2xl flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <span className="font-display text-lg font-black uppercase tracking-tighter">
                    FOODIE'S<span className="text-yellow-400"> HUB</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-8 flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-bold tracking-wide uppercase py-2 border-b border-zinc-800/50 transition-colors ${
                        activeSection === link.href.slice(1)
                          ? 'text-yellow-400'
                          : 'text-zinc-300 hover:text-red-500'
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 space-y-4">
                <a
                  href="tel:+18005553663"
                  className="flex items-center justify-center space-x-2 bg-zinc-950 border border-zinc-850 hover:border-red-600 hover:text-red-500 p-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all-custom"
                >
                  <PhoneCall className="w-4 h-4 text-red-500" />
                  <span>+1 (800) 555-FOOD</span>
                </a>
                <p className="text-center text-xs text-zinc-500">
                  Open 10:00 AM - 11:30 PM Everyday
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
