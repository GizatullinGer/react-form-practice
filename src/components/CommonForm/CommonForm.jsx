import React from 'react'

import { CustomSelect } from '../CustomSelect/CustomSelect'

import styles from './CommonFormStyle.module.css'
import { CheckBox } from '../CheckBox/CheckBox'
import { RadioButton } from '../RadioButton/RadioButton'
import { FileUpload } from '../FileUpload/FileUpload'
import { PhoneInput } from '../PhoneInput/PhoneInput'

export const CommonForm = () => {
	const options = ['Опция 1', 'Опция 2', 'Опция 3', 'Опция 4']

	// Стейты полей
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [phone, setPhone] = React.useState('')
	const [message, setMessage] = React.useState('')
	const [menuOption, setMenuOption] = React.useState(options[0])
	const [isChecked, setIsChecked] = React.useState(false)
	const [selectedOption, setSelectedOption] = React.useState('Текст 1')
	const [fileList, setFileList] = React.useState(null)

	const responseBody = {
		name: '',
		email: '',
		phone: '',
		message: '',
		menu: '',
		isChecked: false,
		selectedOption: '',
		files: '',
	}

	const inputChangeHandler = (setFunction, event) => {
		setFunction(event.target.value)
	}

	const isValidEmail = email => {
		// Простейшая проверка формата email с помощью регулярного выражения
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
		return emailRegex.test(email)
	}

	const handleSubmit = event => {
		event.preventDefault()

		const allFiles = []
		responseBody.name = name
		responseBody.email = email
		responseBody.phone = phone
		responseBody.message = message
		responseBody.menu = menuOption
		responseBody.isChecked = isChecked
		responseBody.selectedOption = selectedOption

		if (fileList) {
			if (fileList.length === 0) {
				responseBody.files = ''
			} else {
				for (let i = 0; i < fileList.length; i++) {
					allFiles.push(fileList[i].name)
				}
				responseBody.files = allFiles
			}
		}

		console.log(JSON.stringify(responseBody), 'Данные, которая отправит форма')

		fetch('http://localhost:8000/api/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(responseBody),
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
			<div className='inner'>
				<form className='form' onSubmit={handleSubmit}>
					<div className='form__container'>
						<input
							type='text'
							name='name'
							value={name}
							onChange={e => inputChangeHandler(setName, e)}
							placeholder='Имя'
							required
						/>
						<input
							type='email'
							name='email'
							value={email}
							onChange={e => inputChangeHandler(setEmail, e)}
							placeholder='Email'
							style={{
								borderColor: isValidEmail(email) ? 'green' : 'red',
							}}
						/>
						{isValidEmail(email) ? (
							<p>Формат email верный</p>
						) : (
							<p style={{ color: 'red' }}>Некорректный формат email</p>
						)}
						<PhoneInput value={phone} onChange={setPhone} />
						<textarea
							name='message'
							value={message}
							onChange={e => inputChangeHandler(setMessage, e)}
							placeholder='Сообщение'
							rows={10}
						/>
						<div className='select__section'>
							<CustomSelect
								options={options}
								menuOption={menuOption}
								setMenuOption={setMenuOption}
							/>
						</div>
						<div>
							<CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
						</div>
						<div className='radiobtns'>
							<div className='radiobutton-div'>
								<RadioButton
									label='Текст 1'
									value='Текст 1'
									checked={selectedOption === 'Текст 1'}
									onChange={e => inputChangeHandler(setSelectedOption, e)}
								/>
								<RadioButton
									label='Текст 2'
									value='Текст 2'
									checked={selectedOption === 'Текст 2'}
									onChange={e => inputChangeHandler(setSelectedOption, e)}
								/>
							</div>
						</div>
						<FileUpload fileList={fileList} setFileList={setFileList} />
						<div className='submit__btn'>
							<button type='submit'>Отправить</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
