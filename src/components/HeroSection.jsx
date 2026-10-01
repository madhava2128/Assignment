'use client';

import { useRef } from 'react';
import { RoadTrack } from './RoadTrack';
import { useCarScrollAnimation } from '../hooks/useCarScrollAnimation';

export function HeroSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const letterRefs = useRef([]);
  const statCardRefs = useRef([]);
  const numberRefs = useRef([]);

  useCarScrollAnimation({
    containerRef,
    trackRef,
    carRef,
    trailRef,
    headlineRef,
    letterRefs,
    statCardRefs,
    numberRefs,
  });

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#121212] w-full">
      <RoadTrack
        trackRef={trackRef}
        carRef={carRef}
        trailRef={trailRef}
        headlineRef={headlineRef}
        letterRefs={letterRefs}
        statCardRefs={statCardRefs}
        numberRefs={numberRefs}
      />
    </section>
  );
}
