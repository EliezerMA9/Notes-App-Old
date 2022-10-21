import { Component, useState, useEffect } from 'react';
import {
	registerWithEmailAndPassword,
	logInWithEmailAndPassword,
} from './firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';

export default function LoginScreen() {
	//Set default states
	const [email, setEmail] = useState('eliezerxd9@gmail.com');
	const [password, setPassword] = useState('123456');
	const [pageToGo, setPageToGo] = useState('');

	//Functions
	const login = () => {
		logInWithEmailAndPassword(email, password)
			.then(() => {
				window.location.pathname = '/';
				setPageToGo('/');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	//If logged then move to home
	useEffect(() => {
		if (localStorage.getItem('email') !== null) {
			window.location.pathname = '/home';
		}
		if (pageToGo === '/') {
			console.log('logged');
		}
	});

	//Render component
	return (
		<div className='container'>
			<h1>login</h1>
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
			<button onClick={login}>log in</button>
			<a href='/register'>register</a>
		</div>
	);
}
