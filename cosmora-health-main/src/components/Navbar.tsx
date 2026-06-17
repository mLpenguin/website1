import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Technology', href: '#technology' },
  { label: 'Team', href: '#team' },
  { label: 'Demo', href: '#demo' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-xl border-b border-divider shadow-[0_1px_0_rgba(30,58,79,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 shrink-0">
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="url(#navGrad)" strokeWidth="3" fill="none" />
              <circle cx="50" cy="50" r="6" fill="url(#navGrad)" />
              <defs>
                <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-lg font-bold font-display bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
              Cosmora
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-surface"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#demo')}
              className="ml-4 px-5 py-2 bg-accent text-bg text-sm font-semibold rounded-lg hover:bg-sky-400 transition-colors min-h-[44px] flex items-center"
            >
              Try Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-divider"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-4 py-3 text-text-muted hover:text-text-primary hover:bg-surface transition-colors rounded-lg min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('#demo')}
                  className="mt-2 w-full px-4 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-sky-400 transition-colors min-h-[44px] text-center"
                >
                  Try Demo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
