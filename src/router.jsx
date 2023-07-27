import { Navigate, createBrowserRouter } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Signup from './views/Signup'
import GuestLayout from './components/GuestLayout'
import Labels from './views/Labels'
import Tasks from './views/Tasks'
import TaskBoard from './views/TaskBoard'
import Projects from './views/Projects'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		children: [
			{
				path: '/taskboard',
				element: <Navigate to='/' />,
			},
			{
				path: '/',
				element: <TaskBoard />,
			},
			{
				path: '/labels',
				element: <Labels />,
			},
			{
				path: '/tasks',
				element: <Tasks />,
			},
			{
				path: '/projects',
				element: <Projects />,
			},
		],
	},

	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
		],
	},
])

export default router
