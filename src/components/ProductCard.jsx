import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import SmartImage from './SmartImage'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

export default function ProductCard({ product }) {
  const { addItem, toggleWish, isWished } = useCart()
  const wished = isWished(product.id)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const quickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, {})
  }

  const wish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWish(product.id)
  }

  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card__media">
        <div className="card__imgwrap">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            className="card__img"
          />
        </div>

        {/* Badges */}
        <div className="card__badges">
          {product.isNew && <span className="tag tag--accent">New</span>}
          {discount > 0 && <span className="tag tag--sale">−{discount}%</span>}
        </div>

        {/* Wishlist */}
        <button
          className={`card__wish ${wished ? 'is-active' : ''}`}
          onClick={wish}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} strokeWidth={1.6} fill={wished ? 'currentColor' : 'none'} />
        </button>

        {/* Quick add */}
        <button className="card__quickadd" onClick={quickAdd}>
          <ShoppingBag size={16} strokeWidth={1.7} />
          Quick add
        </button>
      </Link>

      <div className="card__info">
        <div className="card__row">
          <h3 className="card__name">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <span className="card__rating">
            <Star size={13} fill="currentColor" strokeWidth={0} />
            {product.rating}
          </span>
        </div>

        <div className="card__row">
          <p className="card__price price">
            {product.originalPrice && (
              <span className="price--old">{formatPrice(product.originalPrice)}</span>
            )}
            {formatPrice(product.price)}
          </p>
          <div className="card__swatches">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                className="card__swatch"
                style={{ background: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
