import React from 'react'
import { Controller, useForm } from 'react-hook-form'

import { PhoneInputRHK } from '../PhoneInput/PhoneInput'
import { CustomSelectRHK } from '../CustomSelect/CustomSelect'
import { CheckBoxRHK } from '../CheckBox/CheckBox'
import { RadioButtonRHK } from '../RadioButton/RadioButton'
import { FileUploadRHK } from '../FileUpload/FileUpload'

const options = ['Опция 1', 'Опция 2', 'Опция 3', 'Опция 4']

export const RHForm = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			textarea: '',
			phone: null,
			select: null,
			check: false,
			radiobtn: '',
			file: null,
		},
	})

	const isName = data => {
		console.log('Вызвана')
		return true
	}

	const onSubmit = data => {
		console.log(data)
		// reset()
	}

	const onError = data => {
		console.log(data)
	}

	return (
		<div className='rhk'>
			<div className='inner'>
				<form className='form' onSubmit={handleSubmit(onSubmit, onError)}>
					<div className='form__container rhkstyles'>
						<div className='input__container rhkstyles'>
							<input
								{...register('name', { required: 'Введите имя!' })}
								placeholder='Имя'
							/>
							{errors.name && (
								<div style={{ color: 'red' }}>{errors.name.message}</div>
							)}
						</div>
						{/* render -> fieldState -> error - аналог примера выше, но оно в своем поле видимости */}
						<Controller
							control={control}
							name='email'
							rules={{
								required: 'Введите почту!',
								pattern: {
									value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
									message: 'Некорректный адрес электронной почты',
								},
							}}
							render={({ field, fieldState: { error } }) => (
								<div className='input__container rhkstyles'>
									<input type='text' {...field} placeholder='Email' />
									{error && <div style={{ color: 'red' }}>{error.message}</div>}
								</div>
							)}
						/>
						<Controller
							control={control}
							name='phone'
							rules={{
								required: 'Введите номер телефона!',
								validate: value => {
									if (value && value.replace(/\D/g, '').length < 11) {
										return 'Введите полный номер телефона!'
									}
									return true
								},
							}}
							render={({ field, fieldState: { error } }) => (
								<div className='input__container rhkstyles'>
									<PhoneInputRHK field={field} />
									{error && <div style={{ color: 'red' }}>{error.message}</div>}
								</div>
							)}
						/>
						<Controller
							control={control}
							name='textarea'
							render={({ field }) => (
								<>
									<textarea {...field} placeholder='Сообщение' rows={10} />
								</>
							)}
						/>
						{/* Селект */}
						<Controller
							control={control}
							name='select'
							rules={{
								required: 'Выберите пункт!',
							}}
							render={({ field, fieldState: { error } }) => (
								<div className='select__section'>
									<CustomSelectRHK field={field} options={options} />
									{error && <div style={{ color: 'red' }}>{error.message}</div>}
								</div>
							)}
						/>
						{/* чекбокс */}
						<Controller
							control={control}
							name='check'
							rules={{
								required: 'Поставте отметку!',
							}}
							render={({ field, fieldState: { error } }) => (
								<>
									<CheckBoxRHK field={field} />
									{error && <div style={{ color: 'red' }}>{error.message}</div>}
								</>
							)}
						/>
						{/* радиокнопка */}
						<div className='radiobtns'>
							<div className='radiobutton-div'>
								<Controller
									control={control}
									name='radiobtn'
									rules={{
										required: 'Поставте отметку!',
									}}
									render={({ field, fieldState: { error } }) => (
										<>
											<RadioButtonRHK
												field={field}
												value='option1'
												text='Текст 1'
											/>
											<RadioButtonRHK
												field={field}
												value='option2'
												text='Текст 2'
											/>
											{error && (
												<div style={{ color: 'red' }}>{error.message}</div>
											)}
										</>
									)}
								/>
							</div>
						</div>
						{/* Файл */}
						<Controller
							name='file'
							control={control}
							render={({ field }) => (
								<FileUploadRHK field={field} setValue={setValue} />
							)}
						/>
						<div className='submit__btn btn-rhk'>
							<button>Отправить</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
