import React from 'react';

import { offset, KeyCodes } from '../../constants';
import { Point } from '../../interfaces';

import s from './navigation.module.css';

export interface NavigationProps {
	step: (point: Point) => () => void;
}

export function Navigation(props: NavigationProps): JSX.Element {
	const { step } = props;
	return (
		<div className={s.navigation}>
			<button onClick={step(offset[KeyCodes.Up])}>up</button>
			<button onClick={step(offset[KeyCodes.Down])}>down</button>
			<button onClick={step(offset[KeyCodes.Left])}>left</button>
			<button onClick={step(offset[KeyCodes.Right])}>right</button>
		</div>
	);
}
