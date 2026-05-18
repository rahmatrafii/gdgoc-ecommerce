import type { ReactNode } from 'react';
import { AppConfigContext, appConfigDefaultValue } from './AppConfigContext';

interface AppConfigProviderProps {
	children: ReactNode;
}

export function AppConfigProvider({ children }: AppConfigProviderProps) {
	return (
		<AppConfigContext.Provider
			value={{
				apiBaseUrl: appConfigDefaultValue.apiBaseUrl,
			}}>
			{children}
		</AppConfigContext.Provider>
	);
}
