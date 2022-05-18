import * as React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// import DataTable from './Table.jsx';
import Title from './Title.jsx';
import EnhancedTable from './EnhancedTable.jsx';

const Content = () => {
	return (
		<Container maxWidth="lg" sx={{ pt: 10, mt: 0, mb: 2 }}>
			<Grid container spacing={2}>
				{/* Chart */}
				<Grid item xs={12} md={8} lg={9}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 240,
						}}>
						<Title>{'MINHAS ATIVIDADES'}</Title>
					</Paper>
				</Grid>
				{/* Recent Deposits */}
				<Grid item xs={12} md={4} lg={3}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							height: 240,
						}}>
						<Title>{new Date().toLocaleDateString()}</Title>
					</Paper>
				</Grid>
				{/* Recent Orders */}
				<Grid item xs={12}>
					<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
						<Title>{'MINHAS SOLICITAÇÕES'}</Title>
						{/* <DataTable /> */}
						<EnhancedTable />
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Content;
