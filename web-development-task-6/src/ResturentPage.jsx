import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---- Data --------------------------------------------------------------

const RESTAURANTS = [
  { id: 1, name: "Nonna's Table", cuisine: "Italian", location: "Old Town", rating: 4.8, price: 3, tag: "Handmade pasta" },
  { id: 2, name: "Sakura & Stone", cuisine: "Japanese", location: "Riverside", rating: 4.6, price: 4, tag: "Omakase counter" },
  { id: 3, name: "Casa Marisol", cuisine: "Mexican", location: "Downtown", rating: 4.3, price: 2, tag: "Street-style tacos" },
  { id: 4, name: "Saffron & Smoke", cuisine: "Indian", location: "Midtown", rating: 4.7, price: 3, tag: "Tandoor specialties" },
  { id: 5, name: "Basil Lantern", cuisine: "Thai", location: "Harborfront", rating: 4.4, price: 2, tag: "Wok-fired classics" },
  { id: 6, name: "Le Petit Chêne", cuisine: "French", location: "Uptown", rating: 4.9, price: 4, tag: "Bistro fine dining" },
  { id: 7, name: "Olive & Salt", cuisine: "Mediterranean", location: "Downtown", rating: 4.2, price: 2, tag: "Coastal small plates" },
  { id: 8, name: "The Griddle House", cuisine: "American", location: "Midtown", rating: 4.0, price: 2, tag: "Diner comfort food" },
  { id: 9, name: "Sông Xanh", cuisine: "Vietnamese", location: "Riverside", rating: 4.5, price: 2, tag: "Pho & fresh herbs" },
  { id: 10, name: "Han's Grill Table", cuisine: "Korean", location: "Old Town", rating: 4.6, price: 3, tag: "Tabletop BBQ" },
  { id: 11, name: "Trattoria Volta", cuisine: "Italian", location: "Harborfront", rating: 4.1, price: 3, tag: "Wood-fired pizza" },
  { id: 12, name: "Umi Noodle Bar", cuisine: "Japanese", location: "Downtown", rating: 4.3, price: 2, tag: "Ramen & small plates" },
];

const CUISINE_COLORS = {
  Italian: "#8C3B2E",
  Japanese: "#2E4F4F",
  Mexican: "#B3541E",
  Indian: "#95591F",
  Thai: "#3E6B4A",
  French: "#4A3B5C",
  Mediterranean: "#3B6E80",
  American: "#5C4A2E",
  Vietnamese: "#3B7A57",
  Korean: "#8C2F39",
};

const cuisines = ["All", ...Array.from(new Set(RESTAURANTS.map((r) => r.cuisine)))];
const locations = ["All", ...Array.from(new Set(RESTAURANTS.map((r) => r.location)))];


function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i && rating < i + 1;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 20 }}
            className="relative text-[13px] leading-none"
            style={{ color: filled || half ? "#C7501F" : "#DDD5C7" }}
          >
            {half ? (
              <span className="relative inline-block">
                <span className="text-[#DDD5C7]">★</span>
                <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                  <span className="text-[#C7501F]">★</span>
                </span>
              </span>
            ) : (
              "★"
            )}
          </motion.span>
        );
      })}
    </div>
  );
}

