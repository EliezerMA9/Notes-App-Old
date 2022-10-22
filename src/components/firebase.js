import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase-config';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
	try {
		const res = await signInWithEmailAndPassword(auth, email, password);
		localStorage.setItem('email', res.user.email);
		localStorage.setItem('uid', res.user.uid);
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const registerWithEmailAndPassword = async (email, password, username) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		localStorage.setItem('email', res.user.email);
		localStorage.setItem('uid', res.user.uid);
		localStorage.setItem('username', username);

		const db = getDatabase();
		set(ref(db, `users/${res.user.uid}`), {
			username: username,
			email: res.user.email,
			uid: res.user.uid,
		});
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert('Password reset link sent!');
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

const logout = () => {
	signOut(auth).then(() => {
		localStorage.clear('username');
		localStorage.clear('email');
		localStorage.clear('uid');
	});
};

export {
	auth,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
};
