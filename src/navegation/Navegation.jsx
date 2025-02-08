import { ListNavegation } from './ListNavegation'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router';

const Navegation = () => {
  const theme = useTheme();
  return (
    <List >
      {ListNavegation.map((nav,) => (
        <ListItem key={nav.title} disablePadding sx={{ display: 'block' }}>
          <Link to={nav.path} style={{ textDecoration: 'none', color: theme.palette.primary.contrastText }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.contrastText
                }}
              >
                {nav.icon}
              </ListItemIcon>
              <ListItemText primary={nav.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

export default Navegation;