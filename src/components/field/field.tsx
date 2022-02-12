import React from 'react';

export interface FieldProps {
	size: number;
	className?: string;
	getClassName: (index: number) => string;
}

export function Field(props: FieldProps): JSX.Element {
	const { size, getClassName, className } = props;

	return (
		<div className={ className } style={{ '--size': size }}>
			{ Array.from({ length: size * size }, (_, index) => (
				<div key={ index } className={ getClassName(index) } />
			)) }
		</div>
	);
}
