export default function Loader({ label = 'Scanning the network for phones…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="flex items-end gap-1.5 h-10">
        {[0, 1, 2, 3, 2].map((h, i) => (
          <span
            key={i}
            className="w-2 rounded-full bg-navy-700 animate-pulseBar origin-bottom"
            style={{
              height: `${12 + h * 8}px`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
      <p className="font-mono text-sm text-navy-700/70 tracking-wide">{label}</p>
    </div>
  )
}
