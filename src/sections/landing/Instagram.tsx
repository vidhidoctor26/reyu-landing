import { useRef, useState, useEffect, useCallback } from "react";

const CARDS = [0, 1, 2, 3, 4, 5, 6, 7];

const Instagram = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── scroll to index ─────────────────────────────────────────────────────────
  const scrollTo = useCallback(
    (idx: number) => {
      const el = scrollRef.current;
      if (!el || animating) return;

      const cards = el.querySelectorAll<HTMLElement>("[data-card]");
      const target = cards[idx];
      if (!target) return;

      setAnimating(true);
      if (idx > 0) setHasMoved(true);

      const elRect = el.getBoundingClientRect();
      const cardRect = target.getBoundingClientRect();
      const offset =
        cardRect.left -
        elRect.left -
        (elRect.width - cardRect.width) / 2 +
        el.scrollLeft;

      el.scrollTo({ left: offset, behavior: "smooth" });
      setActiveIdx(idx);

      setTimeout(() => setAnimating(false), 500);
    },
    [animating],
  );

  const next = useCallback(
    () => scrollTo((activeIdx + 1) % CARDS.length),
    [activeIdx, scrollTo],
  );
  const prev = useCallback(
    () => scrollTo((activeIdx - 1 + CARDS.length) % CARDS.length),
    [activeIdx, scrollTo],
  );

  // ── auto-scroll ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(next, 4000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [paused, next]);

  // ── sync dot on manual swipe ────────────────────────────────────────────────
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    if (el.scrollLeft > 20) setHasMoved(true);

    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const elCenter = el.scrollLeft + el.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - elCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIdx(closest);
  };

  return (
    <>
      <style>{`
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        .carousel-card {
          animation: cardEntrance 0.5s ease both;
          transition:
            transform    0.4s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow   0.4s ease,
            border-color 0.3s ease,
            opacity      0.3s ease;
        }
        .carousel-card:nth-child(1) { animation-delay: 0.05s; }
        .carousel-card:nth-child(2) { animation-delay: 0.10s; }
        .carousel-card:nth-child(3) { animation-delay: 0.15s; }



        /* Arrow button — sits outside the track, never overlaps cards */
        .arrow-btn-outside {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          /* width reserved for the arrow column */
          width: 48px;
          transition: opacity 0.3s ease, transform 0.15s ease;
        }
        .arrow-btn-outside:disabled {
          opacity: 0;
          pointer-events: none;
        }
        .arrow-btn-outside:not(:disabled):hover svg {
          transform: scale(1.2);
        }
        .arrow-btn-outside:not(:disabled):active svg {
          transform: scale(0.88);
        }
        .arrow-btn-outside svg {
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
      `}</style>

      <section className="w-full py-16 md:py-20 lg:py-24 overflow-hidden mt-[-120px]">
        <div className="w-full max-w-[1920px] mx-auto">
          {/* ── Title ──────────────────────────────────────────────────────── */}
          <div className="text-center mb-12 md:mb-16 px-4">
            <h2 className="font-playfair font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[100%] text-white">
              What our CEO has to say
            </h2>
          </div>

          {/* ── Row: [arrow] [scrollable track] [arrow] ────────────────────── */}
          {/* arrows are flex siblings of the track — they never sit on top of cards */}
          <div
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-8 2xl:px-[72px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* ── Prev arrow ─────────────────────────────────────────────── */}
            <button
              onClick={prev}
              disabled={!hasMoved}
              aria-label="Previous"
              className="arrow-btn-outside"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* ── Scrollable card track ───────────────────────────────────── */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="
                flex-1 min-w-0
                flex gap-[20px] lg:gap-[28px]
                overflow-x-auto scroll-smooth
                snap-x snap-mandatory
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
            >
              {CARDS.map((_, i) => (
                <div
                  key={i}
                  data-card
                  onClick={() => scrollTo(i)}
                  className={`
                    carousel-card
                    cursor-pointer
                    shrink-0 snap-center
                    w-[75vw] sm:w-[42vw] md:w-[28vw] lg:w-[calc(25%-21px)]
                    max-w-[340px]
                    aspect-[9/16]
                    2xl:h-[720px] 2xl:aspect-auto
                    bg-white
                    rounded-[16px]
                    border-[4px] border-[#CEA574]

                  `}
                />
              ))}
            </div>

            {/* ── Next arrow ─────────────────────────────────────────────── */}
            <button
              onClick={next}
              aria-label="Next"
              className="arrow-btn-outside"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* ── Dot indicators ─────────────────────────────────────────────── */}
          <div className="flex justify-center gap-2 mt-6 px-4">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${activeIdx === i ? "w-7 bg-[#CEA574]" : "w-2 bg-white/30 hover:bg-white/50"}
                `}
              />
            ))}
          </div>

          {/* ── Instagram link ─────────────────────────────────────────────── */}
          <div className="text-center mt-8 md:mt-10 px-4 mb-[100px]">
            <a
              href="#instagram"
              className="
                font-offside text-sm md:text-base
                text-[#CEA574] hover:text-white
                underline underline-offset-4
                transition-colors duration-200
              "
            >
              Check out our Instagram
            </a>
          </div>

          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[1px] bg-[#CEA574]/40" />
        </div>
      </section>
    </>
  );
};

export default Instagram;