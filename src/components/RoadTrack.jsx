'use client';

import Image from 'next/image';
import { Headline } from './Headline';
import { StatCard } from './StatCard';

export function RoadTrack({
  trackRef,
  carRef,
  trailRef,
  headlineRef,
  letterRefs,
  statCardRefs,
  numberRefs,
}) {
  const stats = [
    {
      id: 'box1',
      number: '58%',
      targetVal: 58,
      label: 'Increase in pick up point use',
      bgColor: 'bg-[#def54f]',
      textColor: 'text-zinc-900',
      desktopStyle: { top: '5%', right: '30%' },
    },
    {
      id: 'box2',
      number: '23%',
      targetVal: 23,
      label: 'Decreased in customer phone calls',
      bgColor: 'bg-[#6ac9ff]',
      textColor: 'text-zinc-900',
      desktopStyle: { bottom: '5%', right: '35%' },
    },
    {
      id: 'box3',
      number: '27%',
      targetVal: 27,
      label: 'Increase in pick up point use',
      bgColor: 'bg-[#333333]',
      textColor: 'text-white',
      desktopStyle: { top: '5%', right: '10%' },
    },
    {
      id: 'box4',
      number: '40%',
      targetVal: 40,
      label: 'Decreased in customer phone calls',
      bgColor: 'bg-[#fa7328]',
      textColor: 'text-zinc-900',
      desktopStyle: { bottom: '5%', right: '12.5%' },
    },
  ];

  return (
    <div
      ref={trackRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#d1d1d1] overflow-hidden select-none"
    >
      {/* Central Road Strip */}
      <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] bg-[#1e1e1e] overflow-hidden flex items-center">
        {/* Dynamic Green Trail behind car (uses transform scaleX only) */}
        <div
          ref={trailRef}
          className="absolute top-0 left-0 h-full w-full bg-[#45db7d] z-10 origin-left scale-x-0 will-change-transform"
        />

        {/* Letter-spaced headline reveal */}
        <Headline headlineRef={headlineRef} letterRefs={letterRefs} />

        {/* Moving Car Visual */}
        <div
          ref={carRef}
          className="absolute top-0 left-0 z-20 h-[160px] sm:h-[180px] md:h-[200px] flex items-center justify-center will-change-transform pointer-events-none"
          style={{ width: '418px', willChange: 'transform' }}
        >
          <Image
            src="/car.png"
            alt="McLaren 720S Top View"
            width={418}
            height={200}
            priority
            className="h-[160px] sm:h-[180px] md:h-[200px] w-auto object-contain"
          />
        </div>
      </div>

      {/* 4 Stat Cards */}
      {stats.map((stat, idx) => (
        <StatCard
          key={stat.id}
          cardRef={(el) => {
            if (statCardRefs && statCardRefs.current) {
              statCardRefs.current[idx] = el;
            }
          }}
          numberRef={(el) => {
            if (numberRefs && numberRefs.current) {
              numberRefs.current[idx] = el;
            }
          }}
          number={stat.number}
          label={stat.label}
          bgColor={stat.bgColor}
          textColor={stat.textColor}
          style={stat.desktopStyle}
        />
      ))}
    </div>
  );
}
