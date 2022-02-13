import { Point, Snake } from 'types';
import { createTarget } from './create-target';
import { getCounter } from './get-counter';
import { isItemInArray } from './is-item-in-array';

describe('isItemInArray', () => {

	it('should not create target under snake', () => {
		const snake: Snake = [
			[0, 3],
			[1, 3],
			[1, 2],
			[2, 2],
			[2, 3],
			[3, 3],
			[3, 2],
			[3, 1],
			[2, 1],
			[2, 0],
			[1, 0],
			[0, 0],
			[0, 1],
		];
		const size = 4;
		const target = createTarget(snake, size);
		const xCounter = getCounter(size);
		const yCounter = getCounter(size);

		snake.forEach(([x, y]: Point) => {
			xCounter[x] += 1;
			yCounter[y] += 1;
		});

		expect(isItemInArray(snake, target)).toBe(false);
	});
});
