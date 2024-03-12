'use client'

import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';

// Styles
import './Customer.css'
import { modalStyle, toasterStyle } from '@/app/css/styles'

// Components
import HomeMenuEmojis from './CustomerComponents/CustomerEmojis'
import Image from 'next/image';

// Toastify
import toast, { Toaster } from 'react-hot-toast';

// Modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CustomerSurvey from './CustomerComponents/CustomerSurvey';


export default function Customer() {

	const [open, setOpen] = useState(false);
	const [showSurveyModal, setShowSurveyModal] = useState(false);
	const [data, setData] = useState([])
	const [id, setId] = useState('')



	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleCloseModal = () => {
		setOpen(false);

		// Después de cerrar el primer modal, espera 2 segundos y abre el segundo modal
		setTimeout(() => {
			setShowSurveyModal(true);
		}, 1000);
	};

	const handleCloseSurveyModal = () => setShowSurveyModal(false);

	useEffect(() => {
		const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
		// Lo almacena en la variable id
		setId(urlParams.get('id'));
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const loginResponse = await axios.post(`${API_BASE_URL}/mesas/${id}/login`);
				if (loginResponse.data.token != null || loginResponse.data.token != undefined) {
					localStorage.setItem('table_token', loginResponse.data.token);
				}
				const infoResponse = await axios.get(`${API_BASE_URL}/negocio/menu`);
				setData(infoResponse.data)
			} catch (error) {
				console.error('Error al obtener datos:', error);
			}
		};

		fetchData();
	}, [id]);

	const table_token = typeof localStorage !== 'undefined' ? localStorage.getItem('table_token') : null;

	const updateTableStatus = async (newState) => {
		try {
			await axios.post(`${API_BASE_URL}/mesas/estado`, {
				estado: newState,
			}, {
				headers: {
					Authorization: `Bearer ${table_token}`
				}
			});
			// Actualizar los datos después de cambiar el estado de la mesa
			if (newState == 'Llamado de la mesa') {
				toast('Mozo llamado, aguarde !', {
					icon: '👋', style: toasterStyle
				});
			}
			if (newState == 'Cuenta pedida') {
				toast('Aguarde, el mozo le acercara su cuenta en breve, Muchas Gracias !', {
					icon: '😊', style: toasterStyle
				})
			}
		} catch (error) {
			console.error('Error al actualizar el estado de la mesa:', error);
		}
	};

	return (
		<div className='homeMenu__container'>
			<div className='homeMenu__head'>
				<p>Bienvenido a</p>
				<h2>{data.nombre}</h2>
				<div className='homeMenu__headLogo'>
					<img
						src={data.logo}
						alt="Logo"
						width={100}
						height={100}
					/>
				</div>
				<p>Mesa:  <b>{id}</b></p>
			</div>
			<div className='homeMenu__btns'>
				<a href={data.url} target='_blank'>
					<button className='btn btn__transparent'>Ver menu</button>
				</a>
				<button className='btn btn__transparent' onClick={() => { updateTableStatus('Llamado de la mesa') }}>Llamar al mozo</button>
				<button className='btn btn__transparent' onClick={handleOpen}>Perdir cuenta</button>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={modalStyle}>
						<h3 id="modal-modal-description" sx={{ mt: 2 }}>
							¿Confirmar el pedido de cuenta?
						</h3>
						<br /><br />
						<div className='homeMenu__modalBtns'>
							<button className='btn btn__transparent' onClick={handleClose}>No</button>
							<button className='btn btn__red' onClick={() => { updateTableStatus('Cuenta pedida'); handleCloseModal() }}>Si</button>
						</div>
					</Box>
				</Modal>
			</div>
			<CustomerSurvey
				showSurveyModal={showSurveyModal}
				handleCloseSurveyModal={handleCloseSurveyModal}
				table_token={table_token}
			/>
			<div className='homeMenu__info'>
			</div>
			<Toaster />
		</div>
	)
}
