import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

export default function PageComponents({ name, icon, children }) {
	return (
		<Card sx={{ width: '100%', margin: '0 auto' }}>
			<CardHeader
				avatar={<img src={icon} alt='' width={40} height={40} />}
				titleTypographyProps={{ variant: 'h6' }}
				title={name}
				subheader=''
			/>

			<CardContent>{children}</CardContent>
		</Card>
	)
}
