import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Table, Td, Tr } from '../../Components/CustomTable'
import { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/features/users/userSlice';

const inicialValues = {
    first_name:'',
    last_name:'',
    username:'',
    password:'',
    email:'',
    is_superuser:false
}

const EditUser = ({toggle, user}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [checked, setChecked] = useState(false)
    const {register, formData, resetForm, setFormData} = useForm(inicialValues)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(user){
            setFormData(user)
            setChecked(user.is_superuser)
        }
    },[user])
    const onSubmit = (e)=>{
        e.preventDefault();
        const userform = {...formData, is_superuser:checked}
        dispatch(updateUser({id:userform.id,data:userform}));
        handleClose();
    }
    const handleClose = () =>{
        resetForm();
        setChecked(false)
        toggle();
    }
    const handleCheck = ()=>setChecked(!checked)
    return (
        <Box>
            <form onSubmit={onSubmit}>
                <fieldset style={{ border: '1.5px solid #E0E0E0', borderRadius: 10, paddingTop: 20 }}>
                    <legend style={{ textAlign: 'center' }}><Typography variant='subtitle2'>Edistar Usuario</Typography></legend>
                    <Table column={2}>
                        <Tr>
                            <Td spacing={2}>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Nombre'
                                        placeholder='Juan Carlos'
                                        {...register('first_name')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                                </Td>
                                <Td>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Apellido'
                                        placeholder='Rodriguez Benitez'
                                        {...register('last_name')}
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
                                        label='Usuario'
                                        placeholder='Juan234'
                                        {...register('username')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                                </Td>
                                <Td>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel htmlFor="outlined-adornment-password" >Contraseña</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        // error={Boolean(formErrors.password)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword((prevShow) => !prevShow)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Contraseña"
                                    />
                                    {/* {formErrors.password && <FormHelperText sx={{ color: 'error.main' }}>{formErrors.password}</FormHelperText>} */}
                                </FormControl>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td >
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                    <TextField
                                        label='Correo'
                                        type='email'
                                        placeholder='Juan@gmail.com'
                                        {...register('email')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                                </Td>
                                <Td>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <FormControlLabel 
                                    control={<Checkbox 
                                        onChange={handleCheck}
                                        checked={checked}
                                    />} label="Super usuario"
                                     />
                                </FormControl>
                            </Td>
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
export default EditUser;