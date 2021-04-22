import React, { CSSProperties, useMemo } from 'react';
import classNames from 'classnames';

import { SizeList } from './constants';

import s from './setup.module.css';

const sizeList = [
	SizeList.ExtraSmall,
	SizeList.Small,
	SizeList.Medium,
	SizeList.Large,
	SizeList.ExtraLarge
];
const cellCount = sizeList.length * sizeList.length;

export interface SetupProps {
	size: number;
	setSize: (size: number) => void;
	onStart: () => void;
}

export function Setup(props: SetupProps): JSX.Element {
	const { size, setSize, onStart } = props;
	const selectedIndex = useMemo(
		() => sizeList.findIndex((item) => item === size),
		[size]
	);

	return (
		<>
			<div className={ s.table } style={{ '--size': sizeList.length } as CSSProperties}>
				{Array.from({ length: cellCount }, (_, i) => {
					const row = Math.floor(i / sizeList.length);
					const cell = i - row * sizeList.length;
					const isSelected =
						cell <= selectedIndex &&
						row <= selectedIndex;
					const cellClassNames = classNames(
						s.cell,
						isSelected && s.cell_selected
					);
					return <div key={i} className={cellClassNames} />;
				})}
			</div>
			<form className={ s.container } onSubmit={onStart}>
				<div className={ s.size }>
					{sizeList.map((value: number) => {
						const title = getTitle(value)
						return (
							<React.Fragment key={title}>
								<input
									id={title}
									className={ s.radio }
									type='radio'
									name='size'
									value={value}
									onChange={handleChange}
									checked={size === value}
								/>
								<label className={ s.label } htmlFor={title}>
									{getTitle(value)} {`(${value}x${value})`}
								</label>
							</React.Fragment>
						)
					})}
				</div>
				<button className={ s.submit }>Start</button>
			</form>	
		</>
	);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setSize(Number(event.target.defaultValue));
	}
}

function getTitle(value: SizeList): string {
	switch (value) {
		case SizeList.ExtraSmall:
			return 'xs';
		case SizeList.Small:
			return 's';
		case SizeList.Medium:
			return 'm';
		case SizeList.Large:
			return 'l';
		case SizeList.ExtraLarge:
			return 'xl';
		default:
			return '';
	}
}
