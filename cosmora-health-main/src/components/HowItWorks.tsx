import { motion } from 'framer-motion';
import { Camera, Brain, FileText } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: 'Capture',
    description:
      'A 30-second retinal photograph is taken with a low-cost fundus camera at a primary care clinic, pharmacy, or community health site. No contrast agents, no radiation, no specialist needed — just a simple eye scan.',
    stat: '30 sec',
    statLabel: 'Per patient',
  },
  {
    icon: Brain,
    title: 'Analyze',
    description:
      'Cosmora\'s deep learning model screens retinal microvasculature for biomarkers associated with lung cancer and systemic disease. Our proprietary datasets and clinician-guided model development capture signals invisible to the naked eye.',
    stat: 'No radiation',
    statLabel: 'Non-invasive',
  },
  {
    icon: FileText,
    title: 'Report',
    description:
      'Clinicians receive a risk-stratified output flagging patients for follow-up — no CT, no specialist, no hospital required. A 30-second screening protocol that enables early detection in the settings where patients already walk in.',
    stat: '0 specialists',
    statLabel: 'Required',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">How It Works</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            The Eye Is the Gateway to{' '}
            <span className="bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
              Whole-Body Health
            </span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            A 30-second retinal scan. No radiation. No hospital. Early detection where patients already are.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative"
        >
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[20%] right-[20%] h-px" style={{
            background: 'linear-gradient(90deg, transparent, var(--color-border), var(--color-accent), var(--color-border), transparent)',
          }} />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} variants={item} className="relative">
                <div
                  className="relative bg-surface border border-border rounded-2xl p-8 h-full hover:border-accent/50 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  {/* Step number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-2 border border-border">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-text-faint font-semibold text-sm">Step {index + 1}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 font-display">{step.title}</h3>
                  <p className="text-text-muted leading-relaxed mb-6">{step.description}</p>

                  {/* Stat callout */}
                  <div className="flex items-center gap-3 pt-4 border-t border-divider">
                    <span className="text-2xl font-bold font-display text-accent">{step.stat}</span>
                    <span className="text-text-faint text-sm">{step.statLabel}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
