import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { randomId, getDateFormated } from './utils';
import NotesList from './NotesList';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function HomeScreen() {
	const [notes, setNotes] = useState([]);

	//Sort function
	const sortByDate = (data) => {
		const tempdata = [];
		Object.entries(data).forEach((obj) => {
			tempdata.push(obj);
		});

		tempdata.sort((a, b) => {
			return b[1]['orderByDate'] - a[1]['orderByDate'];
		});
		return tempdata;
	};

	//If not logged then move to root
	useEffect(() => {
		if (localStorage.getItem('email') == null) {
			window.location.pathname = '';
		}
	});

	//Create new note
	const newNote = () => {
		const db = getDatabase();
		set(ref(db, `users/${localStorage.getItem('uid')}/notes/${randomId()}`), {
			title: '',
			note: '',
			date: getDateFormated(),
			orderByDate: Date.now(),
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
		const db = getDatabase();
		onValue(
			ref(db, `users/${localStorage.getItem('uid')}/notes`),
			(snapshot) => {
				const data = snapshot.val();
				if (data) {
					setNotes(sortByDate(data));
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
				if (data) {
					setNotes(sortByDate(data));
				} else {
					setNotes([]);
				}
			},
		);
	}, []);

	const test = () => {};

	return (
		<div className='main-container'>
			<Navbar title={getTitle()} ></Navbar>
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
