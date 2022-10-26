import Navbar from './Navbar';
export default function IndexScreen() {
	//Cant go to index
	if (localStorage.getItem('email') !== null) {
		window.location.pathname = '/home';
	}

	return (
		<div className='main-index-container'>
			<Navbar title={'Notes app'}></Navbar>
			<div className='index-container'>
				<p className='text'>Notes App project used to learn react</p>
			</div>
		</div>
	);
}
