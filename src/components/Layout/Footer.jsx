import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800 font-playful">Lovable</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Making learning fun and engaging for kids aged 6-16. Join thousands of students and teachers in our amazing learning community!
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@lovable.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+233 (539) 428718</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-600 hover:text-primary-600 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-600 hover:text-primary-600 transition-colors">
                Contact
              </Link>
              <Link to="/pricing" className="block text-gray-600 hover:text-primary-600 transition-colors">
                Pricing
              </Link>
              <Link to="/help" className="block text-gray-600 hover:text-primary-600 transition-colors">
                Help Center
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
            <div className="space-y-2">
              <Link to="/terms" className="block text-gray-600 hover:text-primary-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="block text-gray-600 hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="block text-gray-600 hover:text-primary-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            Made with ❤️ by{' '}
            <a 
              href="https://wa.me/233599395735/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 transition-colors"
            >
              Isaac
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
