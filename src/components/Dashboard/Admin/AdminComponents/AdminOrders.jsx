'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';

import { modalStyle, acordionStyle } from '@/app/css/styles'

// Acordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Material Icons
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MoodBadIcon from '@mui/icons-material/MoodBad';

// Modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function AdminOrders() {

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [data, setData] = useState([]);

	const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/mesas/encuesta/all`,
					// {
					// 	id: 
					// },
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
				setData(Object.values(response.data))
			} catch (error) {
				console.error('Error al obtener datos:', error);
			}
		};
		fetchData();
	}, [token]);

	return (
		<div className='admin__orders'>
			<h3>Listado de Ordenes</h3>
			<div className='admin__ordersList'>
				{data.map((item, index) => (

					<Accordion sx={acordionStyle} key={index}>
						<AccordionSummary
							expandIcon={<ArrowDropDownIcon style={{ color: 'white' }} />}
							aria-controls="panel1-content"
							id="panel1-header"
						>
							<div className='admin__summary'>
								<div className='admin__summaryTable'>
									<p><b>Mesa: </b>{item.mesa_id}</p>
									{/* <p><b>Fecha: 00/00/000</b></p> */}
									<p><b>Mozo: </b>{item.mozo_name}</p>
								</div>
							</div>
						</AccordionSummary>
						<AccordionDetails>
							<div className='waiter__acordion'>
								<div className='admin__status'>
									{/* <p><b>Hora: </b>00:00hs</p> */}
									<h4>Calificaciones: </h4>
									<div className='admin__survey'>
										<div className='admin__surveyIcons'>
											<p>Mozo: </p><MoodIcon className='good' /><p>{item.mozo.good} </p> <SentimentSatisfiedAltIcon className='regular' /><p>{item.mozo.regular} </p> <MoodBadIcon className='bad' /><p>{item.mozo.bad}</p>
										</div>
										<div className='admin__surveyIcons'>
											<p>Comida: </p><MoodIcon className='good' /><p>{item.comida.good} </p> <SentimentSatisfiedAltIcon className='regular' /><p>{item.comida.regular}</p> <MoodBadIcon className='bad' /><p>{item.comida.bad}</p>
										</div>
										<div className='admin__surveyIcons'>
											<p>Instalaciones: </p><MoodIcon className='good' /><p>{item.instalaciones.good}</p> <SentimentSatisfiedAltIcon className='regular' /><p>{item.instalaciones.regular}</p> <MoodBadIcon className='bad' /><p>{item.instalaciones.bad}</p>
										</div>
										<div className='admin__surveyIcons'>
											<p>Recomendación: <b className='good'>Si</b> {item.recomendacion.yes} <b className='bad'>No</b> {item.recomendacion.no}</p>
										</div>
									</div>
									{/* <h4>Tiempo transcurrido: </h4>
								<div className='admin__survey'>
									<p><b>Atención del mozo: </b>00:00min</p>
									<p><b>Pedido y entrega: </b>00:00min</p>
									<p><b>Total mesa: </b>00:00min</p>
								</div> */}
								</div>
							</div>
						</AccordionDetails>
					</Accordion>

				))}
			</div>
			{/* <button className='btn btn__pink' onClick={handleOpen}>Ver promedios</button> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-survey-title"
				aria-describedby="modal-survey-description"
			>
				<Box sx={modalStyle}>
					{/* Contenido del segundo modal */}
					<div className='homeMenu__modalSurvey'>
						<h3>Promedios</h3>
						<br />
						<div className='admin__promedy'>
							<div className='admin__promedyInfo'>
								<p>Rapidez: </p>
								<div className='admin__promedyIcons'>
									<div className='admin__promedyIcon'>
										<MoodIcon />
										<p>3</p>
									</div>
									<div className='admin__promedyIcon'>
										<SentimentSatisfiedAltIcon />
										<p>5</p>
									</div>
									<div className='admin__promedyIcon'>
										<MoodBadIcon />
										<p>10</p>
									</div>
								</div>
							</div>
							<div className='admin__promedyInfo'>
								<p>Atención: </p>
								<div className='admin__promedyIcons'>
									<div className='admin__promedyIcon'>
										<MoodIcon />
										<p>3</p>
									</div>
									<div className='admin__promedyIcon'>
										<SentimentSatisfiedAltIcon />
										<p>5</p>
									</div>
									<div className='admin__promedyIcon'>
										<MoodBadIcon />
										<p>10</p>
									</div>
								</div>
							</div>
							<div className='admin__promedyInfo'>
								<p>Comida: </p>
								<div className='admin__promedyIcons'>
									<div className='admin__promedyIcon'>
										<MoodIcon />
										<p>3</p>
									</div>
									<div className='admin__promedyIcon'>
										<SentimentSatisfiedAltIcon />
										<p>5</p>
									</div>
									<div className='admin__promedyIcon'>
										<MoodBadIcon />
										<p>10</p>
									</div>
								</div>
							</div>
						</div>
						<br />
						<button className='btn btn__pink' onClick={handleClose}>Cerrar</button>
					</div>

				</Box>
			</Modal>
		</div>
	)
}
