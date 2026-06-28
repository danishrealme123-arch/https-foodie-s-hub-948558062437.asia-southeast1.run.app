export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'burgers' | 'pizzas' | 'sides' | 'drinks';
  image: string;
  rating: number;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  prepTime: string;
  calories: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customization?: {
    extraCheese?: boolean;
    makeSpicy?: boolean;
    noOnions?: boolean;
    extraPatty?: boolean;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  code: string;
  image: string;
  expiryTime: number; // timestamp
  bgColor: string;
}
