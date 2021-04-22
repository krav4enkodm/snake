import React from 'react';
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

	const rows = [];

	for (let i = 0; i < size; i++) {
		const cells = [];

		for (let j = 0; j < size; j++) {
			const isSnake = isItemInArray(snake, [j, i]);
			const isTarget = x === j && y === i;
			const className = classNames(
				s.cell,
				isSnake && s.snake,
				isTarget && s.target
			);

			cells.push(<td key={j} className={ className } />);
		}

		rows.push(<tr key={i}>{cells}</tr>);
	}

	return (
		<table className={s.field}>
			<tbody>{rows}</tbody>
		</table>
	);
}
