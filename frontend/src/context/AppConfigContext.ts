import { createContext } from 'react';
import { API_BASE_URL } from '../services/apiClient';

export interface AppConfig {
	apiBaseUrl: string;
}

export const appConfigDefaultValue: AppConfig = {
	apiBaseUrl: API_BASE_URL,
};

export const AppConfigContext = createContext<AppConfig>(appConfigDefaultValue);
