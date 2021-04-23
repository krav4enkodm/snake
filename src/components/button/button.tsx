import React from 'react'
import classNames from 'classnames';

import s from './button.module.css';

export interface ButtonProps {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

export function Button(props: ButtonProps): JSX.Element {
	const { children, className, ...rest } = props;
	return (
		<button className={ classNames(s.button, className) } { ...rest }>
			{ children }
		</button>
	);
}
