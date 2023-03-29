import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from "Common/Button";

interface IAppProps {
	title: string;
}

const ButtonStyles: React.CSSProperties = {
	color: "red",
	padding: "10px"
};

export const App: React.FC<IAppProps> = (props): React.ReactElement => {
	
	const onButtonClick = ():void => {
		console.log("clicked!");
	};
	
	return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						{props.title}
					</p>
					<Button style={ButtonStyles} buttonTitle={"Hey"} onClick={onButtonClick}/>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
			</div>
		);
};