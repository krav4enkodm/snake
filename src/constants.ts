import { Point } from './types';

export enum KeyCodes {
	Left = 37,
	Up,
	Right,
	Down
}

export const offset: Record<KeyCodes, Point> = {
	[KeyCodes.Left]: [-1, 0],
	[KeyCodes.Up]: [0, -1],
	[KeyCodes.Right]: [1, 0],
	[KeyCodes.Down]: [0, 1],
};
