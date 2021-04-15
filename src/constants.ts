import { Point } from './interfaces';

export enum KeyCodes {
	Space = 32,
	Left = 37,
	Up,
	Right,
	Down
}

export const offset: Record<string, Point> = {
	[KeyCodes.Left]: [-1, 0],
	[KeyCodes.Up]: [0, -1],
	[KeyCodes.Right]: [1, 0],
	[KeyCodes.Down]: [0, 1],
};
