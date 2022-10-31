import { logout } from './firebase';
import ProfileButton from './Material-Components/ProfileButton';
import TextField from '@mui/material/TextField';
import NavigationButton from './Material-Components/NavigationButton';

export default function Navbar(props) {
	const whenLoggedStyle = {
		color: 'white',
		backgroundColor: '#1B76D2',
		display: 'grid',
		gridTemplateColumns: '10% 90%',
	};

	const whenNotLoggedStyle = {
		color: 'white',
		backgroundColor: '#1B76D2',
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

	const buttonWhenLogged = (
		<div className=''>
			<NavigationButton title={props.title}></NavigationButton>
		</div>
	);

	return (
		<div
			id='navbar'
			className='navbar'
			style={
				localStorage.getItem('email') !== null
					? whenLoggedStyle
					: whenNotLoggedStyle
			}
		>
			<h2 className='navbar-title' style={{ alignSelf: 'center' }}>
				{localStorage.getItem('email') !== null
					? buttonWhenLogged
					: props.title}
			</h2>
			{localStorage.getItem('email') !== null ? whenLogged : whenNotLogged}
		</div>
	);
}
