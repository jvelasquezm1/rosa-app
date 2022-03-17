import { ApiResult, ApiMethods } from '../types/api';

const apiURL = 'https://staging-api.rosa.be/api';

const request = async <T>(endpoint: string, method: ApiMethods, options?: RequestInit): Promise<ApiResult<T>> => {
	try {
		const result = await fetch(`${apiURL}/${endpoint}`, {
			method,
			...options
		});

		return {
			data: await result.json(),
			status: result.status,
		};
	} catch (ex: any) {
		return {
			data: ex,
			status: 500
		};
	}
};

const postRequest = async <T>(method: ApiMethods, endpoint: string, data: any): Promise<ApiResult<T>> => {
	return await request(endpoint, method, {
		body: JSON.stringify(data),
		headers: { "Content-type": "application/json; charset=UTF-8" }
	});
};

export const get = async <T>(endpoint: string): Promise<ApiResult<T>> => await request(endpoint, "GET");

export const post = async <T>(endpoint: string, data: object): Promise<ApiResult<T>> => {
	return postRequest("POST", endpoint, data);
};

export const put = async <T>(endpoint: string, data: object): Promise<ApiResult<T>> => {
	return postRequest("PUT", endpoint, data);
};

export const remove = async <T>(endpoint: string): Promise<ApiResult<T>> => {
	return request(endpoint, "DELETE");
};
