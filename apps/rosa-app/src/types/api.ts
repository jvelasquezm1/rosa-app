export interface ApiResult<T> {
	data: T;
	status: number;
}

export type ApiMethods = "GET" | "POST" | "PUT" | "DELETE";
