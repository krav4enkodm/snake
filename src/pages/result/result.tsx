import React from 'react';
import { Button } from '../../components/button/button';

import s from './result.module.css';

export interface ResultProps {
	result: boolean;
	onEnd: () => void;
}

export function Result(props: ResultProps): JSX.Element {
	const { result, onEnd } = props;
	return (
		<div className={ s.container }>
			<h1 className={ s.result }>{ result ? 'Congratulations!' : 'Game over' }</h1>
			<Button onClick={ onEnd }>Home</Button>
		</div>
	);
}
