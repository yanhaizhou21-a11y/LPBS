import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

export function ThemeToggleButton({ className = '' }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('botani_theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useEffect(() => applyTheme(isDark), [isDark]);
  const toggle = () => { const next = !isDark; setIsDark(next); localStorage.setItem('botani_theme', next ? 'dark' : 'light'); applyTheme(next); };
  return <button type="button" onClick={toggle} className={`theme-toggle-button ${className}`} aria-label={isDark ? 'Gunakan tema terang' : 'Gunakan tema gelap'}>
    <AnimatePresence mode="wait" initial={false}><motion.span key={isDark ? 'sun' : 'moon'} initial={reduceMotion ? false : { opacity: 0, rotate: -70, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 70, scale: 0.6 }} transition={{ duration: 0.2 }}>{isDark ? <Sun size={19} /> : <Moon size={19} />}</motion.span></AnimatePresence>
  </button>;
}
