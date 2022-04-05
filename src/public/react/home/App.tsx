'use strict';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import theme from './Theme.jsx';
import { ThemeProvider, styled } from '@mui/material/styles';

import Navbar from './Navbar.jsx';

const App = () => {
	return (
		<>
			<Navbar title={'Dashboard'} />
			<h1>{'Salve!'}</h1>
		</>
	);
};

const root = document.getElementById('app-root');
const app = (
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);

ReactDOM.render(app, root);
