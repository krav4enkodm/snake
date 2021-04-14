import React, { useEffect, useRef, useState } from 'react';
import { Field } from '../../components/field';
import { Navigation } from '../../components/navigation';
import { isItemInArray, getRandom } from '../../utils';
import { Point } from '../../interfaces';

import s from './main.module.css';

const size = 4;

const cellsCount = size * size;

export function Main(): JSX.Element {
	const [snake, setSnake] = useState<Point[]>([[0, 0]]);
	const [target, setTarget] = useState<Point>([1, 1]);
	const [result, setResult] = useState<boolean>();
	const timer = useRef<number | null>(null);

	useEffect(() => {
		setTarget(createTarget([[0, 0]]));
	}, []);

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

	function step([stepX, stepY]: Point): () => void {
		return () => {
			const [targetX, targetY] = target;
			const [headX, headY] = snake[snake.length - 1];

			const nextSnake = [...snake];
			const nextHeadX = headX + stepX;
			const nextHeadY = headY + stepY;

			if (
				nextHeadX < 0 ||
				nextHeadX >= size ||
				nextHeadY < 0 ||
				nextHeadY >= size ||
				isItemInArray(snake, [nextHeadX, nextHeadY])
			) {
				setResult(false);
				return;
			}

			nextSnake.push([nextHeadX, nextHeadY]);

			if (nextSnake.length === size * size) {
				if (timer.current) {
					clearInterval(timer.current);
				}
				setResult(true);
				return;
			}

			if (nextHeadX !== targetX || nextHeadY !== targetY) {
				nextSnake.shift();
			} else {
				setTarget(createTarget(nextSnake));
			}

			setSnake(nextSnake);

			if (timer.current) {
				clearInterval(timer.current);
			}

			timer.current = window.setInterval(
				step([stepX, stepY]),
				getStepInterval(nextSnake.length)
			);
		};
	}
}

function createTarget(snake: Point[]): Point {
	const x = getRandom(size);
	const y = getRandom(size);

	if (isItemInArray(snake, [x, y])) {
		createTarget(snake);
	}

	return [x, y];
}

function getStepInterval(length: number): number {
	const interval = 1000 - (length / cellsCount) * 1000;

	if (interval < 500) {
		return 500;
	}

	return interval;
}
