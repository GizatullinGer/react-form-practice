import React, { useState } from 'react'

import styles from './CustomSelectStyle.module.css'

export const CustomSelect = ({ options, menuOption, setMenuOption }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const selectOption = option => {
		setMenuOption(option)
		toggleDropdown()
	}

	return (
		<div className={styles.custom__select}>
			<div
				className={`${styles.select__selected} ${isOpen ? styles.open : ''}`}
				onClick={toggleDropdown}
			>
				{menuOption}
			</div>
			<div className={`${styles.select__items} ${isOpen ? styles.open : ''}`}>
				{options &&
					options.map(option => (
						<div
							key={option}
							className={styles.select__option}
							onClick={() => selectOption(option)}
						>
							{option}
						</div>
					))}
			</div>
		</div>
	)
}

export const CustomSelectRHK = ({ field, options }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className={styles.custom__select}>
			<div
				className={`${styles.select__selected} ${isOpen ? styles.open : ''}`}
				onClick={toggleDropdown}
			>
				{field.value || 'Выбрать пункт'}
			</div>
			<div className={`${styles.select__items} ${isOpen ? styles.open : ''}`}>
				{options &&
					options.map(option => (
						<div
							key={option}
							className={styles.select__option + ' ' + styles.rhkstyles}
							onClick={() => {
								field.onChange(option)
								toggleDropdown()
							}}
						>
							{option}
						</div>
					))}
			</div>
		</div>
	)
}
