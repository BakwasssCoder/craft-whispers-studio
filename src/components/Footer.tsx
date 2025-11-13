import { Link } from 'react-router-dom';
import { Instagram, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://i.postimg.cc/yx3FTNGB/Whats-App-Image-2025-11-13-at-18-15-59-4f01a7d0.jpg" 
                alt="saha's Clout Logo" 
                className="h-10 w-10 object-contain transition-transform duration-300 hover:scale-110"
              />
              <h3 className="text-xl font-serif font-bold text-primary transition-transform duration-300 hover:scale-105">
                saha's Clout
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Handmade gifts crafted with love. Each piece tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/custom-order" className="text-muted-foreground hover:text-primary transition-colors">Custom Orders</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/916290127405" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/_sahasclout_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="mailto:Sahasclout@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Subhangi Saha<br />
              +91 62901 27405
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 saha's Clout. Handcrafted with ❤️</p>
          <p className="mt-2">
            <a 
              href="https://instagram.com/anikettt.tsx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Developed By: BakwasssCoder
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}