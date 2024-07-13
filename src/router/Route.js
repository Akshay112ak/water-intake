import {createBrowserRouter} from 'react-router-dom';
import Signup from '../Components/signup';
import App from '../App';
import Home from '../Components/Home';
import Addwaterintake from '../Components/Addwaterintake';
import Viewwaterintake from '../Components/Viewwaterintake';
import Updatewaterintake from '../Components/Updatewaterintake';
const router=createBrowserRouter([
   
    {path:'/',element:<App></App>},
    {path:'/signup',element:<Signup></Signup>},
    {path:'home/:userid',element:<Home></Home>},
    {path:'addwaterintake/:userid',element:<Addwaterintake></Addwaterintake>},
    {path:'viewwaterintake/:userid',element:<Viewwaterintake></Viewwaterintake>},
    {path:'updatewaterintake/:userid/:waterid',element:<Updatewaterintake></Updatewaterintake>},
])
export default router;