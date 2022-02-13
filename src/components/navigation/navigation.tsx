import React from 'react';
import classNames from 'classnames';

import s from './navigation.module.css';

function NavigationFC(): JSX.Element {
	return (
		<div className={s.navigation}>
			<div className={classNames(s.key, s.left)} />
			<div className={classNames(s.key, s.down)} />
			<div className={classNames(s.key, s.up)} />
			<div className={classNames(s.key, s.right)} />
		</div>
	);
}

export const Navigation = React.memo(NavigationFC);
