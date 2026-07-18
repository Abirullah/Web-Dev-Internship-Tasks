import React from 'react';

function BodySection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance. Your users will love the instant load times.',
      color: 'red'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure by Default',
      description: 'Enterprise-grade security built into every layer of your application.',
      color: 'gray'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: 'Auto Scaling',
      description: 'Automatically scales with your traffic. No manual intervention needed.',
      color: 'red'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Analytics',
      description: 'Detailed insights and analytics to help you make data-driven decisions.',
      color: 'gray'
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '10K+', label: 'Customers' },
    { value: '50M+', label: 'Requests/Day' },
    { value: '24/7', label: 'Support' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechCorp',
      content: 'This platform transformed our workflow. The speed and reliability are unmatched.',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'CTO at StartupX',
      content: 'We reduced our deployment time by 80%. Simply amazing performance.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      content: 'The analytics features helped us identify bottlenecks we never knew existed.',
      rating: 5,
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-red-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
                         
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Build Faster.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                  Scale Smarter.
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg">
                The modern platform for developers who want to ship quality code faster. 
                Built with cutting-edge technology and designed for performance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors shadow-xl shadow-red-500/25 hover:shadow-red-500/40">
                  Start Free Trial
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-red-200 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-2xl shadow-red-500/20">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-300"></div>
                    <div className="w-3 h-3 rounded-full bg-red-300"></div>
                    <div className="w-3 h-3 rounded-full bg-red-300"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-red-400/50 rounded w-3/4"></div>
                    <div className="h-2 bg-red-400/50 rounded w-1/2"></div>
                    <div className="h-2 bg-red-400/50 rounded w-2/3"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-black">99.9%</div>
                      <div className="text-xs text-red-200">Uptime</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-black">50ms</div>
                      <div className="text-xs text-red-200">Latency</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-black">150+</div>
                      <div className="text-xs text-red-200">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-100 rounded-full opacity-50 -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-100 rounded-full opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
              Why Choose <span className="text-red-500">TechPro</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Everything you need to build and scale your applications effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  feature.color === 'red' 
                    ? 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white' 
                    : 'bg-gray-50 text-gray-700 group-hover:bg-gray-900 group-hover:text-white'
                } transition-all`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
              Loved by <span className="text-red-500">Developers</span>
            </h2>
            <p className="mt-4 text-gray-600">
              See what our customers are saying about us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-red-100 text-lg mb-8">
            Join thousands of developers who are already building with TechPro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-500 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-xl">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BodySection;