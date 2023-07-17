import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Transferencia from './routes/transferencias/Transferencias';

function App() {
	document.documentElement.lang = 'pt-br';
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/contas/:id/transferencias" Component={Transferencia} />
				<Route path="/*" element={<Navigate to="/contas/0/transferencias" />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
