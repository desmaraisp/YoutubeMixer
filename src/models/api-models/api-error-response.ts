import { z } from "zod";

export const ApiErrorResponseSchema = z.object({
	message: z.string()
});
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>

export const isApiError = (obj: unknown): obj is ApiErrorResponse => {
	return (obj as ApiErrorResponse).message !== undefined;
};