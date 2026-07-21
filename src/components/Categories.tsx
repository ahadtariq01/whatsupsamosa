import { CATEGORIES } from '../data';

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
  onSeeAll: () => void;
}

export default function Categories({ onSelectCategory, onSeeAll }: CategoriesProps) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant pb-3">
        <div className="space-y-1">
          <h2 className="font-display text-3xl font-extrabold text-on-surface tracking-tight relative">
            Explore Categories
            <span className="absolute -bottom-3 left-0 w-20 h-1 bg-primary-container rounded-full"></span>
          </h2>
        </div>
        <button 
          onClick={onSeeAll}
          className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          See All
          <span className="material-symbols-outlined text-base">open_in_new</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => (
          <div 
            key={category.id}
            onClick={() => onSelectCategory(category.name)}
            className="group relative h-72 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-outline-variant"
          >
            {/* Background image */}
            <img 
              src={category.image} 
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Ambient dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-on-primary-fixed/90 via-on-primary-fixed/40 to-transparent"></div>

            {/* Content card overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 text-white flex justify-between items-end">
              <div className="space-y-1 max-w-[80%]">
                <h3 className="font-display text-2xl font-extrabold tracking-tight drop-shadow-sm group-hover:text-primary-container transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-primary-fixed opacity-90 drop-shadow-sm font-sans line-clamp-2">
                  {category.description}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/95 text-on-primary-fixed flex items-center justify-center shadow-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-all group-hover:rotate-45 duration-300">
                <span className="material-symbols-outlined font-bold text-lg">arrow_outward</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
