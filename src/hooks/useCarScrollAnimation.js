'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_CONFIG } from '../constants/animationConfig';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook encapsulating GSAP ScrollTrigger timeline management.
 * Manages intro reveals, scroll-driven car translation, dynamic green trail scaling,
 * letter opacity triggers, and stat card count-up percentage animations.
 */
export function useCarScrollAnimation({
  containerRef,
  trackRef,
  carRef,
  trailRef,
  headlineRef,
  letterRefs,
  statCardRefs,
  numberRefs,
}) {
  useLayoutEffect(() => {
    if (!containerRef.current || !carRef.current || !trackRef.current) return;

    // Scope GSAP instances to containerRef to ensure clean unmount teardown
    const ctx = gsap.context(() => {
      const carEl = carRef.current;
      const trailEl = trailRef.current;
      const headlineEl = headlineRef.current;
      const letterEls = letterRefs.current ? letterRefs.current.filter(Boolean) : [];
      const cardEls = statCardRefs.current ? statCardRefs.current.filter(Boolean) : [];
      const numberEls = numberRefs.current ? numberRefs.current.filter(Boolean) : [];

      // Honor user system motion preferences for accessibility compliance
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(cardEls, { opacity: 1, y: 0, scale: 1 });
        gsap.set(letterEls, { opacity: 1, y: 0 });
        gsap.set(carEl, { x: 0 });
        if (trailEl) gsap.set(trailEl, { scaleX: 1 });
        numberEls.forEach((numEl, idx) => {
          if (numEl) numEl.innerText = `${ANIMATION_CONFIG.statPercentages[idx] || 0}%`;
        });
        return;
      }

      // Pre-set hardware-accelerated initial states to prevent FOUC (flash of unstyled content)
      gsap.set(cardEls, { opacity: 0, y: 40, scale: 0.95 });
      gsap.set(letterEls, { opacity: 0, y: 30 });
      gsap.set(carEl, { x: 0 });
      if (trailEl) {
        gsap.set(trailEl, { scaleX: 0, transformOrigin: 'left center' });
      }

      // Initial page-load entrance timeline for headline letters
      const introTl = gsap.timeline({
        defaults: { ease: ANIMATION_CONFIG.eases.intro },
      });

      if (letterEls.length > 0) {
        introTl.to(letterEls, {
          opacity: ANIMATION_CONFIG.intro.ambientLetterOpacity,
          y: 0,
          duration: ANIMATION_CONFIG.intro.letterDuration,
          stagger: ANIMATION_CONFIG.intro.letterStagger,
          ease: ANIMATION_CONFIG.eases.intro,
        });
      }

      // Responsive layout handling using GSAP MatchMedia
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: ANIMATION_CONFIG.breakpoints.desktop,
          isMobile: ANIMATION_CONFIG.breakpoints.mobile,
        },
        (context) => {
          const { isMobile } = context.conditions;

          // Cached numeric measurements to prevent layout thrashing/reflows during active scroll
          let cachedCarWidth = 418;
          let cachedRoadWidth = window.innerWidth;
          let cachedHeadlineLeft = 0;
          let cachedLetterOffsets = [];

          const recacheLayoutDimensions = () => {
            cachedCarWidth = carEl.offsetWidth || 418;
            cachedRoadWidth = trackRef.current ? trackRef.current.offsetWidth : window.innerWidth;
            cachedHeadlineLeft = headlineEl ? headlineEl.getBoundingClientRect().left : 0;
            cachedLetterOffsets = letterEls.map((letter) => (letter ? letter.offsetLeft : 0));
          };

          recacheLayoutDimensions();

          // Scroll progress update handler reading cached values only
          const updateCarProgress = () => {
            const currentCarX = gsap.getProperty(carEl, 'x') + cachedCarWidth / 2;

            // Update trail via scaleX to keep render operations strictly on the GPU compositor
            if (trailEl && cachedRoadWidth > 0) {
              const progressRatio = Math.min(Math.max(currentCarX / cachedRoadWidth, 0), 1);
              gsap.set(trailEl, { scaleX: progressRatio });
            }

            // Highlight headline letters as the car's horizontal center point drives past them
            letterEls.forEach((letter, i) => {
              if (!letter) return;
              const letterX = cachedHeadlineLeft + (cachedLetterOffsets[i] || 0);
              if (currentCarX >= letterX) {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0px)';
              } else {
                letter.style.opacity = '0.35';
              }
            });
          };

          // Scrub-driven car movement pinned inside the hero track container
          gsap.to(carEl, {
            x: () => (trackRef.current ? trackRef.current.offsetWidth - cachedCarWidth : window.innerWidth - cachedCarWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: ANIMATION_CONFIG.scroll.scrubSmoothness,
              pin: trackRef.current,
              invalidateOnRefresh: true,
              onRefresh: () => {
                recacheLayoutDimensions();
                updateCarProgress();
              },
            },
            onUpdate: updateCarProgress,
          });

          // Sequential stat card reveals with dynamic percentage count-up
          const offsets = isMobile
            ? ANIMATION_CONFIG.statOffsets.mobile
            : ANIMATION_CONFIG.statOffsets.desktop;

          cardEls.forEach((card, index) => {
            if (!card) return;
            const startOffset = offsets[index] || 400 + index * 200;
            const endOffset = startOffset + ANIMATION_CONFIG.statOffsets.revealWindow;

            const numEl = numberEls[index];
            const targetVal = ANIMATION_CONFIG.statPercentages[index] || 0;

            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: ANIMATION_CONFIG.eases.statCard,
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top+=${startOffset} top`,
                end: `top+=${endOffset} top`,
                scrub: ANIMATION_CONFIG.scroll.scrubSmoothness,
                onUpdate: (self) => {
                  if (numEl) {
                    const currentVal = Math.round(self.progress * targetVal);
                    numEl.innerText = `${currentVal}%`;
                  }
                },
              },
            });
          });
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, trackRef, carRef, trailRef, headlineRef, letterRefs, statCardRefs, numberRefs]);
}
