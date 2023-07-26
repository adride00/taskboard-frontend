import { useEffect, useState } from 'react'
import Title from '../components/Title'
import PageComponents from '../components/PageComponents'
import labels from '../assets/icons/labels.svg'
import DataTable from '../components/DataTable'
import axiosInstance from '../service/axios'
import Button from '@mui/material/Button'
import ModalForm from '../components/ModalForm'
import { set } from 'react-hook-form'
const VISIBLE_FIELDS = ['id', 'name', 'description', 'action']

export default function Labels() {
	const [data, setData] = useState([])
	const [open, setOpen] = useState(false)
	const [dataEdit, setDataEdit] = useState([])
	const [isEditing, setIsEditing] = useState(false)
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setDataEdit([])
	}

	const getData = async () => {
		let { data } = await axiosInstance.get('/labels')
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

				const handleEdit = async () => {
					let { data: label } = await axiosInstance.get(`/label/${id}`)

					setDataEdit({
						name: label.data.name,
						description: label.data.description,
						id: label.data.id,
					})
					handleClickOpen()
					setIsEditing(true)
				}

				const handleDelete = async () => {
					let { data } = await axiosInstance.put(`/deleteLabel/${id}`, {
						showSuccessAlert: true,
					})
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
			<PageComponents name={'Labels'} icon={labels}>
				<Button
					variant='outlined'
					onClick={() => {
						handleClickOpen()
						setIsEditing(false)
					}}
				>
					New label
				</Button>
				<ModalForm
					open={open}
					handleClose={handleClose}
					getData={getData}
					dataEdit={dataEdit}
					isEditing={isEditing}
				/>
				<DataTable data={data} fields={VISIBLE_FIELDS} cols={cols} />
			</PageComponents>
		</>
	)
}
