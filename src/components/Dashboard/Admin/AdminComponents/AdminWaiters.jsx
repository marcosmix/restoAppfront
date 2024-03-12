'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';

// Styles
import { modalStyle } from '@/app/css/styles'

// Modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// Material Icons
import DeleteIcon from '@mui/icons-material/Delete';


export default function AdminWaiters() {
	const [data, setData] = useState([]);
	const [openDelete, setOpenDelete] = useState(false);
	const [mozoToDelete, setMozoToDelete] = useState(null);

	const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/mozos`);
				setData(res.data.data)
			}
			catch (error) {
				console.error('Error al obtener datos:', error);
			}
		};

		fetchData();
	}, []);

	const handleOpenDelete = (mozoId) => {
		setOpenDelete(true);
		setMozoToDelete(mozoId);
	};

	const handleClose = () => {
		setOpenDelete(false);
		setMozoToDelete(null);
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`${API_BASE_URL}/mozos/${mozoToDelete}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			handleClose();
			fetchData(); // Actualizar la lista después de eliminar un mozo
		} catch (error) {
			console.error('Error al eliminar mozo:', error);
		}
	};

	return (
		<div className='admin__waiters'>
			<h3>Listado de mozos en servicio</h3>
			<div className='admin__waitersList'>
				{data && data.length > 0 ?
					(data.map((item, index) => (
						<div className='admin__waiterCard' key={index}>
							<p>{item.nombre}</p>
							<DeleteIcon onClick={() => handleOpenDelete(item.id)} />
						</div>
					)))
					:
					<p>No hay mozos disponibles</p>
				}
				<Modal
					open={openDelete}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={modalStyle}>
						<div className='admin__waiterModal'>
							<h3 id="modal-modal-description" sx={{ mt: 2 }}>
								¿Desea la sesion del mozo?
							</h3>
							<div className='admin__waiterBtns'>
								<button className='btn btn__transparent' onClick={handleClose}>No</button>
								<button className='btn btn__red' onClick={() => { handleDelete(); handleClose() }}>Si</button>
							</div>
						</div>
					</Box>
				</Modal>
			</div>
		</div>
	)
}
