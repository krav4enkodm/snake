import { Point, Snake } from '../interfaces';
import { createTarget, getCounter, isItemInArray, sortCounter } from '../utils';

describe('create target', () => {
	it('should create counter based on length', () => {
		const counter0 = getCounter(0);
		const counter1 = getCounter(1);
		const counter2 = getCounter(2);
		const counter5 = getCounter(5);
		expect(counter0).toEqual({});
		expect(counter1).toEqual({ 0: 0 });
		expect(counter2).toEqual({ 0: 0, 1: 0 });
		expect(counter5).toEqual({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 });
	});

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

	it('should create target in last cell on small field', () => {
		const snake: Snake = [
			[1, 1],
			[1, 0],
			[0, 0],
		];
		const size = 2;
		const target = createTarget(snake, size);
		expect(target).toEqual([0, 1]);
	});

	it('should create target in last cell on middle field', () => {
		const row1: Snake = [
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
		];
		const row2: Snake = [
			[3, 1],
			[2, 1],
			[1, 1],
			[0, 1],
		];
		const row3: Snake = [
			[0, 2],
			[1, 2],
			[2, 2],
			[3, 2],
		];
		const row4: Snake = [
			[3, 3],
			[2, 3],
			[1, 3],
		];
		const snake: Snake = [...row1, ...row2, ...row3, ...row4];
		const size = 4;
		const target = createTarget(snake, size);
		expect(target).toEqual([0, 3]);
	});

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
