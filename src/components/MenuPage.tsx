import { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuPageProps {
  initialCategory?: string;
  onAddToCart: (item: MenuItem, notes: string) => void;
}

export default function MenuPage({ initialCategory = 'All', onAddToCart }: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync initialCategory when it changes from outside (e.g., clicking category cards in Home)
  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  // Unique list of categories in the menu
  const categoriesList = ['All', 'Samosas', 'Rolls', 'Snacks', 'Deals'];

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
    
    const finalNotesArray = [...selectedNotes];
    if (customText.trim()) {
      finalNotesArray.push(customText.trim());
    }
    const notesString = finalNotesArray.join(', ') || 'Standard Preparation';
    
    onAddToCart(selectedItem, notesString);
    setSelectedItem(null);
  };

  // Filtered menu items based on category and search query
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="space-y-2 border-b border-outline-variant pb-6">
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
          The Street Food Manifesto
        </h1>
        <p className="text-body-md text-on-surface-variant max-w-2xl font-sans">
          Spicy, crispy, and straight from the heart. Browse our curated selection of rolls, samosas, and side snacks.
        </p>
      </div>

      {/* Filters and Search Bar Container */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2.5">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-secondary text-white shadow-md scale-105'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-outline-variant/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-3 flex items-center text-outline-variant">
            <span className="material-symbols-outlined text-xl">search</span>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our spicy list..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-outline-variant bg-surface font-sans text-sm focus:border-primary focus:ring-0 outline-none transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-outline hover:text-secondary"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty Search Result */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 space-y-4 bg-surface rounded-2xl border-2 border-dashed border-outline-variant">
          <span className="material-symbols-outlined text-5xl text-outline-variant">sentiment_dissatisfied</span>
          <div>
            <h3 className="font-display font-bold text-lg text-on-surface">No Samosas or Rolls found!</h3>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto mt-1">
              Try searching with another keyword or adjust your filters.
            </p>
          </div>
        </div>
      )}

      {/* Grid of Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-outline-variant hover:shadow-lg transition-all duration-300 flex flex-col group crispy-shadow-hover relative"
          >
            {/* Tag Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5 max-w-[70%]">
              {item.tags.map((tag) => (
                <span 
                  key={tag}
                  className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded shadow-sm ${
                    tag === 'Best Seller' 
                      ? 'bg-secondary text-white' 
                      : tag === 'Spicy' 
                        ? 'bg-secondary-container text-white' 
                        : 'bg-primary-container text-on-primary-container'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Image section with height */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Floating Price Tag */}
              <div className="absolute bottom-4 right-4 bg-white/95 text-secondary font-display font-extrabold px-3 py-1 rounded-lg shadow-md text-xs">
                Rs {item.price}
              </div>
            </div>

            {/* Content section */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display text-lg font-extrabold text-on-surface group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-on-surface-variant font-sans line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <button 
                onClick={() => handleOpenCustomization(item)}
                className="w-full bg-secondary hover:bg-secondary-container text-white py-2.5 px-4 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 hover:translate-y-[-1px]"
              >
                <span className="material-symbols-outlined text-base">add_shopping_cart</span>
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
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-primary-fixed border-primary text-on-primary-fixed' 
                            : 'bg-surface border-outline-variant hover:border-primary text-on-surface'
                        }`}
                      >
                        <span>{option}</span>
                        {isSelected ? (
                          <span className="material-symbols-outlined text-primary text-base font-bold">check_circle</span>
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-outline-variant"></span>
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
                  placeholder="e.g. Extra chutney, less spicy..."
                  className="w-full h-11 px-4 rounded-lg border-2 border-outline-variant bg-surface-bright font-sans text-sm focus:border-primary focus:ring-0 outline-none transition-all"
                />
              </div>

              <div className="border-t border-outline-variant pt-4 flex justify-between items-center">
                <div>
                  <span className="text-xs text-on-surface-variant">Total Price</span>
                  <p className="font-display text-lg font-extrabold text-secondary">Rs {selectedItem.price}</p>
                </div>
                <button
                  onClick={handleConfirmAddToCart}
                  className="bg-secondary hover:bg-secondary-container text-white py-2.5 px-5 rounded-lg font-bold text-xs uppercase flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  Add to Cart
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
