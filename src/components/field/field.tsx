import React, { CSSProperties } from 'react';
import classNames from 'classnames';

import { isItemInArray } from '../../utils';
import { Point } from '../../interfaces';

import s from './field.module.css';

export interface FieldProps {
	size: number;
	snake: Point[];
	target: Point;
}

export function Field(props: FieldProps): JSX.Element {
	const {
		size,
		snake,
		target: [x, y],
	} = props;

	return (
		<div className={s.field} style={{ '--size': size } as CSSProperties}>
			{ Array.from({ length: size * size }, (_: undefined, i: number) => {
				const row = Math.floor(i / size);
				const cell = i - row * size;
				const isSnake = isItemInArray(snake, [cell, row]);
				const [headX, headY] = snake[snake.length - 1];
				const isSnakeHead = headX === cell && headY === row;
				const isTarget = x === cell && y === row;;

				return (
					<div
						key={ `${row}x${cell}` }
						className={ classNames(
							s.cell,
							isSnake && s.snake,
							isSnakeHead && s.snake_head,
							isTarget && s.target
						) }
					/>
				);
			}) }
		</div>
	);
}
