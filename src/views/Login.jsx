import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import axiosInstance from '../service/axios'
import { useForm } from 'react-hook-form'
import { userStateContext } from '../context/ContextProvider'
function Login() {
	const { setCurrentUser, setUserToken } = userStateContext()
	const form = useForm({
		email: '',
		password: '',
	})
	const { register, handleSubmit, watch, formState } = form
	const { errors } = formState
	const onSubmit = async datos => {
		let { data } = await axiosInstance.post('/login', datos, {
			showSuccessAlert: true,
			showErrorAlert: true,
		})
		setCurrentUser(data.data)
		setUserToken(data.access_token)
	}
	return (
		<>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component='h1' variant='h5'>
				Sign in
			</Typography>
			<Box
				component='form'
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				sx={{ mt: 1 }}
			>
				<TextField
					margin='normal'
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					autoComplete='email'
					autoFocus
					{...register('email', { required: 'Email es requerido' })}
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					autoComplete='current-password'
					{...register('password', { required: 'Passord es requerido' })}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>

				<Button
					type='submit'
					fullWidth
					variant='contained'
					sx={{ mt: 3, mb: 2 }}
				>
					Sign In
				</Button>
				<Grid container>
					<Grid item>
						<Link to='/signup' variant='body2'>
							{'No tienes una cuenta? Registrate'}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default Login
