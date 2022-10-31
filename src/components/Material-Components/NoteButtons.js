import { getDatabase, ref, set, get, child, remove } from 'firebase/database';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PaletteIcon from '@mui/icons-material/Palette';
import { useState } from 'react';

export default function CardButtons(props) {
	const [data, setData] = useState([]);

	const handleDelete = () => {
		const db = getDatabase();
		remove(ref(db, `users/${localStorage.getItem('uid')}/notes/${props.nid}`));
	};

	const color = ['#1B76D2', '#579ABE', '#C23B23', '#03C03C', '#F39A27'];

	const writeData = (data) => {
		const db = getDatabase();
		let index = color.indexOf(props.color);
		let nextColor = 0;

		if (index + 1 !== color.length) {
			nextColor = index + 1;
		}

		set(ref(db, `users/${localStorage.getItem('uid')}/notes/${props.nid}`), {
			title: data['title'],
			note: data['note'],
			color: color[nextColor],
			'date-info': {
				created: data['date-info']['created'],
				modified: data['date-info']['modified'],
				orderBy: data['date-info']['orderBy'],
			},
		});
	};

	const handleChangeColor = () => {
		const db = getDatabase();

		get(
			child(ref(db), `users/${localStorage.getItem('uid')}/notes/${props.nid}`),
		)
			.then((snapshot) => {
				if (snapshot.exists()) {
					console.log(snapshot.val());

					writeData(snapshot.val());
				} else {
					console.log(props.nid);
					console.log('No data available');
				}
			})
			.catch((error) => {
				console.error(error);
			});

		/* if (data[0] !== undefined) {
			let index = color.indexOf(props.color);
			let nextColor = 0;

			if (index <= color.length) {
				nextColor = index + 1;
			}

			set(ref(db, `users/${localStorage.getItem('uid')}/notes/${props.nid}`), {
				title: data['title'],
				note: data['note'],
				color: color[nextColor],
				'date-info': {
					created: data['date-info']['created'],
					modified: data['date-info']['modified'],
					orderBy: data['date-info']['orderBy'],
				},
			});
		} */
	};

	return (
		<div>
			<IconButton
				aria-label='delete'
				onClick={handleDelete}
				style={{ color: 'white' }}
			>
				<DeleteIcon />
			</IconButton>

			<IconButton
				aria-label='color'
				onClick={handleChangeColor}
				style={{ color: 'white' }}
			>
				<PaletteIcon />
			</IconButton>
		</div>
	);
}
