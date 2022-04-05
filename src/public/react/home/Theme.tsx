import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#3b617b',
			light: '#627c95',
			dark: '#2a4558',
		},
		secondary: {
			main: '#ffb000',
		},
		background: {
			default: '#303030',
			paper: '#424242',
		},
	},
});

export default theme;
