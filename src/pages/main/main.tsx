import React, { useState, useRef, useMemo, useEffect } from 'react';

import { Game } from '../game/game';
import { Result } from '../result/result';
import { Setup } from '../setup/setup';
import { ensureDefined, isOutOfRange, isItemInArray } from '../../utils';
import { Point } from '../../interfaces';
import { SizeList } from '../setup/constants';

import s from './main.module.css';

enum GameState {
	Init,
	Start,
	End
}

export function Main(): JSX.Element {
	const timer = useRef<number | null>(null);
	const [size, setSize] = useState(SizeList.Medium);
	const [state, setState] = useState(GameState.Init);
	const [snake, setSnake] = useState<Point[]>([]);
	const result = useMemo(
		() => {
			if (snake.length === 0) {
				return undefined;
			}

			const snakeCopy = [...snake];
			const head = snakeCopy.pop();
			const [headX, headY] = ensureDefined(head);
			const hasWon = snake.length === size * size;

			if (
				!hasWon && (
					isOutOfRange(headX, size) ||
					isOutOfRange(headY, size) ||
					isItemInArray(snakeCopy, [headX, headY])
				)
			) {
				return false;
			}

			if (hasWon) {
				if (timer.current) {
					clearInterval(timer.current);
				}
				return true;
			}

			return undefined;
		},
		[snake]
	);

	useEffect(
		() => {
			if (result !== undefined) {
				setState(GameState.End);
			}
		},
		[result]
	);

	return (
		<div className={s.app}>
			{ render()}
		</div>
	);

	function render(): React.ReactNode {
		switch (state) {
			case GameState.Init: {
				return (
					<Setup
						onStart={start}
						size={size}
						setSize={setSize}
					/>
				);
			}
			case GameState.Start: {
				return (
					<Game
						timer={timer}
						size={size}
						snake={snake}
						setSnake={setSnake}
					/>
				)
			}
			case GameState.End: {
				return <Result result={ensureDefined(result)} />
			}
			default: return null;
		}
	}

	function start(): void {
		const center = size / 2;
		setSnake([[center, center]]);
		setState(GameState.Start);
	}
}
