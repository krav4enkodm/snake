import { Point } from './interfaces';

export function isItemInArray(array: Point[], [itemX, itemY]: Point): boolean {
	return array.some(([x, y]) => x === itemX && y === itemY);
}

export function getRandom(size: number): number {
	return Math.floor(Math.random() * (size - 1)) + 1;
}
