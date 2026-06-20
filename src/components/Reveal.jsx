import { motion } from 'framer-motion'

/**
 * Scroll-triggered reveal. Wrap any block to fade + rise it
 * into view once. `delay` staggers siblings.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 36,
  as = 'div',
  className = '',
  amount = 0.2,
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
