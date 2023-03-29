import React from "react";
import { makeStyles, Theme, Button, TextField } from '3rd-party-ui/material-ui/components';
import { useAuth } from "Login/hooks/useAuth";


const useStyles = makeStyles((theme: Theme) => ({
	login: {
		display: "flex",
		flexDirection: "column",
		width: "325px",
		margin: "0 auto"
	},
	formField: {
		marginBottom: "10px",
	}
}));


export const NewLogin: React.FC = (): React.ReactElement => {

	const classes = useStyles();
	const auth = useAuth();

	const [email, setEmail] = React.useState<string>(``);
	const [password, setPassword] = React.useState<string>(``);
	
	const onLogin = async(): Promise<void> => {
		try {				
			const userInfo = await auth?.signin(email, password);
			console.log(JSON.stringify(userInfo));
		}
		catch (err) {
			console.log(err);
		}
	}

	const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const value: string = event.target.value as string;
		setEmail(value);
	};

	const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const value: string = event.target.value as string;
		setPassword(value);
	};

	return(
		<div className={classes.login}>
			<TextField
				className={classes.formField}
				variant="outlined"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
				value={email} 
				onChange={onEmailChanged}
			/>
			<TextField
				className={classes.formField}
				variant="outlined"
				required
				fullWidth
				id="password"
				label="Password"
				type="password"
				name="password"
				autoComplete="password"
				autoFocus
				value={password} 
				onChange={onPasswordChanged}
			/>
			<Button 
				variant="contained" 
				color="primary" 
				onClick={onLogin}
				fullWidth
			>Log in</Button>
		</div>
	);
}