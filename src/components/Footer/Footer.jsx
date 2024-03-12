'use client'

import React from 'react'

import './Footer.css'
import Image from 'next/image';

import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Footer() {
  return (
    <div className='footer__container'>
		<div className='footer__media'>

			{/* Siguiente iteracion */}

			{/* <div className='footer__mediaIcon'>
				<InstagramIcon/>
			</div>
			<div className='footer__mediaIcon'>
				<WhatsAppIcon/>
			</div> */}
		</div>
		<div className='footer__copy'>
			<p>Powered by </p>
			<Image src="https://www.nubecode.ar/media/img/nube-logo.svg" width={70} height={30} alt="" />
		</div>
    </div>
  )
}
