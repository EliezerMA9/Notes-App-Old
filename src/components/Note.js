import { getDatabase, ref, set, onValue } from 'firebase/database';
import { useEffect, useState, useRef } from 'react';
import BasicMenu from './Material-Components/ThreeDotMenu';
import { TextField } from '@mui/material';
import NoteButtons from './Material-Components/NoteButtons';
import { getDateFormated } from './utils';

const getNote = (nid) => {
	const db = getDatabase();
	onValue(
		ref(db, `users/${localStorage.getItem('uid')}/notes/${nid}`),
		(snapshot) => {
			const data = snapshot.val();
			/* let dataToRender = [];
				if (data) {
					Object.entries(data).forEach((obj) => {
						dataToRender.push([obj[0], obj[1]]);
					}); */
			return data;
		},
	);
};

const saveNote = (key, title, note, date) => {
	const db = getDatabase();
	set(ref(db, `users/${localStorage.getItem('uid')}/notes/${key}`), {
		title: title,
		note: note,
		date: date,
	});
};

export default function Note(props) {
	const [note, setNote] = useState(props.note);
	const [title, setTitle] = useState(props.title);
	const [date, setDate] = useState(props.date);

	const handleOnChangeNote = (e) => {
		let value = e.target.value;
		setNote(value);
		setDate(getDateFormated());
	};

	const handleOnChangeTitle = (e) => {
		let value = e.target.value;
		setTitle(value);
		setDate(getDateFormated());
	};

	useEffect(() => {
		saveNote(props.nid, title, note, date);
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
