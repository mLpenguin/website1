import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  startOnView?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  startOnView = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!startOnView || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  const formatted = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { count, formatted: `${prefix}${formatted}${suffix}` as string, ref };
}
