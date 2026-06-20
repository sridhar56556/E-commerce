import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, x: 60 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, x: -40, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

const infoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
}

export default function Lightbox({ images, index, onClose, product }) {
  const [current, setCurrent] = useState(index)
  const [direction, setDirection] = useState(0)
  const { toggleWish, isWished } = useCart()
  const wished = isWished(product.id)

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [onClose, goNext, goPrev])

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const wrap = images.length

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3 }}
        onClick={handleBackdrop}
      >
        {/* Close */}
        <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox">
          <X size={24} />
        </button>

        {/* Counter */}
        <span className="lightbox__counter">
          {current + 1} / {images.length}
        </span>

        {/* Main image */}
        <div className="lightbox__slidewrap">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              className="lightbox__slide"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={direction}
            >
              <img
                src={images[current]}
                alt={`${product.name} view ${current + 1}`}
                className="lightbox__img"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        {wrap > 1 && (
          <>
            <button className="lightbox__nav lightbox__nav--prev" onClick={goPrev} aria-label="Previous">
              <ChevronLeft size={28} />
            </button>
            <button className="lightbox__nav lightbox__nav--next" onClick={goNext} aria-label="Next">
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* Bottom info bar */}
        <motion.div className="lightbox__info" variants={infoVariants} initial="hidden" animate="visible">
          <div className="lightbox__infobody">
            <h3 className="lightbox__name">{product.name}</h3>
            <p className="lightbox__price">
              {product.originalPrice && (
                <span className="price--old">{formatPrice(product.originalPrice)}</span>
              )}
              <span>{formatPrice(product.price)}</span>
            </p>
          </div>
          <div className="lightbox__actions">
            <button
              className={`lightbox__wish ${wished ? 'is-active' : ''}`}
              onClick={() => toggleWish(product.id)}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={22} fill={wished ? 'currentColor' : 'none'} strokeWidth={1.6} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
