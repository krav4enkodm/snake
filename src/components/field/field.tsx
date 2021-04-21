import React from 'react';

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
			let className;

			if (isItemInArray(snake, [j, i])) {
				className = s.snake;
			}

			if (!className) {
				className = x === j && y === i ? s.target : undefined;
			}

			cells.push(<td key={j} className={`${s.cell} ${className}`} />);
		}

		rows.push(<tr key={i}>{cells}</tr>);
	}

	return (
		<table className={s.field}>
			<tbody>{rows}</tbody>
		</table>
	);
}
