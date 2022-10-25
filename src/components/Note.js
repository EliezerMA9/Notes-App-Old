import { getDatabase, ref, set, onValue } from 'firebase/database';
import { useEffect, useState, useRef } from 'react';
import BasicMenu from './Material-Components/ThreeDotMenu';
import { TextField } from '@mui/material';
import NoteButtons from './Material-Components/NoteButtons';
import { getDateFormated } from './utils';

const saveNote = (key, title, note, date, orderByDate) => {
	const db = getDatabase();
	set(ref(db, `users/${localStorage.getItem('uid')}/notes/${key}`), {
		title: title,
		note: note,
		date: date,
		orderByDate: orderByDate,
	});
};

export default function Note(props) {
	const [note, setNote] = useState(props.note);
	const [title, setTitle] = useState(props.title);
	const [date, setDate] = useState(props.date);
	const [orderByDate, setOrderByDate] = useState(props.orderByDate);

	const handleOnChangeNote = (e) => {
		let value = e.target.value;
		setNote(value);
		setDate(getDateFormated());
		setOrderByDate(Date.now());
	};

	const handleOnChangeTitle = (e) => {
		let value = e.target.value;
		setTitle(value);
		setDate(getDateFormated());
		setOrderByDate(Date.now());
	};

	useEffect(() => {
		saveNote(props.nid, title, note, date, orderByDate);
	});

	return (
		<div className='note-card'>
			<input
				type='text'
				className='title-input'
				onChange={(e) => {
					handleOnChangeTitle(e);
				}}
				placeholder='Title'
				value={title}
			/>
			<textarea
				placeholder='Note'
				className='note-input'
				value={note}
				onChange={(e) => {
					handleOnChangeNote(e);
				}}
			></textarea>
			<div className='note-card-footer'>
				<NoteButtons nid={props.nid}></NoteButtons>
			</div>
		</div>
	);
}
