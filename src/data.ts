import { MenuItem, Testimonial, GalleryItem, SpecialOffer } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    name: 'Hub Double Stack',
    description: 'Double flame-grilled beef patties, melted cheddar, crispy lettuce, ripe tomatoes, and our signature Hub secret sauce on a toasted brioche bun.',
    price: 299.00,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isPopular: true,
    prepTime: '10-12 mins',
    calories: 850
  },
  {
    id: 'b2',
    name: 'Crispy Jalapeño Chicken',
    description: 'Crispy buttermilk chicken breast, spicy pepper jack cheese, fiery jalapeños, and zesty sriracha mayo on a toasted sesame bun.',
    price: 259.00,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    isSpicy: true,
    prepTime: '8-10 mins',
    calories: 720
  },
  {
    id: 'b3',
    name: 'Smokehouse BBQ Bacon',
    description: 'Premium beef patty, thick-cut applewood smoked bacon, crispy golden onion rings, cheddar, and honey BBQ sauce.',
    price: 329.00,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    prepTime: '12-15 mins',
    calories: 980
  },
  {
    id: 'p1',
    name: 'Truffle Mushroom Supreme',
    description: 'Creamy white truffle oil base, wild portobello and button mushrooms, fresh mozzarella, caramelized onions, and wild rocket.',
    price: 499.00,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isPopular: true,
    isVegetarian: true,
    prepTime: '15-18 mins',
    calories: 1100
  },
  {
    id: 'p2',
    name: 'Sriracha Pepperoni Feast',
    description: 'Crisp artisanal crust loaded with spicy pepperoni, fresh jalapeño rounds, red chili flakes, mozzarella, and a hot sriracha-honey drizzle.',
    price: 449.00,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    isSpicy: true,
    prepTime: '12-15 mins',
    calories: 1250
  },
  {
    id: 'p3',
    name: 'Garden Pesto & Feta',
    description: 'Aromatic basil pesto sauce, cherry tomatoes, Kalamata olives, fire-roasted bell peppers, crumbled feta, and fresh baby spinach.',
    price: 399.00,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    isVegetarian: true,
    prepTime: '12-15 mins',
    calories: 950
  },
  {
    id: 's1',
    name: 'Loaded Hub Fries',
    description: 'Crispy golden fries smothered in warm liquid cheddar, smoked bacon bits, chopped jalapeños, and drizzled with ranch dressing.',
    price: 179.00,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isPopular: true,
    isSpicy: true,
    prepTime: '5-7 mins',
    calories: 640
  },
  {
    id: 's2',
    name: 'Mozzarella Herb Sticks',
    description: 'Six premium Wisconsin mozzarella sticks, herb-breaded and golden-fried, served with an authentic warm Italian marinara dip.',
    price: 149.00,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    isVegetarian: true,
    prepTime: '4-6 mins',
    calories: 480
  },
  {
    id: 's3',
    name: 'Glazed Beer-Battered Rings',
    description: 'Thick-cut sweet white onions dipped in craft beer batter, fried to a perfect crunch, served with tangy honey mustard sauce.',
    price: 129.00,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    isVegetarian: true,
    prepTime: '4-6 mins',
    calories: 390
  },
  {
    id: 'd1',
    name: 'Salted Caramel Pecan Shake',
    description: 'Rich hand-spun vanilla ice cream blended with dark salted caramel sauce, toasted pecan bits, topped with whipped cream.',
    price: 119.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    isPopular: true,
    isVegetarian: true,
    prepTime: '3-5 mins',
    calories: 580
  },
  {
    id: 'd2',
    name: 'Wild Berry Mojito Mocktail',
    description: 'A refreshing blend of muddled blackberries, raspberries, fresh mint leaves, lime wedges, simple syrup, and sparkling soda.',
    price: 99.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    isVegetarian: true,
    prepTime: '2-4 mins',
    calories: 180
  },
  {
    id: 'd3',
    name: 'Classic Craft Cola',
    description: 'Artisanal micro-brewed cola with genuine cane sugar, a twist of citrus peel, and real vanilla bean pods.',
    price: 79.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    isVegetarian: true,
    prepTime: '1-2 mins',
    calories: 140
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'o1',
    title: 'Burger Bonanza',
    subtitle: 'Get 25% Off on All Premium Burgers',
    discount: '25% OFF',
    code: 'BURGER25',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80',
    expiryTime: Date.now() + 4 * 60 * 60 * 1000 + 35 * 60 * 1000, // 4h 35m from now
    bgColor: 'from-amber-600 to-red-600'
  },
  {
    id: 'o2',
    title: 'Pizza Party Promo',
    subtitle: 'Buy 1 Large Pizza, Get a Craft Soda Free!',
    discount: 'FREE DRINK',
    code: 'PIZZAPARTY',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80',
    expiryTime: Date.now() + 8 * 60 * 60 * 1000 + 12 * 60 * 1000, // 8h 12m from now
    bgColor: 'from-red-600 to-yellow-600'
  },
  {
    id: 'o3',
    title: 'Free Side Upgrade',
    subtitle: 'Upgrade any burger combo to Loaded Fries for free',
    discount: 'FREE UPGRADE',
    code: 'LOADEDFRIES',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=500&q=80',
    expiryTime: Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000, // 2h 15m from now
    bgColor: 'from-zinc-900 to-amber-700'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Hand-stretched Artisanal Pizza dough',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'g2',
    title: 'Sizzling Fire-grilled Premium Beef Patties',
    category: 'Grill',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'g3',
    title: 'Loaded Cheddar Cheese Dip pouring',
    category: 'Sauce',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'g4',
    title: 'Perfect Crispy Golden Onion Rings stacked',
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'g5',
    title: 'Freshly Baked Brioche Burger buns',
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'g6',
    title: 'Hand-spun Caramel Shakes in preparation',
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Food Blogger',
    comment: 'The Hub Double Stack is hands down the best burger in town. The brioche bun is perfectly toasted, the patties are incredibly juicy, and that secret sauce is pure magic!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    date: 'June 18, 2026'
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'Local Guide',
    comment: 'Absolutely love their Truffle Mushroom Supreme pizza! Super fast delivery, arrived steaming hot, and the truffle aroma was out of this world. Highly recommend Foodie’s Hub!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'June 20, 2026'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Fitness Trainer',
    comment: 'Even on my cheat days, I want quality. Foodie’s Hub uses fresh, premium ingredients that you can actually taste. The loaded fries are insane, and their mojito is so refreshing!',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: 'June 22, 2026'
  }
];
