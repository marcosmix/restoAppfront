'use client'

import React, {useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Toaster,toast } from 'react-hot-toast';
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';

import { toasterStyle } from '@/app/css/styles';
import './NavBar.css'

// Menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function AdminNavBar() {

	const router = useRouter();

	const [data, setData] = useState([])

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

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
		try {
			const res = await axios.post(`${API_BASE_URL}/user/logout`, {}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			// Limpiar datos de autenticación, token, etc.
			// Redirigir al usuario a la página de inicio de sesión
			localStorage.removeItem('token'); // Elimina el token de localStorage u otros datos relevantes
			localStorage.removeItem('daily_code'); // Elimina el token de localStorage u otros datos relevantes
		} catch (error) {
			toast.error('Error al intentar cerrar sesion, intente nuevamente', {
				style: toasterStyle
			})
			console.error('Error al obtener datos:', error);
		}

		toast('Hasta pronto', {
			icon: '👋', style: toasterStyle
		});
		setTimeout(() => {
			router.push('/dashboard/login/admin')
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
			<Toaster/>
		</div>
	)
}