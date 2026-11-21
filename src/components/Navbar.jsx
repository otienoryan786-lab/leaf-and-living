import { NavLink } from 'react-router-dom'

const navigation = [
	{ to: '/', label: 'Home', end: true },
	{ to: '/shop', label: 'Shop' },
	{ to: '/admin', label: 'Admin Portal' },
]

export default function Navbar() {
	return (
		<header className="site-header">
			<NavLink className="wordmark" to="/" aria-label="Leaf & Living home">
				Leaf &amp; Living
			</NavLink>
			<nav className="primary-nav" aria-label="Main navigation">
				{navigation.map(({ to, label, end }) => (
					<NavLink
						key={to}
						to={to}
						end={end}
						className={({ isActive }) => isActive ? 'nav-link is-active' : 'nav-link'}
					>
						{label}
					</NavLink>
				))}
			</nav>
		</header>
	)
}
