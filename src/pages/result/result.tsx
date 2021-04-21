import React from 'react';

import s from './result.module.css';

export interface ResultProps {
	result: boolean;
}

export function Result(props: ResultProps): JSX.Element {
	const { result } = props;
	return <h1 className={ s.result }>{ result ? 'Win' : 'Game over' }</h1>;
}
