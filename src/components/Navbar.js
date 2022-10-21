import { logout } from './firebase';
import { useNavigation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
	const [pageToGo, setPageToGo] = useState('');

	//const navigate = useNavigation();

	const container = {
		color: 'white',
		backgroundColor: 'DodgerBlue',
		padding: '10px',
		fontFamily: 'Arial',
		display: 'grid',
		gridTemplateColumns: '20% 80%',
	};

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

	const processLogOut = () => {
		logout();
		window.location.pathname = '/';
	};

	const whenLogged = (
		<div style={logInAndSignIn}>
			<h1>ute ta logeao ya</h1>
			<button onClick={processLogOut}>log out</button>
		</div>
	);

	return (
		<div style={container}>
			<h3>la tipica aplicacion de notas otra ve</h3>
			{localStorage.getItem('email') !== null ? whenLogged : whenNotLogged}
		</div>
	);
}
