import { useEffect } from 'react';
import { KeyCodes, offset } from './constants';
import { Point } from './types';

export interface UseKeyboardOptions {
	navigation: (direction: Point) => void;
}

export function useKeyboard(options: UseKeyboardOptions): void {
	const { navigation } = options;
	useEffect(
		() => {
			window.addEventListener('keydown', handleKeydown);

			return () => {
				window.removeEventListener('keydown', handleKeydown);
			};

			function handleKeydown(event: KeyboardEvent): void {

				switch (event.keyCode) {
					case KeyCodes.Left: {
						navigation(offset[KeyCodes.Left]);
						break;
					}
					case KeyCodes.Up: {
						navigation(offset[KeyCodes.Up]);
						break;
					}
					case KeyCodes.Right: {
						navigation(offset[KeyCodes.Right]);
						break;
					}
					case KeyCodes.Down: {
						navigation(offset[KeyCodes.Down]);
						break;
					}
				}
			}
		},
		[navigation]
	);
}
