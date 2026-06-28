import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, Ticket, Check, ChevronRight, Truck, MapPin, CreditCard, Sparkles, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
}

type StepType = 'cart' | 'checkout' | 'success';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedCoupon,
  onApplyCoupon
}: CartDrawerProps) {
  const [step, setStep] = useState<StepType>('cart');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState(false);

  // Checkout Form State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live order tracking simulation state
  const [orderId, setOrderId] = useState('');
  const [deliveryStage, setDeliveryStage] = useState(0);

  // Reset checkout and tracking on open
  useEffect(() => {
    if (isOpen) {
      setStep('cart');
      setCouponInput(appliedCoupon || '');
      setCouponError(null);
      setCouponSuccess(!!appliedCoupon);
    }
  }, [isOpen, appliedCoupon]);

  // Simulate Order Tracking Milestones
  useEffect(() => {
    if (step === 'success') {
      const interval = setInterval(() => {
        setDeliveryStage((prev) => {
          if (prev < 3) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 7000); // Progress every 7 seconds

      return () => clearInterval(interval);
    } else {
      setDeliveryStage(0);
    }
  }, [step]);

  // Calculators
  const subtotal = cartItems.reduce((acc, item) => {
    let price = item.menuItem.price;
    if (item.customization?.extraCheese) price += 40;
    if (item.customization?.extraPatty) price += 90;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon === 'BURGER25'
    ? subtotal * 0.25
    : appliedCoupon === 'PIZZAPARTY'
    ? subtotal * 0.15
    : 0;

  const deliveryFee = subtotal > 499 ? 0 : 49;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyCouponBtn = () => {
    setCouponError(null);
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponSuccess(true);
      setCouponError(null);
    } else {
      setCouponSuccess(false);
      setCouponError('Invalid coupon code. Try BURGER25 or PIZZAPARTY.');
    }
  };

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    setStep('checkout');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !deliveryAddress) {
      alert('Please fill out all delivery details.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderId('FH-' + Math.floor(100000 + Math.random() * 900000));
      setStep('success');
      onClearCart();
    }, 1500);
  };

  const stages = [
    { label: 'Order Received', desc: 'Sizzling request sent to kitchen', time: 'Just now' },
    { label: 'Preparing Feast', desc: 'Chefs are grilling patties & tossing dough', time: 'In progress' },
    { label: 'Out with Rider', desc: 'Fresh and hot in thermal bags', time: 'Estim. 12 mins' },
    { label: 'Delivered!', desc: 'Enjoy your delicious Foodie’s Hub feast!', time: 'Delivered' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-zinc-900 border-l border-white/5 z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-950">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-red-500" />
                <span className="font-display text-lg font-black uppercase tracking-wider text-white">
                  {step === 'cart' && 'Your Cart'}
                  {step === 'checkout' && 'Checkout details'}
                  {step === 'success' && 'Cooking Status'}
                </span>
                {cartItems.length > 0 && step === 'cart' && (
                  <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {/* PHASE 1: CART LIST */}
              {step === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                      <div className="bg-zinc-950 p-6 rounded-full border border-white/5 text-zinc-600">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                      <h3 className="text-white text-lg font-bold">Your Cart is Empty</h3>
                      <p className="text-zinc-400 text-sm max-w-xs">
                        Browse our delicious menu of flame-grilled burgers, fresh pizzas, and crispy sides to satisfy your cravings.
                      </p>
                      <button
                        onClick={onClose}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl shadow-lg transition-all"
                      >
                        Start Ordering
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {cartItems.map((item, idx) => {
                          const hasCustomization =
                            item.customization?.extraCheese ||
                            item.customization?.extraPatty ||
                            item.customization?.makeSpicy ||
                            item.customization?.noOnions;

                          const customizedPrice = (() => {
                            let price = item.menuItem.price;
                            if (item.customization?.extraCheese) price += 40;
                            if (item.customization?.extraPatty) price += 90;
                            return price;
                          })();

                          return (
                            <motion.div
                              layout
                              key={`${item.menuItem.id}-${idx}`}
                              className="flex items-start space-x-4 p-4 bg-zinc-950 border border-white/5 rounded-2xl relative"
                            >
                              <img
                                src={item.menuItem.image}
                                alt={item.menuItem.name}
                                className="w-16 h-16 object-cover rounded-xl"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className="text-sm font-bold text-white truncate pr-4">
                                    {item.menuItem.name}
                                  </h4>
                                  <span className="font-mono text-sm font-bold text-yellow-400">
                                    ₹{(customizedPrice * item.quantity).toFixed(0)}
                                  </span>
                                </div>

                                {/* Customizations text */}
                                {hasCustomization && (
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {item.customization?.extraCheese && (
                                      <span className="text-[10px] bg-yellow-400/10 text-yellow-400 px-1.5 py-0.5 rounded font-medium">
                                        + Extra Cheese
                                      </span>
                                    )}
                                    {item.customization?.extraPatty && (
                                      <span className="text-[10px] bg-yellow-400/10 text-yellow-400 px-1.5 py-0.5 rounded font-medium">
                                        + Extra Patty
                                      </span>
                                    )}
                                    {item.customization?.makeSpicy && (
                                      <span className="text-[10px] bg-red-600/10 text-red-500 px-1.5 py-0.5 rounded font-medium">
                                        Spicy 🔥
                                      </span>
                                    )}
                                    {item.customization?.noOnions && (
                                      <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-medium">
                                        No Onions
                                      </span>
                                    )}
                                  </div>
                                )}

                                {/* Quantity Toggles */}
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center space-x-1 bg-zinc-900 border border-white/5 rounded-lg p-1">
                                    <button
                                      onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                                      className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="font-mono text-xs font-bold text-white px-2.5">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                                      className="text-zinc-400 hover:text-yellow-400 p-1 cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => onRemoveItem(idx)}
                                    className="text-zinc-500 hover:text-red-500 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                                    title="Delete item"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Coupon Application Box */}
                      <div className="bg-zinc-950 border border-white/5 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
                            <Ticket className="w-4 h-4 text-red-500" />
                            <span>Redeem Coupon</span>
                          </span>
                          <span className="text-[10px] text-zinc-500">BURGER25 / PIZZAPARTY</span>
                        </div>

                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Enter Code..."
                            className="flex-1 bg-zinc-900 border border-white/5 focus:border-red-500 text-white font-mono text-sm uppercase tracking-widest rounded-xl px-3 focus:outline-none"
                            disabled={couponSuccess}
                          />
                          <button
                            onClick={handleApplyCouponBtn}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 cursor-pointer ${
                              couponSuccess
                                ? 'bg-emerald-600 text-white'
                                : 'bg-zinc-800 hover:bg-yellow-400 text-zinc-300 hover:text-zinc-950'
                            }`}
                          >
                            {couponSuccess ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Applied</span>
                              </>
                            ) : (
                              <span>Apply</span>
                            )}
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-[11px] text-red-500 font-medium">{couponError}</p>
                        )}
                        {couponSuccess && (
                          <p className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1">
                            <Check className="w-3.5 h-3.5 inline" />
                            <span>Coupon applied successfully! Saving you cash.</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* PHASE 2: CHECKOUT FORM */}
              {step === 'checkout' && (
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="bg-zinc-950 border border-white/5 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider border-b border-white/5 pb-2 flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Delivery Details</span>
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Aarav Sharma"
                          className="w-full bg-zinc-900 border border-white/5 focus:border-red-500 text-white rounded-xl p-3 text-sm focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-zinc-900 border border-white/5 focus:border-red-500 text-white rounded-xl p-3 text-sm focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                          Delivery Address
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Apt 4B, Sea Breeze Apartments, Carter Road, Bandra West, Mumbai, Maharashtra 400050"
                          className="w-full bg-zinc-900 border border-white/5 focus:border-red-500 text-white rounded-xl p-3 text-sm focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Selection */}
                  <div className="bg-zinc-950 border border-white/5 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider border-b border-white/5 pb-2 flex items-center space-x-2">
                      <CreditCard className="w-4 h-4" />
                      <span>Payment Method</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'bg-red-600/10 border-red-600 text-white font-bold'
                            : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-zinc-800'
                        }`}
                      >
                        <span className="block text-sm">Cash On Delivery</span>
                        <span className="text-[10px] text-zinc-500">Pay at door</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'bg-red-600/10 border-red-600 text-white font-bold'
                            : 'bg-zinc-900 border-white/5 text-zinc-400 hover:border-zinc-800'
                        }`}
                      >
                        <span className="block text-sm">UPI / Cards</span>
                        <span className="text-[10px] text-zinc-500">Google Pay, Cards & more</span>
                      </button>
                    </div>
                  </div>

                  {/* Back to Cart Trigger */}
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="w-full text-center text-xs text-zinc-400 hover:text-white uppercase tracking-wider font-semibold underline cursor-pointer"
                  >
                    Modify Cart Items
                  </button>
                </form>
              )}

              {/* PHASE 3: ORDER SUCCESS & TRACKER */}
              {step === 'success' && (
                <div className="space-y-8 py-4">
                  {/* Confetti alternative icon */}
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center bg-emerald-500/10 text-emerald-500 p-5 rounded-full border border-emerald-500/20 shadow-lg shadow-emerald-500/5 animate-bounce">
                      <Check className="w-10 h-10" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-yellow-400 uppercase tracking-widest font-mono">Order Placed Successfully!</span>
                      <h3 className="font-display text-2xl font-black uppercase text-white mt-1">Thank you, {fullName}!</h3>
                      <p className="text-zinc-400 text-xs mt-1">Order ID: <span className="font-mono text-white font-bold">{orderId}</span></p>
                    </div>
                  </div>

                  {/* Simulated Status Tracker */}
                  <div className="bg-zinc-950 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-bl">
                      Live
                    </div>

                    <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-6 flex items-center space-x-1.5">
                      <Truck className="w-4 h-4 text-red-500" />
                      <span>Live Delivery Status</span>
                    </h4>

                    {/* Timeline */}
                    <div className="relative pl-6 border-l-2 border-zinc-800 space-y-8">
                      {stages.map((stage, sIdx) => {
                        const isActive = deliveryStage >= sIdx;
                        const isCurrent = deliveryStage === sIdx;

                        return (
                          <div key={sIdx} className="relative">
                            {/* Dot */}
                            <div
                              className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                                isCurrent
                                  ? 'bg-red-500 border-zinc-950 ring-4 ring-red-500/30 scale-125'
                                  : isActive
                                  ? 'bg-emerald-500 border-zinc-950'
                                  : 'bg-zinc-900 border-white/5'
                              }`}
                            />

                            <div>
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-sm font-bold tracking-tight transition-colors ${
                                    isCurrent ? 'text-red-500' : isActive ? 'text-white' : 'text-zinc-500'
                                  }`}
                                >
                                  {stage.label}
                                </span>
                                <span className="font-mono text-[10px] text-zinc-500">{stage.time}</span>
                              </div>
                              <p className={`text-xs mt-0.5 ${isCurrent ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                {stage.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Completion bar */}
                    <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                      <span>Preparing Fresh</span>
                      <span>Ready in ~20 mins</span>
                    </div>
                  </div>

                  {/* Return Button */}
                  <button
                    onClick={() => {
                      setStep('cart');
                      onClose();
                    }}
                    className="w-full bg-zinc-950 border border-white/5 hover:border-yellow-400 text-white font-bold uppercase py-4 rounded-xl text-xs tracking-wider transition-all cursor-pointer"
                  >
                    Order More Delights
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary (Cart and Checkout only) */}
            {step !== 'success' && cartItems.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-zinc-950 space-y-4">
                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">₹{subtotal.toFixed(0)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-400">
                      <span className="flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Discount ({appliedCoupon === 'BURGER25' ? '25%' : '15%'})</span>
                      </span>
                      <span className="font-mono">-₹{discountAmount.toFixed(0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center space-x-1">
                      <Truck className="w-3.5 h-3.5 text-red-500" />
                      <span>Delivery Fee</span>
                    </span>
                    <span className="font-mono text-white">
                      {deliveryFee === 0 ? <span className="text-emerald-400 font-bold uppercase text-xs">Free</span> : `₹${deliveryFee.toFixed(0)}`}
                    </span>
                  </div>

                  <div className="border-t border-white/5 my-2 pt-2 flex justify-between text-base font-black text-white">
                    <span className="font-display uppercase tracking-wider">Grand Total</span>
                    <span className="font-mono text-yellow-400 text-lg">₹{grandTotal.toFixed(0)}</span>
                  </div>
                </div>

                {/* Primary Button */}
                {step === 'cart' ? (
                  <button
                    onClick={handleStartCheckout}
                    className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-xl shadow-red-600/25"
                    id="cart-checkout-btn"
                  >
                    <span>Proceed To Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-xl shadow-red-600/25 disabled:bg-red-800 disabled:cursor-wait"
                    id="place-order-btn"
                  >
                    {isSubmitting ? (
                      <span>Submitting Order...</span>
                    ) : (
                      <>
                        <Utensils className="w-4 h-4" />
                        <span>Place Order Now (₹{grandTotal.toFixed(0)})</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
