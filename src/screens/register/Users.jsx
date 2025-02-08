import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { Table, Td, Tr } from '../../Components/CustomTable'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import useForm from '../../hooks/useForm';
import { useDispatch } from "react-redux";
import { addUser } from "../../store/features/users/userSlice";


const RegisterUser = ({toggle}) => {
    const [showPassword, setShowPassword] = useState(false)
    const {register, formData, resetForm} = useForm()
    const dispatch = useDispatch()
    const onSubmit = (e)=>{
        e.preventDefault();
        dispatch(addUser(formData));
        handleClose();
    }
    const handleClose = () =>{
        resetForm();
        toggle();
    }
    return (
        <Box>
            <form onSubmit={onSubmit}>
                <fieldset style={{ border: '1.5px solid #E0E0E0', borderRadius: 10, paddingTop: 20 }}>
                    <legend style={{ textAlign: 'center' }}><Typography variant='subtitle2'>Agregar Nuevo Usuario</Typography></legend>
                    <Table column={2}>
                        <Tr>
                            <Td spacing={2}>
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <TextField
                                        label='Nombre'
                                        placeholder='Juan Carlos'
                                        {...register('name')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <TextField
                                        label='Correo'
                                        placeholder='Juan@gmail.com'
                                        {...register('email')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td spacing={2}>
                                <FormControl fullWidth sx={{ mb: 6 }}>
                                    <TextField
                                        label='Usuario'
                                        placeholder='Juan234'
                                        {...register('user')}
                                        // error={Boolean(formErrors.name)}
                                        // helperText={formErrors.name}
                                        autoComplete='off'
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 6 }}>
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
export default RegisterUser;