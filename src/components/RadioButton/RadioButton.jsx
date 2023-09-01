import React from 'react'

import styles from './RadioButtonStyle.module.css'

// className={styles.custom__radio}
// className={styles.radio}

export const RadioButton = ({ label, value, checked, onChange }) => {
	return (
		<label className={styles.custom__radio}>
			<input type='radio' value={value} checked={checked} onChange={onChange} />
			<span className={styles.radio}></span>
			{label}
		</label>
	)
}

export const RadioButtonRHK = ({ field, value, text }) => {
	console.log(field.value, '123')
	return (
		<label className={styles.custom__radio}>
			<input
				type='radio'
				value={value}
				checked={field.value === value}
				onChange={() => field.onChange(value)}
			/>
			<span className={styles.radio + ' ' + styles.rhkstyle}></span>
			{text}
		</label>
	)
}
