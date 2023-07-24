import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Signup from './views/Signup'
import GuestLayout from './components/GuestLayout'
import Labels from './views/Labels'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		children: [
			{
				path: '/labels',
				element: <Labels />,
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
