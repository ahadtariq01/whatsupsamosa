import { HERO_BANNER_IMAGE } from '../data';

interface HeroProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export default function Hero({ onOrderNow, onViewMenu }: HeroProps) {
  return (
    <section className="relative w-full">
      {/* Main Hero Banner - Full Width */}
      <div 
        className="relative w-full min-h-[500px] md:min-h-[500px] flex items-center bg-cover bg-center rounded-2xl overflow-hidden shadow-lg"
        style={{ backgroundImage: `url('${HERO_BANNER_IMAGE}')` }}
      >
        {/* Dark warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-on-primary-fixed/90 via-on-primary-fixed/60 to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-2xl px-6 md:px-12 py-12 text-white space-y-5">
          <span className="inline-block bg-secondary text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md animate-pulse">
            Freshly Fried Daily
          </span>
          
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
            Fresh, Crispy &amp; <br />
            Delicious Samosas <br />
            <span className="text-primary-container italic font-black">Delivered Hot!</span>
          </h1>
          
          <p className="text-body-lg text-primary-fixed opacity-95 max-w-lg drop-shadow-sm font-sans">
            The ultimate street food experience delivered right to your doorstep. 
            Handcrafted rolls and legendary froozen samosas packed with authentic spice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={onOrderNow}
              className="bg-secondary hover:bg-secondary-container hover:scale-105 active:scale-95 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg crispy-shadow-secondary"
            >
              ORDER NOW 
              <span className="material-symbols-outlined font-bold text-xl">arrow_forward</span>
            </button>
            <button 
              onClick={onViewMenu}
              className="bg-white/95 hover:bg-white text-on-primary-fixed font-bold py-4 px-8 rounded-lg border-2 border-outline-variant hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Feature Row underneath the banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto mt-8 px-4 md:px-0">
        <div className="flex items-center gap-4 bg-surface-container-low p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl font-bold">local_fire_department</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-on-surface">Freezer to Fryer</h3>
            <p className="text-xs text-on-surface-variant font-sans">Crispy & hot whenever you want</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-surface-container-low p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl font-bold">schedule</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-on-surface">30-Min Delivery</h3>
            <p className="text-xs text-on-surface-variant font-sans">Quick delivery guarantee</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-surface-container-low p-5 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">stars</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-on-surface">Authentic Flavor</h3>
            <p className="text-xs text-on-surface-variant font-sans">Traditional secret recipes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
