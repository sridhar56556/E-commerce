import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { CATEGORIES } from '../data/products'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=women', label: 'Women' },
  { to: '/shop?category=men', label: 'Men' },
  { to: '/shop?category=accessories', label: 'Accessories' },
]

export default function Navbar() {
  const { count, openCart, wishlist } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu / search on route change
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [menuOpen])

  const submitSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        {/* Left: mobile menu toggle + nav links */}
        <div className="nav__left">
          <button
            className="nav__icon nav__burger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className="nav__link link-underline"
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Center: brand */}
        <Link to="/" className="nav__brand" aria-label="Lumière home">
          Lumière
        </Link>

        {/* Right: actions */}
        <div className="nav__actions">
          <button
            className="nav__icon"
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/wishlist" className="nav__icon nav__badge-wrap" aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.5} />
            {wishlist.length > 0 && <span className="nav__badge">{wishlist.length}</span>}
          </Link>
          <button
            className="nav__icon nav__badge-wrap"
            onClick={openCart}
            aria-label="Open cart"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  className="nav__badge"
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Search dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.form
            className="nav__search"
            onSubmit={submitSearch}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container nav__search-inner">
              <Search size={20} strokeWidth={1.5} className="muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for dresses, coats, sneakers…"
                aria-label="Search products"
              />
              <button type="button" className="nav__icon" onClick={() => setSearchOpen(false)}>
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Mobile drawer menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="nav__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="nav__drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="nav__drawer-head">
                <span className="nav__brand">Lumière</span>
                <button className="nav__icon" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
              <nav className="nav__drawer-links">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/shop">Shop All</NavLink>
                {CATEGORIES.map((c) => (
                  <NavLink key={c.id} to={`/shop?category=${c.id}`}>
                    {c.name}
                  </NavLink>
                ))}
                <NavLink to="/wishlist">Wishlist</NavLink>
              </nav>
              <div className="nav__drawer-foot">
                <p className="eyebrow">Need help?</p>
                <p className="muted">support@lumiere.com</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
