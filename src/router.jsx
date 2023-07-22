import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Users from './views/Users'
import Login from './views/Login'
import Signup from './views/Signup'
import GuestLayout from './components/GuestLayout'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Dashboard />,
		children: [
			{
				path: '/users',
				element: <Users />,
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
