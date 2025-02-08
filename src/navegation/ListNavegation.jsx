import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Home from '../screens/Home';
import Users from '../screens/Users';
import Warehouse from '../screens/WareHouse';
import Products from '../screens/Products';

export const ListNavegation = [{
    title:'Home',
    path:'/',
    icon:<HomeIcon/>,
    component:<Home/>
},
{
    title:'Usuarios',
    path:'/Usuarios',
    icon:<GroupIcon/>,
    component:<Users/>
},
{
    title:'Almacenes',
    path:'/almacenes',
    icon:<Inventory2Icon/>,
    component:<Warehouse/>
},
{
    title:'Productos',
    path:'/productos',
    icon:<ShoppingCartIcon/>,
    component:<Products/>
}
]