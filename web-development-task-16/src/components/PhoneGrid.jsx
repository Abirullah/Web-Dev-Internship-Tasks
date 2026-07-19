import PhoneCard from './PhoneCard.jsx'

export default function PhoneGrid({ phones, specsBySlug, onOpen }) {
  if (phones.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-display text-xl text-navy-900 mb-1">No phones found</p>
        <p className="text-navy-600/70 text-sm">
          Try a different brand or model — e.g. “Samsung”, “Pixel 7”, “Redmi”.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {phones.map((phone) => (
        <PhoneCard
          key={phone.slug}
          phone={phone}
          specs={specsBySlug?.[phone.slug]}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}
