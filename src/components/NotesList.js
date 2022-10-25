import { getDatabase, ref, set, onValue } from 'firebase/database';
import Note from './Note';
import { Grid } from '@mui/material';

export default function NotesList({ data }) {
	return (
		<section className='notes-container'>
			{data.map((details) => (
				<Note
					key={details[0]}
					nid={details[0]}
					title={details[1]['title']}
					note={details[1]['note']}
					date={details[1]['date']}
					orderByDate={details[1]['orderByDate']}
				/>
			))}
		</section>
	);
}
