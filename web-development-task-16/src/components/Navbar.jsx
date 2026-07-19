export default function Navbar({ onShowAll, onLogoClick, activeView }) {
  return (
    <header className="sticky top-0 z-30 bg-navy-900/95 backdrop-blur supports-[backdrop-filter]:bg-navy-900/90 border-b border-navy-800 shadow-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2.5 shrink-0 group"
          aria-label="Go to featured phones"
        >
          <span className="flex items-end gap-[3px] h-6">
            {[8, 13, 18, 23].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-sm bg-signal-500 group-hover:bg-signal-400 transition-colors"
                style={{ height: `${h}px` }}
              />
            ))}
          </span>
          <span className="font-display font-semibold text-lg sm:text-xl text-haze-50 tracking-tight">
            Phone<span className="text-signal-400">Finder</span>
          </span>
        </button>

        <button
          onClick={onShowAll}
          className={`shrink-0 font-body text-sm font-medium px-4 py-2 rounded-lg border transition-colors
            ${
              activeView === 'all'
                ? 'bg-signal-500 text-navy-950 border-signal-500'
                : 'bg-transparent text-haze-100 border-navy-700 hover:border-signal-500 hover:text-signal-400'
            }`}
        >
          Show All
        </button>
      </div>
    </header>
  )
}
