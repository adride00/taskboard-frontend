import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import axiosInstance from '../service/axios';

export default function NewProject({ getData, editingData }) {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingData) {
      setIsEditing(true);
      setShowForm(true);
      reset(editingData);
    } else {
      setIsEditing(false);
      reset();
    }
  }, [editingData, reset]);

  const onSubmit = async (datos) => {
    if (isEditing) {
      await axiosInstance.put(`/projects/${editingData.id}`, datos, {
        showSuccessAlert: true,
      });
    } else {
      await axiosInstance.post('/projects', datos, {
        showSuccessAlert: true,
      });
    }

    getData();
    setShowForm(false);
    setIsEditing(false);
    reset();
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    reset({}); // vaciar formulario
  };

  return (
    <>
      {!showForm ? (
        <Button variant='contained' onClick={handleFormToggle}>
          New Project
        </Button>
      ) : (
        <Box>
          <Typography component='h1' variant='h5'>
            {isEditing ? 'Edit Project' : 'New Project'}
          </Typography>
        
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
              {isEditing ? 'Guardar Cambios' : 'Enviar'}
            </Button>
          </form>
          <Button variant='contained' onClick={handleFormToggle} sx={{ mt: 2 }}>
            Descartar
          </Button>
        </Box>
      )}
    </>
  );
}
