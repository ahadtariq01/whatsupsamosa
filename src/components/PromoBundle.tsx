import { useState } from 'react';
import { MenuItem } from '../types';

interface PromoBundleProps {
  onAddToCart: (item: MenuItem, notes: string) => void;
}

export default function PromoBundle({ onAddToCart }: PromoBundleProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [samosa1, setSamosa1] = useState('Crispy Beef');
  const [samosa2, setSamosa2] = useState('Chicken Mince');
  const [roll, setRoll] = useState('Chicken Roll');
  const [drink, setDrink] = useState('Mint Margarita');

  // Define the bundle MenuItem representation
  const bundleItem: MenuItem = {
    id: 'ultimate-spicy-bundle',
    name: 'The Ultimate Spicy Bundle',
    description: '2 Samosas of your choice + 1 Signature Roll + 1 Cold Beverage.',
    price: 2899,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6UTVvazYWZmUKYfieXTQ6kaFZ8QzGc7hkJYpEwOCWyr3QZw-r3GfoKVSG27xjWaomRwRTQ35txie3z9PGFQj3e-M-5XR7o6xNMYhE6wRGZWTT73VifmfAb-N2RvVtQbBqsUpBfg-yFE56G-VMG29sXwcYwqzq6oVYW138pC5K4ObRHV-JRxYuX9N5KYEwwF1mJI5tIdQYR-ze-R1u6GJbLhf8WtjhPcFxuHmlMSoJiM3v7tBkHuDj',
    category: 'Deals',
    tags: ['Best Seller', 'Spicy', 'Deal'],
  };

  const handleClaimOffer = () => {
    const customNotes = `${samosa1} Samosa, ${samosa2} Samosa, ${roll}, ${drink}`;
    onAddToCart(bundleItem, customNotes);
    setModalOpen(false);
  };

  return (
    <section>
      {/* Visual Banner */}
      <div className="bg-secondary text-white rounded-2xl p-8 md:p-12 overflow-hidden relative border-t-8 border-primary-container shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Absolute ambient circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl -z-0"></div>

        {/* Text Area */}
        <div className="space-y-6 max-w-xl z-10 text-center md:text-left">
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase">
            THE ULTIMATE <br />
            <span className="text-primary-container">SPICY BUNDLE</span>
          </h2>
          <p className="text-body-md text-primary-fixed font-sans">
            2 Samosas of your choice + 1 Signature Roll + 1 Cold Beverage. All for just Rs 1299!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
            <span className="inline-block border-2 border-white bg-white text-secondary font-display font-black text-xl px-5 py-3 rounded-lg shadow-md uppercase">
              ONLY Rs 1299!
            </span>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-primary-container hover:bg-primary-container/90 text-on-primary-container hover:scale-105 active:scale-95 font-display font-black text-lg px-6 py-3.5 rounded-lg transition-all cursor-pointer shadow-lg uppercase"
            >
              CLAIM OFFER
            </button>
          </div>
        </div>

        {/* Food Illustration Area with Mockup Style */}
        <div className="relative w-full max-w-[340px] md:max-w-[400px] h-64 md:h-72 rounded-xl overflow-hidden shadow-lg border border-white/20 shrink-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6UTVvazYWZmUKYfieXTQ6kaFZ8QzGc7hkJYpEwOCWyr3QZw-r3GfoKVSG27xjWaomRwRTQ35txie3z9PGFQj3e-M-5XR7o6xNMYhE6wRGZWTT73VifmfAb-N2RvVtQbBqsUpBfg-yFE56G-VMG29sXwcYwqzq6oVYW138pC5K4ObRHV-JRxYuX9N5KYEwwF1mJI5tIdQYR-ze-R1u6GJbLhf8WtjhPcFxuHmlMSoJiM3v7tBkHuDj"
            alt="Spicy food bundle" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <span className="absolute bottom-4 right-4 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            What's Up Samosa Special
          </span>
        </div>
      </div>

      {/* Choice Selector Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-primary-container animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-secondary text-white p-6 relative">
              <h3 className="font-display text-2xl font-extrabold uppercase">Customize Your Ultimate Bundle</h3>
              <p className="text-xs text-primary-fixed opacity-90 mt-1">Select your favorite fillings and drinks</p>
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-white text-2xl font-bold hover:scale-110 cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Selector Fields */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Samosa 1 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Samosa 1 Choice
                  </label>
                  <select 
                    value={samosa1} 
                    onChange={(e) => setSamosa1(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg border-2 border-outline-variant bg-surface font-sans text-sm focus:border-primary focus:ring-0 outline-none cursor-pointer"
                  >
                    <option value="Crispy Beef">Crispy Beef</option>
                    <option value="Chicken Mince">Chicken Mince</option>
                    <option value="Classic Potato">Classic Potato (Veg)</option>
                  </select>
                </div>

                {/* Samosa 2 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Samosa 2 Choice
                  </label>
                  <select 
                    value={samosa2} 
                    onChange={(e) => setSamosa2(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg border-2 border-outline-variant bg-surface font-sans text-sm focus:border-primary focus:ring-0 outline-none cursor-pointer"
                  >
                    <option value="Chicken Mince">Chicken Mince</option>
                    <option value="Crispy Beef">Crispy Beef</option>
                    <option value="Classic Potato">Classic Potato (Veg)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Roll Choice */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Signature Roll Choice
                  </label>
                  <select 
                    value={roll} 
                    onChange={(e) => setRoll(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg border-2 border-outline-variant bg-surface font-sans text-sm focus:border-primary focus:ring-0 outline-none cursor-pointer"
                  >
                    <option value="Chicken Roll">Chicken Roll</option>
                    <option value="Chicken Vegetable Roll">Chicken Vegetable Roll</option>
                    <option value="Mayo Garlic Roll">Mayo Garlic Roll</option>
                  </select>
                </div>

                {/* Cold Beverage */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                    Cold Beverage
                  </label>
                  <select 
                    value={drink} 
                    onChange={(e) => setDrink(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg border-2 border-outline-variant bg-surface font-sans text-sm focus:border-primary focus:ring-0 outline-none cursor-pointer"
                  >
                    <option value="Mint Margarita">Mint Margarita</option>
                    <option value="Cold Cola">Cold Cola</option>
                    <option value="Fresh Lemon Lime">Fresh Lemon Lime</option>
                    <option value="Sweet Lassi">Sweet Lassi</option>
                  </select>
                </div>
              </div>

              {/* Action */}
              <div className="border-t border-outline-variant pt-5 flex justify-between items-center">
                <div>
                  <span className="text-xs text-on-surface-variant">Deal Price</span>
                  <p className="font-display text-2xl font-black text-secondary">Rs 1299</p>
                </div>
                <button
                  onClick={handleClaimOffer}
                  className="bg-primary-container hover:bg-primary text-on-primary-container hover:text-white py-3.5 px-6 rounded-lg font-display font-extrabold text-sm uppercase flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md"
                >
                  CLAIM BUNDLE
                  <span className="material-symbols-outlined font-bold text-base">check</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
