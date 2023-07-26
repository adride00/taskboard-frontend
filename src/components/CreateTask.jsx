import { useEffect, useState } from 'react'
import Title from '../components/Title'
import PageComponents from '../components/PageComponents'
import labels from '../assets/icons/labels.svg'
import DataTable from '../components/DataTable'
import axiosInstance from '../service/axios'
import Button from '@mui/material/Button'
import CreateTask from '../components/CreateTask'
import Example from '../components/CreateTask'
import FormTask from '../components/CreateTask'

const VISIBLE_FIELDS = ['id', 'title', 'description', 'priority', 'action']

export default function Labels() {
	const [data, setData] = useState([])

	const getData = async () => {
		let { data } = await axiosInstance.get('/tasks')
		setData(data)
	}

	useEffect(() => {
		getData()
	}, [])

	const cols = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'name',
			headerName: 'Name',
			width: 300,
		},
		{
			field: 'title',
			headerName: 'Title',
			width: 200,
		},
		{
			field: 'description',
			headerName: 'Description',
			width: 200,
		},
		{
			field: 'priority',
			headerName: 'Priority',
			width: 200,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 400,
			renderCell: params => {
				const { id } = params.row

				const handleEdit = () => {
					console.log(id, 'edit')
				}

				const handleDelete = async id => {
					try {
						await fetch(`/tasks/${id}`, {
							method: 'PUT',
						})

						setData(prevData => prevData.filter(task => task.id !== id))
						console.log(id, 'Borrar')
					} catch (error) {
						console.error('Error borrando tarea:', error)
					}
				}
				return (
					<>
						<Button
							sx={{ margin: '10px' }}
							variant='contained'
							onClick={() => handleEdit(id)}
						>
							Editar
						</Button>
						<Button onClick={() => handleDelete(id)} variant='contained'>
							Eliminar
						</Button>
					</>
				)
			},
		},
	]
	return (
		<>
			<PageComponents name={'Tasks'} icon={labels}>
				<FormTask />
				<DataTable data={data} fields={VISIBLE_FIELDS} cols={cols} />
			</PageComponents>
		</>
	)
}
