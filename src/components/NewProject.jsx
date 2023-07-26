import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import axiosInstance from '../service/axios';

export default function NewProject({ getData }) {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async datos => {
    await axiosInstance.post('/projects', datos, {
      showSuccessAlert: true,
    });
    getData();
    setShowForm(false); // Oculta el formulario después de enviar los datos
  };

  return (
    <>
      {!showForm ? (
        <Button variant='contained' onClick={() => setShowForm(true)}>
          New Project
        </Button>
      ) : (
        <Box>
          <Typography component='h1' variant='h5'>
            New Project
          </Typography>
          {/* Resto del formulario */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={5}>
                <TextField
                  autoComplete='given-name'
                  name='name'
                  required
                  fullWidth
                  id='name'
                  label='Nombre de proyecto'
                  autoFocus
                  {...register('name', { required: 'Nombre es requerido' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  required
                  fullWidth
                  id='description'
                  label='Descripcion'
                  name='description'
                  autoComplete='description'
                  {...register('description', { required: 'Descripcion es requerida' })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' sx={{ mt: 2 }}>
              Enviar
            </Button>
          </form>
          <Button variant='contained' onClick={() => setShowForm(false)} sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      )}
    </>
  );
}
