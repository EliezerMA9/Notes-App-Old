import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import {
	getDatabase,
	ref,
	set,
	onValue,
	query,
	orderByChild,
} from 'firebase/database';
import { makeid, getDateFormated } from './utils';
import NotesList from './NotesList';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function HomeScreen() {
	const [notes, setNotes] = useState([]);

	//If not logged then move to root
	useEffect(() => {
		if (localStorage.getItem('email') == null) {
			window.location.pathname = '';
		}
	});

	//Create new note
	const newNote = () => {
		const db = getDatabase();
		set(ref(db, `users/${localStorage.getItem('uid')}/notes/${makeid()}`), {
			title: '',
			note: '',
			date: getDateFormated(),
		}).then(() => {
			refreshData();
		});
	};

	//Get current page title
	const getTitle = () => {
		switch (window.location.pathname) {
			case '/home':
				return 'Home';
			case '/':
				return 'Notes App';
			default:
				return 'jeje';
		}
	};

	//Refresh data
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

	//Initialize and listen to changes in page
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

	const test = () => {
		const db = getDatabase();
		const topUserPostsRef = query(
			ref(db, '/users') /* , orderByChild('starCount') */,
		);
		console.log();
	};

	return (
		<div className='main-container'>
			<Navbar title={getTitle()}></Navbar>
			<button onClick={test}>test</button>
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