function FilterRow({ label, options, active, onSelect, layoutId }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[#9A8F7C]">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`relative px-3.5 py-1.5 text-[12.5px] rounded-full border transition-colors ${
              active === opt
                ? "text-white border-transparent"
                : "text-[#5B5142] border-[#E4DBC9] hover:border-[#C7501F]/40"
            }`}
          >
            {active === opt && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full -z-10"
                style={{ backgroundColor: "#8C3B2E" }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}


export default function RestaurantPage() {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [location, setLocation] = useState("All");
  const [focused, setFocused] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RESTAURANTS.filter((r) => {
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q);
      const matchesCuisine = cuisine === "All" || r.cuisine === cuisine;
      const matchesLocation = location === "All" || r.location === location;
      return matchesQuery && matchesCuisine && matchesLocation;
    });
  }, [search, cuisine, location]);

  const resetFilters = () => {
    setSearch("");
    setCuisine("All");
    setLocation("All");
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&display=swap');
        .rp-display { font-family: 'Fraunces', serif; }
        .rp-body { font-family: 'Work Sans', sans-serif; }
      `}</style>

      <div className="rp-body max-w-6xl mx-auto px-6 py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#C7501F] mb-2">
            The Local Table
          </p>
          <h1 className="rp-display text-4xl sm:text-5xl font-semibold text-[#26211A] tracking-tight">
            Find your next favorite spot
          </h1>
          <p className="text-[14px] text-[#7A7062] mt-3 max-w-md">
            Search by name, cuisine, or neighborhood — the list updates as you type.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative mb-8"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: focused ? "#C7501F" : "#B3A891" }}
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search restaurants, cuisines, neighborhoods..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[#E4DBC9] bg-white text-[14px] text-[#26211A] placeholder:text-[#B3A891] focus:outline-none focus:ring-2 focus:ring-[#C7501F]/20 focus:border-[#C7501F]/50 shadow-sm transition-all"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-10 pb-8 border-b border-[#E9E1D2]"
        >
          <FilterRow label="Cuisine" options={cuisines} active={cuisine} onSelect={setCuisine} layoutId="cuisine-pill" />
          <FilterRow label="Neighborhood" options={locations} active={location} onSelect={setLocation} layoutId="location-pill" />
        </motion.div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-[13px] text-[#7A7062] h-5 overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={filtered.length}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {filtered.length} restaurant{filtered.length === 1 ? "" : "s"} found
              </motion.span>
            </AnimatePresence>
          </div>
          {(search || cuisine !== "All" || location !== "All") && (
            <button
              onClick={resetFilters}
              className="text-[12.5px] text-[#C7501F] hover:text-[#a5420f] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-20"
              >
                <p className="rp-display text-2xl text-[#26211A] mb-2">Nothing matches yet</p>
                <p className="text-[13.5px] text-[#9A8F7C] mb-5">
                  Try a different neighborhood, cuisine, or search term.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-full bg-[#8C3B2E] text-white text-[13px] hover:bg-[#742F24] transition-colors"
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              filtered.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="group bg-white rounded-2xl border border-[#EDE5D6] overflow-hidden shadow-[0_2px_10px_rgba(38,33,26,0.04)] hover:shadow-[0_16px_32px_rgba(38,33,26,0.10)] transition-shadow"
                >
                  {/* Color block header */}
                  <div
                    className="h-24 flex items-end p-4 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${CUISINE_COLORS[r.cuisine]}, ${CUISINE_COLORS[r.cuisine]}CC)`,
                    }}
                  >
                    <span className="text-[11px] uppercase tracking-[0.14em] text-white/90 font-medium">
                      {r.cuisine}
                    </span>
                    <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
                  </div>

                  <div className="p-5">
                    <h3 className="rp-display text-lg font-semibold text-[#26211A] leading-tight mb-1">
                      {r.name}
                    </h3>
                    <p className="text-[12.5px] text-[#9A8F7C] mb-3">{r.tag}</p>

                    <div className="flex items-center gap-1.5 text-[12.5px] text-[#5B5142] mb-3">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z"
                          stroke="#B3A891"
                          strokeWidth="2"
                        />
                        <circle cx="12" cy="10" r="2.4" stroke="#B3A891" strokeWidth="2" />
                      </svg>
                      {r.location}
                      <span className="text-[#DDD5C7]">•</span>
                      <span className="text-[#9A8F7C]">{"$".repeat(r.price)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Stars rating={r.rating} />
                        <span className="text-[12.5px] text-[#5B5142] font-medium">{r.rating}</span>
                      </div>
                      <button className="text-[12px] text-[#8C3B2E] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Reserve →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}