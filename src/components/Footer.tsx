import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Mail, Send, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer id="contact" className="relative border-t border-divider">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Partner CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold font-display">Partner with Us</h3>
            </div>
            <p className="text-text-muted mb-6 leading-relaxed">
              We're partnering with clinical institutions to validate our diagnostic platform
              and expand access to early disease detection. Join our network of forward-thinking
              medical centers.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                  <span className="text-accent text-xs">🏥</span>
                </div>
                <span>Retinal image data sharing agreements</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                  <span className="text-accent text-xs">📊</span>
                </div>
                <span>Co-authored clinical research publications</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <div className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center shrink-0">
                  <span className="text-accent text-xs">🔬</span>
                </div>
                <span>Access to our API for clinical pilot programs</span>
              </div>
            </div>
            <button className="mt-8 flex items-center gap-2 px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-bg transition-all duration-200 min-h-[44px]">
              Explore Partnership Options
              <Send className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Waitlist CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-accent-secondary" />
              <h3 className="text-xl font-semibold font-display">Join the Waitlist</h3>
            </div>
            <p className="text-text-muted mb-6 leading-relaxed">
              Be among the first clinics to deploy Cosmora. We're onboarding early-access
              partners for our prospective clinical study — sign up to receive updates on
              platform availability in your region.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary placeholder-text-faint text-sm focus:outline-none focus:border-accent transition-colors min-h-[44px]"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-accent-secondary text-bg font-semibold rounded-lg hover:bg-teal-400 transition-all duration-200 min-h-[44px] whitespace-nowrap"
              >
                {submitted ? '✓ Joined' : 'Join'}
              </button>
            </form>
            {submitted && (
              <p className="text-success text-xs mt-2">Thank you! We'll be in touch soon.</p>
            )}
            <p className="text-text-faint text-xs mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-divider">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="url(#footGrad)" strokeWidth="3" fill="none" />
                <circle cx="50" cy="50" r="6" fill="url(#footGrad)" />
                <line x1="50" y1="8" x2="50" y2="22" stroke="url(#footGrad)" strokeWidth="1.5" opacity="0.6" />
                <line x1="50" y1="78" x2="50" y2="92" stroke="url(#footGrad)" strokeWidth="1.5" opacity="0.6" />
                <line x1="8" y1="50" x2="22" y2="50" stroke="url(#footGrad)" strokeWidth="1.5" opacity="0.6" />
                <line x1="78" y1="50" x2="92" y2="50" stroke="url(#footGrad)" strokeWidth="1.5" opacity="0.6" />
                <defs>
                  <linearGradient id="footGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-lg font-bold font-display bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
                Cosmora
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Github, label: 'GitHub', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => e.preventDefault()}
                  className="text-text-faint hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-divider max-w-3xl mx-auto text-center">
            <p className="text-xs text-text-faint leading-relaxed">
              <strong>Disclaimer:</strong> This website is for research and demonstration purposes only.
              The information presented is not intended as medical advice. Cosmora Health\'s platform
              is not FDA cleared. For more information, visit cosmorahealth.com.
            </p>
            <p className="text-xs text-text-faint/60 mt-3">
              © 2026 Cosmora Health. For research and demonstration purposes. Not FDA cleared.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
