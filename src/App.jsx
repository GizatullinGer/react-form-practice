import React from 'react'

import { CommonForm } from './components/CommonForm/CommonForm'

import './App.css'
import { TestForm } from './components/TestForm/TestForm'
import { RHForm } from './components/RHForm/RHForm'

function App() {
	return (
		<div className='App'>
			<main>
				<div className='commonForm'>
					<CommonForm />
				</div>
				<div className='rhkform'>
					<RHForm />
				</div>
				<div className='testForm'>
					<TestForm />
				</div>
			</main>
		</div>
	)
}

export default App
