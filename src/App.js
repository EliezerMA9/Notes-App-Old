import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import HomeScreen from './components/Home';
import IndexScreen from './components/Index';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
	BrowserRouter,
	Routes,
	Route,
	NavLink,
	Outlet,
} from 'react-router-dom';

import './styles/app.css';

function App() {
	return (
		<BrowserRouter>
			<div className='container'>
				<Routes>
					<Route exact path='/' element={<IndexScreen />} />
					<Route path='/home' element={<HomeScreen />} />
					<Route path='/login' element={<LoginScreen />} />
					<Route path='/register' element={<RegisterScreen />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
