import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';

export default function Hero() {
  const handleScrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-hero animate-gradient-drift" style={{ backgroundSize: '200% 200%' }} />

      {/* Retinal vessel line art decoration */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vesselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
        {/* Central optic disc */}
        <circle cx="50%" cy="50%" r="80" fill="none" stroke="url(#vesselGrad)" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="40" fill="none" stroke="url(#vesselGrad)" strokeWidth="0.5" />
        {/* Vessel branches */}
        <g stroke="url(#vesselGrad)" strokeWidth="1" fill="none" opacity="0.8">
          <path d="M50 42 Q50 20 30 5 Q25 0 20 2" strokeDasharray="1000" className="animate-draw-line" />
          <path d="M50 42 Q55 25 70 8 Q78 2 85 0" strokeDasharray="1000" className="animate-draw-line" style={{ animationDelay: '0.3s' }} />
          <path d="M42 50 Q20 50 5 30 Q0 25 2 20" strokeDasharray="1000" className="animate-draw-line" style={{ animationDelay: '0.6s' }} />
          <path d="M42 50 Q25 55 8 70 Q2 78 0 85" strokeDasharray="1000" className="animate-draw-line" style={{ animationDelay: '0.9s' }} />
          <path d="M58 50 Q80 48 95 30 Q100 25 98 20" strokeDasharray="1000" className="animate-draw-line" style={{ animationDelay: '0.2s' }} />
          <path d="M58 50 Q75 55 92 72 Q98 80 100 85" strokeDasharray="1000" className="animate-draw-line" style={{ animationDelay: '0.5s' }} />
          <path d="M50 58 Q52 80 40 95 Q48 100 50 100" strokeDasharray="1000" className="animate-draw-line" style={{ animationDelay: '0.8s' }} />
          <path d="M50 42 Q48 20 60 5 Q52 0 50 0" strokeDasharray="1000" className="animate-draw-line" style={{ animationDelay: '1.1s' }} />
          {/* Smaller branches */}
          <path d="M35 12 Q30 5 25 8" strokeDasharray="500" className="animate-draw-line" style={{ animationDelay: '1.2s' }} />
          <path d="M72 15 Q78 10 82 5" strokeDasharray="500" className="animate-draw-line" style={{ animationDelay: '1.4s' }} />
          <path d="M10 30 Q5 25 8 18" strokeDasharray="500" className="animate-draw-line" style={{ animationDelay: '1.6s' }} />
          <path d="M95 30 Q100 25 92 18" strokeDasharray="500" className="animate-draw-line" style={{ animationDelay: '1.8s' }} />
          <path d="M15 72 Q8 68 5 62" strokeDasharray="500" className="animate-draw-line" style={{ animationDelay: '2s' }} />
          <path d="M90 75 Q95 72 100 68" strokeDasharray="500" className="animate-draw-line" style={{ animationDelay: '2.2s' }} />
        </g>
      </svg>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="url(#heroGrad)" strokeWidth="3" fill="none" />
                <circle cx="50" cy="50" r="20" stroke="url(#heroGrad)" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="6" fill="url(#heroGrad)" />
                <line x1="50" y1="5" x2="50" y2="28" stroke="url(#heroGrad)" strokeWidth="1.5" opacity="0.6" />
                <line x1="50" y1="72" x2="50" y2="95" stroke="url(#heroGrad)" strokeWidth="1.5" opacity="0.6" />
                <line x1="5" y1="50" x2="28" y2="50" stroke="url(#heroGrad)" strokeWidth="1.5" opacity="0.6" />
                <line x1="72" y1="50" x2="95" y2="50" stroke="url(#heroGrad)" strokeWidth="1.5" opacity="0.6" />
                <line x1="18" y1="18" x2="36" y2="36" stroke="url(#heroGrad)" strokeWidth="1" opacity="0.3" />
                <line x1="64" y1="64" x2="82" y2="82" stroke="url(#heroGrad)" strokeWidth="1" opacity="0.3" />
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-3xl font-bold font-display tracking-tight bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
              Cosmora
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          Detect Lung Cancer
          <br />
          <span className="bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
            From a Retinal Photo.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          In 30 seconds, a simple retinal photograph reveals lung cancer risk and systemic disease
          biomarkers — no radiation, no contrast agents, no specialist required. Deployable in
          primary care, pharmacies, and community clinics. The eye is the gateway to whole-body health.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group flex items-center gap-2 px-8 py-4 bg-accent text-bg font-semibold rounded-lg hover:bg-sky-400 transition-all duration-200 min-h-[44px] min-w-[140px] justify-center">
            Request Early Access
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={handleScrollToDemo}
            className="flex items-center gap-2 px-8 py-4 border border-border text-text-primary font-semibold rounded-lg hover:border-accent hover:text-accent transition-all duration-200 min-h-[44px] min-w-[140px] justify-center"
          >
            <Eye className="w-4 h-4" />
            See the Science
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-text-faint text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            30-Second Screening
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            No Radiation
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-secondary" />
            Deployable Anywhere
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-text-faint text-xs">
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4 L10 16 M5 11 L10 16 L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
