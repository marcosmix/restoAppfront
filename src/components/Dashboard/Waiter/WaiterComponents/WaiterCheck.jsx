'use client'

import React, { useState } from 'react'

import '../Waiter.css'

export default function WaiterCheck({item, onToggleTable, isSelected }) {

	const handleClick = () => {
		onToggleTable(item.id);
	 };  

	return (
		<div className={`waiter__table ${isSelected ? 'waiter__tableChecked' : ''}`} onClick={handleClick}>
			<p>Mesa: {item.id}</p>
		</div>
	)
}
