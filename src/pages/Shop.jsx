 import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

const CARE_LEVELS = ['All', 'Easy', 'Moderate', 'Experienced']

export default function Shop({ products = [], loading = false, loadError = null, onRetry }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCare, setSelectedCare] = useState('All')

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return products.filter((p) => {
      const matchesSearch = !q || (p.name || '').toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
      const care = (p.careLevel || p.care_level || '').toLowerCase()
      return matchesSearch && (selectedCare === 'All' || care === selectedCare.toLowerCase())
    })
  }, [products, searchQuery, selectedCare])

  const handleResetFilters = () => { setSearchQuery(''); setSelectedCare('All') }

  return (
    <div className="shop-layout">
      <aside className="shop-sidebar" aria-label="Search and filter plants">
        <div className="form-field">
          <label htmlFor="plant-search">Search</label>
          <input id="plant-search" type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Name or category" />
        </div>
        <div className="form-field">
          <label htmlFor="care-level-select">Care level</label>
          <select id="care-level-select" value={selectedCare} onChange={(e) => setSelectedCare(e.target.value)}>
            {CARE_LEVELS.map((l) => <option key={l} value={l}>{l === 'All' ? 'All levels' : l}</option>)}
          </select>
        </div>
        <button type="button" onClick={handleResetFilters} className="btn btn--secondary shop-sidebar__reset">Reset filters</button>
      </aside>
      <section className="shop-results" aria-label="Plant catalogue">
        {!loading && !loadError && products.length > 0 && (
          <p className="shop-results__count" aria-live="polite">{filteredProducts.length} {filteredProducts.length === 1 ? 'plant' : 'plants'} found</p>
        )}
        {loading ? <div className="status" role="status"><p>Loading plants...</p></div>
        : loadError ? (
          <div className="status status--error" role="alert">
            <h2>Unable to load plants</h2>
            <p>{typeof loadError === 'string' ? loadError : 'Something went wrong while fetching products.'}</p>
            {onRetry && <button type="button" onClick={onRetry} className="btn">Try Again</button>}
          </div>
        ) : products.length === 0 ? (
          <div className="card status--empty"><h2>No plants available yet</h2><p>Our plant catalog is currently empty. Check back soon!</p></div>
        ) : filteredProducts.length === 0 ? (
          <div className="card status--empty">
            <h2>No matching plants found</h2>
            <p>Try adjusting your search term or resetting your care-level filter.</p>
            <button type="button" onClick={handleResetFilters} className="btn">Reset filters</button>
          </div>
        ) : (
          <div className="product-grid shop-grid">{filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </section>
    </div>
  )
}