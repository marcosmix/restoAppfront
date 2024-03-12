'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';

import { toasterStyle } from '@/app/css/styles';
import './NavBar.css'

// Menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function WaiterNavBar() {

	const [data, setData] = useState([])

	const router = useRouter();

	const token = typeof localStorage !== 'undefined' ? localStorage.getItem('waiter_token') : null;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/negocio/menu`);
				setData(response.data)
			} catch (error) {
				console.error('Error al obtener datos:', error);
			}
		};
		fetchData();
	}, []);

	const handleLogout = async () => {
		// Lógica de cierre de sesión
		// Limpiar datos de autenticación, token, etc.
		// Redirigir al usuario a la página de inicio de sesión
		try {
			const res = await axios.post(`${API_BASE_URL}/mozos/logout`, {}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
		} catch (error) {
			console.error('Error al obtener datos:', error);
		}
		localStorage.removeItem('waiter_token'); // Elimina el token de localStorage u otros datos relevantes
		localStorage.removeItem('waiter_name'); // Elimina el token de localStorage u otros datos relevantes
		toast('Hasta pronto', {
			icon: '👋', style: toasterStyle
		});
		setTimeout(() => {
			router.push('/dashboard/rol/admin')
		}, 1000);
		// Redirige al usuario a la página de inicio de sesión
	};

	return (
		<div className='navBar__container'>
			<div className='navBar__icon' onClick={handleClick}>
				<img src={data.logo} alt="Logo" />
			</div>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				disableScrollLock={true}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={() => { handleClose(); handleLogout(); }}>Cerrar sesion</MenuItem>
			</Menu>
			<Toaster />
		</div>
	)
}
