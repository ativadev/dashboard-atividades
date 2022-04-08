import * as React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import LoginForm from './LoginForm.jsx';

const Content = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="row"
			justifyContent="center"
			alignItems="center">
			<Grid item xs={12} md={7} lg={4}>
				<Paper
					sx={{
						p: 4,
						mt: 5,
						mb: 5,
						mr: 1,
						ml: 1,
						display: 'flex',
						flexDirection: 'column',
					}}>
					<LoginForm />
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Content;
