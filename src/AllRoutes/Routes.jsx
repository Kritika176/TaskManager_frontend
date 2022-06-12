import {Route,Routes} from 'react-router-dom';
import { Home } from '../Pages/Home/Home';
import { Signup } from '../Pages/Signup/Signup';
import {Login} from '../Pages/Login/Login';

export function AllRoutes() {
  return (
   <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path='/login' element={<Login></Login>}></Route>
   </Routes>
  )
}



