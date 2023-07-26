import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import LabelIcon from '@mui/icons-material/Label'
import { NavLink } from 'react-router-dom'
import TaskIcon from '@mui/icons-material/Task'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
const ITEMS_BUTTONS = [
	{
		id: 1,
		icon: <LabelIcon />,
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
	{
		id: 4,
		icon: <ListAltIcon />,
		text: 'Projects',
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
