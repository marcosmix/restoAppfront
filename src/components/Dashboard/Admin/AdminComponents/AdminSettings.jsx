'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';
import { toast, Toaster } from 'react-hot-toast';

import { toasterStyle } from '@/app/css/styles'

export default function AdminSettings() {

	const [formData, setFormData] = useState({
		nombre: '',
		logo: null,
		cant_mesas: 0,
		capacidad: 0,
		url: ''
	});
	const [logo, setLogo] = useState()

	const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/negocio`, {
					headers: {
						Authorization: `Bearer ${token}`,
						// 'Content-Type': 'multipart/form-data'
					}
				});
				const negocioData = response.data[0];
				setFormData(({
					nombre: negocioData.nombre || '',
					logo: negocioData.logo || null,
					cant_mesas: negocioData.cant_mesas || 0,
					capacidad: negocioData.capacidad || 0,
					url: negocioData.url || '',
				}));
				const logoResponse = await axios.get(`${API_BASE_URL}/negocio/menu`);
				setLogo(logoResponse.data.logo)
			} catch (error) {
				console.error('Error al obtener datos:', error);
			}
		};

		fetchData();
	}, [token]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData(prevState => ({
			...prevState,
			logo: file
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const formDataToSend = new FormData();
			formDataToSend.append('nombre', formData.nombre);
			// formDataToSend.append('logo', formData.logo);
			formDataToSend.append('cant_mesas', formData.cant_mesas);
			formDataToSend.append('capacidad', formData.capacidad);
			formDataToSend.append('url', formData.url);

			if (formData.logo && typeof formData.logo !== 'string') {
				formDataToSend.append('logo', formData.logo);
			}

			const response = await axios.post(`${API_BASE_URL}/negocio`, formDataToSend, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data' // Importante: cambiar el tipo de contenido a multipart/form-data
				}
			});
			toast('Parametros actualizados', { icon: '✅', style: toasterStyle });
			// Aquí puedes agregar lógica adicional después de enviar el formulario, como mostrar un mensaje de éxito o redirigir a otra página.
		} catch (error) {
			console.error('Error al enviar datos:', error);
		}
	};
	return (
		<div className='admin__info'>
			<h3>Información del restaurant</h3>
			<form onSubmit={handleSubmit} encType="multipart/form-data" className='admin__infoForm'>
				<div className='admin__infoInput'>
					<label htmlFor="nombre">Nombre del restaurante</label>
					<input type="text" id="nombre" name="nombre" className='input' value={formData.nombre} onChange={handleChange} />
				</div>
				<div className='admin__infoInput'>
					<label htmlFor="logo">Logo del restaurante</label>
					<div className='admin__infoLogo'>
						<input type="file" id="logo" name="logo" className='input' onChange={handleFileChange} />
						<img src={logo} alt="" />
					</div>
				</div>
				<div className='admin__infoInput'>
					<label htmlFor="cant_mesas">Cantidad de mesas</label>
					<input type="number" id="cant_mesas" name="cant_mesas" className='input' value={formData.cant_mesas} onChange={handleChange} />
				</div>
				<div className='admin__infoInput'>
					<label htmlFor="capacidad">Lugares disponibles por mesa (Promedio)</label>
					<input type="number" id="capacidad" name="capacidad" className='input' value={formData.capacidad} onChange={handleChange} />
				</div>
				<div className='admin__infoInput'>
					<label htmlFor="url">Link al menú</label>
					<input type="text" id="url" name="url" className='input' value={formData.url} onChange={handleChange} />
				</div>
				<button type="submit" className='btn btn__pink'>Guardar</button>
			</form>
			<Toaster />
		</div>
	)
}
