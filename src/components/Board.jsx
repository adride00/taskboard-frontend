import React, { useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import axiosInstance from '../service/axios'
import { Chip, Divider, Stack, Typography } from '@mui/material'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
function App() {
	const [data, setData] = useState([])
	const [colors, setColors] = useState({
		pendiente: '#ECA697 ',
		realizando: '#ada07b',
		finalizada: '#438714',
	})

	const [columns, setColumns] = useState({
		['pendientes']: {
			name: 'Pendientes',
			items: [],
		},
		['enProceso']: {
			name: 'En proceso',
			items: [],
		},
		['finalizada']: {
			name: 'Finalizada',
			items: [],
		},
	})
	const getData = async () => {
		let { data } = await axiosInstance.get('/filterByUser/1', {
			showErrorAlert: true,
		})
		setData(data)
	}

	const updateStatus = async (id, status) => {
		let { data } = await axiosInstance.put(`/updateProgress/${id}`, {
			status: status,
		})
		getData()
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		if (!data) return
		let pendientes = data.filter(
			item => item.status === 'active' || item.status === 'pendientes',
		)
		let enProceso = data.filter(item => item.status === 'enProceso')
		let finalizada = data.filter(item => item.status === 'finalizada')
		// convertir el id en string
		let pendientes2 = pendientes.map(item => {
			return { ...item, id: item.id.toString(), colorStatus: colors.pendiente }
		})
		let enProceso2 = enProceso.map(item => {
			return { ...item, id: item.id.toString(), colorStatus: colors.realizando }
		})
		let finalizada2 = finalizada.map(item => {
			return { ...item, id: item.id.toString(), colorStatus: colors.finalizada }
		})
		setColumns({
			['pendientes']: {
				name: 'Pendientes',
				items: pendientes2,
			},
			['enProceso']: {
				name: 'En proceso',
				items: enProceso2,
			},
			['finalizada']: {
				name: 'Finalizada',
				items: finalizada2,
			},
		})
	}, [data])

	const onDragEnd = (result, columns, setColumns) => {
		if (!result.destination) return
		const { source, destination } = result

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId]
			const destColumn = columns[destination.droppableId]
			const sourceItems = [...sourceColumn.items]
			const destItems = [...destColumn.items]
			const [removed] = sourceItems.splice(source.index, 1)
			destItems.splice(destination.index, 0, removed)
			setColumns({
				...columns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems,
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems,
				},
			})

			// obtener el id del array de objetos de destItems y convertirlo en number, pero tomando el id del elemento que se movio
			let idNumber = Number(destItems[destination.index].id)

			updateStatus(idNumber, destination.droppableId)
		} else {
			const column = columns[source.droppableId]
			const copiedItems = [...column.items]
			const [removed] = copiedItems.splice(source.index, 1)
			copiedItems.splice(destination.index, 0, removed)
			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems,
				},
			})
		}
	}
	return (
		<div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
			<DragDropContext
				onDragEnd={result => onDragEnd(result, columns, setColumns)}
			>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
							key={columnId}
						>
							<h2>{column.name}</h2>
							<div style={{ margin: 8 }}>
								<Droppable droppableId={columnId} key={columnId}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													background: snapshot.isDraggingOver
														? 'lightblue'
														: 'lightgrey',
													padding: 4,
													width: 250,
													minHeight: 500,
												}}
											>
												{column.items.map((item, index) => {
													return (
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}
														>
															{(provided, snapshot) => {
																return (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		style={{
																			borderRadius: '10px',
																			userSelect: 'none',
																			padding: 16,
																			margin: '0 0 8px 0',
																			minHeight: '50px',
																			backgroundColor: item.colorStatus,
																			color: 'white',
																			...provided.draggableProps.style,
																		}}
																	>
																		<Typography
																			sx={{
																				width: '100%',
																				whiteSpace: 'nowrap',
																				overflow: 'hidden',
																				textOverflow: 'ellipsis',
																			}}
																			component='div'
																			variant='h6'
																		>
																			{item.title}
																		</Typography>
																		<Divider variant='middle' />
																		<Typography
																			variant='subtitle1'
																			color='text.secondary'
																			component='div'
																		>
																			{item.description}
																		</Typography>

																		<Divider variant='middle' />

																		<Stack direction='row' spacing={1}>
																			<Chip
																				icon={<BookmarksIcon />}
																				label={item.label_name}
																				variant='outlined'
																			/>
																		</Stack>
																	</div>
																)
															}}
														</Draggable>
													)
												})}
												{provided.placeholder}
											</div>
										)
									}}
								</Droppable>
							</div>
						</div>
					)
				})}
			</DragDropContext>
		</div>
	)
}

export default App
