import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container section text-center notfound">
      <p className="display notfound__code">404</p>
      <h1 className="section-title">This page took the day off</h1>
      <p className="lead muted" style={{ maxWidth: 440, margin: '0 auto 2rem' }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/" className="btn btn--lg">Back to home</Link>
    </div>
  )
}
