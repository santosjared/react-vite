import { Box, Card, CardHeader, Typography } from '@mui/material';
import FilterComponent from '../Components/filters/FilterComponent';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import CustomDrawer from '../Components/CustomDrawer';
import RegisterUser from './register/Users';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchDataUser, getUser } from '../store/features/users/userSlice';
import RowOptions from '../Components/RowOptions';
import { toggleEdit } from '../store/features/users/userSlice'
import EditUser from './edit/Users';

const values = [{
    label: 'Nombre',
    field: 'name',
},
{
    label: 'apellido',
    field: 'lastname',
},
{
    label: 'Correo',
    field: 'email'
},
{
    label: 'super usuario',
    field: 'superusuario',
    options:[{
        label:'Si',
        value:'si'
    },
    {
        label:'No',
        value:'no'
    }
]
},
{
    label: 'Estado',
    field: 'status',
    options:[{
        label:'Activo',
        value:'active'
    },
    {
        label:'Inactivo',
        value:'inactivo'
    }
]
}
]

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
                        {`${row.first_name} ${row.last_name}`}
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
        flex: 0.2,
        minWidth: 230,
        field: 'superuser',
        headerName: 'Super usuario',
        renderCell: ({ row }) => (
            <Typography variant='body2' noWrap>
                {row.is_superuser?'Si':'No'}
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
                <Typography noWrap sx={{ color: row.is_active?'lightgreen':'lightsteelblue', textTransform: 'capitalize' }}>
                    {row.is_active?'Activo':'Inactivo'}
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
        renderCell: ({ row }) => 
        <RowOptions 
        id={row.id} 
        deleted={deleteUser}
        toggle={toggleEdit}
        getData={getUser}
        />,
    },
];

const Users = () => {

    const [openRegister, setOpenRegister] = useState(false)
    const [filters, setFilters] = useState(null)

    const toggleRegister = () => setOpenRegister(!openRegister)

    const users = useSelector((state)=>state.users)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchDataUser(filters))
    },[filters])

    const toggleEditor = () =>dispatch(toggleEdit())
    return (<Box>
        <Card>
            <CardHeader title='USUARIOS' sx={{ pb: 0, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <FilterComponent
                values={values}
                toggleDrawer={toggleRegister}
                setValues={setFilters}
            />
            <DataGrid
                rows={users.data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10, 25, 50]}
                pagination
                rowCount={users.total || 0}
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
        <CustomDrawer
        open={users.openEdit}
        toggle={toggleEditor}
        title='Editar Usuario'
        >
            <EditUser
            toggle={toggleEditor}
            user={users.user}
            />
        </CustomDrawer>
    </Box>
    )
}

export default Users;