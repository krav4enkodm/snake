import { Snake } from '../types';
import { createTarget } from './create-target';

describe('create target', () => {

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
});
