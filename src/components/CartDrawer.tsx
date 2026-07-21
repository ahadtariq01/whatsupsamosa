import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col border-l-4 border-primary-container animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl font-bold">shopping_basket</span>
            <h3 className="font-display text-xl font-extrabold tracking-tight">Your Spicy Basket</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center font-bold text-lg cursor-pointer transition-all active:scale-90"
          >
            ×
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <span className="material-symbols-outlined text-6xl text-outline-variant animate-pulse">
                restaurant_menu
              </span>
              <div>
                <p className="font-display font-bold text-lg text-on-surface">Your basket is empty!</p>
                <p className="text-xs text-on-surface-variant max-w-xs mt-1">
                  Add some hot, crispy samosas or juicy rolls to satisfy your cravings.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="bg-primary hover:bg-primary-container hover:text-on-primary-container text-white py-2.5 px-6 rounded-lg text-sm font-bold transition-all cursor-pointer shadow-md"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.id}
                className="bg-surface p-4 rounded-xl border border-outline-variant flex gap-4 hover:shadow-sm transition-shadow relative"
              >
                {/* Thumb */}
                <img 
                  src={item.menuItem.image} 
                  alt={item.menuItem.name} 
                  className="w-16 h-16 rounded-lg object-cover border border-outline-variant shrink-0"
                  referrerPolicy="no-referrer"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-display font-extrabold text-sm text-on-surface truncate pr-6">
                      {item.menuItem.name}
                    </h4>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-4 right-4 text-on-surface-variant hover:text-secondary hover:scale-110 transition-transform cursor-pointer"
                      title="Remove item"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate italic">
                    {item.notes}
                  </p>
                  
                  <div className="flex justify-between items-center pt-2">
                    {/* Stepper counter */}
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-outline-variant p-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-on-surface w-4 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md hover:bg-primary-container hover:text-on-primary-container flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-display font-extrabold text-sm text-secondary">
                      Rs {item.menuItem.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-outline-variant bg-surface-container-low space-y-4">
            <div className="flex justify-between items-center text-on-surface">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Subtotal</span>
              <span className="font-display text-2xl font-black text-secondary">Rs {subtotal}</span>
            </div>

            <button 
              onClick={onProceedToCheckout}
              className="w-full bg-secondary hover:bg-secondary-container text-white py-4 rounded-lg font-display font-extrabold text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 hover:translate-y-[-1px] crispy-shadow-secondary"
            >
              Proceed to Checkout
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </button>
            <p className="text-center text-[10px] text-on-surface-variant italic">
              *Taxes and delivery fee computed on the next screen
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
