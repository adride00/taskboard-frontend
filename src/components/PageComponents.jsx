import React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'

export default function PageComponents({ name, icon }) {
	const [expanded, setExpanded] = React.useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<Card sx={{ width: '100%', margin: '0 auto' }}>
			<CardHeader
				avatar={<img src={icon} alt='' width={40} height={40} />}
				titleTypographyProps={{ variant: 'h6' }}
				title={name}
				subheader=''
			/>

			<CardContent></CardContent>
		</Card>
	)
}
