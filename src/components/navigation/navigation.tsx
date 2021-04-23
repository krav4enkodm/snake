import React from 'react';

import { ReactComponent as ArrowLeft } from '../../images/svg/arrow-left-solid.svg';
import { ReactComponent as ArrowDown } from '../../images/svg/arrow-down-solid.svg';
import { ReactComponent as ArrowUp } from '../../images/svg/arrow-up-solid.svg';
import { ReactComponent as ArrowRight } from '../../images/svg/arrow-right-solid.svg';

import s from './navigation.module.css';

export function Navigation(): JSX.Element {
	return (
		<div className={ s.navigation }>
			<div className={ s.key }>
				<ArrowLeft />
			</div>
			<div className={ s.key }>
				<ArrowDown />
			</div>
			<div className={ s.key }>
				<ArrowUp />
			</div>
			<div className={ s.key }>
				<ArrowRight />
			</div>
		</div>
	);
}
