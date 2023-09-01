import React from 'react'
import IMask from 'imask'

const mask = '+{7}(000)000-00-00'

export const PhoneInput = ({ value, onChange }) => {
	const inputRef = React.useRef(null)

	React.useEffect(() => {
		const phoneMask = IMask(inputRef.current, {
			mask,
		})

		phoneMask.on('accept', () => {
			onChange(phoneMask.value)
		})

		return () => {
			phoneMask.destroy()
		}
	}, [onChange])

	return (
		<input
			ref={inputRef}
			type='tel'
			name='phone'
			value={value}
			onChange={e => onChange(e.target.value)}
			placeholder='+7(___)___-__-__'
			autoComplete='off'
		/>
	)
}

export const PhoneInputRHK = ({ field }) => {
	const inputRef = React.useRef(null)

	React.useEffect(() => {
		const phoneMask = IMask(inputRef.current, {
			mask,
		})

		phoneMask.on('accept', () => {
			field.onChange(phoneMask.value)
		})

		return () => {
			phoneMask.destroy()
		}
	}, [field])

	return (
		<input
			ref={inputRef}
			type='tel'
			placeholder='+7(___)___-__-__'
			autoComplete='off'
			aria-invalid={!!field.error}
		/>
	)
}
