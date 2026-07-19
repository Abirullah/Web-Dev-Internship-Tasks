function SpecBadge({ children }) {
  return (
    <span className="font-mono text-[11px] leading-none px-2 py-1 rounded-md bg-navy-800/8 text-navy-800/80 whitespace-nowrap">
      {children}
    </span>
  )
}

export default function PhoneCard({ phone, specs, onOpen }) {
  const brand = phone.brand?.trim()

  return (
    <button
      onClick={() => onOpen(phone.slug)}
      className="group text-left w-full rounded-2xl bg-white border border-navy-900/5 shadow-card
                 hover:shadow-cardHover hover:-translate-y-0.5 transition-all duration-200
                 overflow-hidden animate-rise flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-navy-100 flex items-center justify-center overflow-hidden">
        {phone.image && (
          <img
            src={phone.image}
            alt={phone.phone_name}
            loading="lazy"
            className="h-full w-auto object-contain py-3 group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <span className="absolute top-2 left-2 text-[10px] font-mono uppercase tracking-wider bg-navy-900/85 text-signal-400 px-2 py-0.5 rounded-full">
          {brand}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-display font-semibold text-navy-900 text-[15px] leading-snug">
          {phone.phone_name}
        </h3>

        {specs ? (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {specs.mainFeatures?.chipSet && (
              <SpecBadge>{specs.mainFeatures.chipSet.split('(')[0].trim()}</SpecBadge>
            )}
            {specs.mainFeatures?.displaySize && (
              <SpecBadge>{specs.mainFeatures.displaySize.split(',')[0]}</SpecBadge>
            )}
            {specs.mainFeatures?.storage && (
              <SpecBadge>{specs.mainFeatures.storage.split(',')[0]}</SpecBadge>
            )}
          </div>
        ) : (
          <p className="text-xs text-navy-600/60 mt-1">Tap to view full specs</p>
        )}

        <span className="mt-auto pt-2 text-xs font-medium text-signal-600 group-hover:text-signal-500 flex items-center gap-1">
          View details
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </button>
  )
}
