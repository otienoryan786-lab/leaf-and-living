// Bundled plant images live in public/images. Admins pick from this list (no uploads).
export const IMAGE_OPTIONS = [
  'snake-plant.svg',
  'aloe-vera.svg',
  'peace-lily.svg',
  'fiddle-leaf-fig.svg',
  'jade-plant.svg',
  'lavender.svg',
]

export const FALLBACK_IMAGE = '/images/placeholder.svg'

// Accepts a filename ("snake-plant.svg"), a path ("/images/x.svg") or a full URL.
export function resolveImage(image) {
  if (!image) return FALLBACK_IMAGE
  if (image.startsWith('http') || image.startsWith('/')) return image
  return `/images/${image}`
}