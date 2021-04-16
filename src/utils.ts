import { Point } from './interfaces';

export function ensureDefined<T>(value: T | undefined): T {
	if (value === undefined) {
		throw new Error('Value is undefined');
	}

	return value;
}

export function isItemInArray(array: Point[], [itemX, itemY]: Point): boolean {
	return array.some(([x, y]) => x === itemX && y === itemY);
}

export function getRandom(size: number): number {
	return Math.floor(Math.random() * (size - 1)) + 1;
}

export function createTarget(snake: Point[], size: number): Point {
	const xCoordCounter = getCounter(size);
	const yCoordCounter = getCounter(size);

	snake.forEach(([x, y]: Point) => {
		xCoordCounter[x] += 1;
		yCoordCounter[y] += 1;
	});

	const [minX] = sortCounter(xCoordCounter);
	const [minY] = sortCounter(yCoordCounter);
	const [minXCoord] = minX;
	const [minYCoord] = minY;
	const x = Number(minXCoord);
	const y = Number(minYCoord);

	if (x < y) {
		const collection = new Set<number>();
		snake.forEach((point: Point) => {
			const [xCoord, yCoord] = point;
			if (xCoord === x) {
				collection.add(yCoord);
			}
		});
		return [x, getValue(collection, size)];
	}

	const collection = new Set<number>();
	snake.forEach((point: Point) => {
		const [xCoord, yCoord] = point;
		if (yCoord === y) {
			collection.add(xCoord);
		}
	});
	return [getValue(collection, size), y];
}

function getValue(collection: Set<number>, length: number): number {
	const availableValues = Array
		.from({ length }, (_, i: number) => i)
		.filter((i: number) => !collection.has(i));
	const index = Math.floor(Math.random() * availableValues.length);

	return availableValues[index];
}

export function sortCounter(counter: Counter): [string, number][] {
	return Object.entries(counter).sort(
		(counterA: [string, number], counterB: [string, number]) => {
			const [, valueA] = counterA;
			const [, valueB] = counterB;
			return valueA - valueB;
		}
	);
}

type Counter = Record<string, number>;

export function getCounter(length: number): Counter {
	return Array.from({ length }, (_, i: number) => i)
		.reduce(
			(acc: Record<string, number>, next: number) => {
				acc[next] = 0;
				return acc;
			},
			{}
		);
}

export function getStepInterval(length: number, cellsCount: number): number {
	const interval = 1000 - (length / cellsCount) * 1000;

	if (interval < 500) {
		return 500;
	}

	return interval;
}
