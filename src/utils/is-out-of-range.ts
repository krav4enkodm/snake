export function isOutOfRange(coord: number, fieldSize: number): boolean {
	return coord < 0 || coord >= fieldSize;
}
