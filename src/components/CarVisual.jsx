'use client';

import Image from 'next/image';

export function CarVisual({ carRef }) {
  return (
    <div
      ref={carRef}
      className="absolute top-0 left-0 z-20 h-[200px] flex items-center justify-center pointer-events-none"
      style={{ width: '150px' }}
    >
      <Image
        src="/car.png"
        alt="McLaren 720S Top View"
        width={300}
        height={150}
        priority
        className="w-full h-auto object-contain transform rotate-90"
      />
    </div>
  );
}
