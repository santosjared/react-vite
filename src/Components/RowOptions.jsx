import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const RowOptions = ({id, deleted, toggle, getData}) => {

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
        dispatch(deleted(id))
        handleRowOptionsClose()
    }
    const handleEdit = ()=>{
        dispatch(getData(id))
        dispatch(toggle())
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
                <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleEdit}>
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
export default RowOptions