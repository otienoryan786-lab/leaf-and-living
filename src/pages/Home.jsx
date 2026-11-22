 import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Thoughtful plants for everyday spaces</p>
          <h1>A little green.<br />A better space.</h1>
          <p className="hero-description">
            Calm, easy-care plants for homes, balconies and desks, chosen by people who love them.
          </p>
          <Link className="button button-primary" to="/shop">Shop plants <span aria-hidden="true">&rarr;</span></Link>
        </div>
        <img
          className="home-hero-image"
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=90"
          alt="Sunlit green houseplants arranged in a bright home"
        />
      </section>
      <section className="about-section">
        <div>
          <p className="eyebrow">Rooted in good living</p>
          <h2>About Leaf &amp; Living</h2>
        </div>
        <p>
          A small plant boutique with an organised catalogue. Browse by care level, find what suits your space, and see prices in KES.
        </p>
      </section>
    </>
  )
}