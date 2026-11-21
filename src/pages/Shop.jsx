import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function Shop({ products = [], loading, loadError, onRetry }) {
  const [query, setQuery] = useState('')
  const [careLevel, setCareLevel] = useState('all')

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesQuery = !normalizedQuery ||
        `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery)
      const matchesCare = careLevel === 'all' || product.careLevel === careLevel
      return matchesQuery && matchesCare
    })
  }, [products, query, careLevel])

  const resetFilters = () => {
    setQuery('')
    setCareLevel('all')
  }

  return (
    <section className="shop-layout page-container">
      <aside className="shop-filters" aria-label="Product filters">
        <label htmlFor="product-search">Search</label>
        <input
          id="product-search"
          type="search"
          placeholder="Name or category"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <label htmlFor="care-filter">Care level</label>
        <select id="care-filter" value={careLevel} onChange={(event) => setCareLevel(event.target.value)}>
          <option value="all">All levels</option>
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Experienced">Experienced</option>
        </select>
        <button className="button button-outline filter-reset" type="button" onClick={resetFilters}>
          Reset filters
        </button>
      </aside>

      <div className="shop-results">
        <div className="section-heading shop-heading">
          <div>
            <p className="eyebrow">Find your next favourite</p>
            <h1>Shop plants</h1>
          </div>
          <p className="result-count" aria-live="polite">
            {loading ? 'Loading plants…' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'plant' : 'plants'} found`}
          </p>
        </div>
        {loadError && (
          <div className="notice notice-error" role="alert">
            <span>{loadError}</span>
            <button className="button button-secondary" onClick={onRetry}>Try again</button>
          </div>
        )}
        {loading ? (
          <p className="empty-state">Loading the plant collection…</p>
        ) : loadError && products.length === 0 ? (
          <div className="empty-state">
            <h2>Unable to load plants</h2>
            <p>{loadError}</p>
          </div>
        ) : filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No plants match those filters</h2>
            <p>Try another search or reset your filters.</p>
            <button className="button button-secondary" type="button" onClick={resetFilters}>Reset filters</button>
          </div>
        )}
      </div>
    </section>
  )
}
