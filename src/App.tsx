import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import BestSellers from './components/BestSellers';
import PromoBundle from './components/PromoBundle';
import Testimonials from './components/Testimonials';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import MenuPage from './components/MenuPage';
import CheckoutPage from './components/CheckoutPage';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Home' | 'Menu' | 'Checkout'>('Home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('whatsupsamosa_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('whatsupsamosa_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle adding item to cart
  const handleAddToCart = (item: MenuItem, notes: string) => {
    setCart(prevCart => {
      // Create a unique compound ID based on itemId + customization notes
      const uniqueCartId = `${item.id}-${notes.replace(/\s+/g, '').toLowerCase()}`;
      
      const existingIndex = prevCart.findIndex(cartItem => cartItem.id === uniqueCartId);
      
      if (existingIndex > -1) {
        // Increment quantity if exact match exists
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        // Add as new item
        return [...prevCart, {
          id: uniqueCartId,
          menuItem: item,
          quantity: 1,
          notes: notes
        }];
      }
    });

    // Briefly show user visual feedback by opening the cart drawer
    setCartOpen(true);
  };

  // Handle quantity changes inside drawer
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  // Handle removing item from drawer
  const handleRemoveItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Clear cart completely upon successful checkout
  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('whatsupsamosa_cart');
  };

  // Handles clicking a category card from Home screen
  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab('Menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handles starting the checkout flow from Cart Drawer
  const handleProceedToCheckout = () => {
    setCartOpen(false);
    setActiveTab('Checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container">
      <div>
        {/* Navigation Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            // Default to 'All' category if navigating directly to Menu
            if (tab === 'Menu') setSelectedCategory('All');
          }} 
          cart={cart}
          setCartOpen={setCartOpen}
        />

        {/* Sliding Shopping Cart Drawer */}
        <CartDrawer 
          isOpen={cartOpen} 
          onClose={() => setCartOpen(false)} 
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={handleProceedToCheckout}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
          {activeTab === 'Home' && (
            <div className="space-y-16">
              {/* Hero Section */}
              <Hero 
                onOrderNow={() => handleSelectCategory('All')} 
                onViewMenu={() => handleSelectCategory('All')} 
              />

              {/* Categories Section */}
              <Categories 
                onSelectCategory={handleSelectCategory} 
                onSeeAll={() => handleSelectCategory('All')} 
              />

              {/* Best Sellers Section */}
              <BestSellers onAddToCart={handleAddToCart} />

              {/* Promotion Banner */}
              <PromoBundle onAddToCart={handleAddToCart} />

              {/* Reviews Section */}
              <Testimonials />
            </div>
          )}

          {activeTab === 'Menu' && (
            <MenuPage 
              initialCategory={selectedCategory} 
              onAddToCart={handleAddToCart} 
            />
          )}

          {activeTab === 'Checkout' && (
            <CheckoutPage 
              cart={cart} 
              onUpdateQuantity={handleUpdateQuantity}
              onClearCart={handleClearCart}
              setActiveTab={setActiveTab}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
