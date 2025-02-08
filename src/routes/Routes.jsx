
import { Routes, Route } from 'react-router';
import { ListNavegation } from '../navegation/ListNavegation.jsx';

const Routers = () => {
    return (
        <Routes>
            {ListNavegation.map((nav, index)=>(
                <Route key={index}index={index === 0? true:undefined} path={nav.path} element={nav.component}></Route>
            ))}
        </Routes>
    );
}

export default Routers;