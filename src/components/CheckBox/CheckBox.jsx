import React from 'react'

import styles from './Checkbox.module.css'

export const CheckBox = ({ isChecked, setIsChecked }) => {
	return (
		<label className={styles.checkbox}>
			{/* Обычный чекбокс с типом checkbox */}
			<input
				type='checkbox'
				checked={isChecked}
				onChange={() => setIsChecked(!isChecked)}
			/>
			{/* Элемент для стилизации кастомного чекбокса */}
			<span className={styles.checkmark}></span>
			Текст для кастомного чекбокса
		</label>
	)
}

export const CheckBoxRHK = ({ field }) => {
	return (
		<label className={styles.checkbox}>
			{/* Обычный чекбокс с типом checkbox */}
			<input
				type='checkbox'
				checked={field.value}
				onChange={() => field.onChange(!field.value)}
				aria-label='Текст для кастомного чекбокса'
			/>
			{/* Элемент для стилизации кастомного чекбокса */}
			<span className={styles.checkmark + ' ' + styles.rhkstyle}></span>
			Текст для кастомного чекбокса
		</label>
	)
}
