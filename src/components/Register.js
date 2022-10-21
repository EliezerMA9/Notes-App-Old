import { Component, useState, useEffect } from 'react';
import { registerWithEmailAndPassword } from './firebase';
import { useNavigate, BrowserRouter } from 'react-router-dom';
import '../styles/app.css';

export default function RegisterScreen() {
	//Set default states
	const [email, setEmail] = useState('eliezerxd9@gmail.com');
	const [password, setPassword] = useState('123456');
	const [username, setUsername] = useState('');
	const [pageToGo, setPageToGo] = useState('');

	//Functions
	const register = (e) => {
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
			<h1>register</h1>
			<input
				placeholder='username'
				onChange={(e) => setUsername(e.target.value)}
				value={username}
			/>
			<input
				placeholder='email'
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<input
				placeholder='password'
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<button onClick={register}>sign in</button>
			<a href='/login'>login</a>
		</div>
	);
}
