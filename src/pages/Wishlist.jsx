import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'

export default function Wishlist() {
  const { wishlist } = useCart()
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id))

  return (
    <div className="container section--top">
      <div className="shop__hero" style={{ paddingInline: 0 }}>
        <span className="eyebrow">Saved</span>
        <h1 className="shop__title">Your Wishlist</h1>
        <p className="muted">
          {items.length} {items.length === 1 ? 'piece' : 'pieces'} saved
        </p>
      </div>

      {items.length === 0 ? (
        <div className="shop__empty">
          <Heart size={42} strokeWidth={1} className="muted" />
          <h3>No favourites yet</h3>
          <p className="muted">Tap the heart on any piece to save it here.</p>
          <Link to="/shop" className="btn">Explore the shop</Link>
        </div>
      ) : (
        <div className="product-grid" style={{ paddingBottom: '5rem' }}>
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
