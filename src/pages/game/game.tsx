import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Field } from '../../components/field/field';
import { Navigation } from '../../components/navigation/navigation';
import { useKeyboard } from '../../hooks';
import { Point, Snake } from '../../types';
import { createTarget } from '../../utils/create-target';
import { getStepInterval } from '../../utils/get-step-interval';
import { isItemInArray } from '../../utils/is-item-in-array';
import s from './game.module.css';



export interface GameProps {
	timer: React.MutableRefObject<number | null>;
	snake: Snake;
	setSnake: (snake: Snake) => void;
	size: number;
}

export function Game(props: GameProps): JSX.Element {
	const { timer, snake, setSnake, size } = props;
	const [target, setTarget] = useState<Point>(createTarget(snake, size));
	const [direction, setDirection] = useState<Point | null>(null);
	const step = useCallback(
		(point: Point) => {
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
		},
		[target, snake]
	);

	useKeyboard({ navigation: step });

	useEffect(
		() => () => {
			if (timer.current) {
				clearInterval(timer.current);
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
	
			timer.current = window.setInterval(
				() => step(direction),
				getStepInterval(snake.length, size * size)
			);
		},
		[direction, snake, step]
	);

	return (
		<>
			<Field
				size={size}
				className={s.field}
				getClassName={getClassName}
			/>
			<Navigation />
		</>
	);

	function getClassName(index: number): string {
		const [x, y] = target;
		const row = Math.floor(index / size);
		const cell = index - row * size;
		const isSnake = isItemInArray(snake, [cell, row]);
		const [headX, headY] = snake[snake.length - 1];
		const isSnakeHead = headX === cell && headY === row;
		const isTarget = x === cell && y === row;

		return classNames(
			s.cell,
			isSnake && s.snake,
			isSnakeHead && s['snake-head'],
			isTarget && s.target
		);
	}
}
