import { Point } from 'types';
import { getCounter } from './get-counter';
import { sortCounter } from './sort-counter';

export function createTarget(snake: Point[], size: number): Point {
	const xCoordCounter = getCounter(size);
	const yCoordCounter = getCounter(size);

	snake.forEach(([x, y]: Point) => {
		xCoordCounter[x] += 1;
		yCoordCounter[y] += 1;
	});
	const sortedX = sortCounter(xCoordCounter);
	const sortedY = sortCounter(yCoordCounter);
	const possibleX = sortedX.filter(([, value]) => value === sortedX[0][1]);
	const possibleY = sortedY.filter(([, value]) => value === sortedY[0][1]);
	const [minXCoord] = possibleX[getRandomIndex(possibleX.length)];
	const [minYCoord] = possibleY[getRandomIndex(possibleY.length)];
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

	return availableValues[getRandomIndex(availableValues.length)];
}

function getRandomIndex(length: number): number {
	return Math.floor(Math.random() * length);
}