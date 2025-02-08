import { Box, Button, Card, FormControl, styled, TextField } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import useForm from '../../hooks/useForm'
import { Fragment, useState } from 'react';

const TableFilter = styled(Box)(({ column }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${column}, 1fr);`,
  gap: '10px'
}))

const Tr = styled(Box)(() => (
  {
    display: 'contents'
  }
))

const Td = styled(Box)(({ spacing }) => ({
  padding: `${spacing}px`,
  textAlign: 'center',
}))
const FilterComponent = ({ values, toggleDrawer }) => {

  const [openFilters, setOpenFilters] = useState(false)
  const { register, formData, resetForm } = useForm()
  const toggleFilter = () => setOpenFilters(!openFilters)
  const handleFilters = () => {
    console.log('datos enviados', formData)
  }
  const handleReset = () => {
    resetForm()
  }
  return (
    <Fragment>
      <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Button variant="contained" sx={{ height: 43 }} onClick={toggleFilter}>
          {openFilters ? 'Cerrar filtrado' : 'Filtrar por columnas'}
        </Button>
        <Button sx={{ mb: 2, mt: { xs: 3, sm: 0 } }} onClick={toggleDrawer} variant='contained'>
          Nuevo registro
        </Button>

      </Box>
      {openFilters && (
        <Card sx={{ p: 2 }}>
          <TableFilter column={values.length}>
            <Tr>
              {values.map((value, index) => (
                <Td spacing={1} key={index}>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <TextField label={value.label}
                      variant='standard'
                      {...register(value.field)}
                      fullWidth
                      autoComplete='off'
                      InputProps={{
                        startAdornment: <FilterListIcon />,
                      }}
                    />
                  </FormControl>
                </Td>
              ))}
            </Tr>
          </TableFilter>
          <Box>
          <Button variant="contained" sx={{ mr: 3 }} onClick={handleFilters}>Filtrar</Button>
          <Button variant="outlined" onClick={handleReset}>Restablecer</Button>
          </Box>
        </Card>
      )}
    </Fragment>
  )
}
export default FilterComponent