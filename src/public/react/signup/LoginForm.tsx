'use strict';

import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Title from './Title.jsx';

const LoginForm = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		console.log('Submetido!');
		console.table({ username, password });
	};

	return (
		<Box>
			<form onSubmit={handleSubmit} id="login-form" method="POST">
				<Stack
					spacing={1}
					direction="column"
					justifyContent="center"
					alignItems="center">
					<Title>CADASTRO</Title>
				</Stack>
				<Stack
					direction="column"
					spacing={2}
					justifyContent="center"
					alignItems="stretch"
					sx={{ margin: 2 }}>
					<TextField
						fullWidth
						required
						id="username"
						label="Usuário"
						variant="outlined"
						value={username}
						onChange={handleUsernameChange}
						inputProps={{ name: 'username' }}
					/>
					<TextField
						fullWidth
						required
						id="email"
						label="E-mail"
						variant="outlined"
						value={email}
						onChange={handleEmailChange}
						inputProps={{ name: 'email' }}
					/>

					<TextField
						fullWidth
						required
						id="password"
						label="Senha"
						variant="outlined"
						type="password"
						value={password}
						onChange={handlePasswordChange}
						inputProps={{ name: 'password' }}
					/>
				</Stack>
				<Stack
					spacing={2}
					direction="row"
					justifyContent="space-evenly"
					alignItems="center">
					<Button type="button" variant="outlined" size="large" color="primary">
						CADASTRAR
					</Button>
					<Button
						type="submit"
						variant="contained"
						size="large"
						color="secondary">
						ENTRAR
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default LoginForm;
