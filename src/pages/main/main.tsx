import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Field } from '../../components/field';
import { Navigation } from '../../components/navigation';
import { isItemInArray, createTarget, getStepInterval, ensureDefined } from '../../utils';
import { Point } from '../../interfaces';
import { useKeyboard } from '../../hooks';

import s from './main.module.css';

const size = 4;

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

	useEffect(
		() => {
			setTarget(createTarget(defaultSnake, size));
			return () => {
				if (timer.current) {
					clearInterval(timer.current);
				}
			}
		},
		[]
	);

	useEffect(
		() => {
			if (direction === null) {
				return;
			}
			if (timer.current) {
				clearInterval(timer.current);
			}
	
			// timer.current = window.setInterval(
			// 	() => step(direction),
			// 	getStepInterval(snake.length, size * size)
			// );
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
			setTarget(createTarget(nextSnake, size));
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
