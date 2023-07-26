import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import axiosInstance from '../service/axios';
import { useForm } from 'react-hook-form';





function FormTask() {

    const [selectedProject, setSelectedProject] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('');
    const [selectedUser, setSelectedUser] = useState({ name: "", id: 0 });

    const [dataLabels, setDataLabels] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);
    const [dataProject, setDataProject] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: '',
        label_name: '',
        project_name: '',
        status: "active",
        user_id: 1,
        user_name: '',
        deadline: "2023-07-07T00:00:00.0000"
    });


    const getData = async () => {
        try {
            const labels = await axiosInstance.get('/labels');
            setDataLabels(labels.data);
            // console.log(labels.data)

            const users = await axiosInstance.get('/users');
            setDataUsers(users.data);
            // console.log(users.data)

            const projects = await axiosInstance.get('/projects');
            setDataProject(projects.data);
            // console.log(projects.data)


        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleCreateTask = async () => {
        let us_id = parseInt(selectedUser["id"])
        let us_name = selectedUser["name"]

        console.log("Project", selectedProject)
        console.log("Label", selectedLabel)
        console.log("user id", us_id)
        console.log("username", us_name)

        try {
            console.log("creando tarear nueva")
            await axiosInstance.post('/tasks', newTask);
            setNewTask({
                title: '',
                description: '',
                priority: '',
                label_name: selectedLabel,
                project_name: selectedProject,
                user_id: us_id,
                user_name: us_name,
            });
            getData();
            console.log("New task created!");

        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='mb-3'>
                New Task
            </Button>

            <Box>
                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header closeButton>
                        <Modal.Title>Create Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    autoFocus
                                    name="title"
                                    label="title"
                                    value={newTask.title}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Select Project</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={selectedProject}
                                    onChange={(event) => setSelectedProject(event.target.value)}>
                                    {dataProject.map((project) =>
                                        <option value={project.name} key={project.id}>{project.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Select Label</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={selectedLabel}
                                    onChange={(event) => setSelectedLabel(event.target.value)}>
                                    {dataLabels.map((label) =>
                                        <option value={label.name} key={label.id} >{label.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Select User</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={selectedUser["name"]}
                                    onChange={(event) => setSelectedUser({
                                        name: event.target.value,
                                        id: event.target.options[event.target.selectedIndex].getAttribute('data-id')
                                    })}>
                                    {dataUsers.map((user) =>
                                        <option value={user.name} key={user.id} data-id={user.id}>{user.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    name="description"
                                    label="description"
                                    value={newTask.description}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Priority</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="priority"
                                    label="priority"
                                    value={newTask.priority}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleCreateTask()}>
                            Create Task
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Box>
        </>
    );
}

export default FormTask;