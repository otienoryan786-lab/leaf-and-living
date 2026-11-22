export const CATEGORIES = ['Indoor', 'Succulents', 'Outdoor']
export const CARE_LEVELS = ['Easy', 'Moderate', 'Experienced']

// Returns an object of error messages keyed by field. An empty object means valid.
export function validateProduct(values) {
  const errors = {}
  const price = Number(values.price)

  if (!values.name.trim()) errors.name = 'Enter a plant name.'
  if (!CATEGORIES.includes(values.category)) errors.category = 'Choose a category.'
  if (!CARE_LEVELS.includes(values.careLevel)) errors.careLevel = 'Choose a care level.'
  if (!values.description.trim()) errors.description = 'Enter a description.'
  if (String(values.price).trim() === '' || !Number.isFinite(price) || price <= 0) {
    errors.price = 'Price must be a number greater than zero.'
  }
  if (!values.image) errors.image = 'Choose an image.'

  return errors
}