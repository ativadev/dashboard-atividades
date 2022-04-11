import * as React from 'react';
import Typography from '@mui/material/Typography';

const Title = (props) => {
	return (
		<Typography component="h2" variant="h4" color="primary" gutterBottom>
			{props.children}
		</Typography>
	);
};

export default Title;
