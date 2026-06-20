import { useState, useRef, useEffect } from 'react'

function PlaceholderSVG({ type = 'product' }) {
  return (
    <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="smart-image__placeholder-svg"
    >
      <rect width="400" height="500" fill="#e8e1d6" />
      {/* Hanger / clothing silhouette */}
      <g transform="translate(120, 100)" opacity="0.25">
        {/* Hanger hook */}
        <path d="M80 0 C80 0, 80 15, 80 25" stroke="#8a7e6b" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M40 40 L120 40" stroke="#8a7e6b" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 40 C30 80, 20 120, 10 160" stroke="#8a7e6b" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M120 40 C130 80, 140 120, 150 160" stroke="#8a7e6b" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Body shape */}
        <path d="M10 160 C10 160, 0 200, 5 250 L155 250 C160 200, 150 160, 150 160"
          stroke="#8a7e6b" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Bottom */}
        <path d="M5 250 L10 300" stroke="#8a7e6b" strokeWidth="3" strokeLinecap="round" />
        <path d="M155 250 L150 300" stroke="#8a7e6b" strokeWidth="3" strokeLinecap="round" />
      </g>
      <text x="200" y="420" textAnchor="middle"
        fill="#8a7e6b" fontSize="18" fontFamily="Jost, sans-serif" fontWeight="300" letterSpacing="2">
        Lumière
      </text>
    </svg>
  )
}

export default function SmartImage({
  src,
  alt = '',
  ratio = '4 / 5',
  className = '',
  sizes,
  eager = false,
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [slow, setSlow] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!loaded && !failed) {
      timerRef.current = setTimeout(() => setSlow(true), 4000)
    }
    return () => clearTimeout(timerRef.current)
  }, [loaded, failed])

  const handleLoad = () => {
    clearTimeout(timerRef.current)
    setLoaded(true)
  }

  const handleError = () => {
    clearTimeout(timerRef.current)
    setFailed(true)
  }

  return (
    <div
      className={`smart-image ${className}`}
      style={{ aspectRatio: ratio }}
      data-loaded={loaded}
      data-failed={failed}
    >
      {!loaded && !failed && (
        <span className={`smart-image__skeleton ${slow ? 'smart-image__skeleton--slow' : ''} skeleton`} />
      )}
      {failed ? (
        <span className="smart-image__fallback">
          <PlaceholderSVG />
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  )
}
