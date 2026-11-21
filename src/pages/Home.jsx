 import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <h1>A little green. A better space.</h1>
        <p className="home-hero__subtitle">
          Calm, easy-care plants for homes, balconies and desks, chosen by people who love them.
        </p>
        <div className="home-hero__actions">
          <Link to="/shop" className="btn">Shop plants</Link>
        </div>
        <div className="home-hero__media">
          <img
            src={heroImage}
            alt="Sunlit indoor plants in ceramic pots"
            className="home-hero__image"
          />
        </div>
      </section>

      <section className="home-about card" aria-labelledby="about-heading">
        <h2 id="about-heading">About Leaf &amp; Living</h2>
        <p>
          A small plant boutique with an organised catalogue. Browse by care level, find what suits
          your space, and view prices in KES.
        </p>
      </section>
    </div>
  )
}