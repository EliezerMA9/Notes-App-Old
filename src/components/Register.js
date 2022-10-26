import { useState, useEffect } from 'react';
import { registerWithEmailAndPassword } from './firebase';
import '../styles/register.css';

export default function RegisterScreen() {
	//Set default states
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [pageToGo, setPageToGo] = useState('');

	//Functions
	const processRegister = () => {
		if (username !== '')
			registerWithEmailAndPassword(email, password, username)
				.then(() => {
					setPageToGo('/');
					window.location.pathname = '/';
				})
				.catch((e) => {
					console.log(e);
				});
	};

	//If not logged then move to home
	useEffect(() => {
		if (localStorage.getItem('email') !== null) {
			window.location.pathname = '/home';
		}
		if (pageToGo === '/') {
			console.log('logged');
		}
	});

	return (
		<div className='container'>
			<div className='register-container'>
				<div className='top-container'>
					<button
						className='back-home'
						onClick={() => {
							window.location.pathname = '/';
						}}
					>
						{'< Home'}
					</button>
					<p className='title'>Register now.</p>
				</div>
				<div className='username-container'>
					<input
						type='text'
						className='username-input'
						placeholder='Username'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</div>
				<div className='email-container'>
					<input
						type='email'
						className='email-input'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div className='password-container'>
					<input
						type='password'
						className='password-input'
						placeholder='Password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
				<div className='register-controls-container'>
					<button className='process-register-button' onClick={processRegister}>
						Sign up
					</button>
					<button
						className='gotologin-button'
						onClick={() => {
							window.location.pathname = '/login';
						}}
					>
						Alredy have an account? Login here
					</button>
				</div>
			</div>
		</div>
	);
}
