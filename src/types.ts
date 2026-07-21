export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Samosas' | 'Rolls' | 'Snacks' | 'Deals';
  tags: string[]; // e.g. ["Best Seller", "Spicy", "Popular", "Medium", "Veg", "Non-Veg"]
  customizationOptions?: string[]; // e.g. ["Extra Spicy", "Mint Chutney", "Less Mayo"]
}

export interface CartItem {
  id: string; // Unique combination of itemId + customization notes
  menuItem: MenuItem;
  quantity: number;
  notes: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface OrderDetails {
  fullName: string;
  phoneNumber: string;
  deliveryAddress: string;
  deliveryNotes: string;
  paymentMethod: 'cod' | 'online';
}
