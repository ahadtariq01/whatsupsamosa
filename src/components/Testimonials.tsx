import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <h2 className="font-display text-4xl font-extrabold text-on-surface">What Our Fans Say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div 
            key={t.id}
            className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex gap-1 text-[#FFB800]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined style-filled text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                    star
                  </span>
                ))}
              </div>
              {/* Review Text */}
              <p className="text-sm text-on-surface italic font-medium leading-relaxed font-sans">
                {t.text}
              </p>
            </div>

            {/* Reviewer Profile */}
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/40">
              <img 
                src={t.avatar} 
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-sans font-bold text-sm text-on-surface">{t.name}</h4>
                <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
