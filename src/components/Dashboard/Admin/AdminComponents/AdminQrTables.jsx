'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import API_BASE_URL from '@/config/apiConfig';
import BASE_URL from '@/config/urlConfig';

import QRCode from "react-qr-code";

export default function AdminQrTables() {

	const [data, setData] = useState([]);

	const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/mesas`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setData(response.data.data)
			} catch (error) {
				console.error('Error al obtener datos:', error);
			}
		};

		fetchData();
	}, [token]);
	
	return (
		<>
			<div className='admin__tables'>
				<div className='admin__tablesTitle'>
					<h3>Mesas</h3>
				</div>
				<div className='admin__tablesList'>
				{
					data.map((item, index)=> (
						<div className='admin__tableQr' key={index}>
							<p>Mesa: {item.id}</p>
							<div className='admin__qrBox'>
								<QRCode value={`${BASE_URL}/customer/?id=${item.id}`} />
							</div>
							<Link href={`${BASE_URL}/customer/?id=${item.id}`}>Ir</Link>
						</div>
					))
				}
				</div>
			</div>
			<br /><br />
		</>
	)
}
