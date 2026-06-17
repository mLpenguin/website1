import { motion } from 'framer-motion';
import { Scan, Shield, Camera, Stethoscope, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Scan,
    title: 'Retinal Biomarker Detection',
    description:
      'A well-established connection between retinal microvasculature and systemic disease. Emerging research supports retinal biomarkers linked to lung cancer and other internal conditions. We turn a retinal photo into a non-invasive biomarker platform.',
    accent: 'Lung cancer signal',
  },
  {
    icon: Shield,
    title: 'Non-Invasive Screening',
    description:
      'No radiation, no contrast agents, no hospital infrastructure required. A simple retinal photograph replaces expensive CT scans for initial risk stratification — making early screening accessible to anyone.',
    accent: 'Zero radiation',
  },
  {
    icon: Camera,
    title: 'Fundus Camera Compatibility',
    description:
      'Works with low-cost, widely available fundus cameras already deployed in primary care and community settings. No proprietary hardware required — leverage the equipment your clinic already has.',
    accent: 'Low-cost hardware',
  },
  {
    icon: Stethoscope,
    title: 'Primary Care Deployable',
    description:
      'Designed for deployment in primary care clinics, pharmacies, and community health settings. A 30-second screening protocol that fits into existing patient flows without special training or infrastructure.',
    accent: '3 care settings',
  },
  {
    icon: Users,
    title: 'Clinician-Guided AI',
    description:
      'Physician-led model development and validation from day one. Every algorithm is shaped by clinical expertise, ensuring outputs translate directly into actionable care decisions.',
    accent: 'Physician-led',
  },
  {
    icon: ArrowRight,
    title: 'Multi-Disease Expansion',
    description:
      'Starting with lung cancer, expanding to cardiometabolic and oncologic diseases. Our platform vision is to make the eye the gateway to systemic disease screening across all major disease categories.',
    accent: '4 categories',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Technology() {
  return (
    <section id="technology" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">Science & Technology</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            The Science Behind{' '}
            <span className="bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
              Retinal Screening
            </span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            The retina reflects whole-body vascular and inflammatory health. Our technology turns a retinal photo
            into a non-invasive biomarker platform — starting with lung cancer.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            // Make the first card span 2 columns on large screens for asymmetry
            const isLargeCard = index === 0;

            return (
              <motion.div
                key={feature.title}
                variants={item}
                className={`${isLargeCard ? 'md:col-span-2 lg:col-span-2' : ''} group`}
              >
                <div
                  className="bg-surface border border-border rounded-2xl p-7 h-full hover:border-accent/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-surface-2 border border-border group-hover:border-accent/30 transition-colors">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-text-faint text-xs font-mono">{feature.accent}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-display group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
