import React, { useState } from 'react'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const UserComponent = ({ name }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleMenuOpen = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		window.location.href = '/login'
	}

	return (
		<div>
			<Button color='inherit' onClick={handleMenuOpen}>
				{name}
				<AccountCircleIcon />
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleMenuClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				{/* Aquí puedes agregar las opciones que deseas mostrar en el menú desplegable */}
				<MenuItem
					onClick={() => {
						handleMenuClose()
						handleLogout()
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</div>
	)
}

export default UserComponent
