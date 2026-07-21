import { MenuItem, Category, Testimonial } from './types';

// Images directly mapped from /src/assets/images
export const HERO_BANNER_IMAGE = '/src/assets/images/samosa_hero_banner_1784205311034.jpg';
export const CHICKEN_ROLLS_IMAGE = '/src/assets/images/rolls.jpg';
export const STREET_FOOD_SNACKS_IMAGE = '/src/assets/images/cutlets.webp';
export const SAMOSA_MOCK_IMAGE = '/src/assets/images/samosa.webp';
export const ROLL_MOCK_IMAGE = '/src/assets/images/rolls.jpg';

export const LOGO_IMAGE = '/src/assets/images/Logo.png';

export const CATEGORIES: Category[] = [
  {
    id: 'samosas',
    name: 'Samosas',
    description: 'Legendary triangular pockets of joy.',
    image: SAMOSA_MOCK_IMAGE,
  },
  {
    id: 'rolls',
    name: 'Rolls',
    description: 'Succulent fillings in toasted wraps.',
    image: CHICKEN_ROLLS_IMAGE,
  },
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Crispy golden bites for every craving.',
    image: STREET_FOOD_SNACKS_IMAGE,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chicken-vegetable-roll',
    name: 'Chicken Vegetable Roll',
    description: 'Crispy on the outside, soft and savory on the inside. Succulent chicken chunks marinated in secret spices.',
    price: 649,
    image: ROLL_MOCK_IMAGE,
    category: 'Rolls',
    tags: ['Popular', 'Spicy', 'Non-Veg'],
    customizationOptions: ['Extra Spicy', 'Mint Chutney', 'Less Mayo'],
  },
  {
    id: 'chicken-mince-samosa-pack-28',
    name: 'Chicken Mince Samosa - Pack of 28',
    description: 'The classic street snack. Crispy pastry filled with a fiery chicken minced meat and green peas.',
    price: 999,
    image: SAMOSA_MOCK_IMAGE,
    category: 'Samosas',
    tags: ['Best Seller', 'Medium', 'Non-Veg'],
    customizationOptions: ['Frozen (to bake/fry)', 'Freshly Fried', 'Mint Chutney'],
  },
  {
    id: 'chicken-potato-cutlets',
    name: 'Chicken Potato Cutlets',
    description: 'Golden-brown Frozen patties made with shredded chicken, mashed potatoes, and fresh coriander spices.',
    price: 649,
    image: STREET_FOOD_SNACKS_IMAGE,
    category: 'Snacks',
    tags: ['Mild', 'Popular'],
    customizationOptions: ['Extra Dip', 'Chili Flakes', 'Double Crispy'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Monsa Lisa',
    role: 'Food Blogger',
    text: '"The crunch is real! I\'ve tried samosas everywhere, but Whats Up Samosa brings a level of crispiness that\'s unparalleled. The delivery was surprisingly fast!"',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
  },
  {
    id: 't2',
    name: 'Waqar Ahmad',
    role: 'Local Guide',
    text: '"That beef samosa is a game changer. The spices are perfectly balanced - not too hot but definitely got a kick. Highly recommended for a quick lunch."',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
  },
  {
    id: 't3',
    name: 'Waqas Ali',
    role: 'Verified Buyer',
    text: '"The Chicken Mayo Roll... oh my god! It is so gooey and delicious. My kids can\'t get enough of them. Fast, hot, and super fresh!"',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
  },
];