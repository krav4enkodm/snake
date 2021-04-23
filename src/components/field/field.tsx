import React, { CSSProperties } from 'react';

export interface FieldProps {
	size: number;
	className?: string;
	getClassName?: (index: number) => string;
}

export function Field(props: FieldProps): JSX.Element {
	const { size, getClassName, className } = props;

	return (
		<div className={ className } style={{ '--size': size } as CSSProperties}>
			{ Array.from({ length: size * size }, (_: undefined, i: number) => (
				<div key={ i } className={ getClassName?.(i) } />
			)) }
		</div>
	);
}
