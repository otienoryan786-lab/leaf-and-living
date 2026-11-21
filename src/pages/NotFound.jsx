import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-container empty-state not-found-page">
      <p className="eyebrow">A little off the path</p>
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find that page.</p>
      <Link className="button button-primary" to="/">Back to Home</Link>
    </section>
  )
}