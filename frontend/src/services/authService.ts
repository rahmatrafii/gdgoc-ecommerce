import { apiRequest } from './apiClient';

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

export interface RegisterResponseData {
	id: string;
	name: string;
	email: string;
}

export async function register(data: RegisterRequest) {
	return apiRequest<RegisterResponseData>('/auth/register', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface UserResponse {
	id: string;
	name: string;
	email: string;
	role: string;
	created_at: string;
}

export interface TokenResponse {
	access_token: string;
	user: UserResponse;
}

export async function login(data: LoginRequest) {
	const response = await apiRequest<TokenResponse>('/auth/login', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	
	if (response.data?.access_token && response.data?.user) {
		localStorage.setItem('access_token', response.data.access_token);
		localStorage.setItem('user', JSON.stringify(response.data.user));
	}
	
	return response;
}

export interface ForgotPasswordRequest {
	email: string;
}

export async function forgotPassword(data: ForgotPasswordRequest) {
	return apiRequest<null>('/auth/forgot-password', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}

export interface ResetPasswordRequest {
	token: string;
	password: string;
}

export async function resetPassword(data: ResetPasswordRequest) {
	return apiRequest<null>('/auth/reset-password', {
		method: 'POST',
		body: JSON.stringify(data),
	});
}

export function logout() {
	localStorage.removeItem('access_token');
	localStorage.removeItem('user');
}
