import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import axiosInstance from '../service/axios'
import { useForm } from 'react-hook-form'
import { userStateContext } from '../context/ContextProvider'

export default function Signup() {
	const { setCurrentUser, setUserToken } = userStateContext()
	const [error, setError] = useState(null)

	const form = useForm({
		name: '',
		email: '',
		password: '',
	})

	const { register, handleSubmit, watch, formState } = form
	const { errors } = formState

	const onSubmit = async datos => {
		let { data } = await axiosInstance.post('/signup', datos, {
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
				Sign up
			</Typography>
			<Box
				component='form'
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				sx={{ mt: 3 }}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							autoComplete='given-name'
							name='name'
							required
							fullWidth
							id='name'
							label='Nombre'
							autoFocus
							{...register('name', { required: 'Nombre es requerido' })}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							{...register('email', { required: 'Email es requerido' })}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='new-password'
							{...register('password', { required: 'Passord es requerido' })}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
					</Grid>
					<Grid item xs={12}></Grid>
				</Grid>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					sx={{ mt: 3, mb: 2 }}
				>
					Sign Up
				</Button>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<Link to='/login' variant='body2'>
							Ya tienes una cuenta? Inicia sesion
						</Link>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}
