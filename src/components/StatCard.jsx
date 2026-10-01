'use client';

export function StatCard({
  cardRef,
  numberRef,
  number,
  label,
  bgColor,
  textColor = 'text-zinc-900',
  style,
}) {
  return (
    <div
      ref={cardRef}
      style={{ ...style, willChange: 'transform, opacity' }}
      className={`absolute z-30 opacity-0 p-3 sm:p-5 md:p-7 rounded-xl sm:rounded-2xl flex flex-col justify-center items-start gap-0.5 sm:gap-1 shadow-xl backdrop-blur-sm max-w-[160px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[340px] transition-transform duration-300 ${bgColor} ${textColor}`}
    >
      <span
        ref={numberRef}
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none"
      >
        0%
      </span>
      <span className="text-[10px] sm:text-xs md:text-sm font-semibold leading-tight opacity-90">
        {label}
      </span>
    </div>
  );
}
