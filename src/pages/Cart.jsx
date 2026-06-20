import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'

import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function Cart() {
  const { items, setQty, removeItem, subtotal, shipping, total, clearCart } = useCart()
  const [promo, setPromo] = useState('')
  const [promoMsg, setPromoMsg] = useState(null)

  const applyPromo = (e) => {
    e.preventDefault()
    if (promo.trim().toUpperCase() === 'LUMIERE10') {
      setPromoMsg({ ok: true, text: 'Code applied — 10% will be deducted at checkout.' })
    } else {
      setPromoMsg({ ok: false, text: 'That code isn’t valid. Try LUMIERE10.' })
    }
  }

  if (items.length === 0) {
    return (
      <div className="container section text-center cart__empty">
        <ShoppingBag size={48} strokeWidth={1} className="muted" />
        <h1 className="section-title">Your bag is empty</h1>
        <p className="lead muted">Discover something you'll love.</p>
        <Link to="/shop" className="btn btn--lg">Start shopping</Link>
      </div>
    )
  }

  return (
    <div className="container section--top cart">
      <div className="cart__head">
        <h1 className="cart__title">Shopping Bag</h1>
        <button className="link-underline muted" onClick={clearCart}>Clear all</button>
      </div>

      <div className="cart__layout">
        {/* Items */}
        <div className="cart__items">
          <AnimatePresence initial={false}>
            {items.map((line) => (
              <motion.div
                key={line.key}
                className="cart__row"
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/product/${line.id}`} className="cart__thumb">
                  <img src={line.image} alt={line.name} loading="lazy" />
                </Link>

                <div className="cart__details">
                  <div className="cart__namerow">
                    <Link to={`/product/${line.id}`} className="cart__name">{line.name}</Link>
                    <span className="price cart__lineprice">
                      {formatPrice(line.price * line.qty)}
                    </span>
                  </div>
                  <p className="muted cart__variant">{line.color} · Size {line.size}</p>
                  <p className="muted cart__unit">{formatPrice(line.price)} each</p>

                  <div className="cart__actions">
                    <div className="qty">
                      <button onClick={() => setQty(line.key, line.qty - 1)} aria-label="Decrease">
                        <Minus size={14} />
                      </button>
                      <span>{line.qty}</span>
                      <button onClick={() => setQty(line.key, line.qty + 1)} aria-label="Increase">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button className="cart__remove" onClick={() => removeItem(line.key)}>
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/shop" className="cart__continue link-underline">
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="cart__summary">
          <h3 className="cart__sumtitle">Order Summary</h3>

          <form className="cart__promo" onSubmit={applyPromo}>
            <div className="cart__promoinput">
              <Tag size={16} className="muted" />
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code (try LUMIERE10)"
                aria-label="Promo code"
              />
            </div>
            <button className="btn btn--ghost" type="submit">Apply</button>
          </form>
          {promoMsg && (
            <p className={`cart__promomsg ${promoMsg.ok ? 'ok' : 'bad'}`}>{promoMsg.text}</p>
          )}

          <div className="cart__lines">
            <div className="cart__line">
              <span>Subtotal</span>
              <span className="price">{formatPrice(subtotal)}</span>
            </div>
            <div className="cart__line">
              <span>Shipping</span>
              <span className="price">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="cart__hint muted">
                Add {formatPrice(150 - subtotal)} more for free shipping
              </p>
            )}
          </div>

          <div className="cart__total">
            <span>Total</span>
            <span className="price">{formatPrice(total)}</span>
          </div>

          <Link to="/checkout" className="btn btn--block btn--lg">
            Checkout <ArrowRight size={16} />
          </Link>
          <p className="cart__safe muted">Secure encrypted checkout · This is a demo</p>
        </aside>
      </div>
    </div>
  )
}
