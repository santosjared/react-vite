import Drawer from "@mui/material/Drawer"
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import CloseIcon from '@mui/icons-material/Close';

  const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 4),
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default
  }))
  const CustomDrawer = (props) =>{
    const {open, toggle, title, children} = props
    return(
        <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={toggle}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs:'100%', sm: 600 }, mt:8 } }}
        >
          <Header>
            <Typography variant='h6'>{title}</Typography>
            <IconButton size='small' onClick={toggle} sx={{ color: 'text.primary' }}>
              <CloseIcon/>
              </IconButton>
          </Header>
          <Box sx={{ p: 5 }}>
            {children}
          </Box>
        </Drawer>
    )
  }
  export default CustomDrawer