import { logout } from './firebase';
import ProfileButton from './Material-Components/ProfileButton';
import TextField from '@mui/material/TextField';

export default function Navbar(props) {
	const logInAndSignIn = {
		position: 'relative',
		left: '35%',
	};

	const whenNotLogged = (
		<div style={logInAndSignIn}>
			<a href='/register'>Sign in</a>
			<a href='/login'>Log in</a>
		</div>
	);

	const whenLogged = (
		<>
			<div className='navbar-search'>
				<TextField id='outlined-search' label='Search field' type='search' />
			</div>
			<div className='profile-button'>
				<ProfileButton></ProfileButton>
			</div>
		</>
	);

	return (
		<div className='navbar'>
			<h2 className='navbar-title'>{props.title}</h2>
			{localStorage.getItem('email') !== null ? whenLogged : whenNotLogged}
		</div>
	);
}
