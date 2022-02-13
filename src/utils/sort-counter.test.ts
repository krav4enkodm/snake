import { Point, Snake } from 'types';
import { getCounter } from './get-counter';
import { sortCounter } from './sort-counter';

describe('sortCounter', () => {
	it('should sort counter in ascending order', () => {
		const snake: Snake = [
			[1, 1],
			[1, 0],
			[0, 0],
		];
		const size = 2;

		const xCounter = getCounter(size);
		const yCounter = getCounter(size);

		snake.forEach(([x, y]: Point) => {
			xCounter[x] += 1;
			yCounter[y] += 1;
		});

		expect(xCounter[0]).toBe(1);
		expect(xCounter[1]).toBe(2);
		expect(yCounter[0]).toBe(2);
		expect(yCounter[1]).toBe(1);

		const sortedX = sortCounter(xCounter);
		const sortedY = sortCounter(yCounter);

		expect(sortedX[0]).toEqual(['0', 1]);
		expect(sortedY[0]).toEqual(['1', 1]);
	});
});
