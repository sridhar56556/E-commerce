import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const FREE_SHIP = 12000

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    setQty,
    removeItem,
    subtotal,
    shipping,
  } = useCart()

  const remaining = Math.max(0, FREE_SHIP - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="drawer__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Shopping cart"
          >
            <header className="drawer__head">
              <h3 className="drawer__title">
                Your Bag <span className="muted">({items.length})</span>
              </h3>
              <button className="nav__icon" onClick={closeCart} aria-label="Close cart">
                <X size={22} strokeWidth={1.5} />
              </button>
            </header>

            {items.length > 0 && (
              <div className="drawer__ship">
                {remaining > 0 ? (
                  <p>
                    You're <strong>{formatPrice(remaining)}</strong> away from free shipping
                  </p>
                ) : (
                  <p>🎉 You've unlocked free shipping</p>
                )}
                <div className="drawer__bar">
                  <motion.span
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                  />
                </div>
              </div>
            )}

            <div className="drawer__body">
              {items.length === 0 ? (
                <div className="drawer__empty">
                  <ShoppingBag size={40} strokeWidth={1} />
                  <p>Your bag is empty</p>
                  <button className="btn" onClick={closeCart}>
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="drawer__list">
                  <AnimatePresence initial={false}>
                    {items.map((line) => (
                      <motion.li
                        key={line.key}
                        className="drawer__item"
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link to={`/product/${line.id}`} onClick={closeCart} className="drawer__thumb">
                          <img src={line.image} alt={line.name} loading="lazy" />
                        </Link>
                        <div className="drawer__meta">
                          <div className="drawer__metatop">
                            <Link to={`/product/${line.id}`} onClick={closeCart} className="drawer__name">
                              {line.name}
                            </Link>
                            <button
                              className="drawer__remove"
                              onClick={() => removeItem(line.key)}
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} strokeWidth={1.6} />
                            </button>
                          </div>
                          <p className="drawer__variant muted">
                            {line.color} · {line.size}
                          </p>
                          <div className="drawer__metabottom">
                            <div className="qty">
                              <button
                                onClick={() => setQty(line.key, line.qty - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span>{line.qty}</span>
                              <button
                                onClick={() => setQty(line.key, line.qty + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="price">{formatPrice(line.price * line.qty)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="drawer__foot">
                <div className="drawer__line">
                  <span>Subtotal</span>
                  <span className="price">{formatPrice(subtotal)}</span>
                </div>
                <div className="drawer__line muted">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <Link to="/cart" className="btn btn--block btn--lg" onClick={closeCart}>
                  Checkout — {formatPrice(subtotal + shipping)}
                </Link>
                <button className="drawer__continue link-underline" onClick={closeCart}>
                  Continue shopping
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
