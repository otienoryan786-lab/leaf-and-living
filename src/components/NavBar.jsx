 import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-leaf" aria-hidden="true">🌿</span>
          <span>Leaf &amp; Living</span>
        </NavLink>

        <nav aria-label="Primary navigation" className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Shop
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}