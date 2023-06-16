import { PlayerModel } from "@/models/player-model";

export function incrementPlayerIndex(playerState: PlayerModel){
	var newState: PlayerModel = { ...playerState }

	if (newState.currentIndex === newState.tracks.length - 1) {
		newState.currentIndex = 0
	}
	else {
		newState.currentIndex += 1
	}
	return newState
}

export function decrementPlayerIndex(playerState: PlayerModel){
	var newState: PlayerModel = { ...playerState }

	if (newState.currentIndex === 0) {
		newState.currentIndex = newState.tracks.length - 1
	}
	else {
		newState.currentIndex -= 1
	}
	return newState
}

export function setCurrentIndex(playerState: PlayerModel, newIndex: number){
	var newState: PlayerModel = { ...playerState }

	newState.currentIndex = newIndex
	return newState
}