'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_BASE_URL from '@/config/apiConfig'

import { modalStyle, acordionStyle } from '@/app/css/styles'
import { Toaster, toast } from 'react-hot-toast';

// Styles
import styles from '../Admin.css'
import { toasterStyle } from '@/app/css/styles';

// Acordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Notifications
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// Modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function AdminTables() {
	const [openModalId, setOpenModalId] = useState(null);
	const handleOpen = (id) => setOpenModalId(id);
	const handleClose = () => setOpenModalId(null);
	const [data, setData] = useState([]);

	const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`${API_BASE_URL}/mesas`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setData(res.data.data);
			}
			catch (error) {
				console.error('Error al obtener datos:', error);
			}
		}
		fetchData();
	}, [token])

	const updateTableStatus = async (id, newStatus) => {
		try {
			await axios.post(`${API_BASE_URL}/mesas/estado`, {
				estado: newStatus,
				id: id
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			// Actualizar los datos después de cambiar el estado de la mesa
			const updatedData = data.map(item => {
				if (item.id === id) {
					return { ...item, estado: newStatus };
				}
				return item;
			});
			toast('Estado actualizado', {
				icon: '✅', style: toasterStyle
			});
			setData(updatedData);
		} catch (error) {
			console.error('Error al actualizar el estado de la mesa:', error);
		}
	};

	return (
		<div className='admin__tables'>
			<h3>Estado de las mesas</h3>
			<div className='admin__tablesContainer'>
				{data.map((item, index) => (
					<Accordion sx={acordionStyle} key={index}>
						<AccordionSummary
							expandIcon={<ArrowDropDownIcon style={{ color: 'white' }} />}
							aria-controls="panel1-content"
							id="panel1-header"
						>
							<div className='admin__tablesSummary'>
								<p>Mesa: {item.id}</p>
								<div className='admin__tablesSumaryInfo'>
									<div className={item.estado == 'Libre' ? 'admin__statusColorFree' : 'admin__statusColorBusy'} />
									{item.estado == 'Llamado de la mesa' || item.estado == 'Cuenta pedida' ?
										<NotificationsActiveIcon style={{ color: '#FF5B00' }} className="breathing-icon" />
										:
										<NotificationsIcon />
									}
								</div>
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<div className='admin__tablesAcordion'>
								<div className='admin__tablesStatus'>
									<div className='admin__tablesStatusInfo'>
										<h3>Estado de la mesa</h3>
										<p>{item.estado}</p>
									</div>
									<div className='admin__talbesStatusBtns'>
										<button className='btn btn__transparent' onClick={() => updateTableStatus(item.id, 'Pedido tomado')}>Pedido tomado</button>
										<button className='btn btn__transparent' onClick={() => updateTableStatus(item.id, 'Pedido servido')}>Pedido servido</button>
									</div>
								</div>
								<div className='admin__tablesBtns'>
									{
										item.estado == 'Llamado de la mesa' ?
											<button className='btn btn__orange' onClick={() => updateTableStatus(item.id, 'Atendida')}>Atender</button>
											:
											<button className='btn btn__green' onClick={() => updateTableStatus(item.id, 'Atendida')}>Atendida</button>
									}
									<button className='btn btn__red' onClick={() => { handleOpen(item.id) }}>Cerrar</button>
									<Modal
										open={openModalId === item.id}
										onClose={handleClose}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box sx={modalStyle}>
											<h3 id="modal-modal-description" sx={{ mt: 2 }}>
												¿Estas seguro que deseas cerrar la mesa?
											</h3>
											<br /><br />
											<div className='admin__tablesBtns'>
												<button className='btn btn__transparent' onClick={handleClose}>No</button>
												<button className='btn btn__red' onClick={() => { updateTableStatus(item.id, 'Libre'); handleClose() }}>Si</button>
											</div>
										</Box>
									</Modal>
								</div>
							</div>
						</AccordionDetails>
					</Accordion>
				))}
			</div>
		</div>
	)
}