'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';

import '../Waiter.css'
import { toasterStyle } from '@/app/css/styles'

// Components
import WaiterCheck from './WaiterCheck'

// Toastify
import toast, { Toaster } from 'react-hot-toast';

export default function WaiterTables({ onSaveAndProceed }) {

	const [data, setData] = useState([])
	const [selectedTables, setSelectedTables] = useState([]);

	const token = typeof localStorage !== 'undefined' ? localStorage.getItem('waiter_token') : null;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/mesas`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setData(res.data.data)
			}
			catch (error) {
				console.error('Error al obtener datos:', error);
			}
		}
		fetchData();
	}, [token])

	const handleTableClick = (tableId) => {
		setSelectedTables(prevSelectedTables => {
		    if (!prevSelectedTables.includes(tableId)) {
			   return [...prevSelectedTables, tableId];
		    }
		    return prevSelectedTables;
		});
	 };

	const saveSelectedTables = async () => {
		try {
			// Aquí realizas la petición al servidor para guardar las mesas seleccionadas
			await axios.post(`${API_BASE_URL}/mozos/asignarMesa`, {
				// Aquí debes enviar los datos en la propiedad "data"
				mesas: selectedTables
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				},
			});
			toast('Mesas guardadas', { icon: '✅', style: toasterStyle });
			onSaveAndProceed();
		} catch (error) {
			console.error('Error al guardar mesas:', error);
		}
	};

	return (
		<>
			<p>Listado de mesas</p>
			<div className='waiter__tables'>
				{data.map((item) => (
					<WaiterCheck 
					item={item} 
					key={item.id} 
					onToggleTable={handleTableClick}
					isSelected={selectedTables.includes(item.id)} />
				))}
			</div>

			<button className='btn btn__pink' onClick={saveSelectedTables}>Guardar</button>
			<Toaster />
		</>
	)
}
