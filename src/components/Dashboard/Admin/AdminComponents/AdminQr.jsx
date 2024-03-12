'use client'

import Link from 'next/link';
import React from 'react'

import BASE_URL from '@/config/urlConfig';
import QRCode from "react-qr-code";

export default function AdminQr() {

	const daily_code = typeof localStorage !== 'undefined' ? localStorage.getItem('daily_code') : null;

	return (
		<div className='admin__qr'>
			<div className='admin__qrTitle'>
				<h3>Ingreso mozo</h3>
			</div>
			<div className='admin__qrBox'>
				<QRCode value={`${BASE_URL}/dashboard/login/waiter?daily_code=${daily_code}`} />
			</div>
				<Link href={`${BASE_URL}/dashboard/login/waiter?daily_code=${daily_code}`}>Ir</Link>
		</div>
	)
}
