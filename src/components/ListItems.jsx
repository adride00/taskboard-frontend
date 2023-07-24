import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { NavLink } from 'react-router-dom'

const ITEMS_BUTTONS = [
	{
		id: 1,
		icon: <PeopleIcon />,
		text: 'Labels',
	},
	{
		id: 2,
		icon: <PeopleIcon />,
		text: 'Tasks',
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
