import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type FC } from 'react';
import { cn } from '@/lib/utils';

export type ThemeConfig = {
  bg?: string;
  button: string;
  dot: string;
  progress: string;
};

export interface CarouselNavigatorProps {
  totalSlides?: number;
  autoDelay?: number;
  themes?: ThemeConfig[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

const DEFAULT_TOTAL_SLIDES = 4;
const DEFAULT_AUTO_DELAY = 5000;

export const DEFAULT_BOTANI_THEMES: ThemeConfig[] = [
  {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    dot: 'bg-emerald-200 dark:bg-emerald-900',
    progress: 'bg-emerald-200 dark:bg-emerald-900',
  },
  {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    button: 'bg-amber-600 hover:bg-amber-700 text-white',
    dot: 'bg-amber-200 dark:bg-amber-900',
    progress: 'bg-amber-200 dark:bg-amber-900',
  },
  {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    button: 'bg-teal-600 hover:bg-teal-700 text-white',
    dot: 'bg-teal-200 dark:bg-teal-900',
    progress: 'bg-teal-200 dark:bg-teal-900',
  },
  {
    bg: 'bg-lime-50 dark:bg-lime-950/30',
    button: 'bg-lime-600 hover:bg-lime-700 text-white',
    dot: 'bg-lime-200 dark:bg-lime-900',
    progress: 'bg-lime-200 dark:bg-lime-900',
  },
];

export const CarouselNavigator: FC<CarouselNavigatorProps> = ({
  totalSlides = DEFAULT_TOTAL_SLIDES,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_BOTANI_THEMES,
  currentIndex,
  onIndexChange,
  className,
}) => {
  const currentTheme = themes[currentIndex % themes.length] || themes[0];

  const goPrev = () =>
    onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);

  const goNext = () => onIndexChange((currentIndex + 1) % totalSlides);

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-full border border-zinc-200/80 bg-white/90 p-2 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/90",
        className
      )}
    >
      <ArrowButton
        onClick={goPrev}
        themeColor={currentTheme.button}
        disabled={false}
        ariaLabel="Slide Sebelumnya"
      >
        <ChevronLeft className="size-4" />
      </ArrowButton>

      <div className="flex items-center gap-1.5 px-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <Indicator
            key={i}
            isActive={i === currentIndex}
            theme={currentTheme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>

      <ArrowButton
        onClick={goNext}
        themeColor={currentTheme.button}
        disabled={false}
        ariaLabel="Slide Selanjutnya"
      >
        <ChevronRight className="size-4" />
      </ArrowButton>
    </div>
  );
};

interface ArrowButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  themeColor: string;
  disabled?: boolean;
  ariaLabel: string;
}

const ArrowButton = ({ children, onClick, themeColor, disabled, ariaLabel }: ArrowButtonProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "flex size-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 shadow-xs",
        disabled
          ? "cursor-not-allowed bg-zinc-100 text-zinc-400 opacity-50 dark:bg-zinc-800 dark:text-zinc-500"
          : themeColor
      )}
    >
      {children}
    </motion.button>
  );
};

const Indicator = ({
  isActive,
  theme,
  autoDelay,
  onClick,
}: {
  isActive: boolean;
  theme: ThemeConfig;
  autoDelay: number;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Pilih Slide"
      className={cn(
        "relative h-2.5 cursor-pointer rounded-full overflow-hidden transition-all duration-300 focus-visible:outline-none",
        isActive ? `w-10 ${theme.progress}` : `w-2.5 ${theme.dot} hover:opacity-80`
      )}
    >
      {isActive && (
        <motion.div
          key={`indicator-fill-${Date.now()}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoDelay / 1000, ease: 'linear' }}
          className="absolute inset-0 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.5)] dark:bg-emerald-400"
        />
      )}
    </button>
  );
};

export default CarouselNavigator;
