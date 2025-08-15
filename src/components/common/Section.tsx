"use client";

import { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "classnames";

type SectionProps = PropsWithChildren<{
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  fullScreen?: boolean;
  withBorder?: boolean;
  animated?: boolean;
}>;

export function Section({ 
  id, 
  title, 
  subtitle, 
  description,
  className, 
  children, 
  fullScreen = true, 
  withBorder = false,
  animated = true
}: SectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={clsx(
        "w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20 relative",
        withBorder && "border-b border-slate-200/60 dark:border-slate-700/60",
        fullScreen && "min-h-[100svh] flex items-center",
        animated && !inView && "opacity-0 translate-y-8",
        animated && inView && "opacity-100 translate-y-0 transition-all duration-1000 ease-out",
        className
      )}
    >
      <div className="max-w-7xl mx-auto w-full">
        {(title || subtitle || description) && (
          <header className="mb-12 text-center max-w-3xl mx-auto">
            {subtitle && (
              <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {subtitle}
              </div>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {description}
              </p>
            )}
          </header>
        )}
        
        <div className={clsx(
          animated && !inView && "opacity-0 translate-y-8",
          animated && inView && "opacity-100 translate-y-0 transition-all duration-1000 ease-out delay-300"
        )}>
          {children}
        </div>
      </div>
    </section>
  );
}


