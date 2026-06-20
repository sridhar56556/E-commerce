import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/shop?sort=new' },
      { label: 'Women', to: '/shop?category=women' },
      { label: 'Men', to: '/shop?category=men' },
      { label: 'Shoes', to: '/shop?category=shoes' },
      { label: 'Accessories', to: '/shop?category=accessories' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping & Returns', to: '#' },
      { label: 'Size Guide', to: '#' },
      { label: 'Track Order', to: '#' },
      { label: 'Contact Us', to: '#' },
      { label: 'FAQs', to: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', to: '#' },
      { label: 'Sustainability', to: '#' },
      { label: 'Careers', to: '#' },
      { label: 'Press', to: '#' },
      { label: 'Stores', to: '#' },
    ],
  },
]

const SOCIALS = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brandcol">
            <Link to="/" className="footer__brand">
              Lumière
            </Link>
            <p className="footer__tag muted">
              Contemporary fashion, made to be lived in. Considered design,
              natural fibres, lasting quality.
            </p>
            <div className="footer__socials">
              {SOCIALS.map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="footer__social">
                  <Icon size={18} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <h4 className="footer__coltitle">{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="footer__link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="muted">© 2026 Lumière. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#" className="link-underline">Privacy</a>
            <a href="#" className="link-underline">Terms</a>
            <a href="#" className="link-underline">Cookies</a>
          </div>
          <p className="muted footer__pay">VISA · MASTERCARD · AMEX · PAYPAL</p>
        </div>
      </div>
    </footer>
  )
}
