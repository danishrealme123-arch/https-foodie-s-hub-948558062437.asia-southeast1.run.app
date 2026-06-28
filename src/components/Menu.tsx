import { useState, useMemo } from 'react';
import { Search, Flame, Star, Clock, Sparkles, Filter, Plus, SlidersHorizontal, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface MenuProps {
  onAddToCart: (item: MenuItem, customization?: any) => void;
}

type CategoryType = 'all' | 'burgers' | 'pizzas' | 'sides' | 'drinks';

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high'>('popular');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Customization State
  const [extraCheese, setExtraCheese] = useState(false);
  const [makeSpicy, setMakeSpicy] = useState(false);
  const [noOnions, setNoOnions] = useState(false);
  const [extraPatty, setExtraPatty] = useState(false);

  // Reset Customizations when item changes
  const openCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setExtraCheese(false);
    setMakeSpicy(false);
    setNoOnions(false);
    setExtraPatty(false);
  };

  const calculateCustomizedPrice = (item: MenuItem) => {
    let base = item.price;
    if (extraCheese) base += 40;
    if (extraPatty) base += 90;
    return parseFloat(base.toFixed(2));
  };

  const handleConfirmCustomization = () => {
    if (!customizingItem) return;
    onAddToCart(customizingItem, {
      extraCheese,
      makeSpicy,
      noOnions,
      extraPatty: customizingItem.category === 'burgers' ? extraPatty : false,
    });
    setCustomizingItem(null);
  };

  const filteredAndSortedItems = useMemo(() => {
    let items = [...MENU_ITEMS];

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Sort items
    if (sortBy === 'popular') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [selectedCategory, searchQuery, sortBy]);

  const categories = [
    { id: 'all', name: 'All Dishes', emoji: '🍽️' },
    { id: 'burgers', name: 'Burgers', emoji: '🍔' },
    { id: 'pizzas', name: 'Pizzas', emoji: '🍕' },
    { id: 'sides', name: 'Sides', emoji: '🍟' },
    { id: 'drinks', name: 'Drinks', emoji: '🥤' },
  ];

  return (
    <section id="menu" className="py-20 bg-zinc-900 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-yellow-400 font-bold uppercase tracking-widest text-[11px] inline-flex items-center space-x-1.5 mb-2 bg-yellow-400/10 px-4 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Craved Menu Items</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Explore Our Popular <span className="text-red-500">Menu</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">
            Every dish is handcrafted on order using the freshest ingredients and prepared with hygienic safety standards.
          </p>
        </div>

        {/* Controls Layout (Search, Category Filters, Sort By) */}
        <div className="space-y-6 mb-12">
          {/* Top Row: Search and Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search favorite burgers, pizzas, sides..."
                className="w-full bg-zinc-950 border border-white/10 focus:border-red-500 text-white rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3 text-zinc-400 hover:text-white text-xs font-bold bg-zinc-800 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center space-x-3 bg-zinc-950 border border-white/10 rounded-2xl px-4 py-2.5">
              <SlidersHorizontal className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white text-xs font-bold uppercase focus:outline-none cursor-pointer"
              >
                <option value="popular">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Categories Pill Scroller */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            <div className="flex items-center space-x-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as CategoryType)}
                  className={`inline-flex items-center space-x-1.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105'
                      : 'bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                  id={`cat-btn-${cat.id}`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col justify-between group"
                id={`menu-card-${item.id}`}
              >
                {/* Image Container with Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-sm border border-white/10 text-yellow-400 font-mono font-bold text-xs px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" />
                    <span>{item.rating}</span>
                  </div>

                  {/* Highlight Indicators */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-1.5">
                    {item.isPopular && (
                      <span className="bg-yellow-400 text-zinc-950 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-md text-center">
                        Popular
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-md text-center inline-flex items-center space-x-0.5">
                        <Flame className="w-3 h-3 fill-white inline" />
                        <span>Spicy</span>
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-md text-center">
                        Veg
                      </span>
                    )}
                  </div>

                  {/* Metadata Banner at bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[11px] font-mono font-medium text-zinc-300 bg-zinc-950/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-red-500" />
                      <span>{item.prepTime}</span>
                    </div>
                    <span>•</span>
                    <div>
                      <span>{item.calories} Calories</span>
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight leading-snug group-hover:text-yellow-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-lg font-extrabold text-yellow-400">₹{item.price.toFixed(0)}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                      onClick={() => openCustomizer(item)}
                      className="border border-white/10 hover:border-red-500 bg-zinc-900/40 hover:bg-red-600/5 text-zinc-300 hover:text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                      id={`cust-btn-${item.id}`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Customize</span>
                    </button>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="bg-red-600 hover:bg-red-700 active:scale-95 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-red-600/10"
                      id={`add-btn-${item.id}`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add To Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredAndSortedItems.length === 0 && (
            <div className="col-span-full text-center py-16 bg-zinc-950/50 rounded-3xl border border-white/5">
              <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-white text-lg font-bold mb-1">No Dishes Found</h3>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                We couldn't find any dishes matching "{searchQuery}". Try searching for something else or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Item Customizer Slide-up Modal */}
      <AnimatePresence>
        {customizingItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingItem(null)}
              className="fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center p-4"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl z-50"
            >
              <div className="relative h-44">
                <img
                  src={customizingItem.image}
                  alt={customizingItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <button
                  onClick={() => setCustomizingItem(null)}
                  className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-sm hover:bg-red-600 text-zinc-300 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-display text-2xl font-black uppercase text-white tracking-tight">
                      {customizingItem.name}
                    </h3>
                    <span className="font-mono text-xl font-bold text-yellow-400">
                      ₹{calculateCustomizedPrice(customizingItem).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{customizingItem.description}</p>
                </div>

                {/* Toppings Checklist */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-2">
                    Customize Ingredients
                  </h4>

                  <div className="space-y-2.5">
                    {/* Extra Cheese */}
                    <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5 hover:border-yellow-400/50 transition-colors cursor-pointer select-none">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={extraCheese}
                          onChange={() => setExtraCheese(!extraCheese)}
                          className="accent-red-600 w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm text-zinc-200">Extra Cheddar Cheese</span>
                      </div>
                      <span className="font-mono text-xs text-yellow-400 font-bold">+₹40</span>
                    </label>

                    {/* Extra Patty (Only for Burgers) */}
                    {customizingItem.category === 'burgers' && (
                      <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5 hover:border-yellow-400/50 transition-colors cursor-pointer select-none">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={extraPatty}
                            onChange={() => setExtraPatty(!extraPatty)}
                            className="accent-red-600 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-sm text-zinc-200">Extra Premium Patty</span>
                        </div>
                        <span className="font-mono text-xs text-yellow-400 font-bold">+₹90</span>
                      </label>
                    )}

                    {/* Make Spicy */}
                    <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5 hover:border-yellow-400/50 transition-colors cursor-pointer select-none">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={makeSpicy}
                          onChange={() => setMakeSpicy(!makeSpicy)}
                          className="accent-red-600 w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm text-zinc-200">Make It Extra Spicy 🌶️</span>
                      </div>
                      <span className="font-mono text-xs text-zinc-500 uppercase">Free</span>
                    </label>

                    {/* No Onions */}
                    <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-white/5 hover:border-yellow-400/50 transition-colors cursor-pointer select-none">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={noOnions}
                          onChange={() => setNoOnions(!noOnions)}
                          className="accent-red-600 w-4 h-4 cursor-pointer"
                        />
                        <span className="text-sm text-zinc-200">Remove Onions</span>
                      </div>
                      <span className="font-mono text-xs text-zinc-500 uppercase">Free</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleConfirmCustomization}
                    className="w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-red-600/20"
                  >
                    <span>Add Customized Item (₹{calculateCustomizedPrice(customizingItem).toFixed(0)})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
