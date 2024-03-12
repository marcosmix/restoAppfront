'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import './Admin.css'

// Components
import AdminSettings from './AdminComponents/AdminSettings';
import AdminOrders from './AdminComponents/AdminOrders';
import AdminWaiters from './AdminComponents/AdminWaiters';
import AdminQr from './AdminComponents/AdminQr';
import AdminQrTables from './AdminComponents/AdminQrTables';

import NavBar from "@/components/NavBar/AdminNavBar"

// Material Icons
import SettingsIcon from '@mui/icons-material/Settings';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import TableBarIcon from '@mui/icons-material/TableBar';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AdminTables from './AdminComponents/AdminTables';

export default function Admin() {

	const [component, setComponent] = useState('settings');
	const [authenticated, setAuthenticated] = useState(false);

	const mostrarComponente = (componente) => {
		setComponent(componente);
	};

	const router = useRouter();

	useEffect(() => {
		const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
		if (!token) {
			// Si no hay token, redirigir a la página de inicio de sesión
			router.push('/dashboard/login');
		} else {
			// Si hay token, establecer el estado de autenticación como verdadero
			setAuthenticated(true);
		}
	}, [router]);

	return (
		authenticated && (
			<>
				<NavBar />
				<div className="admin__container">
					<div className='admin__head'>
						<p>Panel admin</p>
					</div>
					<div className='admin__nav'>
						<div className={`admin__navIcon ${component === 'settings' ? 'admin__navIconActive' : ''}`} onClick={() => mostrarComponente('settings')}><SettingsIcon /></div>
						<div className={`admin__navIcon ${component === 'orders' ? 'admin__navIconActive' : ''}`} onClick={() => mostrarComponente('orders')}><ChecklistIcon /></div>
						<div className={`admin__navIcon ${component === 'waiters' ? 'admin__navIconActive' : ''}`} onClick={() => mostrarComponente('waiters')}><SupervisedUserCircleIcon /></div>
						<div className={`admin__navIcon ${component === 'qr' ? 'admin__navIconActive' : ''}`} onClick={() => mostrarComponente('qr')}><QrCode2Icon /></div>
						<div className={`admin__navIcon ${component === 'qrTables' ? 'admin__navIconActive' : ''}`} onClick={() => mostrarComponente('qrTables')}><TableBarIcon /></div>
						<div className={`admin__navIcon ${component === 'tables' ? 'admin__navIconActive' : ''}`} onClick={() => mostrarComponente('tables')}><TableRowsIcon /></div>
					</div>
					<div className='admin__body'>
						{component === 'settings' && <AdminSettings />}
						{component === 'orders' && <AdminOrders />}
						{component === 'waiters' && <AdminWaiters />}
						{component === 'qr' && <AdminQr />}
						{component === 'qrTables' && <AdminQrTables />}
						{component === 'tables' && <AdminTables />}
					</div>
				</div>
			</>
		)
	)
}
