import { NavLink,useNavigate } from "react-router-dom";
// import { useDispatch,useSelector } from "react-redux";
// import { removeUser } from "../redux/Authslice";
// import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { removeUser } from "../redux/Authslice";
function Navbar(props) {
    var user=useSelector(store=>store.auth.user)
    console.log(user,"lout 9 nav")
    var navigate=useNavigate()
    const dispatch=useDispatch()
    function logout(){
        if(user){
            
            dispatch(removeUser());
            navigate('/')
        }
    }
    
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-info">
            <div className="navbar-brand">
                <h4>Drinking Water intake</h4>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
                
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                        <NavLink to={"/addwaterintake/"+props.userid} className={({ isActive }) => 'nav-link ' + (isActive ? 'active' : '')}>
                            Addwater intake
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/viewwaterintake/"+props.userid} className={({ isActive }) => 'nav-link ' + (isActive ? 'active' : '')}>
                            viewwater intake
                        </NavLink>
                    </li>
                    <li class="nav-item">
                       <span class="nav-link" onClick={logout}>logout</span>
                    </li>
                   
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
