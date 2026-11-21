 import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

const CARE_LEVELS = ['All', 'Easy', 'Moderate', 'Experienced']

export default function Shop({
  products = [],
  loading = false,
  loadError = null,
  onRetry,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCare, setSelectedCare] = useState('All')

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCare !== 'All'

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return products.filter((product) => {
      const name = (product.name || '').toLowerCase()
      const description = (product.description || '').toLowerCase()
      const care = (product.careLevel || product.care_level || '').toLowerCase()
      const category = (product.category || '').toLowerCase()

      const matchesSearch =
        normalizedQuery === '' ||
        name.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        category.includes(normalizedQuery)

      const matchesCare =
        selectedCare === 'All' || care === selectedCare.toLowerCase()

      return matchesSearch && matchesCare
    })
  }, [products, searchQuery, selectedCare])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCare('All')
  }

  return (
    <div className="page-shell">

      <main className="container main-content">
        <header className="shop-header">
          <div>
            <h1>Shop</h1>
            <p className="shop-subtitle">
              Explore our collection and filter by plant care level.
            </p>
          </div>
        </header>

        <section className="filter-bar" aria-label="Search and filter plants">
          <div className="search-box">
            <label htmlFor="plant-search" className="sr-only">
              Search plants
            </label>
            <input
              id="plant-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plants by name..."
              className="search-input"
            />
          </div>

          <div className="care-filters" role="group" aria-label="Filter by care level">
            {CARE_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedCare(level)}
                aria-pressed={selectedCare === level}
                className={
                  selectedCare === level ? 'filter-pill active' : 'filter-pill'
                }
              >
                {level}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-ghost btn-sm"
            >
              Reset
            </button>
          )}
        </section>

        {!loading && !loadError && products.length > 0 && (
          <p className="results-count" aria-live="polite">
            Showing <strong>{filteredProducts.length}</strong> of{' '}
            <strong>{products.length}</strong>{' '}
            {products.length === 1 ? 'plant' : 'plants'}
          </p>
        )}

        {loading ? (
          <div className="state-box" role="status">
            <p>Loading plants...</p>
          </div>
        ) : loadError ? (
          <div className="state-box state-error" role="alert">
            <h2>Unable to load plants</h2>
            <p>{typeof loadError === 'string' ? loadError : 'Something went wrong while fetching products.'}</p>
            {onRetry && (
              <button type="button" onClick={onRetry} className="btn btn-primary">
                Try Again
              </button>
            )}
          </div>
        ) : products.length === 0 ? (
          <div className="state-box">
            <h2>No plants available yet</h2>
            <p>Our plant catalog is currently empty. Check back soon!</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="state-box">
            <h2>No matching plants found</h2>
            <p>
              Try adjusting your search term or resetting your care-level filter.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <section className="product-grid" aria-label="Plant catalog">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
