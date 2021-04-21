import React, { useCallback, useEffect, useState } from 'react';

import { Field } from '../../components/field';
import { Navigation } from '../../components/navigation';
import { createTarget, getStepInterval } from '../../utils';
import { Point, Snake } from '../../interfaces';
import { useKeyboard } from '../../hooks';

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
		() => {
			setTarget(createTarget(snake, size));
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
	
			timer.current = window.setInterval(
				() => step(direction),
				getStepInterval(snake.length, size * size)
			);
		},
		[direction, snake, step]
	);

	return (
		<>
			<Field snake={snake} size={size} target={target} />
			<Navigation step={step} />
		</>
	);
}
