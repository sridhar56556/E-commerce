import { Link } from 'react-router-dom'
import { Truck, RefreshCw, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'

import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import Newsletter from '../components/Newsletter'
import SmartImage from '../components/SmartImage'
import { PRODUCTS, CATEGORIES } from '../data/products'

const USPS = [
  { Icon: Truck, title: 'Free Shipping', text: 'On all orders over ₹12,000' },
  { Icon: RefreshCw, title: '30-Day Returns', text: 'Easy, no-fuss returns' },
  { Icon: ShieldCheck, title: 'Secure Checkout', text: 'Encrypted & protected' },
  { Icon: Sparkles, title: 'Crafted to Last', text: 'Natural, lasting fibres' },
]

const SECTIONS = [
  {
    id: 'women',
    title: 'Women\'s Collection',
    category: 'women',
    filter: (p) => p.category === 'women',
  },
  {
    id: 'tees',
    title: 'Men\'s Collection',
    category: 'men',
    filter: (p) =>
      p.id === 'm-suit' || p.id.startsWith('m-personal'),
  },
  {
    id: 'shoes',
    title: 'Shoes',
    category: 'shoes',
    filter: (p) => p.category === 'shoes',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    category: 'accessories',
    filter: (p) => p.category === 'accessories',
  },
]

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8)
  const fresh = PRODUCTS.filter((p) => p.isNew).slice(0, 4)

  return (
    <>
      <Hero />

      <section className="usp">
        <div className="container usp__grid">
          {USPS.map(({ Icon, title, text }) => (
            <Reveal key={title} className="usp__item">
              <Icon size={26} strokeWidth={1.4} />
              <div>
                <h4 className="usp__title">{title}</h4>
                <p className="usp__text muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <Reveal as="span" className="eyebrow">Browse</Reveal>
            <Reveal as="h2" className="section-title" delay={0.05}>
              Shop by Category
            </Reveal>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08} className="cat-grid__cell">
                <Link to={`/shop?category=${c.id}`} className="cat-card">
                  <SmartImage src={c.image} alt={c.name} ratio="3 / 4" className="cat-card__img" />
                  <div className="cat-card__overlay">
                    <h3 className="cat-card__name">{c.name}</h3>
                    <span className="cat-card__cta">
                      Shop now <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Category-specific product sections */}
      {SECTIONS.map((section, si) => {
        const items = PRODUCTS.filter(section.filter).slice(0, 4)
        if (items.length === 0) return null
        return (
          <section key={section.id} className={`section ${si % 2 === 1 ? 'section--paper' : ''}`}>
            <div className="container">
              <div className="section-head feature-head">
                <div>
                  <Reveal as="span" className="eyebrow">Shop</Reveal>
                  <Reveal as="h2" className="section-title" delay={0.05}>
                    {section.title}
                  </Reveal>
                </div>
                <Reveal delay={0.1}>
                  <Link to={`/shop?category=${section.category}`} className="btn btn--ghost">
                    View all <ArrowRight size={16} />
                  </Link>
                </Reveal>
              </div>
              <div className="product-grid">
                {items.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 0.06}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Editorial split banner */}
      <section className="section section--paper">
        <div className="container">
          <div className="editorial">
            <Reveal className="editorial__media">
              <SmartImage
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&h=1300&q=80"
                alt="The Autumn edit"
                ratio="4 / 5"
              />
            </Reveal>
            <div className="editorial__body">
              <Reveal as="span" className="eyebrow">The Edit</Reveal>
              <Reveal as="h2" className="section-title" delay={0.05}>
                Quiet pieces for loud lives
              </Reveal>
              <Reveal as="p" className="lead" delay={0.1}>
                Our Autumn collection is built around a simple idea: fewer, better
                things. Natural fibres, considered cuts and colours that live together
                effortlessly — so getting dressed feels easy again.
              </Reveal>
              <Reveal delay={0.15} className="editorial__actions">
                <Link to="/shop?category=men" className="btn">Shop Men</Link>
                <Link to="/shop" className="btn btn--ghost">View All</Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Big scrolling marquee */}
      <section className="bigmarquee" aria-hidden>
        <div className="bigmarquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              New Season&nbsp;<em>✦</em>&nbsp;Free Shipping over ₹12,000&nbsp;<em>✦</em>&nbsp;
              Made to Last&nbsp;<em>✦</em>&nbsp;Lumière&nbsp;<em>✦</em>&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* Featured Pieces */}
      <section className="section section--paper">
        <div className="container">
          <div className="section-head feature-head">
            <div>
              <Reveal as="span" className="eyebrow">Curated</Reveal>
              <Reveal as="h2" className="section-title" delay={0.05}>
                Featured Pieces
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Link to="/shop" className="btn btn--ghost">
                View all <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="product-grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      {fresh.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head center">
              <Reveal as="span" className="eyebrow">Just In</Reveal>
              <Reveal as="h2" className="section-title" delay={0.05}>New Arrivals</Reveal>
            </div>
            <div className="product-grid">
              {fresh.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  )
}
