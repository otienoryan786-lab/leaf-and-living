import { Link } from 'react-router-dom'

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
          src="/images/hero-plants.jpg"
          alt="Snake plant, aloe vera and fiddle leaf fig in terracotta pots"
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