import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE = 'https://openapi.programming-hero.com/api'

// The public API has no single "get every phone" route, so Show All fans
// a handful of well-known brand queries out in parallel and merges the
// results into one deduplicated list, keyed by slug.
const BRAND_SEEDS = [
  'apple', 'samsung', 'xiaomi', 'oppo', 'vivo', 'realme',
  'oneplus', 'nokia', 'huawei', 'motorola', 'honor', 'google',
]

function dedupeBySlug(list) {
  const seen = new Map()
  for (const phone of list) {
    if (!seen.has(phone.slug)) seen.set(phone.slug, phone)
  }
  return Array.from(seen.values())
}

export const fetchDefaultPhones = createAsyncThunk(
  'phones/fetchDefault',
  async () => {
    const res = await fetch(`${API_BASE}/phones?search=iphone`)
    const json = await res.json()
    return json.data ?? []
  },
)

export const searchPhones = createAsyncThunk(
  'phones/search',
  async (query, { rejectWithValue }) => {
    const res = await fetch(`${API_BASE}/phones?search=${encodeURIComponent(query)}`)
    if (!res.ok) return rejectWithValue('Search request failed')
    const json = await res.json()
    return { query, results: json.data ?? [] }
  },
)

export const fetchAllPhones = createAsyncThunk(
  'phones/fetchAll',
  async () => {
    const responses = await Promise.allSettled(
      BRAND_SEEDS.map((brand) =>
        fetch(`${API_BASE}/phones?search=${brand}`).then((r) => r.json()),
      ),
    )
    const combined = responses
      .filter((r) => r.status === 'fulfilled' && r.value?.data)
      .flatMap((r) => r.value.data)
    return dedupeBySlug(combined)
  },
)

export const fetchPhoneDetails = createAsyncThunk(
  'phones/fetchDetails',
  async (slug) => {
    const res = await fetch(`${API_BASE}/phone/${slug}`)
    const json = await res.json()
    return json.data
  },
)

// After a search resolves, quietly fetch specs for the first N results so the
// cards themselves can surface chipset / display / storage without a click.
export const enrichSearchResults = createAsyncThunk(
  'phones/enrichSearchResults',
  async (slugs) => {
    const responses = await Promise.allSettled(
      slugs.map((slug) => fetch(`${API_BASE}/phone/${slug}`).then((r) => r.json())),
    )
    const bySlug = {}
    responses.forEach((r, i) => {
      if (r.status === 'fulfilled' && r.value?.data) {
        bySlug[slugs[i]] = r.value.data
      }
    })
    return bySlug
  },
)

const ENRICH_LIMIT = 12

const phoneSlice = createSlice({
  name: 'phones',
  initialState: {
    query: '',
    results: [],
    view: 'default', // 'default' | 'search' | 'all'
    status: 'idle', // idle | loading | succeeded | failed
    error: null,

    specsBySlug: {}, // slug -> detail object, used to enrich cards after search
    enrichStatus: 'idle',

    selectedSlug: null,
    selectedPhone: null,
    detailStatus: 'idle',
    detailError: null,
    modalOpen: false,
  },
  reducers: {
    closeModal(state) {
      state.modalOpen = false
    },
    clearSearch(state) {
      state.query = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Default landing set
      .addCase(fetchDefaultPhones.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchDefaultPhones.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.results = action.payload
        state.view = 'default'
        state.specsBySlug = {}
      })
      .addCase(fetchDefaultPhones.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Search
      .addCase(searchPhones.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
        state.query = action.meta.arg
      })
      .addCase(searchPhones.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.results = action.payload.results
        state.view = 'search'
        state.specsBySlug = {}
      })
      .addCase(searchPhones.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })

      // Show all
      .addCase(fetchAllPhones.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchAllPhones.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.results = action.payload
        state.view = 'all'
        state.query = ''
        state.specsBySlug = {}
      })
      .addCase(fetchAllPhones.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Inline card enrichment
      .addCase(enrichSearchResults.pending, (state) => {
        state.enrichStatus = 'loading'
      })
      .addCase(enrichSearchResults.fulfilled, (state, action) => {
        state.enrichStatus = 'succeeded'
        state.specsBySlug = { ...state.specsBySlug, ...action.payload }
      })
      .addCase(enrichSearchResults.rejected, (state) => {
        state.enrichStatus = 'failed'
      })

      // Phone details modal
      .addCase(fetchPhoneDetails.pending, (state, action) => {
        state.detailStatus = 'loading'
        state.detailError = null
        state.selectedSlug = action.meta.arg
        state.modalOpen = true
      })
      .addCase(fetchPhoneDetails.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.selectedPhone = action.payload
      })
      .addCase(fetchPhoneDetails.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.detailError = action.error.message
      })
  },
})

export const { closeModal, clearSearch } = phoneSlice.actions
export const ENRICH_RESULT_LIMIT = ENRICH_LIMIT
export default phoneSlice.reducer
