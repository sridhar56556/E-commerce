import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import NotFound from './pages/NotFound'

// shared CSS for components used across pages
import './components/AnnouncementBar.css'
import './components/Navbar.css'
import './components/Footer.css'
import './components/CartDrawer.css'
import './components/SmartImage.css'
import './components/ProductCard.css'
import './components/Lightbox.css'
import './components/Hero.css'
import './components/Newsletter.css'
import './pages/pages.css'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

function Page({ children }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/shop" element={<Page><Shop /></Page>} />
          <Route path="/product/:id" element={<Page><ProductDetail /></Page>} />
          <Route path="/cart" element={<Page><Cart /></Page>} />
          <Route path="/checkout" element={<Page><Checkout /></Page>} />
          <Route path="/wishlist" element={<Page><Wishlist /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>

      <Footer />
      <CartDrawer />
    </>
  )
}
