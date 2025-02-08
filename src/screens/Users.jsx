import { Box, Card, CardHeader, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import FilterComponent from '../Components/filters/FilterComponent';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CustomDrawer from '../Components/CustomDrawer';
import RegisterUser from './register/Users';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../store/features/users/userSlice';

const values = [{
    label: 'Usuario',
    field: 'user',
},
{
    label: 'Correo',
    field: 'email'
},
{
    label: 'Estado',
    field: 'status'
}
]

const RowOptions = ({id}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)
    const dispatch = useDispatch()

    const handleRowOptionsClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
        setAnchorEl(null)
    }

    const handleDelete = async () => {
        dispatch(deleteUser(id))
        handleRowOptionsClose()
    }

    return (
        <>
            <IconButton size='small' onClick={handleRowOptionsClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={rowOptionsOpen}
                onClose={handleRowOptionsClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={() => { handleRowOptionsClose }}>
                    <ModeEditIcon color='info' />
                    Editar
                </MenuItem>
                <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleDelete}>
                    <DeleteIcon color='error' />
                    Eliminar
                </MenuItem>
            </Menu>
        </>
    )
}

const Users = () => {

    const [openRegister, setOpenRegister] = useState(false)
    const toggleRegister = () => setOpenRegister(!openRegister)
    const columns = [
        {
            flex: 0.2,
            minWidth: 230,
            field: 'user',
            headerName: 'Usuarios',
            renderCell: ({ row }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: theme => theme.palette.text.secondary }}>
                            {`${row.name} ${row.lastName}`}
                        </Typography>
                        <Typography noWrap variant='caption'>{row.email}</Typography>
                    </Box>
                </Box>
            ),
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: 'email',
            headerName: 'Correo Electrónico',
            renderCell: ({ row }) => (
                <Typography variant='body2' noWrap>
                    {row.email}
                </Typography>
            ),
        },
        {
            flex: 0.15,
            field: 'status',
            minWidth: 150,
            headerName: 'Estados',
            renderCell: ({ row }) => (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': { mr: 3 }
                }}>
                    <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                        {row.status}
                    </Typography>
                </Box>
            ),
        },
        {
            flex: 0.2,
            minWidth: 90,
            field: 'actions',
            sortable: false,
            headerName: 'Acciones',
            renderCell: ({ row }) => <RowOptions id={row.id} />,
        },
    ];

    const rows = [
        { id: 1, name: 'Juan', lastName: 'Perez', email: 'juan.perez@example.com', status: 'activo' },
        { id: 2, name: 'Maria', lastName: 'Lopez', email: 'maria.lopez@example.com', status: 'inactivo' },
        { id: 3, name: 'Carlos', lastName: 'Gomez', email: 'carlos.gomez@example.com', status: 'activo' },
        { id: 4, name: 'Ana', lastName: 'Martinez', email: 'ana.martinez@example.com', status: 'inactivo' },
        { id: 5, name: 'Luis', lastName: 'Fernandez', email: 'luis.fernandez@example.com', status: 'activo' },
    ];
    return (<Box>
        <Card>
            <CardHeader title='USUARIOS' sx={{ pb: 0, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <FilterComponent
                values={values}
                toggleDrawer={toggleRegister}
            />
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10, 25, 50]}
                pagination
                rowCount={5 || 0}
                paginationMode='server'
                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                disableSelectionOnClick
            />
        </Card>
        <CustomDrawer
            open={openRegister}
            toggle={toggleRegister}
            title='Registro de usuario'
        >
            <RegisterUser
                toggle={toggleRegister}
            />
        </CustomDrawer>
    </Box>
    )
}

export default Users;