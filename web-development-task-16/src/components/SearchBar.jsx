import { useEffect, useRef, useState } from 'react'

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [value, setValue] = useState(initialValue)
  const debounceRef = useRef(null)

  // Debounce as the user types, but never delay a manual Enter/submit.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (value.trim().length > 0) onSearch(value.trim())
    }, 450)
    return () => clearTimeout(debounceRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  function handleSubmit(e) {
    e.preventDefault()
    clearTimeout(debounceRef.current)
    if (value.trim().length > 0) onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl" role="search">
      <label htmlFor="phone-search" className="sr-only">
        Search phones by brand or model
      </label>
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-600/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
        <input
          id="phone-search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search a brand or model — e.g. iPhone 13, Galaxy, Pixel"
          className="w-full rounded-xl border border-navy-800/15 bg-white/90 py-3 pl-12 pr-4
                     text-navy-900 placeholder:text-navy-600/50 shadow-card
                     focus:outline-none focus:ring-2 focus:ring-signal-500 focus:border-transparent
                     transition-shadow"
        />
      </div>
    </form>
  )
}
