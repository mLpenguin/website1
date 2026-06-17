import { useCountUp } from '../hooks/useCountUp';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Second Screening Protocol', value: 30, prefix: '', suffix: '', decimals: 0 },
  { label: 'Disease Categories in Pipeline', value: 4, prefix: '', suffix: '', decimals: 0 },
  { label: 'Radiation Required', value: 0, prefix: '', suffix: '', decimals: 0 },
  { label: 'Care Settings', value: 3, prefix: '', suffix: '', decimals: 0 },
];

export default function Metrics() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(14,165,233,0.04) 50%, transparent)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">The Protocol</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Early Detection,{' '}
            <span className="bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
              By the Numbers
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const { formatted } = useCountUp({
              end: metric.value,
              duration: 2000,
              decimals: metric.decimals,
              prefix: metric.prefix,
              suffix: metric.suffix,
            });

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-display bg-gradient-to-b from-text-primary to-text-muted mb-3">
                  {formatted}
                </div>
                <p className="text-text-faint text-sm sm:text-base">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
