import { ApiErrorModel, ApiErrorSchema } from "@/models/api-models/api-error-response";
import { TokensApiResponseModel, TokensApiResponseSchema } from "@/models/api-models/user-refresh-tokens";
import { z } from "zod";


export async function fetchLoggedInProvidersFromAPI(): Promise<ApiErrorModel|TokensApiResponseModel> {
	try {
		var response = await fetch("/api/auth/get-logged-in-custom-providers")

		const result = await response.json()
		return await z.union([ApiErrorSchema, TokensApiResponseSchema]).parseAsync(result)
	}
	catch (e) {
		if(e instanceof Error){
			return {
				message: e.message
			}
		}
		console.log(e)
		throw e
	}
}