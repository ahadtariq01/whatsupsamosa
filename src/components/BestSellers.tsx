import { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../data';

interface BestSellersProps {
  onAddToCart: (item: MenuItem, notes: string) => void;
}

export default function BestSellers({ onAddToCart }: BestSellersProps) {
  // Let's filter the first 3 items as "Best Sellers"
  const bestSellers = MENU_ITEMS.slice(0, 3);

  // Customization Modal State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');

  const handleOpenCustomization = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedNotes([]);
    setCustomText('');
  };

  const toggleOption = (option: string) => {
    setSelectedNotes(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleConfirmAddToCart = () => {
    if (!selectedItem) return;
    
    // Combine selected options and custom text
    const finalNotesArray = [...selectedNotes];
    if (customText.trim()) {
      finalNotesArray.push(customText.trim());
    }
    const notesString = finalNotesArray.join(', ') || 'Standard Preparation';
    
    onAddToCart(selectedItem, notesString);
    setSelectedItem(null);
  };

  return (
    <section className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <h2 className="font-display text-4xl font-extrabold text-on-surface">Our Best Sellers</h2>
        <p className="text-body-md text-on-surface-variant max-w-md mx-auto">
          The favorites that keep our fans coming back for more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bestSellers.map((item) => (
          <div 
            key={item.id}
            className="bg-surface rounded-2xl overflow-hidden border border-outline-variant hover:shadow-lg transition-all duration-300 flex flex-col group crispy-shadow-hover relative"
          >
            {/* Tag Badges */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {item.tags.includes('Best Seller') && (
                <span className="bg-secondary text-white text-xs font-bold uppercase px-3 py-1 rounded shadow-sm">
                  Best Seller
                </span>
              )}
              {item.tags.includes('Spicy') && (
                <span className="bg-secondary-container text-on-secondary text-xs font-bold uppercase px-3 py-1 rounded shadow-sm">
                  Spicy
                </span>
              )}
            </div>

            {/* Image section with height */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Floating Price Tag */}
              <div className="absolute bottom-4 right-4 bg-white/95 text-secondary font-display font-extrabold px-3 py-1.5 rounded-lg shadow-md text-sm">
                Rs {item.price}
              </div>
            </div>

            {/* Content section */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-on-surface-variant font-sans line-clamp-3">
                  {item.description}
                </p>
              </div>

              <button 
                onClick={() => handleOpenCustomization(item)}
                className="w-full bg-primary-container hover:bg-primary text-on-primary-container hover:text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all cursor-pointer crispy-shadow-active"
              >
                <span className="material-symbols-outlined text-xl">shopping_basket</span>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Customization Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-primary-container animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="relative h-44">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-on-primary-fixed w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer hover:scale-115 transition-transform"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="bg-primary-container text-on-primary-container text-[10px] font-bold uppercase px-2 py-0.5 rounded mr-2">
                  Customize
                </span>
                <h3 className="font-display text-2xl font-extrabold">{selectedItem.name}</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Select Customizations (Optional)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedItem.customizationOptions?.map((option) => {
                    const isSelected = selectedNotes.includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => toggleOption(option)}
                        className={`py-2.5 px-3 rounded-lg border text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-primary-fixed border-primary text-on-primary-fixed' 
                            : 'bg-surface border-outline-variant hover:border-primary text-on-surface'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected ? (
                          <span className="material-symbols-outlined text-primary text-base font-bold">check_circle</span>
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-outline-variant"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                  Special Instructions
                </label>
                <input 
                  type="text" 
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Ring the bell twice, less sauce..."
                  className="w-full h-11 px-4 rounded-lg border-2 border-outline-variant bg-surface-bright font-sans text-sm focus:border-primary focus:ring-0 outline-none transition-all"
                />
              </div>

              <div className="border-t border-outline-variant pt-4 flex justify-between items-center">
                <div>
                  <span className="text-xs text-on-surface-variant">Total Price</span>
                  <p className="font-display text-xl font-extrabold text-secondary">Rs {selectedItem.price}</p>
                </div>
                <button
                  onClick={handleConfirmAddToCart}
                  className="bg-secondary hover:bg-secondary-container text-white py-3 px-6 rounded-lg font-bold flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  Add to Cart
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
