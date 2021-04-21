import React from 'react';

import { SizeList } from './constants';

export interface SetupProps {
	onStart: () => void;
	setSize: (size: number) => void;
	size: number;
}

export function Setup(props: SetupProps): JSX.Element {
	const { onStart, size, setSize } = props;

	return (
		<div>
			<label>
				Small
				<input
					type="radio"
					name="size"
					onChange={ handleChange }
					checked={ size === SizeList.Small }
					value={ SizeList.Small }
				/>
			</label>
			<label>
				Medium
				<input
					type="radio"
					name="size"
					onChange={ handleChange }
					checked={ size === SizeList.Medium }
					value={ SizeList.Medium }
				/>
			</label>
			<label>
				Large
				<input
					type="radio"
					name="size"
					onChange={ handleChange }
					checked={ size === SizeList.Large }
					value={ SizeList.Large }
				/>
			</label>
			<button onClick={ onStart }>Start</button>
		</div>
	);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setSize(Number(event.target.defaultValue));
	}
}
