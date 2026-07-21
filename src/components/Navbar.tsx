import { LOGO_IMAGE } from '../data';
import { CartItem } from '../types';

interface NavbarProps {
  activeTab: 'Home' | 'Menu' | 'Checkout';
  setActiveTab: (tab: 'Home' | 'Menu' | 'Checkout') => void;
  cart: CartItem[];
  setCartOpen: (open: boolean) => void;
}

export default function Navbar({ activeTab, setActiveTab, cart, setCartOpen }: NavbarProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b-2 border-outline-variant shadow-sm">
      <div className="flex justify-between items-center w-full px-4 md:px-6 max-w-7xl mx-auto h-20">
        <div 
          className="flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setActiveTab('Home')}
        >
          <img 
            src={LOGO_IMAGE} 
            alt="Whats Up Samosa Logo" 
            className="h-12 md:h-14 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <nav className="hidden md:flex gap-8 items-center">
          <button 
            onClick={() => setActiveTab('Home')}
            className={`text-sm font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer pb-1 ${
              activeTab === 'Home' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('Menu')}
            className={`text-sm font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer pb-1 ${
              activeTab === 'Menu' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Menu
          </button>
          <button 
            onClick={() => setActiveTab('Checkout')}
            className={`text-sm font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer pb-1 ${
              activeTab === 'Checkout' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Checkout
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative text-primary p-2.5 rounded-full bg-surface-container hover:bg-primary-container hover:text-on-primary-container active:scale-95 duration-100 flex items-center justify-center cursor-pointer transition-all crispy-shadow-active"
            id="cart-button"
            aria-label="Open Cart"
          >
            <span className="material-symbols-outlined font-bold text-2xl">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
