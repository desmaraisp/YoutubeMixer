import { PlayerModel } from "@/models/player-model";

export function incrementPlayerIndex(playerState: PlayerModel){
	if (playerState.currentIndex === playerState.tracks.length - 1) {
		return 0
	}
	return playerState.currentIndex + 1
}

export function decrementPlayerIndex(playerState: PlayerModel){
	if (playerState.currentIndex === 0) {
		return playerState.tracks.length - 1
	}
	return playerState.currentIndex - 1
}