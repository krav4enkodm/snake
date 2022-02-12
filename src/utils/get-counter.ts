export function getCounter(length: number): Record<string, number> {
	return Array
		.from({ length }, (_, i: number) => i)
		.reduce(
			(acc: Record<string, number>, next: number) => {
				acc[next] = 0;
				return acc;
			},
			{}
		);
}