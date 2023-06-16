import { z } from "zod";

export const ApiErrorSchema = z.object({
	message: z.string()
});
export type ApiErrorModel = z.infer<typeof ApiErrorSchema>

export const isApiError = (obj: unknown): obj is ApiErrorModel => {
	return (obj as ApiErrorModel).message !== undefined;
};