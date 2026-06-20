import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'

import ProductCard from '../components/ProductCard'
import { PRODUCTS, CATEGORIES } from '../data/products'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
]

const FILTERS = [{ id: 'all', name: 'All' }, ...CATEGORIES]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const sort = params.get('sort') || 'featured'
  const q = (params.get('q') || '').toLowerCase().trim()

  const [filtersOpen, setFiltersOpen] = useState(false)

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'all' || value === 'featured') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const inCat = category === 'all' || p.category === category
      const inSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      return inCat && inSearch
    })

    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'new':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return sorted
  }, [category, sort, q])

  const activeCat = CATEGORIES.find((c) => c.id === category)
  const heading = q ? `Results for “${q}”` : activeCat ? activeCat.name : 'All Products'

  useEffect(() => {
    document.body.classList.toggle('no-scroll', filtersOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [filtersOpen])

  return (
    <div className="shop">
      {/* Page header */}
      <div className="shop__hero">
        <div className="container">
          <span className="eyebrow">Shop</span>
          <h1 className="shop__title">{heading}</h1>
          <p className="muted">
            {results.length} {results.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      <div className="container shop__bar">
        {/* Category pills (desktop) */}
        <div className="shop__cats">
          {FILTERS.map((c) => (
            <button
              key={c.id}
              className={`chip ${category === c.id ? 'chip--active' : ''}`}
              onClick={() => setParam('category', c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="shop__tools">
          <button className="shop__filterbtn" onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal size={16} /> Filters
          </button>
          <label className="shop__sort">
            <span className="muted">Sort</span>
            <select value={sort} onChange={(e) => setParam('sort', e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Grid */}
      <div className="container section--top">
        {results.length === 0 ? (
          <div className="shop__empty">
            <h3>Nothing matches yet</h3>
            <p className="muted">Try a different category or clear your search.</p>
            <button className="btn" onClick={() => setParams({}, { replace: true })}>
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div layout className="product-grid">
            <AnimatePresence mode="popLayout">
              {results.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              className="drawer__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              className="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sheet__head">
                <h3>Filters</h3>
                <button className="nav__icon" onClick={() => setFiltersOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="sheet__group">
                <p className="eyebrow">Category</p>
                <div className="sheet__chips">
                  {FILTERS.map((c) => (
                    <button
                      key={c.id}
                      className={`chip ${category === c.id ? 'chip--active' : ''}`}
                      onClick={() => setParam('category', c.id)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sheet__group">
                <p className="eyebrow">Sort by</p>
                <div className="sheet__chips">
                  {SORTS.map((s) => (
                    <button
                      key={s.id}
                      className={`chip ${sort === s.id ? 'chip--active' : ''}`}
                      onClick={() => setParam('sort', s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn btn--block btn--lg" onClick={() => setFiltersOpen(false)}>
                Show {results.length} items
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
