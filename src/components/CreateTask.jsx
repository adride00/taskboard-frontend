import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import axiosInstance from '../service/axios'
import { useForm } from 'react-hook-form'
import '../assets/css/FormTask.css'

function FormTask({ update }) {
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const [dataLabels, setDataLabels] = useState([])
	const [dataUsers, setDataUsers] = useState([])
	const [dataProject, setDataProject] = useState([])

	const [newTask, setNewTask] = useState({
		title: '',
		description: '',
		deadline: '',
		priority: '',
		project_id: '',
		user_id: '',
		label_id: '',
	})

	const getData = async () => {
		try {
			const labels = await axiosInstance.get('/labels')
			const users = await axiosInstance.get('/users')
			const projects = await axiosInstance.get('/projects')

			setDataLabels(labels.data)
			setDataUsers(users.data)
			setDataProject(projects.data)
		} catch (error) {
			console.error('Error fetching tasks:', error)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const handleCreateTask = async () => {
		try {
			const newTaskData = {
				...newTask,
				label_id: newTask.label_id === '' ? null : parseInt(newTask.label_id),
				user_id: newTask.user_id === '' ? null : parseInt(newTask.user_id),
				project_id:
					newTask.project_id === '' ? null : parseInt(newTask.project_id),
			}

			console.log(newTaskData)
			await axiosInstance.post('/tasks', newTask)
			setNewTask({
				title: '',
				description: '',
				deadline: '',
				priority: '',
				project_id: '',
				user_id: '',
				label_id: '',
			})
			getData()
			console.log('New task created!')
			update()
		} catch (error) {
			console.error('Error creating task:', error)
		}
	}

	const handleInputChange = event => {
		console.log(event.target.value)
		const { name, value } = event.target
		setNewTask({
			...newTask,
			[name]: value,
		})
	}

	return (
		<>
			<Button onClick={handleShow} className='mb-3 btn buttom-new-task'>
				New Task
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Create Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								autoFocus
								name='title'
								label='title'
								value={newTask.title}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Select Project</Form.Label>
							<Form.Select
								name='project_id'
								aria-label='Default select example'
								value={newTask.project_id}
								onChange={handleInputChange}
							>
								<option value=''>Select a project...</option>
								{dataProject.map(project => (
									<option value={project.id} key={project.id}>
										{project.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Select Label</Form.Label>
							<Form.Select
								name='label_id'
								aria-label='Default select example'
								value={newTask.label_id}
								onChange={handleInputChange}
							>
								<option value=''>Select a label...</option>
								{dataLabels.map(label => (
									<option value={label.id} key={label.id}>
										{label.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Select User</Form.Label>
							<Form.Select
								name='user_id'
								aria-label='Default select example'
								value={newTask.user_id}
								onChange={handleInputChange}
							>
								<option value=''>Select a user...</option>
								{dataUsers.map(user => (
									<option value={user.id} key={user.id}>
										{user.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group
							className='mb-3'
							controlId='exampleForm.ControlTextarea1'
						>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								name='description'
								label='description'
								value={newTask.description}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Priority</Form.Label>
							<Form.Control
								type='text'
								name='priority'
								label='priority'
								value={newTask.priority}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Deadline</Form.Label>
							<Form.Control
								type='date'
								name='deadline'
								label='deadline'
								value={newTask.deadline}
								onChange={handleInputChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleCreateTask}>
						Create Task
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default FormTask
