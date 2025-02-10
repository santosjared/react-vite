import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Table, Td, Tr } from '../../Components/CustomTable'
import { useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import useForm from '../../hooks/useForm';
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../store/features/products/productSlice";
import { instance } from "../../config/instance";

const inicialValues = {
    name: '',
    purchase_price: 0,
    sale_price: 0,
    quantity: 0,
    category: null,
    warehouse: null,
    otherCategory:'',
    ontherWarehouse:''
}

const EditProducts = ({ toggle, product }) => {

    const [category, setCategory] = useState([])
    const [warehouse, setWarehouse] = useState([])
    const { register, formData, resetForm, setFormData } = useForm(inicialValues)
    const dispatch = useDispatch()
    useEffect(() => {
        const fecth = async () => {
            try {
                const res = await instance.get('/api/categories/')
                setCategory(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fecth()
    }, [])

    useEffect(() => {
        const fecth = async () => {
            try {
                const res = await instance.get('/api/warehouses/')
                setWarehouse(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fecth()
    }, [])

    useEffect(()=>{
        if(product){
            setFormData(product)
        }
    },[product])
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            let formProduct = formData
            if(formData.category === 'otro'){
                const res = await instance.post('api/categories/', {name:formData.otherCategory}, {
                    headers:{'Content-Type': 'application/json'}
                })
                console.log('categorias',res.data)
                formProduct = {...formProduct, category:res.data.id}
            }
            if(formData.warehouse === 'otro'){
                const res = await instance.post('/api/warehouses/',{name:formData.ontherWarehouse},{
                    headers:{'Content-Type': 'application/json'}
                })
                console.log('almacenes',res.data)
                formProduct = {...formProduct, warehouse:res.data.id}
            }
            dispatch(updateProduct({id:formProduct.id,data:formProduct}));
        }catch(error){
            console.log(error)
        }
        handleClose();
    }
    const handleClose = () => {
        resetForm();
        toggle();
    }
    return (
        <Box>
            <form onSubmit={onSubmit}>
                <fieldset style={{ border: '1.5px solid #E0E0E0', borderRadius: 10, paddingTop: 20 }}>
                    <legend style={{ textAlign: 'center' }}><Typography variant='subtitle2'>Agregar nuevo producto</Typography></legend>
                    <Table column={2}>
                        <Tr>
                            <Td spacing={2}>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Nombre'
                                        placeholder='Paracetamol'
                                        {...register('name')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                            </Td>
                            <Td>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Precio de compra'
                                        type='number'
                                        placeholder='0'
                                        {...register('purchase_price')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Precio de venta'
                                        type='number'
                                        placeholder='0'
                                        {...register('sale_price')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                            </Td>
                            <Td>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Cantidad'
                                        type='number'
                                        placeholder='0'
                                        {...register('quantity')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td >
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Categoria</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        {...register('category')}
                                        autoWidth
                                        label="Categoria"
                                    >
                                        {category.map((value, index) => (
                                            <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                                        ))}
                                        <MenuItem value='otro'>Otro</MenuItem>
                                    </Select>
                                </FormControl>
                            </Td>
                            {formData.category === 'otro' &&
                            <Td>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Especifique la categoria'
                                        placeholder='Antibióticos'
                                        {...register('otherCategory')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                            </Td>
                            }
                            <Td >
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Almacen</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        {...register('warehouse')}
                                        autoWidth
                                        label="Almacen"
                                    >
                                        {warehouse.map((value, index) => (
                                            <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                                        ))}
                                        <MenuItem value='otro'>Otro</MenuItem>
                                    </Select>
                                </FormControl>
                            </Td>
                            {formData.warehouse === 'otro' &&
                            <Td>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Especifique el almacen'
                                        placeholder='Respiratorios'
                                        {...register('ontherWarehouse')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                            </Td>
                            }
                        </Tr>
                    </Table>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size='large' variant='outlined' color='primary' onClick={handleClose} startIcon={<CancelIcon />}>
                            Cancelar
                        </Button>
                        <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} startIcon={<SaveIcon />}>
                            Guardar
                        </Button>
                    </Box>
                </fieldset>
            </form>
        </Box>
    )
}
export default EditProducts;