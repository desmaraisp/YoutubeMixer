export function ShuffleArray<T>(array: T[]): T[] {
	array.sort(() => (Math.random() > .5) ? 1 : -1)

	return array
}