import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
	redirectPath?: string;
	children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	redirectPath = '/login',
	children,
}) => {
	const { isAuthenticated, isLoading } = useAuth();
	const location = useLocation();

	if (isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
			</div>
		);
	}

	if (!isAuthenticated) {
		// Redirect to the login page, but save the current location they were trying to go to
		return <Navigate to={redirectPath} state={{ from: location }} replace />;
	}

	return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
