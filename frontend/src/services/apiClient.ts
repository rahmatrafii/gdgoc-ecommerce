import type { ApiResponse } from '../types/api';

const DEFAULT_API_BASE_URL = 'http://localhost:8080/api/v1';
const FALLBACK_LOCAL_API_BASE_URLS = [
	'http://localhost:8081/api/v1',
	'http://localhost:18080/api/v1',
];

const ENV_API_BASE_URL = (
	import.meta.env.VITE_API_URL as string | undefined
)?.trim();

export const API_BASE_URL = ENV_API_BASE_URL || DEFAULT_API_BASE_URL;

export class ApiRequestError extends Error {
	status: number;
	code?: string;
	details?: unknown;

	constructor(
		message: string,
		status: number,
		code?: string,
		details?: unknown,
	) {
		super(message);
		this.name = 'ApiRequestError';
		this.status = status;
		this.code = code;
		this.details = details;
	}
}

interface RequestOptions extends RequestInit {
	authToken?: string;
}

interface RequestAttempt<T> {
	response: Response;
	payload: ApiResponse<T> | null;
}

function uniqueBaseURLs(urls: string[]): string[] {
	return Array.from(new Set(urls.filter((url) => url.length > 0)));
}

function getRequestBaseURLCandidates(): string[] {
	if (ENV_API_BASE_URL) {
		const isLocalEnvTarget =
			ENV_API_BASE_URL.includes('localhost') ||
			ENV_API_BASE_URL.includes('127.0.0.1');

		if (!isLocalEnvTarget) {
			return [ENV_API_BASE_URL];
		}

		return uniqueBaseURLs([
			ENV_API_BASE_URL,
			DEFAULT_API_BASE_URL,
			...FALLBACK_LOCAL_API_BASE_URLS,
		]);
	}

	if (typeof window === 'undefined') {
		return [DEFAULT_API_BASE_URL];
	}

	return uniqueBaseURLs([
		DEFAULT_API_BASE_URL,
		...FALLBACK_LOCAL_API_BASE_URLS,
	]);
}

function shouldRetryWithNextBaseURL<T>(attempt: RequestAttempt<T>): boolean {
	// Retry only when the current base URL likely points to the wrong service.
	return attempt.response.status === 404 || attempt.payload === null;
}

export function buildQueryString<T extends object>(params: T): string {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value === null || value === undefined || value === '') {
			continue;
		}

		searchParams.set(key, String(value));
	}

	const query = searchParams.toString();
	return query ? `?${query}` : '';
}

export async function apiRequest<T>(
	path: string,
	options: RequestOptions = {},
): Promise<ApiResponse<T>> {
	const baseURLCandidates = getRequestBaseURLCandidates();

	async function executeRequest(baseURL: string): Promise<RequestAttempt<T>> {
		const headers = new Headers(options.headers ?? {});

		if (!headers.has('Content-Type') && options.body) {
			headers.set('Content-Type', 'application/json');
		}

		if (options.authToken) {
			headers.set('Authorization', `Bearer ${options.authToken}`);
		}

		const response = await fetch(`${baseURL}${path}`, {
			...options,
			headers,
		});

		let payload: ApiResponse<T> | null = null;

		try {
			payload = (await response.json()) as ApiResponse<T>;
		} catch (parseError) {
			void parseError;
		}

		return { response, payload };
	}

	let lastAttempt: RequestAttempt<T> | null = null;
	let lastNetworkError: unknown = null;

	for (let index = 0; index < baseURLCandidates.length; index += 1) {
		const baseURL = baseURLCandidates[index];
		const isLastCandidate = index === baseURLCandidates.length - 1;

		let attempt: RequestAttempt<T>;

		try {
			attempt = await executeRequest(baseURL);
		} catch (networkError) {
			lastNetworkError = networkError;
			if (isLastCandidate) {
				throw networkError;
			}
			continue;
		}

		if (
			attempt.response.ok &&
			attempt.payload &&
			attempt.payload.success !== false
		) {
			return attempt.payload;
		}

		lastAttempt = attempt;

		if (!shouldRetryWithNextBaseURL(attempt) || isLastCandidate) {
			throw new ApiRequestError(
				attempt.payload?.message ||
					`Request failed with status ${attempt.response.status}`,
				attempt.response.status,
				attempt.payload?.error?.code,
				attempt.payload?.error?.details,
			);
		}
	}

	if (lastAttempt) {
		throw new ApiRequestError(
			lastAttempt.payload?.message ||
				`Request failed with status ${lastAttempt.response.status}`,
			lastAttempt.response.status,
			lastAttempt.payload?.error?.code,
			lastAttempt.payload?.error?.details,
		);
	}

	if (lastNetworkError instanceof Error) {
		throw lastNetworkError;
	}

	throw new Error('Request failed before receiving any response.');
}
