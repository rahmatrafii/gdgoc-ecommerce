import { useContext } from 'react';
import { AppConfigContext, type AppConfig } from '../context/AppConfigContext';

export function useAppConfig(): AppConfig {
	return useContext(AppConfigContext);
}
