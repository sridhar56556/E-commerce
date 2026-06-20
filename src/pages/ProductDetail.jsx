import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, Heart, ChevronLeft, ChevronRight, Truck, RefreshCw,
  ShieldCheck, Minus, Plus, Check, MapPin, Package, Clock,
  ShoppingBag, Info, ChevronDown, AlertCircle, Zap,
  Share2, Video, Play, X, Image as ImageIcon, Maximize2,
  ThumbsUp, MessageCircle, Camera, Award, TrendingUp,
} from 'lucide-react'

import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Lightbox from '../components/Lightbox'
import { useCart } from '../context/CartContext'
import { getProduct, getRelated, getFrequentlyBought, getBestSellers, formatPrice } from '../data/products'

function getDeliveryDate(days = 5) {
  const d = new Date()
  let added = 0
  while (added < days) {
    d.setDate(d.getDate() + 1)
    const day = d.getDay()
    if (day !== 0 && day !== 6) added++
  }
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

const RATING_STARS = [5, 4, 3, 2, 1]

const IMAGE_TYPE_ICONS = {
  'Front View': null,
  'Back View': null,
  'Side View': null,
  'Close-Up': null,
  'Lifestyle': null,
  'Detail': null,
  'Model Shot': null,
  'Alternate Angle': null,
  'Packaging': null,
  '360° View': null,
  'Styled Look': null,
  'Flat Lay': null,
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { addItem, toggleWish, isWished, closeCart } = useCart()

  const [selectedImg, setSelectedImg] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name ?? null)
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [zooming, setZooming] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [playingVideo, setPlayingVideo] = useState(null)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const imgRef = useRef(null)
  const mainImgRef = useRef(null)

  const images = product?.images || []
  const imageLabels = product?.imageLabels || []
  const videos = product?.videos || []
  const reviews = product?.reviews || []

  if (!product) {
    return (
      <div className="container section text-center">
        <h2 className="section-title">Product not found</h2>
        <p className="muted" style={{ marginBottom: '1.5rem' }}>
          The piece you're looking for may have sold out.
        </p>
        <Link to="/shop" className="btn">Back to shop</Link>
      </div>
    )
  }

  const colorIndex = product.colors.findIndex((c) => c.name === selectedColor)

  const displayImages = product.colorImages && product.colorImages[selectedColor]
    ? product.colorImages[selectedColor]
    : images

  const displayLabels = product.imageLabels || []

  const related = getRelated(product, 4)
  const frequentlyBought = getFrequentlyBought(product)
  const bestSellers = getBestSellers()
  const wished = isWished(product.id)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
  const singleSize = product.sizes.length === 1
  const deliveryDate1 = getDeliveryDate(4)
  const deliveryDate2 = getDeliveryDate(7)

  const handleAdd = () => {
    const chosenSize = size || product.sizes[0]
    if (!chosenSize) { setSizeError(true); return }
    addItem(product, { size: chosenSize, color: selectedColor, qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const handleBuyNow = () => {
    const chosenSize = size || product.sizes[0]
    if (!chosenSize) { setSizeError(true); return }
    addItem(product, { size: chosenSize, color: selectedColor, qty })
    closeCart()
    navigate('/checkout')
  }

  const handleMouseMove = useCallback((e) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }, [])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url })
      } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      setShowShareMenu(true)
      setTimeout(() => setShowShareMenu(false), 2000)
    }
  }

  const toggleVideo = (idx) => {
    setPlayingVideo(playingVideo === idx ? null : idx)
  }

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3)
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating

  const ratingCounts = {}
  RATING_STARS.forEach((s) => {
    ratingCounts[s] = reviews.filter((r) => r.rating === s).length
  })

  return (
    <>
      <div className="pdp">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="pdp__crumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <Link to={`/shop?category=${product.category}`} className="capitalize">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span>{product.name}</span>
          </nav>

          <div className="pdp__layout">
            {/* ===== LEFT: Enhanced Image Gallery ===== */}
            <div className="pdp__gallery">
              {/* Main image with zoom */}
              <div className="pdp__main-wrap">
                <div
                  className="pdp__mainimg-wrap"
                  ref={mainImgRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setZooming(true)}
                  onMouseLeave={() => setZooming(false)}
                  onClick={() => { setLightboxIndex(selectedImg); setLightboxOpen(true) }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImg + (selectedColor || '')}
                      className="pdp__mainimg"
                      ref={imgRef}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <img
                        src={displayImages[selectedImg]}
                        alt={`${product.name} - ${displayLabels[selectedImg] || ''}`}
                        className="pdp__mainimg-img"
                        draggable={false}
                      />
                      {discount > 0 && (
                        <span className="pdp__discount-badge">-{discount}%</span>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {zooming && displayImages[selectedImg] && (
                    <div
                      className="pdp__zoom-lens"
                      style={{
                        backgroundImage: `url(${displayImages[selectedImg]})`,
                        backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                        backgroundSize: '250%',
                      }}
                    />
                  )}

                  <div className="pdp__main-actions">
                    <button
                      className="pdp__main-btn"
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex(selectedImg); setLightboxOpen(true) }}
                      title="View fullscreen"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Image type label */}
                {displayLabels[selectedImg] && (
                  <span className="pdp__img-label">
                    {displayLabels[selectedImg]}
                  </span>
                )}
              </div>

              {/* Thumbnail strip with labels */}
              <div className="pdp__thumbnails">
                {displayImages.map((src, i) => (
                  <button
                    key={i}
                    className={`pdp__thumb ${i === selectedImg ? 'is-active' : ''}`}
                    onClick={() => setSelectedImg(i)}
                    title={displayLabels[i] || `View ${i + 1}`}
                  >
                    <img src={src} alt={displayLabels[i] || `Thumbnail ${i + 1}`} loading="lazy" />
                    {i === selectedImg && <span className="pdp__thumb-indicator" />}
                  </button>
                ))}
              </div>
            </div>

            {/* ===== CENTER: Product Details ===== */}
            <div className="pdp__details-col">
              {/* Brand + badges */}
              <div className="pdp__brand-row">
                <span className="pdp__brand">{product.brand || 'Lumière'}</span>
                {product.isNew && <span className="pdp__new-tag">New</span>}
                {discount > 0 && <span className="pdp__sale-tag">{discount}% off</span>}
                {product.sku && <span className="pdp__sku">SKU: {product.sku}</span>}
              </div>

              <h1 className="pdp__title">{product.name}</h1>

              {/* Rating row */}
              <div className="pdp__rating-row" onClick={() => setActiveTab('reviews')}>
                <span className="pdp__rating-badge">
                  {avgRating} <Star size={12} fill="currentColor" strokeWidth={0} />
                </span>
                <span className="pdp__rating-count">{reviews.length || product.reviews} ratings</span>
                <span className="pdp__dot">|</span>
                <span className="pdp__rating-count">{Math.round((reviews.length || product.reviews) * 0.7)}+ answered questions</span>
              </div>

              {/* Price section */}
              <div className="pdp__price-section">
                <div className="pdp__price-row">
                  <span className="pdp__price-current">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="pdp__price-old">M.R.P: <span className="line-through">{formatPrice(product.originalPrice)}</span></span>
                      <span className="pdp__price-off">({discount}% off)</span>
                    </>
                  )}
                </div>
                <p className="pdp__price-tax">inclusive of all taxes</p>
                {product.originalPrice && (
                  <p className="pdp__price-save">
                    <Zap size={14} /> You save {formatPrice(product.originalPrice - product.price)}
                  </p>
                )}
              </div>

              {/* Offers */}
              <div className="pdp__offers">
                <span className="pdp__offers-title">Available offers</span>
                <ul className="pdp__offers-list">
                  <li><Zap size={14} /> <strong>Bank Offer</strong> 10% off on HDFC Credit Card, up to ₹2,500</li>
                  <li><Zap size={14} /> <strong>Cashback</strong> Free shipping on orders over ₹12,000</li>
                  <li><Zap size={14} /> <strong>Exchange</strong> Easy 30-day return & exchange policy</li>
                  <li><Zap size={14} /> <strong>Warranty</strong> {product.warranty || '2 Year Brand Warranty'}</li>
                </ul>
              </div>

              {/* Color Selection */}
              <div className="pdp__section">
                <span className="pdp__section-label">Color: <strong>{selectedColor}</strong></span>
                <div className="pdp__color-list">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      className={`pdp__color-btn ${selectedColor === c.name ? 'is-active' : ''}`}
                      style={{ '--swatch': c.hex }}
                      onClick={() => { setSelectedColor(c.name); setSelectedImg(0) }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {!singleSize && (
                <div className="pdp__section">
                  <div className="pdp__section-head">
                    <span className="pdp__section-label">Size</span>
                    <button className="pdp__size-guide"><Info size={14} /> Size guide</button>
                  </div>
                  <div className="pdp__size-list">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        className={`pdp__size-btn ${size === s ? 'is-active' : ''}`}
                        onClick={() => { setSize(s); setSizeError(false) }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizeError && <p className="pdp__error">Please select a size</p>}
                </div>
              )}

              {/* Stock + Delivery */}
              <div className="pdp__stock-delivery">
                <div className="pdp__stock">
                  <Package size={16} />
                  {product.inStock !== false ? (
                    <span className="pdp__stock-in">In Stock</span>
                  ) : (
                    <span className="pdp__stock-out">Currently out of stock</span>
                  )}
                  {product.inStock !== false && product.stockCount <= 5 && (
                    <span className="pdp__stock-low">Only {product.stockCount} left</span>
                  )}
                </div>

                <div className="pdp__delivery">
                  <MapPin size={16} />
                  <div>
                    <span className="pdp__delivery-title">Free Delivery</span>
                    <span className="pdp__delivery-date">
                      <Clock size={13} /> {deliveryDate1} - {deliveryDate2}
                    </span>
                    <span className="pdp__delivery-return">30-day easy returns</span>
                  </div>
                </div>
              </div>

              {/* Material & Warranty */}
              <div className="pdp__specs-mini">
                {product.material && (
                  <div className="pdp__specs-mini-item">
                    <span className="pdp__specs-mini-label">Material</span>
                    <span className="pdp__specs-mini-val">{product.material}</span>
                  </div>
                )}
                {product.warranty && (
                  <div className="pdp__specs-mini-item">
                    <span className="pdp__specs-mini-label">Warranty</span>
                    <span className="pdp__specs-mini-val">{product.warranty}</span>
                  </div>
                )}
                <div className="pdp__specs-mini-item">
                  <span className="pdp__specs-mini-label">Category</span>
                  <span className="pdp__specs-mini-val capitalize">{product.category}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pdp__cta-section">
                <div className="pdp__qty-group">
                  <span className="pdp__qty-label">Qty:</span>
                  <div className="pdp__qty">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                      <Minus size={14} />
                    </button>
                    <span>{qty}</span>
                    <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  className={`pdp__add-btn ${added ? 'is-added' : ''}`}
                  onClick={handleAdd}
                >
                  {added ? (
                    <><Check size={18} /> Added to cart</>
                  ) : (
                    <><ShoppingBag size={18} /> Add to cart</>
                  )}
                </button>

                <button className="pdp__buy-btn" onClick={handleBuyNow}>
                  <Zap size={18} /> Buy now
                </button>

                <div className="pdp__cta-row">
                  <button
                    className={`pdp__wish-btn ${wished ? 'is-active' : ''}`}
                    onClick={() => toggleWish(product.id)}
                  >
                    <Heart size={18} fill={wished ? 'currentColor' : 'none'} strokeWidth={1.6} />
                    <span>Wishlist</span>
                  </button>
                  <button className="pdp__share-btn" onClick={handleShare}>
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                </div>

                {showShareMenu && (
                  <div className="pdp__share-toast">Link copied to clipboard!</div>
                )}
              </div>

              {/* Assurance */}
              <div className="pdp__assurance">
                <div className="pdp__assure-item">
                  <Truck size={16} />
                  <div>
                    <span className="pdp__assure-title">Free Shipping</span>
                    <span className="pdp__assure-sub">On orders over ₹12,000</span>
                  </div>
                </div>
                <div className="pdp__assure-item">
                  <RefreshCw size={16} />
                  <div>
                    <span className="pdp__assure-title">Easy Returns</span>
                    <span className="pdp__assure-sub">30-day return policy</span>
                  </div>
                </div>
                <div className="pdp__assure-item">
                  <ShieldCheck size={16} />
                  <div>
                    <span className="pdp__assure-title">Secure</span>
                    <span className="pdp__assure-sub">Encrypted payment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== RIGHT: Desktop Sticky Summary ===== */}
            <aside className="pdp__sidebar">
              <div className="pdp__sidebar-box">
                <div className="pdp__sidebar-price">
                  <span className="pdp__sidebar-current">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="pdp__sidebar-old">{formatPrice(product.originalPrice)}</span>
                  )}
                  {discount > 0 && <span className="pdp__sidebar-off">{discount}% off</span>}
                </div>
                <p className="pdp__sidebar-tax">+ inclusive of all taxes</p>

                <div className="pdp__sidebar-colors">
                  <span className="pdp__sidebar-label">Color: <strong>{selectedColor}</strong></span>
                  <div className="pdp__sidebar-swatches">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        className={`pdp__sidebar-swatch ${selectedColor === c.name ? 'is-active' : ''}`}
                        style={{ background: c.hex }}
                        onClick={() => { setSelectedColor(c.name); setSelectedImg(0) }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {!singleSize && (
                  <div className="pdp__sidebar-sizes">
                    <span className="pdp__sidebar-label">Size: <strong>{size || 'Select'}</strong></span>
                    <div className="pdp__sidebar-size-list">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          className={`pdp__sidebar-size-btn ${size === s ? 'is-active' : ''}`}
                          onClick={() => { setSize(s); setSizeError(false) }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pdp__sidebar-delivery">
                  <Truck size={15} />
                  <span>Free delivery by <strong>{deliveryDate1}</strong></span>
                </div>

                <div className="pdp__sidebar-stock">
                  <Package size={15} />
                  <span className="pdp__stock-in">In Stock</span>
                </div>

                <div className="pdp__sidebar-qty">
                  <span>Qty:</span>
                  <div className="pdp__qty pdp__sidebar-qty-selector">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                      <Minus size={12} />
                    </button>
                    <span>{qty}</span>
                    <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <button className="pdp__sidebar-cart" onClick={handleAdd}>
                  {added ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to cart</>}
                </button>
                <button className="pdp__sidebar-buy" onClick={handleBuyNow}>
                  <Zap size={16} /> Buy now
                </button>

                <button
                  className={`pdp__sidebar-wish ${wished ? 'is-active' : ''}`}
                  onClick={() => toggleWish(product.id)}
                >
                  <Heart size={16} fill={wished ? 'currentColor' : 'none'} strokeWidth={1.6} />
                  {wished ? 'Added to Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            </aside>
          </div>

          {/* ===== TABS: Details | Reviews | Video ===== */}
          <div className="pdp__tabs">
            <div className="pdp__tabs-nav">
              <button
                className={`pdp__tab-btn ${activeTab === 'details' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <Info size={16} /> Product Details
              </button>
              <button
                className={`pdp__tab-btn ${activeTab === 'reviews' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                <MessageCircle size={16} /> Reviews ({reviews.length || product.reviews})
              </button>
              <button
                className={`pdp__tab-btn ${activeTab === 'video' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('video')}
              >
                <Video size={16} /> Videos ({videos.length})
              </button>
            </div>

            <AnimatePresence mode="wait">
              {/* Details Tab */}
              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="pdp__tab-content"
                >
                  <div className="pdp__desc-section">
                    <h3>Description</h3>
                    <p className={`pdp__desc-text ${showFullDesc ? '' : 'pdp__desc-clamped'}`}>
                      {product.description}
                    </p>
                    {product.description.length > 150 && (
                      <button className="pdp__desc-toggle" onClick={() => setShowFullDesc(!showFullDesc)}>
                        {showFullDesc ? 'Show less' : 'Read more'} <ChevronDown size={14} />
                      </button>
                    )}
                  </div>

                  <div className="pdp__specs-grid-full">
                    <h3>Specifications</h3>
                    <div className="pdp__specs-table">
                      {product.details.map((d, i) => (
                        <div key={i} className="pdp__specs-row">
                          <span className="pdp__specs-key">Feature {i + 1}</span>
                          <span className="pdp__specs-val">{d}</span>
                        </div>
                      ))}
                      <div className="pdp__specs-row">
                        <span className="pdp__specs-key">Category</span>
                        <span className="pdp__specs-val capitalize">{product.category}</span>
                      </div>
                      <div className="pdp__specs-row">
                        <span className="pdp__specs-key">Material</span>
                        <span className="pdp__specs-val">{product.material || 'Premium Quality'}</span>
                      </div>
                      <div className="pdp__specs-row">
                        <span className="pdp__specs-key">Warranty</span>
                        <span className="pdp__specs-val">{product.warranty || '2 Year Brand Warranty'}</span>
                      </div>
                      <div className="pdp__specs-row">
                        <span className="pdp__specs-key">Brand</span>
                        <span className="pdp__specs-val">{product.brand || 'Lumière'}</span>
                      </div>
                      <div className="pdp__specs-row">
                        <span className="pdp__specs-key">SKU</span>
                        <span className="pdp__specs-val">{product.sku || product.id.toUpperCase()}</span>
                      </div>
                      <div className="pdp__specs-row">
                        <span className="pdp__specs-key">Available Colors</span>
                        <span className="pdp__specs-val">{product.colors.map((c) => c.name).join(', ')}</span>
                      </div>
                      <div className="pdp__specs-row">
                        <span className="pdp__specs-key">Available Sizes</span>
                        <span className="pdp__specs-val">{singleSize ? product.sizes[0] : product.sizes.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="pdp__tab-content"
                >
                  <div className="pdp__reviews-section">
                    <div className="pdp__reviews-summary">
                      <div className="pdp__reviews-score">
                        <span className="pdp__reviews-big">{avgRating}</span>
                        <div className="pdp__reviews-stars">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={18}
                              fill={s <= Math.round(avgRating) ? 'var(--gold)' : 'none'}
                              stroke={s <= Math.round(avgRating) ? 'var(--gold)' : 'var(--line)'}
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <span className="pdp__reviews-count">{reviews.length || product.reviews} verified ratings</span>
                      </div>
                      <div className="pdp__reviews-bars">
                        {RATING_STARS.map((star) => {
                          const count = ratingCounts[star] || 0
                          const pct = reviews.length ? (count / reviews.length) * 100 : 0
                          return (
                            <div key={star} className="pdp__reviews-bar-row">
                              <span className="pdp__reviews-bar-label">{star} <Star size={10} fill="var(--gold)" strokeWidth={0} /></span>
                              <div className="pdp__reviews-bar-track">
                                <div className="pdp__reviews-bar-fill" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="pdp__reviews-bar-count">{count}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pdp__reviews-list">
                      {visibleReviews.map((review) => (
                        <div key={review.id} className="pdp__review-card">
                          <div className="pdp__review-header">
                            <div className="pdp__review-avatar">
                              {review.user.charAt(0)}
                            </div>
                            <div className="pdp__review-meta">
                              <span className="pdp__review-user">{review.user}</span>
                              <div className="pdp__review-stars">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    size={12}
                                    fill={s <= review.rating ? 'var(--gold)' : 'none'}
                                    stroke={s <= review.rating ? 'var(--gold)' : 'var(--line)'}
                                    strokeWidth={1.5}
                                  />
                                ))}
                                <span className="pdp__review-date">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            </div>
                            {review.verified && (
                              <span className="pdp__review-badge">
                                <Award size={12} /> Verified Purchase
                              </span>
                            )}
                          </div>
                          <h4 className="pdp__review-title">{review.title}</h4>
                          <p className="pdp__review-comment">{review.comment}</p>
                          {review.images && review.images.length > 0 && (
                            <div className="pdp__review-images">
                              {review.images.map((imgSrc, idx) => (
                                <img key={idx} src={imgSrc} alt="Review photo" className="pdp__review-img" loading="lazy" />
                              ))}
                            </div>
                          )}
                          <div className="pdp__review-actions">
                            <button className="pdp__review-action">
                              <ThumbsUp size={14} /> Helpful
                            </button>
                          </div>
                        </div>
                      ))}
                      {reviews.length > 3 && (
                        <button
                          className="btn btn--ghost pdp__reviews-more"
                          onClick={() => setShowAllReviews(!showAllReviews)}
                        >
                          {showAllReviews ? 'Show less' : `View all ${reviews.length} reviews`}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Video Tab */}
              {activeTab === 'video' && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="pdp__tab-content"
                >
                  <div className="pdp__videos-section">
                    <h3>Product Videos</h3>
                    <p className="muted">Watch {product.name} in real-life use and styling.</p>
                    <div className="pdp__videos-grid">
                      {videos.length > 0 ? videos.map((v, i) => (
                        <div key={i} className="pdp__video-card">
                          {playingVideo === i ? (
                            <div className="pdp__video-player">
                              <video
                                controls
                                autoPlay
                                className="pdp__video-el"
                                onEnded={() => setPlayingVideo(null)}
                              >
                                <source src={v.url} type="video/mp4" />
                              </video>
                              <button
                                className="pdp__video-close"
                                onClick={() => setPlayingVideo(null)}
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="pdp__video-thumb" onClick={() => toggleVideo(i)}>
                              <img
                                src={displayImages[i % displayImages.length]}
                                alt={v.type}
                              />
                              <div className="pdp__video-play">
                                <Play size={32} fill="#fff" />
                              </div>
                              <span className="pdp__video-label">{v.type}</span>
                            </div>
                          )}
                        </div>
                      )) : (
                        <div className="pdp__videos-empty">
                          <Video size={48} />
                          <p>No videos available for this product yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ===== Frequently Bought Together ===== */}
          {frequentlyBought.length > 0 && (
            <section className="pdp__cross-section">
              <div className="section-head">
                <span className="eyebrow">Complete your look</span>
                <h2 className="section-title">Frequently Bought Together</h2>
              </div>
              <div className="pdp__cross-grid">
                {frequentlyBought.map((p) => (
                  <div key={p.id} className="pdp__cross-item">
                    <ProductCard product={p} />
                  </div>
                ))}
                <div className="pdp__cross-total">
                  <span className="pdp__cross-price">
                    Total: {formatPrice(
                      product.price +
                      frequentlyBought.slice(0, 2).reduce((s, p) => s + p.price, 0)
                    )}
                  </span>
                  <button className="btn" onClick={handleAdd}>
                    Add all to cart
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ===== Related Products ===== */}
          {related.length > 0 && (
            <section className="section pdp__related">
              <div className="section-head">
                <span className="eyebrow">You may also like</span>
                <h2 className="section-title">Similar Products</h2>
              </div>
              <div className="product-grid">
                {related.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 0.06}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ===== Best Sellers ===== */}
          {bestSellers.length > 0 && (
            <section className="section section--paper pdp__bestsellers">
              <div className="section-head">
                <span className="eyebrow">Top rated</span>
                <h2 className="section-title">Best Sellers</h2>
              </div>
              <div className="product-grid">
                {bestSellers.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 0.06}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={displayImages}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          product={product}
        />
      )}
    </>
  )
}
