import { Facebook, Twitter, Instagram } from 'lucide-react';

// Dummy footer data
const footerData = {
  about: {
    title: 'ShopEase',
    description:
      'Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent customer service.',
  },
  quickLinks: [
    { name: 'About Us', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Return Policy', href: '#' },
  ],
  categories: [
    { name: 'Electronics', href: '#' },
    { name: 'Fashion', href: '#' },
    { name: 'Home & Living', href: '#' },
    { name: 'Books', href: '#' },
    { name: 'Sports', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {footerData.about.title}
            </h3>
            <p className="text-sm mb-4">{footerData.about.description}</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {footerData.categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {currentYear} {footerData.about.title}. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerData.legal.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
