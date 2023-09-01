import React, { useState } from 'react'

import styles from './FileUploadStyle.module.css'

export const FileUpload = ({ fileList, setFileList }) => {
	const handleFileChange = e => {
		if (e.target.files) {
			for (let i = 0; i < e.target.files.length; i++) {
				if (e.target.files[i].size < 10485760) {
					// @ts-ignore - проверка ниже
					let limitTypes = e.target.files[0].name.match(/\.([^\.]+)$/)[0]
					switch (limitTypes) {
						case '.jpg':
						case '.jpeg':
						case '.pdf':
						case '.doc':
						case '.docx':
							setFileList(e.target.files)
							break
						default:
							alert('Неподдерживается формат')
							e.target.value = ''
							setFileList(null)
					}
				} else {
					alert('Файл слишком большой!')
					e.target.value = ''
					setFileList(null)
				}
			}
		}
	}

	const files = fileList ? [...fileList] : []

	const hasFiles = files.some(file => !file.type.includes('image/'))
	const hasImages = files.some(file => file.type.includes('image/'))

	return (
		<div className={styles.custom__file__upload}>
			<div className={`${styles.form__file}`}>
				<h3>Добавить файлы</h3>
				<label htmlFor='field__file' className={`${styles.field__fileWrapper}`}>
					<input
						type='file'
						id='field__file'
						onChange={handleFileChange}
						multiple
						accept='.jpg, .jpeg, .pdf, .doc, .docx'
					/>

					{files.length === 0 ? (
						<span className={`${styles.form__fileField}`}>
							Можно загрузить файлы форматов pdf, doc\docx, jpg\jpeg - размером
							не более 10мб
						</span>
					) : (
						<div className={`${styles.form__fileList}`}>
							{hasFiles && (
								<React.Fragment>
									<h3>Файлы</h3>
									<ul>
										{files.map(
											(file, i) =>
												!file.type.includes('image/') && (
													<React.Fragment key={i}>
														{i === 0 && <h3>Файлы</h3>}
														<li>
															{file.name} - {file.type}
														</li>
													</React.Fragment>
												)
										)}
									</ul>
								</React.Fragment>
							)}
							{hasImages && (
								<React.Fragment>
									<h3>Картинки</h3>
									<div className={`${styles.form__fileImages}`}>
										{files.map(
											(file, i) =>
												file.type.includes('image/') && (
													<React.Fragment key={i}>
														<div className={`${styles.form__fileImage}`}>
															<img
																src={URL.createObjectURL(file)}
																alt={`Preview ${file.name}`}
															/>
														</div>
													</React.Fragment>
												)
										)}
									</div>
								</React.Fragment>
							)}
							<span>Выбрать другие файлы</span>
						</div>
					)}
				</label>

				{files.length !== 0 && (
					<p
						className={`${styles.form__fileDel}`}
						onClick={() => setFileList(null)}
					>
						Убрать файлы
					</p>
				)}
			</div>
		</div>
	)
}

export const FileUploadRHK = ({ field, setValue }) => {
	const [fileList, setFileList] = useState([])
	const filesToUpload = []

	const handleFileChange = e => {
		if (e.target.files) {
			for (let i = 0; i < e.target.files.length; i++) {
				if (e.target.files[i].size < 10485760) {
					// @ts-ignore - проверка ниже
					let limitTypes = e.target.files[0].name.match(/\.([^\.]+)$/)[0]
					switch (limitTypes) {
						case '.jpg':
						case '.jpeg':
						case '.png':
						case '.pdf':
						case '.doc':
						case '.docx':
							filesToUpload.push(e.target.files[i])
							break
						default:
							alert('Неподдерживается формат')
							e.target.value = ''
							return
					}
				} else {
					alert('Файл слишком большой!')
					e.target.value = ''
					return
				}
			}
		}
		setFileList(filesToUpload)
		field.onChange(filesToUpload)
	}

	const delFiles = () => {
		setFileList([])
		setValue('file', [])
	}
	console.log(field.value, 'files')

	const files = fileList ? [...fileList] : []

	console.log(files, 'files')

	const hasFiles = files.some(file => !file.type.includes('image/'))
	const hasImages = files.some(file => file.type.includes('image/'))

	return (
		<div className={styles.custom__file__upload}>
			<div className={`${styles.form__file}`}>
				<h3>Добавить файлы</h3>
				<label
					htmlFor='field__filerhk'
					className={`${styles.field__fileWrapper}`}
				>
					<input
						type='file'
						id='field__filerhk'
						onChange={e => handleFileChange(e, field)}
						multiple
						accept='.jpg, .jpeg, .png, .pdf, .doc, .docx'
					/>

					{files.length === 0 ? (
						<span className={`${styles.form__fileField}`}>
							Можно загрузить файлы форматов pdf, doc\docx, jpg\jpeg - размером
							не более 10мб
						</span>
					) : (
						<div className={`${styles.form__fileList}`}>
							{hasFiles && (
								<React.Fragment>
									<h3>Файлы</h3>
									<ul>
										{files.map(
											(file, i) =>
												!file.type.includes('image/') && (
													<React.Fragment key={i}>
														<li>
															{file.name} - {file.type}
														</li>
													</React.Fragment>
												)
										)}
									</ul>
								</React.Fragment>
							)}
							{hasImages && (
								<React.Fragment>
									<h3>Картинки</h3>
									<div
										className={`${styles.form__fileImages} ${styles.rhkstyle}`}
									>
										{files.map(
											(file, i) =>
												file.type.includes('image/') && (
													<React.Fragment key={i}>
														<div className={`${styles.form__fileImage}`}>
															<img
																src={URL.createObjectURL(file)}
																alt={`Preview ${file.name}`}
															/>
														</div>
													</React.Fragment>
												)
										)}
									</div>
								</React.Fragment>
							)}
							<span>Выбрать другие файлы</span>
						</div>
					)}
				</label>

				{files.length !== 0 && (
					<p className={`${styles.form__fileDel}`} onClick={delFiles}>
						Убрать файлы
					</p>
				)}
			</div>
		</div>
	)
}
