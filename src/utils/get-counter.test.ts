import { getCounter } from './get-counter';

describe('getCounter', () => {

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
})