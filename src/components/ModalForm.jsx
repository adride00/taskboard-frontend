import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { useForm } from 'react-hook-form'
import axiosInstance from '../service/axios'
import { Box, Grid, TextField } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function AlertDialogSlide({
	open,
	handleClose,
	getData,
	dataEdit,
	isEditing,
}) {
	const [error, setError] = useState(null)
	console.log(isEditing)

	const form = useForm()
	const { register, handleSubmit, setValue, formState, reset } = form
	const { errors } = formState

	useEffect(() => {
		if (dataEdit) {
			setValue('name', dataEdit.name || '')
			setValue('description', dataEdit.description || '')
		}
	}, [dataEdit, setValue])

	const onSubmit = async datos => {
		if (isEditing) {
			await axiosInstance.put(`/label/${dataEdit.id}`, datos, {
				showSuccessAlert: true,
			})
		} else {
			await axiosInstance.post('/labels', datos, {
				showSuccessAlert: true,
			})
		}

		getData()
		handleClose()
	}

	// Function to reset the form data when the modal is closed
	const handleModalClose = () => {
		reset()
		handleClose()
	}

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleModalClose} // Use the new handler that resets the form data
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle>{dataEdit ? 'Editar' : 'Crear Nuevo Label'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'></DialogContentText>
				</DialogContent>
				<DialogContent>
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
									focused={true}
									id='name'
									label='Nombre Label'
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
									focused={true}
									id='description'
									label='Descripcion'
									name='description'
									autoComplete='description'
									{...register('description', {
										required: 'Descripcion es requerido',
									})}
									error={!!errors.description}
									helperText={errors.description?.message}
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
							Create
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item></Grid>
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleModalClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
