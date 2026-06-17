import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color1: string;
  color2: string;
  bio: string;
}

const team: TeamMember[] = [
  {
    name: 'Akshay Reddy',
    role: 'Chief Executive Officer',
    initials: 'AR',
    color1: '#0ea5e9',
    color2: '#0369a1',
    bio: 'Physician-founder and medical director at Cosmora Health, combining clinical practice with a vision for accessible early disease detection. Akshay leads product strategy, clinical partnerships, and the company\'s mission to make retinal screening the new standard of care — starting with lung cancer.',
  },
  {
    name: 'Nathaniel Tak',
    role: 'Chief Technology Officer',
    initials: 'NT',
    color1: '#14b8a6',
    color2: '#0d9488',
    bio: 'Machine learning engineer with deep expertise in medical imaging and deep learning. Nathaniel leads Cosmora\'s proprietary AI development, overseeing the architecture of retinal biomarker detection models trained on clinician-guided datasets from early-stage research institutions.',
  },
  {
    name: 'Neel Nawathey',
    role: 'Chief Operations Officer',
    initials: 'NN',
    color1: '#f59e0b',
    color2: '#d97706',
    bio: 'Operations leader who has scaled health technology programs from pilot to deployment across underserved communities. Neel oversees Cosmora\'s clinical operations, regulatory strategy, and care setting integrations — ensuring the platform works where patients need it most.',
  },
  {
    name: 'Gurneet Shaheed',
    role: 'Chief Information Officer',
    initials: 'GS',
    color1: '#8b5cf6',
    color2: '#7c3aed',
    bio: 'Healthcare infrastructure engineer specializing in secure, scalable data pipelines for clinical AI systems. Gurneet builds and maintains the platforms that ingest retinal images, manage model versioning, and deliver risk assessments in real time across multiple care settings.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(20,184,166,0.08) 0%, transparent 60%)',
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
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">Leadership</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Physician-Founded.{' '}
            <span className="bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
              Mission-Driven.
            </span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Cosmora\'s leadership team brings together clinical expertise, AI engineering,
            and healthcare operations — united by one conviction: the eye is the gateway
            to whole-body health.
          </p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={item}>
              <div className="group bg-surface border border-border rounded-2xl p-6 hover:border-accent/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 h-full flex flex-col">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${member.color1}, ${member.color2})`,
                    }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold font-display text-base">{member.name}</h3>
                    <span className="text-accent text-xs font-medium">{member.role}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-text-muted text-sm leading-relaxed flex-1">{member.bio}</p>

                {/* LinkedIn link */}
                <a
                  href="#"
                  className="flex items-center gap-2 mt-5 pt-4 border-t border-divider text-text-faint text-xs hover:text-accent transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
