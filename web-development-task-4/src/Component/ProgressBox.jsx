import { useState, useEffect, useMemo, useRef } from "react";

export default function ProgressBox() {
  const [progress, setProgress] = useState(0);
  const [runId, setRunId] = useState(0); 
  const isComplete = progress >= 100;
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        const step =
          prev < 55 ? 2 + Math.random() * 2 : prev < 85 ? 1 + Math.random() : 0.4 + Math.random() * 0.6;
        return Math.min(prev + step, 100);
      });
    }, 90);

    return () => clearInterval(intervalRef.current);
  }, [runId]);

  const bubbles = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        left: 8 + Math.random() * 84,
        size: 3 + Math.random() * 6,
        duration: 2.6 + Math.random() * 2.2,
        delay: Math.random() * 3,
      })),
    [runId]
  );

  const pct = Math.round(progress);

  return (
    <div className="min-h-[560px] w-full flex items-center justify-center bg-[#0a0e16] px-6 py-14">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .lp-display { font-family: 'Space Grotesk', sans-serif; }
        .lp-body { font-family: 'Inter', sans-serif; }

        @keyframes lp-wave-a {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes lp-wave-b {
          from { transform: translateX(-10%); }
          to   { transform: translateX(-60%); }
        }
        @keyframes lp-bubble-rise {
          0%   { bottom: -6%; opacity: 0; transform: translateX(0) scale(0.8); }
          12%  { opacity: 0.85; }
          85%  { opacity: 0.5; }
          100% { bottom: 108%; opacity: 0; transform: translateX(6px) scale(1.1); }
        }
        @keyframes lp-pour {
          0%   { opacity: 0; transform: scaleY(0.6); }
          15%  { opacity: 1; transform: scaleY(1); }
          85%  { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0.6); }
        }
        @keyframes lp-ripple {
          0%   { transform: scale(0.2); opacity: 0.55; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes lp-pulse-dot {
          0%, 80%, 100% { opacity: 0.25; }
          40% { opacity: 1; }
        }
        @keyframes lp-glow {
          0%, 100% { box-shadow: 0 0 24px 2px rgba(16, 185, 129, 0.25); }
          50%      { box-shadow: 0 0 40px 6px rgba(16, 185, 129, 0.45); }
        }
        .lp-dot-1 { animation: lp-pulse-dot 1.4s infinite ease-in-out; animation-delay: 0s; }
        .lp-dot-2 { animation: lp-pulse-dot 1.4s infinite ease-in-out; animation-delay: 0.2s; }
        .lp-dot-3 { animation: lp-pulse-dot 1.4s infinite ease-in-out; animation-delay: 0.4s; }
      `}</style>

      <div className="flex flex-col items-center lp-body">
        <p className="text-[11px] tracking-[0.35em] uppercase text-[#5b6577] mb-10">
          Process Monitor
        </p>

        <div className="relative h-10 flex flex-col items-center">
          <div className="w-10 h-3 rounded-t-md bg-[#1b2130] border border-[#2b3244] border-b-0" />
          {!isComplete && progress > 0 && (
            <div
              className="w-[3px] rounded-full mt-[-1px]"
              style={{
                height: "28px",
                background: "linear-gradient(to bottom, #7dd3e8, #22a6c9)",
                animation: "lp-pour 0.9s infinite ease-in-out",
              }}
            />
          )}
        </div>

        <div className="relative h-0 w-0">
          {!isComplete && progress > 0 && progress < 100 && (
            <span
              className="absolute -left-3 top-0 w-6 h-6 rounded-full border border-cyan-300/40"
              style={{ animation: "lp-ripple 0.9s infinite ease-out" }}
            />
          )}
        </div>

        {/* Tank */}
        <div
          className="relative mt-1 w-48 h-72 rounded-[28px] overflow-hidden border border-white/10"
          style={{
            background: "linear-gradient(160deg, #10151f 0%, #0c1017 100%)",
            boxShadow:
              "inset 0 2px 6px rgba(255,255,255,0.04), inset 0 -8px 24px rgba(0,0,0,0.55), 0 20px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* Liquid fill */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: `${progress}%`,
              transition: "height 0.35s ease-out, background 0.6s ease",
              background: isComplete
                ? "linear-gradient(180deg, #6ee7b7 0%, #10b981 55%, #0e9f6e 100%)"
                : "linear-gradient(180deg, #67e8f9 0%, #22a6c9 55%, #0e6c8a 100%)",
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
              {bubbles.map((b) => (
                <span
                  key={b.id}
                  className="absolute rounded-full bg-white/70"
                  style={{
                    left: `${b.left}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    animation: `lp-bubble-rise ${b.duration}s infinite linear`,
                    animationDelay: `${b.delay}s`,
                  }}
                />
              ))}
            </div>

            {!isComplete && (
              <div className="absolute left-0 right-0 -top-[9px] h-[18px] pointer-events-none">
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    width: "200%",
                    animation: "lp-wave-a 3.2s linear infinite",
                  }}
                >
                  <svg viewBox="0 0 1200 60" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M0,30 C150,60 300,0 600,30 C900,60 1050,0 1200,30 L1200,60 L0,60 Z"
                      fill="#8beef2"
                    />
                  </svg>
                </div>
                <div
                  className="absolute inset-0 opacity-90"
                  style={{
                    width: "200%",
                    animation: "lp-wave-b 4.4s linear infinite",
                  }}
                >
                  <svg viewBox="0 0 1200 60" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M0,32 C200,4 400,60 600,32 C800,4 1000,60 1200,32 L1200,60 L0,60 Z"
                      fill="#5fd6e8"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Glass shine overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 22%, rgba(255,255,255,0) 40%)",
            }}
          />
          <div className="absolute left-3 top-3 bottom-3 w-[3px] rounded-full bg-white/10 pointer-events-none" />

          {/* Percentage readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="lp-display text-5xl font-semibold tracking-tight text-white"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}
            >
              {pct}
              <span className="text-2xl align-top">%</span>
            </span>
          </div>
        </div>

        {/* Status badge */}
        <div
          className={`mt-7 flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-500 ${
            isComplete
              ? "border-emerald-400/30 bg-emerald-400/10"
              : "border-cyan-300/20 bg-white/[0.03]"
          }`}
          style={isComplete ? { animation: "lp-glow 2.4s ease-in-out infinite" } : undefined}
        >
          {isComplete ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12.5L9.5 18L20 6"
                  stroke="#6ee7b7"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="lp-body text-[13px] font-medium tracking-wide text-emerald-300">
                Complete
              </span>
            </>
          ) : (
            <>
              <span className="lp-body text-[13px] font-medium tracking-wide text-cyan-200">
                Loading
              </span>
              <span className="flex gap-[3px]">
                <span className="w-1 h-1 rounded-full bg-cyan-200 lp-dot-1" />
                <span className="w-1 h-1 rounded-full bg-cyan-200 lp-dot-2" />
                <span className="w-1 h-1 rounded-full bg-cyan-200 lp-dot-3" />
              </span>
            </>
          )}
        </div>

        {/* Replay */}
        <button
          onClick={() => setRunId((n) => n + 1)}
          className="mt-8 text-[12px] tracking-wide text-[#7c8797] hover:text-[#c9d2e0] border border-white/10 hover:border-white/20 rounded-full px-4 py-1.5 transition-colors"
        >
          Run again
        </button>
      </div>
    </div>
  );
}