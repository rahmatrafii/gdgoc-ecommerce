/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserResponse } from '../services/authService';

interface AuthContextType {
	isAuthenticated: boolean;
	user: UserResponse | null;
	login: (user: UserResponse, token: string) => void;
	logout: () => void;
	isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
		return !!localStorage.getItem('access_token');
	});
	
	const [user, setUser] = useState<UserResponse | null>(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				return JSON.parse(storedUser);
			} catch {
				return null;
			}
		}
		return null;
	});
	
	const isLoading = false;

	const login = (userData: UserResponse, token: string) => {
		setIsAuthenticated(true);
		setUser(userData);
		localStorage.setItem('access_token', token);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUser(null);
		localStorage.removeItem('access_token');
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				logout,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
