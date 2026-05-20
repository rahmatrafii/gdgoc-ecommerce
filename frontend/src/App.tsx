import { Navigate, Route, Routes } from 'react-router-dom';
import { AppConfigProvider } from './context/AppConfigProvider';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import CartPage from './pages/CartPage';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
	return (
		<AppConfigProvider>
			<AuthProvider>
				<Routes>
					<Route
						path="/"
						element={<LandingPage />}
					/>
					<Route
						path="/product/:id"
						element={<ProductDetailPage />}
					/>
					<Route
						path="/category/:id"
						element={<CategoryPage />}
					/>
					{/* Protected Routes */}
					<Route element={<ProtectedRoute />}>
						<Route
							path="/cart"
							element={<CartPage />}
						/>
					</Route>
					{/* Public Routes (only accessible if NOT logged in) */}
					<Route element={<PublicRoute />}>
						<Route
							path="/register"
							element={<RegisterPage />}
						/>
						<Route
							path="/login"
							element={<LoginPage />}
						/>
						<Route
							path="/forgot-password"
							element={<ForgotPasswordPage />}
						/>
						<Route
							path="/reset-password"
							element={<ResetPasswordPage />}
						/>
					</Route>
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
			</AuthProvider>
		</AppConfigProvider>
	);
}

export default App;
