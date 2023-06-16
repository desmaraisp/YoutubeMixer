import { ApiErrorModel, ApiErrorSchema } from "@/models/api-models/api-error-response";
import { PlayerModel } from "@/models/player-model";

export async function pushPlayerState(model: PlayerModel): Promise<ApiErrorModel | null> {
	try {
		var response = await fetch('/api/player-state', {
			method: 'Put',
			body: JSON.stringify(model),
		});

		if (response.status == 200) {
			return null
		}

		const result = await response.json()
		return await ApiErrorSchema.parseAsync(result)
	}
	catch (e) {
		if (e instanceof Error) {
			return {
				message: e.message
			}
		}
		console.log(e)
		throw e
	}
}