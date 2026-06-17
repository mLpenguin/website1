import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, UploadCloud, Activity, Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface DiseaseScore {
  name: string;
  score: number;
  risk: 'low' | 'elevated' | 'high';
  color: string;
}

const mockResults: DiseaseScore[] = [
  { name: 'Lung Cancer Risk Indicator', score: 14, risk: 'elevated', color: '#f59e0b' },
  { name: 'Cardiovascular Risk', score: 19, risk: 'elevated', color: '#f59e0b' },
  { name: 'Diabetic Retinopathy', score: 8, risk: 'low', color: '#22c55e' },
  { name: 'Systemic Inflammatory Marker', score: 11, risk: 'low', color: '#22c55e' },
];

const analysisSteps = [
  { label: 'Analyzing retinal microvasculature...', duration: 800 },
  { label: 'Screening for lung cancer biomarkers...', duration: 1200 },
  { label: 'Generating risk-stratified report...', duration: 600 },
];

export default function DemoPanel() {
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startAnalysis = () => {
    setStatus('analyzing');
    setCurrentStep(0);
    setStepProgress(0);

    const totalDuration = analysisSteps.reduce((sum, s) => sum + s.duration, 0);
    const startTime = Date.now();

    // Animate overall progress
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const overallProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setStepProgress(overallProgress);

      if (elapsed >= totalDuration) {
        clearInterval(progressInterval);
        setStatus('complete');
      }
    }, 50);

    // Track step transitions
    let stepTime = 0;
    for (let i = 0; i < analysisSteps.length; i++) {
      const step = analysisSteps[i];
      stepTime += step.duration;
      timerRef.current = setTimeout(() => {
        setCurrentStep(i);
      }, stepTime);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const resetDemo = () => {
    setStatus('idle');
    setCurrentStep(0);
    setStepProgress(0);
  };

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(14,165,233,0.06) 0%, transparent 60%)',
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
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">Live Demo</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Try{' '}
            <span className="bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] bg-clip-text text-transparent">
              Cosmora Now
            </span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Experience our AI analysis pipeline — upload a retinal fundus image to see how disease
            probability scores are generated in real time.
          </p>
        </motion.div>

        {/* Demo container */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-divider">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-accent" />
              <span className="font-semibold font-display text-sm">Analysis Console</span>
              {status === 'analyzing' && (
                <span className="flex items-center gap-1.5 text-xs text-text-faint">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Processing...
                </span>
              )}
              {status === 'complete' && (
                <span className="flex items-center gap-1.5 text-xs text-success">
                  <CheckCircle2 className="w-3 h-3" />
                  Complete
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {status === 'complete' && (
                <button
                  onClick={resetDemo}
                  className="text-xs text-text-faint hover:text-text-muted transition-colors px-3 py-1.5 rounded border border-border hover:border-text-muted"
                >
                  Reset
                </button>
              )}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Image upload / display area */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-divider">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">Fundus Image</h3>

              <div className="relative aspect-square max-w-sm mx-auto bg-surface-2 rounded-xl border border-border overflow-hidden">
                {status === 'idle' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-text-faint">
                    <UploadCloud className="w-12 h-12 text-text-faint/50" />
                    <p className="text-sm text-center px-4">
                      Drag & drop a fundus image, or click to browse
                    </p>
                    <button
                      onClick={startAnalysis}
                      className="flex items-center gap-2 px-6 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-sky-400 transition-all duration-200 min-h-[44px]"
                    >
                      <Upload className="w-4 h-4" />
                      Analyze for Lung Cancer Risk
                    </button>
                    <p className="text-xs text-text-faint/60">Cosmora retinal biomarker screening demo</p>
                  </div>
                )}

                {status !== 'idle' && (
                  <>
                    {/* Mock fundus image (radial gradient) */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, #fef3c7 0%, #fde68a 15%, #fbbf24 25%, #92400e 40%, #78350f 55%, #451a03 70%, #1c0a00 85%, #0f0500 100%)',
                      }}
                    >
                      {/* Mock retinal vessels */}
                      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="#92400e" strokeWidth="1.5" fill="none">
                          <path d="M50 50 Q50 20 35 5" />
                          <path d="M50 50 Q55 25 65 10" />
                          <path d="M50 50 Q20 50 5 35" />
                          <path d="M50 50 Q25 55 10 65" />
                          <path d="M50 50 Q80 48 95 35" />
                          <path d="M50 50 Q75 55 90 70" />
                          <path d="M50 50 Q48 80 40 95" />
                          <path d="M50 50 Q52 20 60 5" />
                          {/* Branches */}
                          <path d="M42 15 Q35 8 30 12" strokeWidth="1" />
                          <path d="M68 18 Q72 12 78 8" strokeWidth="1" />
                          <path d="M15 42 Q8 38 5 32" strokeWidth="1" />
                          <path d="M18 68 Q12 62 8 58" strokeWidth="1" />
                          <path d="M85 42 Q92 38 95 32" strokeWidth="1" />
                          <path d="M82 68 Q88 62 92 58" strokeWidth="1" />
                          <path d="M45 85 Q42 90 38 92" strokeWidth="1" />
                        </g>
                        {/* Optic disc */}
                        <circle cx="50%" cy="50%" r="12%" fill="#fef3c7" opacity="0.6" />
                      </svg>

                      {/* Bounding box overlays (shown during analysis) */}
                      <AnimatePresence>
                        {(status === 'analyzing' || status === 'complete') && (
                          <>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 }}
                              className="absolute border-2 border-error/60 rounded"
                              style={{
                                left: '30%',
                                top: '35%',
                                width: '15%',
                                height: '20%',
                              }}
                            >
                              <span className="absolute -top-5 left-0 text-[9px] bg-error/80 text-white px-1 rounded">
                                Microaneurysm
                              </span>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 }}
                              className="absolute border-2 border-warning/60 rounded"
                              style={{
                                left: '55%',
                                top: '50%',
                                width: '20%',
                                height: '15%',
                              }}
                            >
                              <span className="absolute -top-5 left-0 text-[9px] bg-warning/80 text-white px-1 rounded">
                                Vascular change
                              </span>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Progress overlay during analysis */}
                    {status === 'analyzing' && (
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-surface/90 to-transparent">
                        <div className="flex items-center gap-2 mb-2">
                          <Loader2 className="w-4 h-4 text-accent animate-spin" />
                          <span className="text-xs text-text-muted">
                            Step {currentStep + 1} of {analysisSteps.length}: {analysisSteps[currentStep]?.label}
                          </span>
                        </div>
                        <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full"
                            animate={{ width: `${stepProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right: Results panel */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">
                Risk Assessment Results
              </h3>

              {status === 'idle' && (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-text-faint">
                  <XCircle className="w-10 h-10 mb-3 opacity-40" />
                  <p className="text-sm text-center">
                    Click "Analyze Sample Image" to see lung cancer risk assessment
                  </p>
                </div>
              )}

              {status === 'analyzing' && (
                <div className="space-y-4 min-h-[300px]">
                  {analysisSteps.map((step, index) => (
                    <div key={step.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">{step.label}</span>
                        {index < currentStep && (
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                        )}
                        {index === currentStep && (
                          <Loader2 className="w-4 h-4 text-accent animate-spin shrink-0" />
                        )}
                      </div>
                      <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            index < currentStep ? 'bg-success' : 'bg-accent'
                          }`}
                          initial={{ width: '0%' }}
                          animate={{ width: index < currentStep ? '100%' : '0%' }}
                          transition={{
                            duration: index === currentStep ? analysisSteps[index].duration / 1000 : 0,

                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {status === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-divider">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm font-semibold text-text-primary">Analysis Complete</span>
                    <span className="text-xs text-text-faint ml-auto">30s screening protocol</span>
                  </div>

                  {mockResults.map((result, index) => (
                    <motion.div
                      key={result.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary">{result.name}</span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: result.color }}
                        >
                          {result.score}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-surface-2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: result.color }}
                          initial={{ width: '0%' }}
                          animate={{ width: `${result.score}%` }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.1,

                          }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${
                            result.risk === 'low'
                              ? 'bg-success/10 text-success'
                              : result.risk === 'elevated'
                              ? 'bg-warning/10 text-warning'
                              : 'bg-error/10 text-error'
                          }`}
                        >
                          {result.risk} risk
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Recommendation */}
                  <div className="mt-6 p-4 rounded-xl border border-warning/30 bg-warning/5">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-warning shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-warning">Clinical Recommendation</p>
                        <p className="text-xs text-text-muted mt-1">
                          Lung cancer risk indicator elevated at 14% with cardiovascular risk at 19%.
                          Recommend low-dose CT referral and comprehensive cardiovascular workup.
                          Retinal biomarker screening provides a radiation-free first-pass assessment.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
