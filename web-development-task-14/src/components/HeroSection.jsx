import React from 'react';

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8"> 
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                <span className="block">Delicious Food,</span>
                <span className="block mt-2">
                  Delivered{' '}
                  <span className="text-gray-400">Geek Fast</span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Experience the future of food delivery with Geek Food. 
              From geeky burgers to pixel-perfect pizzas, we bring restaurant-quality 
              meals right to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 hover:shadow-gray-900/20">
                Explore Menu
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Video
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
              <div>
                <div className="text-3xl font-black text-gray-900">500+</div>
                <div className="text-sm text-gray-500">Restaurants</div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <div className="text-3xl font-black text-gray-900">50K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <div className="text-3xl font-black text-gray-900">30min</div>
                <div className="text-sm text-gray-500">Avg Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative hidden lg:block">
            {/* Main Food Image Card */}
            <div className="relative z-10 bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl shadow-gray-200/50">
              <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden relative">
                <div className="text-8xl">🍔</div>
                {/* Price Tag */}
                <div className="absolute top-4 left-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
                  <div className="text-gray-900 font-bold text-lg">$12.99</div>
                  <div className="text-gray-500 text-xs">Geek Burger</div>
                </div>
                {/* Hot Badge */}
                <div className="absolute bottom-4 right-4 bg-gray-900 rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow-lg">
                  🔥
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">Geek Special Burger</h3>
                  <p className="text-gray-500 text-sm">With extra cheese & bacon</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-gray-900 font-bold">4.9</span>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute -top-8 -right-8 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl z-20">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🍕</div>
                <div>
                  <div className="text-gray-900 font-bold text-sm">Pixel Pizza</div>
                  <div className="text-gray-500 text-xs">20% OFF</div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  🚀
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-sm">Fast Delivery</div>
                  <div className="text-gray-500 text-xs">In 20 mins</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 right-1/2 w-64 h-64 border border-gray-100 rounded-full -z-10"></div>
            <div className="absolute top-1/3 right-1/3 w-48 h-48 border border-gray-50 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;