'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '@/config/apiConfig';

import { modalStyle, toasterStyle } from '@/app/css/styles'

// Components
import HomeMenuEmojis from './CustomerEmojis'

// Modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast';


export default function CustomerSurvey({ showSurveyModal, handleCloseSurveyModal, table_token }) {

	const [surveyAnswers, setSurveyAnswers] = useState({
		mozo: null,
		comida: null,
		instalaciones: null,
		recomendacion: null
	});

	const [recommendation, setRecommendation] = useState(null);

	// Función para actualizar las respuestas del usuario
	const updateSurveyAnswers = (question, answer) => {
		setSurveyAnswers(prevState => ({
			...prevState,
			[question]: answer
		}));
	};

	const handleRecommendationToggle = (answer) => {
		setRecommendation(answer);
	};

	// Función para enviar la encuesta a la API
	const sendSurvey = async () => {
		try {
			const response = await axios.post(`${API_BASE_URL}/mesas/encuesta`, {
				...surveyAnswers,
				recomendacion: recommendation
			},
			{
				headers: {
					Authorization: `Bearer ${table_token}`
				}
			});
			handleCloseSurveyModal();
			toast('Tu encuesta nos ah sido de mucha ayuda, Gracias!', {
				icon: '😊', style: toasterStyle
			})
			// Aquí puedes mostrar algún mensaje de éxito o realizar alguna otra acción necesaria
		} catch (error) {
			console.error('Error al enviar la encuesta:', error);
		}
	};

	return (
		<Modal
			open={showSurveyModal}
			onClose={handleCloseSurveyModal}
			aria-labelledby="modal-survey-title"
			aria-describedby="modal-survey-description"
		>
			<Box sx={modalStyle}>
				{/* Contenido del segundo modal */}
				<div className='homeMenu__modalSurvey'>
					<h3 id="modal-survey-title" sx={{ mt: 2 }}>
						Nos encantaria conocer tu opinion
					</h3>
					<div className='homeMenu__modalEmojis'>
						<div className='homeMenu__modalEmoji'>
							<p>¿Como estuvo la atención del mozo?</p>
							<HomeMenuEmojis onSelect={(emoji) => updateSurveyAnswers('mozo', emoji)} />
						</div>
						<div className='homeMenu__modalEmoji'>
							<p>¿Que tal estuvo la comida?</p>
							<HomeMenuEmojis onSelect={(emoji) => updateSurveyAnswers('comida', emoji)}/>
						</div>
						<div className='homeMenu__modalEmoji'>
							<p>¿En que condiciones estan las instalaciones del restaurant?</p>
							<HomeMenuEmojis onSelect={(emoji) => updateSurveyAnswers('instalaciones', emoji)}/>
						</div>
						<div className='homeMenu__modalEmoji'>
							<p>¿Recomendarias nuestro restaurant?</p>
							<div className='homeMenu__modalBtns'>
								<button className={`btn ${recommendation === 'no' ? 'btn__orange' : 'btn__transparent'}`} onClick={() => handleRecommendationToggle('no')} >No</button>
								<button className={`btn ${recommendation === 'yes' ? 'btn__orange' : 'btn__transparent'}`} onClick={() => handleRecommendationToggle('yes')} >Si</button>
							</div>
						</div>
					</div>
					<button className='btn btn__pink' onClick={sendSurvey}>Enviar</button>
				</div>
			</Box>
		</Modal>
	)
}