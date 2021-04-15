import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Field } from '../../components/field';
import { Navigation } from '../../components/navigation';
import { isItemInArray, getRandom, ensureDefined } from '../../utils';
import { Point } from '../../interfaces';

import s from './main.module.css';
import { useKeyboard } from '../../hooks';

const size = 2;

const cellsCount = size * size;

const defaultSnake: Point[] = [[0, 0]];

export function Main(): JSX.Element {
	const timer = useRef<number | null>(null);
	const [snake, setSnake] = useState<Point[]>(defaultSnake);
	const [target, setTarget] = useState<Point>([1, 1]);
	const [direction, setDirection] = useState<Point | null>(null);
	const result = useMemo(
		() => {
			const snakeCopy = [...snake];
			const head = snakeCopy.pop();
			const [headX, headY] = ensureDefined(head);

			if (
				isOutOfRange(headX, size) ||
				isOutOfRange(headY, size) ||
				isItemInArray(snakeCopy, [headX, headY])
			) {
				return false;
			}

			if (snake.length === size * size) {
				if (timer.current) {
					clearInterval(timer.current);
				}
				return true;
			}

			return undefined;
		},
		[snake]
	);

	useKeyboard({ navigation: step });

	useEffect(() => { setTarget(createTarget(defaultSnake)); }, []);

	useEffect(
		() => {
			if (direction === null) {
				return;
			}
			if (timer.current) {
				clearInterval(timer.current);
			}
	
			timer.current = window.setInterval(
				() => step(direction),
				getStepInterval(snake.length)
			);
		},
		[direction, snake]
	);

	return (
		<div className={s.game}>
			{result !== undefined ? (
				<h1 className={s.result}>{result ? 'Win' : 'Game over'}</h1>
			) : (
				<>
					<Field snake={snake} size={size} target={target} />
					<Navigation step={step} />
				</>
			)}
		</div>
	);

	function step(point: Point): void {
		const [stepX, stepY] = point;
		const [targetX, targetY] = target;
		const [headX, headY] = snake[snake.length - 1];

		const nextSnake = [...snake];
		const nextHeadX = headX + stepX;
		const nextHeadY = headY + stepY;
		const hasTarget = nextHeadX === targetX && nextHeadY === targetY;

		nextSnake.push([nextHeadX, nextHeadY]);

		if (hasTarget) {
			setTarget(createTarget(nextSnake));
		} else {
			nextSnake.shift();
		}

		setSnake(nextSnake);
		setDirection(point);
	}
}

function isOutOfRange(coord: number, fieldSize: number): boolean {
	return coord < 0 || coord >= fieldSize;
}

function createTarget(snake: Point[]): Point {
	const x = getRandom(size);
	const y = getRandom(size);

	if (!isItemInArray(snake, [x, y])) {
		return [x, y];
	}

	return createTarget(snake);
}

function getStepInterval(length: number): number {
	const interval = 1000 - (length / cellsCount) * 1000;

	if (interval < 500) {
		return 500;
	}

	return interval;
}
