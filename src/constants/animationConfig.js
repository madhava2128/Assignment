/**
 * Centralized Animation Configuration
 * Consolidates timing, easings, scroll offsets, and breakpoints to avoid magic numbers.
 */
export const ANIMATION_CONFIG = {
  eases: {
    intro: 'power3.out',
    statCard: 'power2.out',
  },
  intro: {
    letterDuration: 1.1,
    letterStagger: 0.04,
    ambientLetterOpacity: 0.35,
  },
  scroll: {
    scrubSmoothness: 1,
  },
  statOffsets: {
    desktop: [400, 600, 800, 1000],
    mobile: [300, 500, 700, 900],
    revealWindow: 200,
  },
  statPercentages: [58, 23, 27, 40],
  breakpoints: {
    desktop: '(min-width: 768px)',
    mobile: '(max-width: 767px)',
  },
};
