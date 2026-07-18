import React, { useState } from 'react';

function CardSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'burger', 'pizza', 'sushi', 'dessert', 'drinks'];

  const menuItems = [
    {
      id: 1,
      name: 'Geek Burger Deluxe',
      description: 'Double patty with special geek sauce',
      price: '$14.99',
      rating: 4.9,
      reviews: 234,
      image: '🍔',
      category: 'burger',
      badge: 'Bestseller',
      deliveryTime: '20-25 min',
    },
    {
      id: 2,
      name: 'Pixel Perfect Pizza',
      description: 'Loaded with veggies and extra cheese',
      price: '$18.99',
      rating: 4.8,
      reviews: 186,
      image: '🍕',
      category: 'pizza',
      badge: 'Popular',
      deliveryTime: '25-30 min',
    },
    {
      id: 3,
      name: 'Sushi Roll Combo',
      description: 'Fresh salmon and avocado rolls',
      price: '$24.99',
      rating: 4.7,
      reviews: 152,
      image: '🍣',
      category: 'sushi',
      badge: 'New',
      deliveryTime: '30-35 min',
    },
    {
      id: 4,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate with vanilla ice cream',
      price: '$9.99',
      rating: 4.9,
      reviews: 312,
      image: '🍰',
      category: 'dessert',
      badge: 'Must Try',
      deliveryTime: '15-20 min',
    },
    {
      id: 5,
      name: 'Code Cola Special',
      description: 'Refreshing cola with a geeky twist',
      price: '$4.99',
      rating: 4.6,
      reviews: 178,
      image: '🥤',
      category: 'drinks',
      badge: 'Refreshing',
      deliveryTime: '10-15 min',
    },
    {
      id: 6,
      name: 'Byte-Sized Tacos',
      description: 'Crispy tacos with spicy filling',
      price: '$12.99',
      rating: 4.7,
      reviews: 201,
      image: '🌮',
      category: 'burger',
      badge: 'Spicy',
      deliveryTime: '20-25 min',
    },
    {
      id: 7,
      name: 'RAM-En Noodles',
      description: 'Steaming hot ramen with pork broth',
      price: '$16.99',
      rating: 4.8,
      reviews: 167,
      image: '🍜',
      category: 'sushi',
      badge: 'Hot',
      deliveryTime: '25-30 min',
    },
    {
      id: 8,
      name: 'Firewall Wings',
      description: 'Spicy chicken wings with blue cheese',
      price: '$13.99',
      rating: 4.5,
      reviews: 289,
      image: '🍗',
      category: 'burger',
      badge: 'Spicy',
      deliveryTime: '20-25 min',
    },
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full mb-4 shadow-sm">
            <span className="text-sm font-semibold text-gray-600">Our Menu</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Explore Our{' '}
            <span className="text-gray-400">Delicious Menu</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From geeky burgers to pixel-perfect desserts, we have something for every craving.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all capitalize ${
                activeCategory === category
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Items' : category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Badge & Delivery Time */}
              <div className="flex items-center justify-between mb-3">
                <span className="bg-gray-50 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
                  {item.badge}
                </span>
                <span className="text-gray-400 text-xs">{item.deliveryTime}</span>
              </div>

              {/* Food Image/Emoji */}
              <div className="relative mb-4">
                <div className="w-full aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-7xl group-hover:scale-110 transition-transform">
                  {item.image}
                </div>
                <button className="absolute top-2 right-2 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-all shadow-sm border border-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-gray-900 font-bold text-lg mb-1 group-hover:text-gray-700 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-black text-xl">{item.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-sm">⭐</span>
                    <span className="text-gray-900 font-semibold text-sm">{item.rating}</span>
                    <span className="text-gray-400 text-xs">({item.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full mt-4 bg-gray-50 border border-gray-200 text-gray-700 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all shadow-sm">
            View Full Menu
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CardSection;