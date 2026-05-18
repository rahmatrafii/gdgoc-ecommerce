export interface PaginationMeta {
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
}

export interface ApiErrorBody {
	code: string;
	details?: unknown;
}

export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
	meta?: PaginationMeta;
	error?: ApiErrorBody;
}

export type QueryParams = Record<
	string,
	string | number | boolean | null | undefined
>;
