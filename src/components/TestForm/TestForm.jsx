import React from 'react'

import { CustomSelect } from '../../components/CustomSelect/CustomSelect'

import styles from './TestFormStyle.module.css'

export const TestForm = () => {
	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
		message: '',
	})

	const [email, setEmail] = React.useState('')
	const [phoneNumber, setPhoneNumber] = React.useState('')
	const inputRef = React.useRef(null)

	// email
	const handleChangeEmail = event => {
		const { value } = event.target
		setEmail(value)
	}

	const isValidEmail = email => {
		// Простейшая проверка формата email с помощью регулярного выражения
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
		return emailRegex.test(email)
	}

	// phone
	const handleChangePhone = event => {
		const { value } = event.target
		// Удаление всех нечисловых символов из введенного номера
		const numericValue = value.replace(/\D/g, '')
		setPhoneNumber(numericValue)
	}

	const formatPhoneNumber = phoneNumber => {
		let firstPart = phoneNumber
		console.log('formatPhoneNumber', phoneNumber)

		// // Для простоты примера, давайте предположим, что телефон имеет формат (XXX) XXX-XXXX
		// const phoneNumberRegex = /(\d{0,3})(\d{0,3})(\d{0,4})/
		// const matches = phoneNumber.match(phoneNumberRegex)
		// if (!matches) return ''

		if (phoneNumber.length === 3) {
			firstPart = `(${phoneNumber})`
		} else if (phoneNumber.length < 3 && phoneNumber.length > 0) {
			firstPart = `(${phoneNumber}`
		}

		// console.log(firstPart, 'делите', phoneNumber)

		// const formattedNumber = `${firstPart.replace(/\s/g, '')}${matches[2]} ${
		// 	matches[3]
		// }`
		// console.log(formattedNumber, 'formattedNumber', matches)
		return firstPart
	}

	const handleKeyDown = event => {
		// Обрабатываем нажатие клавиши Backspace
		if (event.key === 'Backspace') {
			let test = ''
			const { value, selectionStart, selectionEnd } = event.target
			const caretPosition = selectionStart

			console.log(value, 'bs')

			if (value[value.length - 1] === ')') {
				test = value.substring(0, value.length - 1)
				console.log(test, 'test')
				setPhoneNumber(test)
				console.log(value, 'rs')
			}
		}
	}

	const handleChange = event => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = event => {
		event.preventDefault()

		console.log(JSON.stringify(formData), 'Данные, которая отправит форма')
		fetch('http://localhost:8000/api/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				throw new Error('Ошибка при отправке формы')
			})
			.then(data => {
				console.log(data)
				// Дополнительные действия после успешной отправки формы
			})
			.catch(error => {
				console.error(error)
				console.error('Очибка')
				// Дополнительные действия при ошибке отправки формы
			})
	}

	return (
		<div className={styles.common}>
			<div className={styles.inner}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.form__container}>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Имя'
							required
						/>
						<input
							type='text'
							id='emailInput'
							value={email}
							onChange={handleChangeEmail}
							style={{ borderColor: isValidEmail(email) ? 'green' : 'red' }}
						/>
						{isValidEmail(email) ? (
							<p>Формат email верный</p>
						) : (
							<p style={{ color: 'red' }}>Некорректный формат email</p>
						)}
						<input
							type='text'
							id='phoneInput'
							ref={inputRef}
							value={formatPhoneNumber(phoneNumber)}
							onChange={handleChangePhone}
							onKeyDown={handleKeyDown}
						/>
						<textarea
							name='message'
							value={formData.message}
							onChange={handleChange}
							placeholder='Сообщение'
						/>
						<input type='checkbox' />
						<input type='radio' />
						<input type='file' />
						<CustomSelect />
						<button type='submit'>Отправить</button>
					</div>
				</form>
			</div>
		</div>
	)
}
