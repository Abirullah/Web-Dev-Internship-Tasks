import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { name: 'Home', href: '#home' },
      { name: 'Menu', href: '#menu' },
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    'Our Menu': [
      { name: 'Burgers', href: '#burgers' },
      { name: 'Pizzas', href: '#pizzas' },
      { name: 'Sushi', href: '#sushi' },
      { name: 'Desserts', href: '#desserts' },
    ],
    'Support': [
      { name: 'FAQ', href: '#faq' },
      { name: 'Shipping', href: '#shipping' },
      { name: 'Returns', href: '#returns' },
      { name: 'Privacy Policy', href: '#privacy' },
    ],
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">🍔</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-gray-900">
                    Geek<span className="text-gray-600">Food</span>
                  </span>
                </div>
              </div>
              <p className="text-gray-500 mb-6 max-w-md leading-relaxed">
                Delivering happiness to your doorstep with the geekiest and most delicious 
                food in town. Fast delivery, fresh ingredients, and a touch of geek culture.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {['twitter', 'instagram', 'github', 'discord'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm13 6.75h-2v-3.5c0-1.1-.9-2-2-2s-2 .9-2 2v3.5h-2v-6h2v1.1c.7-.8 1.8-1.1 2.8-.9 1.2.2 2.2 1.2 2.2 2.5v3.3z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wider">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-500 text-sm hover:text-gray-900 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} GeekFood. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#terms" className="text-gray-400 text-sm hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="#privacy" className="text-gray-400 text-sm hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#cookies" className="text-gray-400 text-sm hover:text-gray-900 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;