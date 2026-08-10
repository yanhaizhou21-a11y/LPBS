import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(function FloatingInput(
  { label, className, wrapperClassName, id, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={cn('floating-input', wrapperClassName)}>
      <input
        {...props}
        ref={ref}
        id={inputId}
        placeholder=" "
        className={cn('floating-input-field', className)}
      />
      <label className="floating-input-label" htmlFor={inputId}>{label}</label>
    </div>
  );
});
