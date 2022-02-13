import React, { useMemo } from 'react';
import classNames from 'classnames';

import { SizeList } from './constants';
import { Button } from '../../components/button/button';

import s from './setup.module.css';
import { Field } from '../../components/field/field';

const sizeList = [
	SizeList.ExtraSmall,
	SizeList.Small,
	SizeList.Medium,
	SizeList.Large,
	SizeList.ExtraLarge
];

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
			<Field
				size={sizeList.length}
				className={s.table}
				getClassName={getClassName}
			/>
			<form className={s.container} onSubmit={onStart}>
				<div className={s.radiogroup}>
					{sizeList.map((value: number) => {
						const title = getTitle(value)
						return (
							<React.Fragment key={title}>
								<input
									id={title}
									className={s.radio}
									type='radio'
									name='size'
									value={value}
									onChange={handleChange}
									checked={size === value}
								/>
								<label className={s.label} htmlFor={title}>
									{getTitle(value)} {`(${value}x${value})`}
								</label>
							</React.Fragment>
						)
					})}
				</div>
				<Button className={s.submit}>Start</Button>
			</form>	
		</>
	);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setSize(Number(event.target.defaultValue));
	}

	function getClassName(index: number): string {
		const row = Math.floor(index / sizeList.length);
		const cell = index - row * sizeList.length;
		const isSelected = cell <= selectedIndex && row <= selectedIndex;
		return classNames(s.cell, isSelected && s['cell-selected']);
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
