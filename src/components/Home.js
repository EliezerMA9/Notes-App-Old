import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { logout } from './firebase';
import {
	getDatabase,
	ref,
	set,
	onValue,
	onChildRemoved,
	onChildChanged,
	onChildAdded,
} from 'firebase/database';
import { makeid } from './utils';
import NotesList from './NotesList';
import { Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function HomeScreen() {
	const [notes, setNotes] = useState([]);

	//If not logged then move to root
	useEffect(() => {
		if (localStorage.getItem('email') == null) {
			window.location.pathname = '';
		}
	});

	const newNote = () => {
		const db = getDatabase();
		set(ref(db, `users/${localStorage.getItem('uid')}/notes/${makeid()}`), {
			title: 'title',
			note: 'note',
		}).then(() => {
			refreshData();
		});
	};

	useEffect(() => {
		const db = getDatabase();

		onValue(
			ref(db, `users/${localStorage.getItem('uid')}/notes`),
			(snapshot) => {
				const data = snapshot.val();
				let dataToRender = [];
				if (data) {
					Object.entries(data).forEach((obj) => {
						dataToRender.push([obj[0], obj[1]]);
					});

					setNotes(dataToRender);
				} else {
					setNotes([]);
				}
			},
		);
	}, []);

	const getTitle = () => {
		switch (window.location.pathname) {
			case '/home':
				return 'Home';
			default:
				return 'jeje';
		}
	};

	const refreshData = () => {
		let dataToRender = [];
		const db = getDatabase();
		onValue(
			ref(db, `users/${localStorage.getItem('uid')}/notes`),
			(snapshot) => {
				const data = snapshot.val();
				let dataToRender = [];
				if (data) {
					Object.entries(data).forEach((obj) => {
						dataToRender.push([obj[0], obj[1]]);
					});

					setNotes(dataToRender);
				} else {
					setNotes([]);
				}
			},
		);
	};

	return (
		<div className='main-container'>
			<Navbar title={getTitle()}></Navbar>
			<div>
				<NotesList data={notes}></NotesList>
			</div>
			<div className='fab-container'>
				<Fab color='primary' aria-label='add' onClick={newNote}>
					<AddIcon />
				</Fab>
			</div>
		</div>
	);
}
