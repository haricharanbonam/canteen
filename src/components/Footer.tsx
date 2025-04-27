import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Canteen<span className="text-primary-500">Buddy</span>
                </span>
              </div>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">
              Skip the line. Eat on time.
              Pre-order your favorite meals from your college canteen.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-neutral-700 dark:text-neutral-300 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-neutral-700 dark:text-neutral-300 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center hover:bg-primary-500 dark:hover:bg-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-neutral-700 dark:text-neutral-300 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/time-slots" className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Time Slots
                </Link>
              </li>
              <li>
                <Link to="/order-summary" className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Order Summary
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Help & Support</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 dark:text-neutral-400 text-sm hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold mb-4">Contact</h5>
            <address className="not-italic">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                123 College Avenue
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                Campus, CA 94158
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                <a href="mailto:info@canteenbuddy.com" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  info@canteenbuddy.com
                </a>
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                <a href="tel:+11234567890" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  +1 (123) 456-7890
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center">
            &copy; {new Date().getFullYear()} CanteenBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;