import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar.jsx'
import SearchBar from './components/SearchBar.jsx'
import PhoneGrid from './components/PhoneGrid.jsx'
import PhoneModal from './components/PhoneModal.jsx'
import Loader from './components/Loader.jsx'
import {
  fetchDefaultPhones,
  searchPhones,
  fetchAllPhones,
  fetchPhoneDetails,
  enrichSearchResults,
  closeModal,
  ENRICH_RESULT_LIMIT,
} from './features/phones/phoneSlice.js'

export default function App() {
  const dispatch = useDispatch()
  const {
    results,
    view,
    status,
    error,
    specsBySlug,
    selectedPhone,
    detailStatus,
    detailError,
    modalOpen,
  } = useSelector((s) => s.phones)

  const enrichedFor = useRef(null)

  useEffect(() => {
    dispatch(fetchDefaultPhones())
  }, [dispatch])

  // Quietly enrich the first page of search results with real specs so the
  // cards can show detail inline, without waiting for a click.
  useEffect(() => {
    if (view !== 'search' || status !== 'succeeded' || results.length === 0) return
    const key = results.map((r) => r.slug).slice(0, ENRICH_RESULT_LIMIT).join(',')
    if (enrichedFor.current === key) return
    enrichedFor.current = key
    dispatch(enrichSearchResults(results.slice(0, ENRICH_RESULT_LIMIT).map((r) => r.slug)))
  }, [view, status, results, dispatch])

  function handleSearch(query) {
    dispatch(searchPhones(query))
  }

  function handleShowAll() {
    dispatch(fetchAllPhones())
  }

  function handleLogoClick() {
    dispatch(fetchDefaultPhones())
  }

  function handleOpen(slug) {
    dispatch(fetchPhoneDetails(slug))
  }

  function handleClose() {
    dispatch(closeModal())
  }

  const heading =
    view === 'all'
      ? 'All phones'
      : view === 'search'
      ? 'Search results'
      : 'Featured phones'

  const subheading =
    view === 'all'
      ? `${results.length} phones across major brands`
      : view === 'search'
      ? `${results.length} match${results.length === 1 ? '' : 'es'} found`
      : 'A quick look at recent releases — search or browse everything below'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onShowAll={handleShowAll} onLogoClick={handleLogoClick} activeView={view} />

      <section className="bg-navy-900 pb-10 pt-10 sm:pt-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-start gap-4">
          <h1 className="font-display font-semibold text-2xl sm:text-3xl text-haze-50 max-w-md leading-tight">
            Find any phone. See every spec.
          </h1>
          <p className="text-haze-100/60 text-sm max-w-md -mt-2">
            Search across brands and models, pulled live from GSMArena's catalog.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-display font-semibold text-lg text-navy-900">{heading}</h2>
          <span className="text-xs text-navy-600/60 font-mono">{subheading}</span>
        </div>

        {status === 'loading' && <Loader />}

        {status === 'failed' && (
          <div className="text-center py-24">
            <p className="font-display text-lg text-navy-900 mb-1">Something went wrong</p>
            <p className="text-sm text-navy-600/70">{error}</p>
          </div>
        )}

        {status === 'succeeded' && (
          <PhoneGrid phones={results} specsBySlug={specsBySlug} onOpen={handleOpen} />
        )}
      </main>

      <footer className="border-t border-navy-900/10 py-6">
        <p className="text-center text-xs text-navy-600/60">
          Built with React, Redux Toolkit &amp; Tailwind CSS · Data via Programming Hero Open API
        </p>
      </footer>

      <PhoneModal
        open={modalOpen}
        phone={selectedPhone}
        status={detailStatus}
        error={detailError}
        onClose={handleClose}
      />
    </div>
  )
}
