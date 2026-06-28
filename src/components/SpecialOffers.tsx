import { useState, useEffect } from 'react';
import { Copy, Check, Clock, Flame, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { SPECIAL_OFFERS } from '../data';

interface SpecialOffersProps {
  onClaimOffer: (code: string) => void;
}

export default function SpecialOffers({ onClaimOffer }: SpecialOffersProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [timers, setTimers] = useState<{ [key: string]: string }>({});

  // Real-time ticking countdown timers for the daily deals
  useEffect(() => {
    const calculateTimeLeft = () => {
      const updatedTimers: { [key: string]: string } = {};

      SPECIAL_OFFERS.forEach((offer) => {
        const difference = offer.expiryTime - Date.now();
        if (difference <= 0) {
          updatedTimers[offer.id] = 'Expired';
        } else {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          const hString = hours.toString().padStart(2, '0');
          const mString = minutes.toString().padStart(2, '0');
          const sString = seconds.toString().padStart(2, '0');

          updatedTimers[offer.id] = `${hString}h ${mString}m ${sString}s`;
        }
      });

      setTimers(updatedTimers);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onClaimOffer(code); // Trigger notification & parent action
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section id="offers" className="py-20 bg-zinc-950 relative overflow-hidden">
      {/* Decorative side accent glow */}
      <div className="absolute top-1/4 -left-36 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-red-500 font-bold uppercase tracking-widest text-[11px] inline-flex items-center space-x-1.5 mb-2 bg-red-500/10 px-4 py-1.5 rounded-full">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            <span>Hot Deals Only</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Special Deals & <span className="text-yellow-400">Offers</span>
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Claim these limited-time sizzling offers! Enter the promo code at checkout or click to claim and apply the discount instantly.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIAL_OFFERS.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ y: -8 }}
              className="bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-between group"
              id={`offer-card-${offer.id}`}
            >
              {/* Image & Discount Tag Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

                {/* Corner Discount Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-display font-black text-xs uppercase px-3 py-1.5 rounded-xl shadow-lg border border-red-500/20">
                  {offer.discount}
                </div>

                {/* Expiry Clock */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 bg-zinc-950/80 backdrop-blur-sm border border-white/5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-yellow-400">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>{timers[offer.id] || 'Loading...'}</span>
                </div>
              </div>

              {/* Offer Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-red-500 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {offer.subtitle}
                  </p>
                </div>

                {/* Promo Code Copy Action */}
                <div className="space-y-3 mt-auto">
                  <div className="bg-zinc-950 border border-white/5 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Promo Code</span>
                      <span className="font-mono text-sm font-bold text-white tracking-wider">{offer.code}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(offer.code)}
                      className="bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white p-2 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                      title="Copy promo code"
                      id={`copy-btn-${offer.code}`}
                    >
                      {copiedCode === offer.code ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-red-900/10"
                  >
                    <span>Claim Offer Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Warning Alert: Free Loading Terms */}
        <div className="mt-12 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl p-4 flex items-start space-x-3 max-w-3xl mx-auto">
          <ShieldAlert className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            *Offers are only valid for online orders placed today. Coupons cannot be combined with any other discount or group meal bundle. Free side upgrades require adding a primary burger item to your cart before code redemption.
          </p>
        </div>
      </div>
    </section>
  );
}
