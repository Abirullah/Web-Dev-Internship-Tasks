import { useEffect } from 'react'

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-navy-800/10 last:border-0">
      <dt className="font-mono text-[11px] uppercase tracking-wider text-navy-600/60 pt-0.5 shrink-0">
        {label}
      </dt>
      <dd className="text-sm text-navy-900 text-right">{value}</dd>
    </div>
  )
}

export default function PhoneModal({ open, phone, status, error, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={phone?.name ? `${phone.name} details` : 'Phone details'}
    >
      <div
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar
                      bg-haze-50 rounded-t-3xl sm:rounded-3xl shadow-cardHover animate-rise">
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-navy-900/85 text-haze-50
                     flex items-center justify-center hover:bg-navy-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'loading' && (
          <div className="py-24 flex justify-center">
            <div className="flex items-end gap-1.5 h-8">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="w-2 rounded-full bg-navy-700 animate-pulseBar"
                  style={{ height: '20px', animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className="py-24 text-center px-6">
            <p className="font-display text-lg text-navy-900 mb-1">Couldn't load this phone</p>
            <p className="text-sm text-navy-600/70">{error || 'Please try again.'}</p>
          </div>
        )}

        {status === 'succeeded' && phone && (
          <div>
            <div className="bg-navy-900 px-6 pt-8 pb-6 sm:rounded-t-3xl flex gap-5 items-center">
              {phone.image && (
                <img
                  src={phone.image}
                  alt={phone.name}
                  className="w-24 h-28 object-contain bg-white/5 rounded-xl p-2"
                />
              )}
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-signal-400">
                  {phone.brand}
                </span>
                <h2 className="font-display font-semibold text-xl sm:text-2xl text-haze-50 mt-0.5">
                  {phone.name}
                </h2>
                {phone.releaseDate && (
                  <p className="text-xs text-haze-100/60 mt-1">{phone.releaseDate}</p>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {phone.mainFeatures && (
                <section>
                  <h3 className="font-display font-semibold text-sm text-navy-900 mb-1">
                    Main features
                  </h3>
                  <dl>
                    <Row label="Display" value={phone.mainFeatures.displaySize} />
                    <Row label="Chipset" value={phone.mainFeatures.chipSet} />
                    <Row label="Storage" value={phone.mainFeatures.storage} />
                    <Row label="Memory" value={phone.mainFeatures.memory} />
                    <Row
                      label="Sensors"
                      value={
                        Array.isArray(phone.mainFeatures.sensors)
                          ? phone.mainFeatures.sensors.join(', ')
                          : phone.mainFeatures.sensors
                      }
                    />
                  </dl>
                </section>
              )}

              {phone.others && (
                <section>
                  <h3 className="font-display font-semibold text-sm text-navy-900 mb-1">
                    Connectivity &amp; more
                  </h3>
                  <dl>
                    {Object.entries(phone.others).map(([key, val]) => (
                      <Row key={key} label={key} value={val} />
                    ))}
                  </dl>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
