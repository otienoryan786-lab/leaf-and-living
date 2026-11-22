import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_OPTIONS } from '../utils/images'
import { CATEGORIES, CARE_LEVELS, validateProduct } from '../utils/validateProduct'

const emptyProduct = {
  name: '',
  category: 'Indoor',
  careLevel: 'Easy',
  description: '',
  price: '',
  image: IMAGE_OPTIONS[0],
}

export default function ProductForm({
  initialValues = emptyProduct,
  onSubmit,
  submitLabel = 'Save product',
}) {
  const [values, setValues] = useState({ ...emptyProduct, ...initialValues })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Keep an existing product's current image selectable even if it is not in the list.
  const imageOptions = IMAGE_OPTIONS.includes(values.image) || !values.image
    ? IMAGE_OPTIONS
    : [values.image, ...IMAGE_OPTIONS]

  const updateField = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    const foundErrors = validateProduct(values)
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }

    setSaving(true)
    try {
      await onSubmit({
        ...values,
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
      })
    } catch (error) {
      // Input stays in the form so nothing the admin typed is lost.
      setSubmitError(error.message || 'Could not save this product. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const fieldProps = (name) => ({
    name,
    value: values[name],
    onChange: updateField,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const fieldError = (name) =>
    errors[name] && (
      <span className="form-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    )

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input {...fieldProps('name')} maxLength={80} />
      </label>
      {fieldError('name')}

      <label>
        Category
        <select {...fieldProps('category')}>
          {CATEGORIES.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      {fieldError('category')}

      <label>
        Care level
        <select {...fieldProps('careLevel')}>
          {CARE_LEVELS.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      {fieldError('careLevel')}

      <label>
        Description
        <textarea {...fieldProps('description')} rows="4" maxLength={500} />
      </label>
      {fieldError('description')}

      <label>
        Price (KES)
        <input {...fieldProps('price')} type="number" step="1" />
      </label>
      {fieldError('price') || <p className="field-help">Enter an amount greater than zero.</p>}

      <label>
        Image
        <select {...fieldProps('image')}>
          {imageOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      {fieldError('image')}

      {submitError && <p className="form-error" role="alert">{submitError}</p>}

      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : submitLabel}
        </button>
        <Link className="button button-secondary" to="/admin">Cancel</Link>
      </div>
    </form>
  )
}