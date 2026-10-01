import { HeroSection } from '@/components/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <HeroSection />
      
      {/* Footer / Outro section for natural scroll flow */}
      <section className="min-h-screen bg-[#121212] flex items-center justify-center border-t border-zinc-800">
        <div className="text-center px-4">
          <h2 className="text-4xl font-bold mb-4 tracking-tight text-zinc-200">
            Scroll Complete
          </h2>
          <p className="text-zinc-400 text-lg max-w-md mx-auto">
            Interactive car scroll animation built with Next.js, Tailwind CSS & GSAP ScrollTrigger.
          </p>
        </div>
      </section>
    </main>
  );
}
