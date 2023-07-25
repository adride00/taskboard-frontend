import React, { useMemo } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

export default function DataTable({ data, fields, cols }) {
	const columns = useMemo(
		() => cols.filter(column => fields.includes(column.field)),
		[cols],
	)

	return (
		<Box sx={{ height: 400, width: 1 }}>
			<DataGrid
				rows={data}
				columns={columns}
				disableColumnFilter
				disableColumnSelector
				disableDensitySelector
				onFilterModelChange={model => setFilterModel(model)}
				slots={{
					Toolbar: GridToolbar,
				}}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
						quickFilterProps: { debounceMs: 500 },
					},
				}}
			/>
		</Box>
	)
}
