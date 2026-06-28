import { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, X, Check, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Data
import { MenuItem, CartItem } from './types';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SpecialOffers from './components/SpecialOffers';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Custom Toast Notification System State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'offer'>('success');

  // Show a beautiful temporary toast
  const triggerToast = (message: string, type: 'success' | 'info' | 'offer' = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Active section scroll watcher
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'offers', 'menu', 'gallery', 'about', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for sticky navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart Operations
  const handleAddToCart = (menuItem: MenuItem, customization?: any) => {
    setCartItems((prevItems) => {
      // Check if item with exact same customization is already in cart
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.menuItem.id === menuItem.id &&
          JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (existingItemIndex > -1) {
        // Increment quantity
        const updated = [...prevItems];
        updated[existingItemIndex].quantity += 1;
        triggerToast(`Added another ${menuItem.name} to cart!`, 'success');
        return updated;
      } else {
        // Add new item
        triggerToast(`${menuItem.name} added to your cart!`, 'success');
        return [...prevItems, { menuItem, quantity: 1, customization }];
      }
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    const itemName = cartItems[index].menuItem.name;
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    triggerToast(`Removed ${itemName} from your cart.`, 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleApplyCoupon = (code: string): boolean => {
    const uppercaseCode = code.trim().toUpperCase();
    if (uppercaseCode === 'BURGER25' || uppercaseCode === 'PIZZAPARTY' || uppercaseCode === 'LOADEDFRIES') {
      setAppliedCoupon(uppercaseCode);
      triggerToast(`Promo code ${uppercaseCode} successfully applied!`, 'offer');
      return true;
    }
    return false;
  };

  const handleClaimOffer = (code: string) => {
    // Set coupon code
    handleApplyCoupon(code);
    // Open cart drawer so user sees it in action
    setTimeout(() => {
      setCartDrawerOpen(true);
    }, 500);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between overflow-x-hidden selection:bg-red-600 selection:text-white font-sans">
      {/* Sticky Top-level Navigation */}
      <Navbar
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartToggle={() => setCartDrawerOpen(!cartDrawerOpen)}
        activeSection={activeSection}
      />

      {/* Primary Layout Sections */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero />

        {/* Daily Special Offers Carousel/Promo cards */}
        <SpecialOffers onClaimOffer={handleClaimOffer} />

        {/* Detailed Interactive Restaurant Menu */}
        <Menu onAddToCart={handleAddToCart} />

        {/* Food and Kitchen Preparation Gallery */}
        <Gallery />

        {/* Brand Mission, History, and USPs Section */}
        <AboutUs />

        {/* Testimonials Review Cards Section */}
        <Testimonials />

        {/* Contact Form & Simulated Interactive Vector Map */}
        <Contact />
      </main>

      {/* Beautiful Crafted Footer */}
      <Footer />

      {/* Slide-over Shopping Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
      />

      {/* Sleek Animated Toast Notifications Panel */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-3 bg-zinc-900 border border-zinc-800 text-white px-5 py-4 rounded-2xl shadow-2xl max-w-sm w-[90%] md:w-auto"
            style={{
              boxShadow:
                toastType === 'success'
                  ? '0 20px 25px -5px rgba(220, 38, 38, 0.15)'
                  : toastType === 'offer'
                  ? '0 20px 25px -5px rgba(250, 204, 21, 0.15)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
            }}
          >
            {/* Status Icon */}
            <div
              className={`p-1.5 rounded-lg flex-shrink-0 text-zinc-950 ${
                toastType === 'success'
                  ? 'bg-red-600 text-white'
                  : toastType === 'offer'
                  ? 'bg-yellow-400 text-zinc-950 animate-pulse'
                  : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              {toastType === 'success' && <Check className="w-4 h-4" />}
              {toastType === 'offer' && <Flame className="w-4 h-4" />}
              {toastType === 'info' && <ShoppingBag className="w-4 h-4" />}
            </div>

            {/* Message */}
            <span className="text-xs md:text-sm font-semibold tracking-wide leading-snug flex-1">
              {toastMessage}
            </span>

            {/* Dismiss Cross */}
            <button
              onClick={() => setToastMessage(null)}
              className="text-stone-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
