import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PublicRouteProps {
	redirectPath?: string;
	children?: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
	redirectPath = '/',
	children,
}) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
			</div>
		);
	}

	if (isAuthenticated) {
		// Redirect them to the / (home) or custom redirectPath if they are already logged in
		return <Navigate to={redirectPath} replace />;
	}

	return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
