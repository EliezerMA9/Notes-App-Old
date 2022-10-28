import { logout } from './firebase';
import ProfileButton from './Material-Components/ProfileButton';
import TextField from '@mui/material/TextField';

export default function Navbar(props) {
	const whenLoggedStyle = {
		color: 'white',
		backgroundColor: 'dodgerblue',
		display: 'grid',
		gridTemplateColumns: '10% 90%',
	};

	const whenNotLoggedStyle = {
		color: 'white',
		backgroundColor: 'dodgerblue',
		display: 'grid',
		gridTemplateColumns: '20% 80%',
	};

	const whenNotLogged = (
		<div className='navbar-buttons-container'>
			<button
				className='index-register'
				onClick={() => {
					window.location.pathname = '/register';
				}}
			>
				Sign up
			</button>
			<button
				className='index-login'
				onClick={() => {
					window.location.pathname = '/login';
				}}
			>
				Log in
			</button>
		</div>
	);

	const whenLogged = (
		<div className='profile-button'>
			<ProfileButton></ProfileButton>
		</div>
	);

	return (
		<div
			className='navbar'
			style={
				localStorage.getItem('email') !== null
					? whenLoggedStyle
					: whenNotLoggedStyle
			}
		>
			<h2 className='navbar-title' style={{ alignSelf: 'center' }}>
				{props.title}
			</h2>
			{localStorage.getItem('email') !== null ? whenLogged : whenNotLogged}
		</div>
	);
}
