import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <div className="page-shell">
      <NavBar />

      <main className="container main-content">
        <section className="hero-section">
          <div className="hero-content">
            <span className="eyebrow">Indoor Plants &amp; Botanical Care</span>
            <h1>Home</h1>
            <p className="hero-subtitle">
              Welcome to <strong>Leaf &amp; Living</strong>. Discover thriving indoor plants
              curated for every light level, lifestyle, and experience—from effortless
              succulents to statement tropicals.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">
                Browse the Shop
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1463320726281-696a485708c8?auto=format&fit=crop&w=900&q=80"
              alt="Lush green houseplants arranged in ceramic pots"
              className="hero-image"
            />
          </div>
        </section>

        <section className="care-guide-section" aria-labelledby="care-guide-heading">
          <h2 id="care-guide-heading" className="section-title">
            Find Plants That Match Your Routine
          </h2>
          <div className="care-grid">
            <div className="care-card">
              <h3>Easy Care</h3>
              <p>
                Forgiving, low-maintenance plants ideal for beginners and busy schedules.
              </p>
            </div>
            <div className="care-card">
              <h3>Moderate Care</h3>
              <p>
                Balanced watering and bright indirect light for steady, rewarding growth.
              </p>
            </div>
            <div className="care-card">
              <h3>Expert Care</h3>
              <p>
                Rare and humidity-loving specimens for dedicated plant enthusiasts.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
