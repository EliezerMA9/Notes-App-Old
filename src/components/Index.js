import Navbar from './Navbar';
import like from '../resources/like_img.png';

export default function IndexScreen() {
	//Cant go to index
	if (localStorage.getItem('email') !== null) {
		window.location.pathname = '/home';
	}

	return (
		<div>
			<Navbar></Navbar>
			<h1>tipico proyecto default</h1>
			<img src={like} alt='' />
			<button
				onClick={() => {
					console.log(localStorage.getItem('email'));
				}}
			>
				asd
			</button>
		</div>
	);
}
