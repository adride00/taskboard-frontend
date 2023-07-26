import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import PeopleIcon from '@mui/icons-material/People'
import { NavLink } from 'react-router-dom'
import TaskIcon from '@mui/icons-material/Task'
import DashboardIcon from '@mui/icons-material/Dashboard'
const ITEMS_BUTTONS = [
	{
		id: 1,
		icon: <PeopleIcon />,
		text: 'Labels',
	},
	{
		id: 2,
		icon: <TaskIcon />,
		text: 'Tasks',
	},
	{
		id: 3,
		icon: <DashboardIcon />,
		text: 'TaskBoard',
	},
]
export const mainListItems = (
	<React.Fragment>
		{ITEMS_BUTTONS.map(item => (
			<ListItemButton key={item.id}>
				<ListItemIcon>{item.icon}</ListItemIcon>
				<NavLink
					style={{ textDecoration: 'none', color: 'inherit' }}
					to={`/${item.text.toLowerCase()}`}
				>
					{item.text}
				</NavLink>
			</ListItemButton>
		))}
	</React.Fragment>
)
