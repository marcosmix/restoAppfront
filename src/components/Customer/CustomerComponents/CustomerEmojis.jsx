'use client'

import React, { useState } from 'react';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MoodBadIcon from '@mui/icons-material/MoodBad';

const EmojiSelector = ({ onSelect }) => {
	const [selectedEmoji, setSelectedEmoji] = useState(null);

	const handleEmojiClick = (emoji) => {
		setSelectedEmoji(emoji === selectedEmoji ? null : emoji);
		onSelect(emoji); // Llama a la función onSelect pasada como prop
	};

	return (
		<div >
			<MoodBadIcon
				onClick={() => handleEmojiClick('bad')}
				style={{ fontSize: '2.7em', cursor: 'pointer', color: selectedEmoji === 'bad' ? 'orange' : 'gray', transition: 'color 0.3s ease-in-out', }}
			/>
			<SentimentSatisfiedAltIcon
				onClick={() => handleEmojiClick('regular')}
				style={{ fontSize: '2.7em', cursor: 'pointer', color: selectedEmoji === 'regular' ? 'orange' : 'gray', transition: 'color 0.3s ease-in-out', }}
			/>
			<MoodIcon
				onClick={() => handleEmojiClick('good')}
				style={{ fontSize: '2.7em', cursor: 'pointer', color: selectedEmoji === 'good' ? 'orange' : 'gray', transition: 'color 0.3s ease-in-out', }}
			/>
		</div>
	);
};

export default EmojiSelector;

