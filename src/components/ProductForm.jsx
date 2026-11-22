import { useState } from 'react'

const emptyProduct = {
	name: '',
	category: 'Indoor',
	careLevel: 'Easy',
	description: '',
	price: '',
	image: '',
}

export default function ProductForm({
	initialValues = emptyProduct,
	onSubmit,
	submitLabel = 'Save product',
}) {
	const [values, setValues] = useState({ ...emptyProduct, ...initialValues })
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState('')

	const updateField = (event) => {
		const { name, value } = event.target
		setValues((current) => ({ ...current, [name]: value }))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setSaving(true)
		setError('')

		try {
			await onSubmit({ ...values, price: Number(values.price) })
		} catch (submitError) {
			setError(submitError.message || 'Could not save this product. Please try again.')
		} finally {
			setSaving(false)
		}
	}

	return (
		<form className="product-form" onSubmit={handleSubmit}>
			<label>
				Name
				<input name="name" value={values.name} onChange={updateField} required maxLength={80} />
			</label>
			<label>
				Category
				<select name="category" value={values.category} onChange={updateField}>
					<option>Indoor</option>
					<option>Succulents</option>
					<option>Outdoor</option>
				</select>
			</label>
			<label>
				Care level
				<select name="careLevel" value={values.careLevel} onChange={updateField}>
					<option>Easy</option>
					<option>Moderate</option>
					<option>Experienced</option>
				</select>
			</label>
			<label>
				Description
				<textarea name="description" value={values.description} onChange={updateField} required rows="4" maxLength={500} />
			</label>
			<label>
				Price (KES)
				<input
					name="price"
					type="number"
					min="1"
					step="1"
					value={values.price}
					onChange={updateField}
					required
					aria-describedby="price-help"
				/>
			</label>
			<p className="field-help" id="price-help">Enter an amount greater than zero.</p>
			<label>
				Image URL or filename
				<input name="image" value={values.image} onChange={updateField} placeholder="snake-plant.jpg" required />
			</label>
			{error && <p className="form-error" role="alert">{error}</p>}
			<div className="form-actions">
				<button className="button button-primary" type="submit" disabled={saving}>
					{saving ? 'Saving…' : submitLabel}
				</button>
				<button className="button button-secondary" type="button" onClick={() => window.history.back()}>
					Cancel
				</button>
			</div>
		</form>
	)
}
