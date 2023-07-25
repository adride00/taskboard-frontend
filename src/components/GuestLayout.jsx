import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import imagenLogin from '../assets/login4.png'
import { Navigate, Outlet } from 'react-router-dom'
import { userStateContext } from '../context/ContextProvider'
function GuestLayout() {
	const { currenUser, userToken } = userStateContext()
	if (userToken) {
		return <Navigate to='/' />
	}
	const defaultTheme = createTheme({
		palette: {
			mode: 'light',
			primary: {
				main: '#ab4dd0',
			},
			secondary: {
				main: '#e486a9',
			},
			background: {
				default: '#f1e8f3',
				paper: 'rgba(197,191,228,0.79)',
			},
			error: {
				main: '#d21e1e',
			},
			warning: {
				main: '#e09455',
			},
			info: {
				main: '#436987',
			},
			divider: 'rgba(183,176,176,0.12)',
		},
	})
	const handleSubmit = event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		})
	}
	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: `url(${imagenLogin})`,
						backgroundRepeat: 'no-repeat',
						backgroundColor: t =>
							t.palette.mode === 'light'
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Outlet />
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}

export default GuestLayout
