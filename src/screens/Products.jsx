import { Box, Card, CardHeader, Typography } from '@mui/material';
import FilterComponent from '../Components/filters/FilterComponent';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import CustomDrawer from '../Components/CustomDrawer';
import { useDispatch, useSelector } from 'react-redux';
import RowOptions from '../Components/RowOptions';
import { deleteProduct, fetchDataProducts, getProduct, toggleEdit } from '../store/features/products/productSlice';
import RegisterProducts from './register/Products';
import { instance } from '../config/instance';
import EditProducts from './edit/Prducts';



const columns = [
    {
        flex: 0.2,
        minWidth: 230,
        field: 'name',
        headerName: 'Nombre',
        renderCell: ({ row }) => (
            <Typography variant='body2' noWrap>{row.name}</Typography>
        ),
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'purchase_price',
        headerName: 'Precio de compra',
        renderCell: ({ row }) => (
            <Typography variant='body2' noWrap>
                {row.purchase_price}
            </Typography>
        ),
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'sale_price',
        headerName: 'Precio de venta',
        renderCell: ({ row }) => (
            <Typography variant='body2' noWrap>
                {row.sale_price}
            </Typography>
        ),
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'quantity',
        headerName: 'Cantidad',
        renderCell: ({ row }) => (
            <Typography variant='body2' noWrap>
                {row.quantity}
            </Typography>
        ),
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'category',
        headerName: 'Categoria',
        renderCell: ({ row }) => (
            <CategoryName id={row.category}/>
        ),
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'warehouse',
        headerName: 'Almacen',
        renderCell: ({ row }) => (
            <WarehouseName id={row.warehouse}/>
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
        deleted={deleteProduct}
        toggle={toggleEdit}
        getData={getProduct}
        />,
    },
];

const CategoryName = ({id})=>{
    const [category, setCategory] = useState({name:'undefined'})
    useEffect(()=>{
        const fetch = async()=>{
            try{
                const res = await instance.get(`/api/categories/${id}/`)
            setCategory(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fetch()
    },[])
    return(
        <Typography variant='body2' noWrap>
            {category.name}
        </Typography>
    )
}

const WarehouseName = ({id}) =>{
    const [warehouse, setWarehouse] = useState({name:'undefined'})
    useEffect(()=>{
        const fecth = async()=>{
            try{
                const res = await instance.get(`/api/warehouses/${id}/`)
                setWarehouse(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fecth()
    },[])

    return(
        <Typography variant='body2' noWrap >
            {warehouse.name}
        </Typography>
    )
}


const Products = () => {

    
    const [openRegister, setOpenRegister] = useState(false)
    const [filters, setFilters] = useState(null)
    const [categorias,setCategories] = useState([])
    const [warehouses,setWarehouses] = useState([])

    const values = [{
        label: 'Nombre',
        field: 'name',
    },
    {
        label: 'Precio de compra',
        field: 'purchasePrice',
    },
    {
        label: 'Precio de venta',
        field: 'salePrice'
    },
    {
        label: 'Cantidad',
        type:'number',
        field: 'quantity',
    },
    {
        label: 'Categoria',
        field: 'category',
        options:categorias
    },
    {
        label:'Almacen',
        field:'warehouse',
        options:warehouses
    }
    ]

    const toggleRegister = () => setOpenRegister(!openRegister)

    const products = useSelector((state)=>state.products)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchDataProducts(filters))
    },[filters])
    useEffect(()=>{
        const fetchCategories = async () => {
            try {
              const res = await instance.get('/api/categories/');
              const options = res.data.map((value) => ({
                label: value.name,
                value: value.id,
              }));
              setCategories(options);
            } catch (error) {
              console.log(error);
            }
          };
          fetchCategories();
    },[])
    useEffect(()=>{
        const fetchWarehuses = async () => {
            try{
                const res = await instance.get('/api/warehouses/')
                const options = res.data.map((value)=>({
                    label:value.name,
                    value:value.id,
                }))
                setWarehouses(options)
            }catch(error){
                console.log(error)
            }
        };
        fetchWarehuses()
    },[])
    const toggleEditor = () =>dispatch(toggleEdit())
    return (<Box>
        <Card>
            <CardHeader title='Productos' sx={{ pb: 0, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <FilterComponent
                values={values}
                toggleDrawer={toggleRegister}
                setValues={setFilters}
            />
            <DataGrid
                rows={products.data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10, 25, 50]}
                pagination
                rowCount={products.total || 0}
                paginationMode='server'
                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                disableSelectionOnClick
            />
        </Card>
        <CustomDrawer
            open={openRegister}
            toggle={toggleRegister}
            title='Registro de productos'
        >
            <RegisterProducts
                toggle={toggleRegister}
            />
        </CustomDrawer>
        <CustomDrawer
        open={products.openEdit}
        toggle={toggleEditor}
        title='Editar Usuario'
        >
            <EditProducts
            toggle={toggleEditor}
            product={products.product}
            />
        </CustomDrawer>
    </Box>
    )
}

export default Products;