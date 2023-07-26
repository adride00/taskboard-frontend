import { useEffect, useState } from 'react'
import Title from '../components/Title'
import PageComponents from '../components/PageComponents'
import labels from '../assets/icons/labels.svg'
import DataTable from '../components/DataTable'
import axiosInstance from '../service/axios'
import Button from '@mui/material/Button'
import NewProject from '../components/NewProject'

const VISIBLE_FIELDS = ['id', 'name', 'description', 'action']

export default function Projects() {
	const [data, setData] = useState([])

	const getData = async () => {
		let { data } = await axiosInstance.get('/projects')
		let activos = data.filter(item => item.status === 'active')
		setData(activos)
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
			field: 'description',
			headerName: 'Description',
			width: 200,
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 400,
			renderCell: params => {
				const { id } = params.row

				const handleEdit = () => {
					console.log('Edit button clicked for ID:', id)
				}

				const handleDelete = async id => {
					await axiosInstance.put(`/deleteProject/${id}`)
					getData()
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
						<Button
							sx={{ margin: '10px' }}
							variant='contained'
							onClick={() => handleDelete(id)}
						>
							Eliminar{' '}
						</Button>
					</>
				)
			},
		},
	]

	return (
		<>
			<PageComponents name={'Projects'} icon={labels}>
				<NewProject getData={getData} />
				<DataTable data={data} fields={VISIBLE_FIELDS} cols={cols} />
			</PageComponents>
		</>
	)
}
