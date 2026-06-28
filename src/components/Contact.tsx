import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, AlertCircle, Map, Layers, ZoomIn, ZoomOut, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Map Simulation State
  const [mapZoom, setMapZoom] = useState(14);
  const [mapType, setMapType] = useState<'dark' | 'satellite'>('dark');
  const [mapSearch, setMapSearch] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
      setTimeout(() => setSendSuccess(false), 5000);
    }, 1500);
  };

  const contactCards = [
    {
      icon: <MapPin className="w-5 h-5 text-red-500" />,
      title: 'Our Flagship Hub',
      desc: 'Ground Floor, Carter Road, Bandra West, Mumbai, Maharashtra 400050',
      href: 'https://maps.google.com'
    },
    {
      icon: <Phone className="w-5 h-5 text-yellow-400" />,
      title: 'Phone Reservations',
      desc: '+91 22 555-FOOD',
      href: 'tel:+91225553663'
    },
    {
      icon: <Mail className="w-5 h-5 text-red-500" />,
      title: 'Email Queries',
      desc: 'hello@foodieshub.in',
      href: 'mailto:hello@foodieshub.in'
    },
    {
      icon: <Clock className="w-5 h-5 text-yellow-400" />,
      title: 'Kitchen Hours',
      desc: '11:00 AM - 11:30 PM Everyday',
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-zinc-900 overflow-hidden relative">
      <div className="absolute top-10 left-10 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-yellow-400 font-bold uppercase tracking-widest text-[11px] inline-flex items-center space-x-1.5 mb-2 bg-yellow-400/10 px-4 py-1.5 rounded-full">
            <Phone className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Reach Out <span className="text-red-500">To Us</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Have any complaints, requests, or business inquiries? Drop us a note or find our exact kitchen location on the interactive map below.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactCards.map((card, index) => {
            const Component = card.href ? 'a' : 'div';
            return (
              <Component
                key={index}
                href={card.href || undefined}
                target={card.href?.startsWith('http') ? '_blank' : undefined}
                rel={card.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`bg-zinc-950 border border-white/5 p-6 rounded-2xl flex items-start space-x-4 transition-all duration-300 ${
                  card.href ? 'hover:border-red-500 hover:scale-[1.02] cursor-pointer' : ''
                }`}
              >
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex-shrink-0">
                  {card.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">
                    {card.title}
                  </h4>
                  <p className="text-sm font-semibold text-white leading-relaxed">{card.desc}</p>
                </div>
              </Component>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Form Side */}
          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem] shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                  Drop Us a <span className="text-red-500">Message</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  We generally respond to all customer emails and feedback within 12 hours.
                </p>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-zinc-900 border border-white/10 focus:border-red-500 text-white rounded-xl p-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full bg-zinc-900 border border-white/10 focus:border-red-500 text-white rounded-xl p-3 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="General inquiry, Catering order, etc."
                    className="w-full bg-zinc-900 border border-white/10 focus:border-red-500 text-white rounded-xl p-3 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us what you think or how we can help..."
                    className="w-full bg-zinc-900 border border-white/10 focus:border-red-500 text-white rounded-xl p-3 text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button with states */}
                <button
                  type="submit"
                  disabled={isSending || sendSuccess}
                  className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-red-900/10 disabled:bg-zinc-800 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <span>Sending Message...</span>
                  ) : sendSuccess ? (
                    <span className="flex items-center space-x-1.5 text-emerald-400">
                      <Check className="w-4 h-4" />
                      <span>Message Sent Successfully!</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <AnimatePresence>
              {sendSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 flex items-center space-x-2.5"
                >
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <p className="text-[11px] text-zinc-400">
                    We received your message! A chef or customer care specialist will reach back to your email shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Map Placeholder Side (Interactive Dark Map Simulator) */}
          <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col relative h-[480px]">
            {/* Map Header Controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              {/* Map Address Search */}
              <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 w-64 pointer-events-auto">
                <Search className="w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Carter Road, Bandra West, Mumbai"
                  value={mapSearch}
                  onChange={(e) => setMapSearch(e.target.value)}
                  className="bg-transparent text-white text-xs focus:outline-none w-full"
                />
              </div>

              {/* Toggle satellite view / road view */}
              <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl shadow-xl flex items-center space-x-1 pointer-events-auto">
                <button
                  onClick={() => setMapType('dark')}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                    mapType === 'dark' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Roads
                </button>
                <button
                  onClick={() => setMapType('satellite')}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                    mapType === 'satellite' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Sat
                </button>
              </div>
            </div>

            {/* Map Zoom Controls */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col space-y-1.5">
              <button
                onClick={() => setMapZoom((prev) => Math.min(prev + 1, 18))}
                className="bg-zinc-900/90 hover:bg-zinc-800 text-white p-2.5 rounded-xl border border-white/10 shadow-xl cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMapZoom((prev) => Math.max(prev - 1, 10))}
                className="bg-zinc-900/90 hover:bg-zinc-800 text-white p-2.5 rounded-xl border border-white/10 shadow-xl cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Map Canvas / Grid Graphic (Interactive Vector Representation) */}
            <div className="w-full h-full relative overflow-hidden select-none bg-zinc-950">
              <div
                className="w-[180%] h-[180%] absolute top-[-40%] left-[-40%] transition-transform duration-500 flex items-center justify-center"
                style={{ transform: `scale(${mapZoom / 14})` }}
              >
                {mapType === 'dark' ? (
                  /* Elegant Vector Grid with Roads and Park */
                  <svg viewBox="0 0 800 800" className="w-full h-full text-zinc-900">
                    {/* Background Grid */}
                    <rect width="800" height="800" fill="#09090b" />
                    <line x1="100" y1="0" x2="100" y2="800" stroke="#18181b" strokeWidth="1" />
                    <line x1="200" y1="0" x2="200" y2="800" stroke="#18181b" strokeWidth="1" />
                    <line x1="300" y1="0" x2="300" y2="800" stroke="#18181b" strokeWidth="1" />
                    <line x1="400" y1="0" x2="400" y2="800" stroke="#18181b" strokeWidth="1" />
                    <line x1="500" y1="0" x2="500" y2="800" stroke="#18181b" strokeWidth="1" />
                    <line x1="600" y1="0" x2="600" y2="800" stroke="#18181b" strokeWidth="1" />
                    <line x1="700" y1="0" x2="700" y2="800" stroke="#18181b" strokeWidth="1" />

                    <line x1="0" y1="100" x2="800" y2="100" stroke="#18181b" strokeWidth="1" />
                    <line x1="0" y1="200" x2="800" y2="200" stroke="#18181b" strokeWidth="1" />
                    <line x1="0" y1="300" x2="800" y2="300" stroke="#18181b" strokeWidth="1" />
                    <line x1="0" y1="400" x2="800" y2="400" stroke="#18181b" strokeWidth="1" />
                    <line x1="0" y1="500" x2="800" y2="500" stroke="#18181b" strokeWidth="1" />
                    <line x1="0" y1="600" x2="800" y2="600" stroke="#18181b" strokeWidth="1" />
                    <line x1="0" y1="700" x2="800" y2="700" stroke="#18181b" strokeWidth="1" />

                    {/* Central Park Lake */}
                    <circle cx="280" cy="550" r="90" fill="#18100c" opacity="0.3" />
                    <circle cx="280" cy="550" r="70" fill="#0a1215" />

                    {/* Public Park block */}
                    <rect x="520" y="150" width="180" height="150" rx="10" fill="#064e3b" opacity="0.2" />
                    <text x="560" y="230" fill="#047857" fontSize="10" fontWeight="bold">Central Food Plaza</text>

                    {/* Core Road layout */}
                    <line x1="0" y1="350" x2="800" y2="350" stroke="#27272a" strokeWidth="22" strokeLinecap="round" />
                    <line x1="0" y1="350" x2="800" y2="350" stroke="#fbbf24" strokeWidth="1" strokeDasharray="5,10" />

                    <line x1="450" y1="0" x2="450" y2="800" stroke="#27272a" strokeWidth="22" strokeLinecap="round" />
                    <line x1="450" y1="0" x2="450" y2="800" stroke="#fbbf24" strokeWidth="1" strokeDasharray="5,10" />

                    {/* Side avenues */}
                    <line x1="120" y1="0" x2="120" y2="800" stroke="#1c1917" strokeWidth="12" />
                    <line x1="0" y1="180" x2="800" y2="180" stroke="#1c1917" strokeWidth="12" />
                    <line x1="0" y1="620" x2="800" y2="620" stroke="#1c1917" strokeWidth="12" />

                    {/* Text street labels */}
                    <text x="40" y="342" fill="#52525b" fontSize="9" fontWeight="bold" letterSpacing="1">CARTER ROAD</text>
                    <text x="460" y="60" fill="#52525b" fontSize="9" fontWeight="bold" letterSpacing="1" transform="rotate(90, 460, 60)">BANDRA PROMENADE</text>
                    <text x="140" y="174" fill="#3f3f46" fontSize="8" fontWeight="bold" letterSpacing="1">FOODIE INTERSECTION</text>
                  </svg>
                ) : (
                  /* Atmospheric satellite mesh styling */
                  <div className="w-full h-full bg-cover relative bg-zinc-950/90" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')` }}>
                    <div className="absolute inset-0 bg-zinc-950/70" />
                    <div className="absolute inset-0 border border-white/5 opacity-40 flex items-center justify-center">
                      <span className="text-[10px] text-zinc-500 font-mono">Satellite Grid View Mode</span>
                    </div>
                  </div>
                )}

                {/* Pin Location Target (Placed right on Gourmet Ave & Main Blvd intersection) */}
                <div className="absolute top-[44%] left-[54%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  {/* Glowing Radar Rings */}
                  <div className="absolute w-12 h-12 rounded-full bg-red-600/30 border border-red-500/20 animate-ping" />
                  <div className="absolute w-6 h-6 rounded-full bg-red-600/50 animate-pulse" />

                  {/* Icon Node */}
                  <div className="bg-red-600 border-2 border-zinc-950 text-white p-2 rounded-full shadow-2xl relative z-10 scale-110">
                    <MapPin className="w-4 h-4 fill-white" />
                  </div>

                  {/* Marker Popup Label */}
                  <div className="bg-zinc-950/95 border border-white/10 rounded-lg py-1 px-2.5 mt-2 shadow-2xl relative z-10 whitespace-nowrap">
                    <span className="block text-[10px] font-extrabold text-white uppercase tracking-wider">Foodie's Hub Mumbai</span>
                    <span className="block text-[8px] text-zinc-400 font-mono text-center">Open • Closing in 4h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map footer credits */}
            <div className="p-3 bg-zinc-950 border-t border-white/5 flex justify-between items-center text-[9px] text-zinc-500 font-mono px-4">
              <span>Google Maps Platform mock</span>
              <span>GPS coords: 19.0586° N, 72.8220° E</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
