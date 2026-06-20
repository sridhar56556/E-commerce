import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="news section">
      <div className="container">
        <Reveal className="news__inner">
          <span className="eyebrow">The Lumière List</span>
          <h2 className="section-title">Ten percent off your first order</h2>
          <p className="lead news__lead">
            Join for early access to new collections, private sales and styling notes —
            straight to your inbox.
          </p>

          <form className="news__form" onSubmit={submit}>
            <input
              type="email"
              required
              className="field news__input"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button className="btn btn--lg" type="submit">
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>

          <AnimatePresence>
            {sent && (
              <motion.p
                className="news__ok"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Check size={16} /> You're in — check your inbox for the code.
              </motion.p>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
