import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
  root.classList.toggle('light', !isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
  window.dispatchEvent(new CustomEvent('botani-theme-change', { detail: isDark }));
}

export function ThemeToggleButton({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('botani_theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    applyTheme(isDark);

    const syncTheme = (event: Event) => {
      setIsDark((event as CustomEvent<boolean>).detail);
    };
    window.addEventListener('botani-theme-change', syncTheme);
    return () => window.removeEventListener('botani-theme-change', syncTheme);
  }, [isDark]);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    localStorage.setItem('botani_theme', next ? 'dark' : 'light');
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`size-11 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 ${className}`}
      aria-label={isDark ? 'Gunakan tema terang' : 'Gunakan tema gelap'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={reduceMotion ? false : { opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-slate-700 dark:text-slate-200" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggleButton;

