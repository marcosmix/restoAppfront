'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import API_BASE_URL from '@/config/apiConfig';

// Styles
import './Login.css'
import { toasterStyle } from '@/app/css/styles'

import Image from 'next/image';

export default function DashboardLogin() {

	const router = useRouter();

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
		if (token) {
			router.push('/dashboard/rol/admin');
		}
	}, [router]);

	const handelSubmit = async (e) => {
		e.preventDefault()
		if (email == "" || password == "") {
			toast.error('Complete los campos para continuar', {style: toasterStyle})
			return
		}

		else {
			try {
				const response = await axios.post(`${API_BASE_URL}/user/login`, {
					email,
					password,
				});
				// Aquí puedes manejar la respuesta del servidor, como guardar tokens de autenticación en el localStorage
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('daily_code', response.data.user.daily_code);
				localStorage.setItem('user', response.data.user);
				toast.success('Inicio de sesion exitoso!', {style: toasterStyle});
				// Redirigir al usuario a otra página después de iniciar sesión
				setTimeout(() => {
					router.push('/dashboard/rol/admin');
				}, 1000);

			} catch (error) {
				console.error('Error al iniciar sesión:', error);
				if (error.response && error.response.status === 401) {
					// Error de credenciales inválidas (correo o contraseña incorrectos)
					toast.error('Correo electrónico o contraseña incorrectos. Intente nuevamente.', {style: toasterStyle});
				} else {
					toast.error('Hubo un problema al iniciar sesión. Por favor, intenta nuevamente.', {style: toasterStyle});
				}
			}
		}
	}

	return (
		<div className='dashboardLogin__container'>
			<div className='dashboardLogin__head'>
				<p>Panel admin</p>
				<Image
					src="https://www.nubecode.ar/media/img/nube-logo.svg"
					alt="Hi"
					width={200}
					height={70}
				/>
			</div>
			<form className='dashboardLogin__form' onSubmit={handelSubmit}>
				<p>Por favor ingrese credenciales</p>
				<div className='dashboardLogin__inputs'>
					<input type="text" className='input' placeholder='Usuario' value={email} onChange={e => setEmail(e.target.value)} />
					<input type="password" className='input' placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<button type='submit' className='btn btn__pink'>Ingresar</button>
			</form>
			<div className='dashboardLogin__info'>

			</div>
			<Toaster />
		</div>
	)
}
