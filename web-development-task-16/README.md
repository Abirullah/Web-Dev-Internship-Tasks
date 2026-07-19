# Phone Finder

A phone search & spec-lookup site built with **React + Redux Toolkit + Tailwind CSS**, backed by the
[Programming Hero Phones API](https://openapi.programming-hero.com/api).

Light haze-blue background, dark navy components, single teal accent — no external UI kit, just
Tailwind utilities on top of a small custom design token set (see `tailwind.config.js`).

## Features → how each was built

**1. Search**
`SearchBar.jsx` holds the input in local state and debounces it 450ms with `useEffect` + `setTimeout`
before dispatching `searchPhones(query)`, so it searches as you type without hammering the API on
every keystroke. Submitting the form (Enter) searches immediately, bypassing the debounce.

**2. Relevant results**
The query is sent straight to `GET /api/phones?search={query}`, which does the matching server-side;
the app renders whatever comes back and shows an explicit "No phones found" state when the array is
empty.

**3. Default card → click for details**
Every `PhoneCard` is a full-width button. `onOpen(slug)` dispatches `fetchPhoneDetails(slug)`
(a Redux Toolkit `createAsyncThunk` hitting `GET /api/phone/{slug}`), which opens `PhoneModal` and
fills it in once the request resolves. Same handler is wired for cards in the default view, search
results, and Show All — one code path for "click a card, see details."

**4. Details shown on the card itself after a search**
Rather than only revealing specs in the modal, a second effect in `App.jsx` watches for a
successful search and fires `enrichSearchResults(slugs)` — a thunk that fetches
`GET /api/phone/{slug}` for the first 12 results *in parallel* (`Promise.allSettled`) and stores
them in `specsBySlug`. `PhoneCard` reads `specsBySlug[phone.slug]` and, when present, renders
chipset / display / storage as small badges directly on the card — no click required.

**5. Show All**
There's no single "get everything" endpoint, so `fetchAllPhones` fans a dozen well-known brand
queries (Apple, Samsung, Xiaomi, Oppo, Vivo, Realme, OnePlus, Nokia, Huawei, Motorola, Honor,
Google) out with `Promise.allSettled`, merges every result, and de-duplicates by `slug` with a
`Map`. The Navbar's "Show All" button dispatches this thunk directly.

## State management (Redux Toolkit)

All server data lives in one slice, `src/features/phones/phoneSlice.js`:

- `fetchDefaultPhones`, `searchPhones`, `fetchAllPhones`, `fetchPhoneDetails`,
  `enrichSearchResults` — five `createAsyncThunk`s, each with its own `pending/fulfilled/rejected`
  cases so loading and error states are automatic and per-thunk.
- `view` (`default | search | all`) drives the results heading/subheading without extra components.
- `specsBySlug` is a lookup cache that both the grid (card badges) and modal (fallback) can read.
- Components never call `fetch` directly — they `dispatch(...)` and read from `useSelector`.

## JS functionality used

- React function components + hooks: `useState`, `useEffect`, `useRef`
- Redux Toolkit: `configureStore`, `createSlice`, `createAsyncThunk`, `extraReducers`
- `react-redux`: `Provider`, `useDispatch`, `useSelector`
- `fetch` + `async/await`, `Promise.allSettled` for concurrent requests
- Debounced input via `setTimeout`/`clearTimeout` inside `useEffect`
- Deduplication with a `Map` keyed by `slug`
- Controlled forms, conditional rendering for loading/error/empty states
- `<dialog>`-style modal with `Escape`-to-close (`document.addEventListener('keydown', ...)`)

## Project structure

```
src/
  app/store.js                  Redux store
  features/phones/phoneSlice.js All API calls + state
  components/
    Navbar.jsx                  Logo + Show All
    SearchBar.jsx                Debounced search input
    PhoneGrid.jsx                Grid + empty state
    PhoneCard.jsx                Default/enriched card
    PhoneModal.jsx                Full spec sheet
    Loader.jsx                    Loading indicator
  App.jsx                        Wiring + layout
```

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Deploy

`npm run build` outputs a static `dist/` folder — deploy it to Netlify, Vercel, or GitHub Pages
as-is (it's a plain Vite SPA, no server required).

## Video walkthrough

_Add your recording link here once uploaded_ — cover: searching, viewing details from a default
card, seeing specs appear on cards after a search, using Show All, and general navigation.
