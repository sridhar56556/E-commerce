import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const U = 'https://images.unsplash.com/photo-'
const hero = (id) =>
  `${U}${id}?auto=format&fit=crop&w=1920&h=1280&q=80`

const SLIDES = [
  {
    image: 'https://res.cloudinary.com/dgaqfgszr/image/upload/v1761137541/boss_mrdqnt.jpg',
    eyebrow: "Men's Collection",
    title: 'Boss Executive\nBlazer',
    text: 'An executive-grade blazer in premium wool blend with a structured fit.',
    cta: 'Shop men',
    to: '/shop?category=men',
    align: 'left',
  },
  {
    image: hero('1483985988355-763728e1935b'),
    eyebrow: "Women's Collection",
    title: 'Dressed in\nQuiet Luxury',
    text: 'Considered pieces in natural fibres, made to live with you season after season.',
    cta: 'Shop women',
    to: '/shop?category=women',
    align: 'left',
  },
]

const textWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1100}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="hero__swiper"
      >
        {SLIDES.map((s, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <div className={`hero__slide hero__slide--${s.align}`}>
                <div
                  className="hero__bg"
                  style={{ backgroundImage: `url(${s.image})` }}
                  data-active={isActive}
                />
                <div className="hero__scrim" />
                <div className="container hero__content">
                  <motion.div
                    key={isActive ? `a-${i}` : `i-${i}`}
                    variants={textWrap}
                    initial="hidden"
                    animate={isActive ? 'show' : 'hidden'}
                    className="hero__text"
                  >
                    <motion.span variants={fadeUp} className="eyebrow hero__eyebrow">
                      {s.eyebrow}
                    </motion.span>
                    <motion.h1 variants={fadeUp} className="hero__title display">
                      {s.title.split('\n').map((line, j) => (
                        <span key={j}>{line}</span>
                      ))}
                    </motion.h1>
                    <motion.p variants={fadeUp} className="hero__lead">
                      {s.text}
                    </motion.p>
                    <motion.div variants={fadeUp}>
                      <Link to={s.to} className="btn btn--light btn--lg">
                        {s.cta}
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero__scroll">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
