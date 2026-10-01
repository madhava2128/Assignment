'use client';

export function Headline({ headlineRef, letterRefs }) {
  const letters = [
    'W', 'E', 'L', 'C', 'O', 'M', 'E',
    ' ',
    'I', 'T', 'Z', 'F', 'I', 'Z', 'Z'
  ];

  return (
    <h1
      ref={headlineRef}
      className="absolute top-1/2 -translate-y-1/2 left-[4%] sm:left-[5%] z-10 flex items-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-widest pointer-events-none select-none uppercase"
    >
      {letters.map((char, index) => {
        if (char === ' ') {
          return (
            <span
              key={index}
              ref={(el) => {
                if (letterRefs && letterRefs.current) {
                  letterRefs.current[index] = el;
                }
              }}
              className="inline-block w-4 sm:w-8 md:w-12 lg:w-16 opacity-0 transition-opacity duration-200"
            >
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={index}
            ref={(el) => {
              if (letterRefs && letterRefs.current) {
                letterRefs.current[index] = el;
              }
            }}
            className="inline-block text-[#111111] opacity-0 transition-opacity duration-200"
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}
