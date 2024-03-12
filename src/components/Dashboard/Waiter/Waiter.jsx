'use client'

import React, { useState } from 'react'

import './Waiter.css'
import WaiterTables from './WaiterComponents/WaiterTables'
import WaiterDash from './WaiterComponents/WaiterDash'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import { requestPermission } from '@/app/js/notification'

// Material Icons
import TableBarIcon from '@mui/icons-material/TableBar';
import WaiterNavBar from '@/components/NavBar/WaiterNavBar'

export default function Waiter() {

	const [component, setComponent] = useState('tables');

	const mostrarComponente = (componente) => {
		setComponent(componente);
	};

	const handleSaveAndProceed = () => {
		mostrarComponente('orders');
	};

	requestPermission();

	return (
		<>
			<WaiterNavBar />
			<div className='waiter__container'>
				<div className='waiter__nav'>
					<div className={`waiter__navIcon ${component === 'tables' ? 'waiter__navIconActive' : ''}`} onClick={() => mostrarComponente('tables')}><FormatListNumberedIcon /></div>
					<div className={`waiter__navIcon ${component === 'orders' ? 'waiter__navIconActive' : ''}`} onClick={() => mostrarComponente('orders')}><TableBarIcon /></div>
				</div>
				<div className='waiter__body'>
					{component === 'tables' && <WaiterTables onSaveAndProceed={handleSaveAndProceed} />}
					{component === 'orders' && <WaiterDash />}
				</div>
			</div>
		</>
	)
}
