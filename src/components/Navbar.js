import { logout } from './firebase';
import ProfileButton from './Material-Components/ProfileButton';
import TextField from '@mui/material/TextField';

export default function Navbar(props) {
	const logInAndSignIn = {
		position: 'relative',
		left: '35%',
	};

	const processLogOut = () => {
		logout();
		window.location.pathname = '/';
	};

	const whenNotLogged = (
		<div style={logInAndSignIn}>
			<a href='/register'>Sign in</a>
			<a href='/login'>Log in</a>
		</div>
	);

	const whenLogged = (
		<ProfileButton></ProfileButton>

		/* <div style={logInAndSignIn}>
			<input type='text' placeholder='Search' />
			<button onClick={processLogOut}>log out</button>
		</div> */
	);

	return (
		<div className='navbar'>
			<h1 className='navbar-title'>{props.title}</h1>
			<div className='navbar-search'>
				<TextField id='outlined-search' label='Search field' type='search' />
			</div>
			<div className='profile-button'>
				{localStorage.getItem('email') !== null ? whenLogged : whenNotLogged}
			</div>
		</div>
	);
}
