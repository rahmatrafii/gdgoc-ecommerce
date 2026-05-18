import { Navigate, Route, Routes } from 'react-router-dom';
import { AppConfigProvider } from './context/AppConfigProvider';
import LandingPage from './pages/LandingPage';

function App() {
	return (
		<AppConfigProvider>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}
				/>
				<Route
					path="*"
					element={
						<Navigate
							to="/"
							replace
						/>
					}
				/>
			</Routes>
		</AppConfigProvider>
	);
}

export default App;
