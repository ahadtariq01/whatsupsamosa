import { LOGO_IMAGE } from '../data';

interface FooterProps {
  setActiveTab: (tab: 'Home' | 'Menu' | 'Checkout') => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-on-primary-fixed text-primary-fixed mt-16 border-t-4 border-primary-container">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <img 
                src={LOGO_IMAGE} 
                alt="Whats Up Samosa" 
                className="h-16 md:h-20 object-contain bg-white/10 p-2 rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-base text-primary-fixed/80 max-w-md font-sans leading-relaxed">
              Serving the frozen, spiciest, flakiest, and most addictive samosas and wraps since 2016. 
              We bring the vibrant soul of street food directly to your doorstep, freshly frozen!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-black text-tertiary-fixed tracking-widest uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-3 font-sans text-base">
              <li>
                <button 
                  onClick={() => { setActiveTab('Home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-primary-container cursor-pointer transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('Menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-primary-container cursor-pointer transition-colors"
                >
                  Our Menu
                </button>
              </li>
              <li>  
                <button 
                  onClick={() => { setActiveTab('Checkout'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-primary-container cursor-pointer transition-colors"
                >
                  Checkout
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info with Clickable Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-black text-tertiary-fixed tracking-widest uppercase">
              CONTACT INFO
            </h4>
            <ul className="space-y-3 font-sans text-sm text-primary-fixed/90">
              <li>
                <a 
                  href="tel:+923230047404" 
                  className="flex items-center gap-2.5 hover:text-primary-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary-container text-lg">phone</span>
                  <span>+923230047404</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:ilyasjoia123@gmail.com" 
                  className="flex items-center gap-2.5 hover:text-primary-container transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary-container text-lg">mail</span>
                  <span>ilyasjoia123@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary-container text-lg">pin_drop</span>
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar / Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-fixed/70 font-sans">
          <p>© 2026 Whats Up Samosa. Spicy &amp; Fresh. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}