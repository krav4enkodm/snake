export function sortCounter(counter: Record<string, number>): [string, number][] {
	return Object.entries(counter).sort(
		(counterA: [string, number], counterB: [string, number]) => {
			const [, valueA] = counterA;
			const [, valueB] = counterB;
			return valueA - valueB;
		}
	);
}
