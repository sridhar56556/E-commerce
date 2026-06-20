import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Lock, ShoppingBag, ArrowRight, CreditCard, Smartphone, Building, Banknote, ChevronDown, Package, Clock, MapPin, Loader } from 'lucide-react'

import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const API = 'http://localhost:8787'

const PAYMENT_METHODS = [
  {
    id: 'card',
    label: 'Credit / Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, RuPay, Amex',
  },
  {
    id: 'upi',
    label: 'UPI',
    icon: Smartphone,
    description: 'Google Pay, PhonePe, Paytm, BHIM',
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    icon: Building,
    description: 'SBI, HDFC, ICICI, Axis & more',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    icon: Banknote,
    description: 'Pay when you receive',
  },
]

const BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra',
  'Yes Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
]

const EMPTY_FORM = {
  email: '',
  name: '',
  address: '',
  city: '',
  postal: '',
  country: '',
  cardName: '',
  card: '',
  expiry: '',
  cvc: '',
  upiId: '',
  bank: '',
}

// --- input formatters -------------------------------------------------
const formatCard = (v) =>
  v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim()
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}
const formatCvc = (v) => v.replace(/\D/g, '').slice(0, 4)

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [showBankDropdown, setShowBankDropdown] = useState(false)

  const update = (key) => (e) => {
    let value = e.target.value
    if (key === 'card') value = formatCard(value)
    if (key === 'expiry') value = formatExpiry(value)
    if (key === 'cvc') value = formatCvc(value)
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((er) => (er[key] ? { ...er, [key]: undefined } : er))
  }

  const [placing, setPlacing] = useState(false)
  const [orderResult, setOrderResult] = useState(null)
  const [paymentStep, setPaymentStep] = useState(0)
  const stepTimer = useRef(null)

  const PAYMENT_STEPS = [
    'Securing payment...',
    'Verifying details...',
    'Confirming order...',
    'Almost there...',
  ]

  useEffect(() => {
    if (!placing) {
      setPaymentStep(0)
      return
    }
    stepTimer.current = setInterval(() => {
      setPaymentStep((prev) => Math.min(prev + 1, PAYMENT_STEPS.length - 1))
    }, 900)
    return () => clearInterval(stepTimer.current)
  }, [placing])

  const validate = () => {
    const e = {}
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.name.trim()) e.name = 'Required'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.postal.trim()) e.postal = 'Required'
    if (!form.country.trim()) e.country = 'Required'

    if (paymentMethod === 'card') {
      if (!form.cardName.trim()) e.cardName = 'Required'
      if (form.card.replace(/\s/g, '').length < 13) e.card = 'Enter a valid card number'
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
        e.expiry = 'MM/YY'
      } else {
        const mm = Number(form.expiry.slice(0, 2))
        if (mm < 1 || mm > 12) e.expiry = 'Invalid month'
      }
      if (form.cvc.length < 3) e.cvc = '3–4 digits'
    }

    if (paymentMethod === 'upi') {
      if (!form.upiId.trim()) e.upiId = 'Enter your UPI ID'
      else if (!/^[\w.-]+@[\w.-]+$/.test(form.upiId.trim())) e.upiId = 'Invalid UPI ID (e.g. name@okaxis)'
    }

    if (paymentMethod === 'netbanking') {
      if (!form.bank) e.bank = 'Select your bank'
    }

    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate()
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }

    setPlacing(true)
    const startTime = Date.now()

    try {
      const res = await fetch(`${API}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((line) => ({
            id: line.id,
            name: line.name,
            price: line.price,
            qty: line.qty,
            size: line.size,
            color: line.color,
            image: line.image,
          })),
          shipping: {
            name: form.name,
            email: form.email,
            address: form.address,
            city: form.city,
            postal: form.postal,
            country: form.country,
          },
          payment: {
            method: paymentMethod,
            upiId: form.upiId,
            bank: form.bank,
          },
        }),
      })

      const data = await res.json()

      if (data.success) {
        const elapsed = Date.now() - startTime
        const minDuration = 3500
        if (elapsed < minDuration) {
          await new Promise((r) => setTimeout(r, minDuration - elapsed))
        }
        clearCart()
        setPlaced(true)
        setOrderResult(data.order)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setErrors({ _form: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setErrors({ _form: 'Could not connect to the server. Make sure it is running (npm run server).' })
    } finally {
      setPlacing(false)
    }
  }

  // ---- Order placed ---------------------------------------------------
  if (placed) {
    return (
      <div className="container section text-center cart__placed">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="cart__placedicon"
        >
          <Check size={40} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="section-title" style={{ marginBottom: '0.3rem' }}>
            Order Placed!
          </h1>
          {orderResult && (
            <div className="order-confirm">
              <div className="order-confirm__id">
                <Package size={18} />
                <span>Order #{orderResult.id}</span>
              </div>
              <div className="order-confirm__info">
                <span><Clock size={15} /> {new Date(orderResult.createdAt).toLocaleString()}</span>
                <span><MapPin size={15} /> Shipping to {form.name}</span>
              </div>
              <div className="order-confirm__summary">
                <span>{orderResult.items} {orderResult.items === 1 ? 'item' : 'items'}</span>
                <span className="price">{formatPrice(orderResult.total)}</span>
              </div>
            </div>
          )}
          <p className="lead" style={{ maxWidth: 460, margin: '1.5rem auto 2rem' }}>
            Thank you for your order! A confirmation email will be sent to <strong>{form.email}</strong> with tracking details.
          </p>
          <div className="order-confirm__actions">
            <Link to="/shop" className="btn btn--lg">Continue shopping</Link>
            <Link to="/" className="btn btn--ghost btn--lg">Go home</Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // ---- Empty bag ------------------------------------------------------
  if (items.length === 0) {
    return (
      <div className="container section text-center cart__empty">
        <ShoppingBag size={48} strokeWidth={1} className="muted" />
        <h1 className="section-title">Your bag is empty</h1>
        <p className="lead muted">Add something you love before checking out.</p>
        <Link to="/shop" className="btn btn--lg">Start shopping</Link>
      </div>
    )
  }

  // ---- Checkout form --------------------------------------------------
  // Inline render helper (a plain function, NOT a component) so inputs
  // reconcile by position and keep focus while typing.
  const field = (name, label, { type = 'text', placeholder, inputMode, autoComplete } = {}) => (
    <label className="checkout__field">
      <span className="checkout__label">{label}</span>
      <input
        className="field"
        type={type}
        value={form[name]}
        onChange={update(name)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={errors[name] ? 'true' : 'false'}
      />
      {errors[name] && <span className="checkout__err">{errors[name]}</span>}
    </label>
  )

  return (
    <div className="container section--top cart">
      <div className="cart__head">
        <h1 className="cart__title">Checkout</h1>
        <Link to="/cart" className="link-underline muted">← Back to bag</Link>
      </div>

      <div className="cart__layout">
        {/* Form */}
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <section className="checkout__section">
            <h3 className="checkout__sectitle">Contact</h3>
            {field('email', 'Email', { type: 'email', placeholder: 'you@example.com', autoComplete: 'email' })}
          </section>

          <section className="checkout__section">
            <h3 className="checkout__sectitle">Shipping address</h3>
            {field('name', 'Full name', { placeholder: 'Jane Doe', autoComplete: 'name' })}
            {field('address', 'Address', { placeholder: '123 Rue de Rivoli', autoComplete: 'street-address' })}
            <div className="checkout__row">
              {field('city', 'City', { placeholder: 'Paris', autoComplete: 'address-level2' })}
              {field('postal', 'Postal code', { placeholder: '75001', autoComplete: 'postal-code' })}
            </div>
            {field('country', 'Country', { placeholder: 'France', autoComplete: 'country-name' })}
          </section>

          <section className="checkout__section">
            <h3 className="checkout__sectitle">
              Payment <Lock size={14} className="muted" />
            </h3>

            {/* Payment method tabs */}
            <div className="pay-methods">
              {PAYMENT_METHODS.map((pm) => {
                const Icon = pm.icon
                const active = paymentMethod === pm.id
                return (
                  <button
                    key={pm.id}
                    type="button"
                    className={`pay-method ${active ? 'is-active' : ''}`}
                    onClick={() => { setPaymentMethod(pm.id); setErrors((er) => ({ ...er, cardName: undefined, card: undefined, expiry: undefined, cvc: undefined, upiId: undefined, bank: undefined })) }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                    <span className="pay-method__label">{pm.label}</span>
                    <span className="pay-method__desc">{pm.description}</span>
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* Card */}
              {paymentMethod === 'card' && (
                <motion.div
                  key="card"
                  className="pay-fields"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {field('cardName', 'Name on card', { placeholder: 'Jane Doe', autoComplete: 'cc-name' })}
                  {field('card', 'Card number', {
                    placeholder: '4242 4242 4242 4242',
                    inputMode: 'numeric',
                    autoComplete: 'cc-number',
                  })}
                  <div className="checkout__row">
                    {field('expiry', 'Expiry (MM/YY)', { placeholder: '08/27', inputMode: 'numeric', autoComplete: 'cc-exp' })}
                    {field('cvc', 'CVC', { placeholder: '123', inputMode: 'numeric', autoComplete: 'cc-csc' })}
                  </div>
                  <div className="pay-cards">
                    <img src="https://cdn.jsdelivr.net/gh/abhiprojectz/payment-icons@main/visa.svg" alt="Visa" />
                    <img src="https://cdn.jsdelivr.net/gh/abhiprojectz/payment-icons@main/mastercard.svg" alt="Mastercard" />
                    <img src="https://cdn.jsdelivr.net/gh/abhiprojectz/payment-icons@main/rupay.svg" alt="RuPay" />
                    <img src="https://cdn.jsdelivr.net/gh/abhiprojectz/payment-icons@main/amex.svg" alt="Amex" />
                  </div>
                </motion.div>
              )}

              {/* UPI */}
              {paymentMethod === 'upi' && (
                <motion.div
                  key="upi"
                  className="pay-fields"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {field('upiId', 'UPI ID', { placeholder: 'you@okaxis', inputMode: 'email', autoComplete: 'off' })}
                  <div className="pay-upi-apps">
                    <span className="checkout__label">Pay using any UPI app</span>
                    <div className="pay-upi-icons">
                      <span><Smartphone size={16} /> Google Pay</span>
                      <span><Smartphone size={16} /> PhonePe</span>
                      <span><Smartphone size={16} /> Paytm</span>
                      <span><Smartphone size={16} /> BHIM</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Net Banking */}
              {paymentMethod === 'netbanking' && (
                <motion.div
                  key="netbanking"
                  className="pay-fields"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="pay-bank-select">
                    <label className="checkout__field">
                      <span className="checkout__label">Select your bank</span>
                      <div className="pay-bank-trigger" onClick={() => setShowBankDropdown((s) => !s)}>
                        <span className={form.bank ? '' : 'muted'}>
                          {form.bank || 'Choose your bank'}
                        </span>
                        <ChevronDown size={16} />
                      </div>
                      {errors.bank && <span className="checkout__err">{errors.bank}</span>}
                    </label>
                    <AnimatePresence>
                      {showBankDropdown && (
                        <motion.div
                          className="pay-bank-dropdown"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {BANKS.map((b) => (
                            <button
                              key={b}
                              type="button"
                              className={`pay-bank-option ${form.bank === b ? 'is-active' : ''}`}
                              onClick={() => { setForm((f) => ({ ...f, bank: b })); setShowBankDropdown(false); setErrors((er) => ({ ...er, bank: undefined })) }}
                            >
                              <Building size={16} strokeWidth={1.4} />
                              {b}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* COD */}
              {paymentMethod === 'cod' && (
                <motion.div
                  key="cod"
                  className="pay-fields"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="pay-cod">
                    <Banknote size={32} strokeWidth={1.2} />
                    <div>
                      <p className="pay-cod__title">Pay on delivery</p>
                      <p className="pay-cod__desc">
                        No extra charge. Pay in cash or via UPI at your doorstep.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {errors._form && <p className="checkout__err" style={{ textAlign: 'center' }}>{errors._form}</p>}

          <button type="submit" className="btn btn--block btn--lg pay-submit" disabled={placing}>
            {placing ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                <Loader size={18} className="spinner" />
                {PAYMENT_STEPS[paymentStep]}
              </span>
            ) : (
              <>{paymentMethod === 'cod' ? 'Place order' : `Pay ${formatPrice(total)}`} <ArrowRight size={16} /></>
            )}
          </button>
          <p className="cart__safe muted">
            <Lock size={12} /> Secure encrypted checkout
          </p>

          {/* ---- Payment loading overlay ---- */}
          <AnimatePresence>
            {placing && (
              <motion.div
                className="payment-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="payment-overlay__card"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="payment-overlay__spinner">
                    <Loader size={40} className="spinner" />
                  </div>
                  <p className="payment-overlay__step">{PAYMENT_STEPS[paymentStep]}</p>
                  <div className="payment-overlay__dots">
                    {PAYMENT_STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`payment-overlay__dot ${i <= paymentStep ? 'is-active' : ''}`}
                      />
                    ))}
                  </div>
                  <p className="payment-overlay__hint">Please don't close this page</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Order summary */}
        <aside className="cart__summary">
          <h3 className="cart__sumtitle">Order Summary</h3>

          <ul className="checkout__items">
            {items.map((line) => (
              <li key={line.key} className="checkout__item">
                <div className="checkout__itemthumb">
                  <img src={line.image} alt={line.name} loading="lazy" />
                  <span className="checkout__qty">{line.qty}</span>
                </div>
                <div className="checkout__itemmeta">
                  <span className="checkout__itemname">{line.name}</span>
                  <span className="muted checkout__itemvariant">{line.color} · {line.size}</span>
                </div>
                <span className="price checkout__itemprice">
                  {formatPrice(line.price * line.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="cart__lines">
            <div className="cart__line">
              <span>Subtotal</span>
              <span className="price">{formatPrice(subtotal)}</span>
            </div>
            <div className="cart__line">
              <span>Shipping</span>
              <span className="price">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
          </div>

          <div className="cart__total">
            <span>Total</span>
            <span className="price">{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
