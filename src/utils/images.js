// Bundled plant images live in public/images. Admins pick from this list (no uploads).
export const IMAGE_OPTIONS = [
  'snake-plant.jpg',
  'aloe-vera.jpg',
  'peace-lily.jpg',
  'fiddle-leaf-fig.jpg',
  'jade-plant.jpg',
  'lavender.jpg',
]

export const FALLBACK_IMAGE = '/images/placeholder.jpg'

// Accepts a filename ("snake-plant.jpg"), a path ("/images/x.jpg") or a full URL.
export function resolveImage(image) {
  if (!image) return FALLBACK_IMAGE
  if (image.startsWith('http') || image.startsWith('/')) return image
  return `/images/${image}`
}