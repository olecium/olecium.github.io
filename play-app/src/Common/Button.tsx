import React from 'react';

interface IButtonProps {
	buttonTitle: string;
	style: React.CSSProperties;
	onClick: () => void;
};

export const Button: React.FC<IButtonProps> = (props):React.ReactElement => {
	return(
		<button style={props.style} onClick={props.onClick}>{props.buttonTitle}</button>
	);
};