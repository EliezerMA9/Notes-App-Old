import { getDatabase, ref, set, onValue } from 'firebase/database';
import { useEffect, useState, useRef } from 'react';
import NoteButtons from './Material-Components/NoteButtons';
import { getDateFormated } from './utils';

const saveNote = (key, title, note, created, modified, orderBy, color) => {
	const db = getDatabase();
	set(ref(db, `users/${localStorage.getItem('uid')}/notes/${key}`), {
		title: title,
		note: note,
		color: color,
		'date-info': {
			created: created,
			modified: modified,
			orderBy: orderBy,
		},
	});
};

export default function Note(props) {
	const [note, setNote] = useState(props.note);
	const [title, setTitle] = useState(props.title);
	const [modified, setModified] = useState(props.modified);

	const handleOnChangeNote = (e) => {
		let value = e.target.value;
		setNote(value);
		setModified(getDateFormated);
	};

	const handleOnChangeTitle = (e) => {
		let value = e.target.value;
		setTitle(value);
		setModified(getDateFormated);
	};

	useEffect(() => {
		saveNote(
			props.nid,
			title,
			note,
			props.created,
			modified,
			props.orderBy,
			props.color,
		);
	});

	return (
		<div className='note-card' style={{ backgroundColor: props.color }}>
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
				<NoteButtons nid={props.nid} color={props.color}></NoteButtons>
			</div>
		</div>
	);
}
