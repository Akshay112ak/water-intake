import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { removeUser } from "../redux/Authslice";
function Backnavbar(props) {
    var user=useSelector(store=>store.auth.user)
    console.log(user,"lout")
    var navigate=useNavigate()
    const dispatch=useDispatch()
    function logout(){
        if(user){
            console.log("12 bN")
            dispatch(removeUser());
            navigate('/')
        }
    }
    
  return (
    <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-info">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
                <ul className="navbar-nav " style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                        <NavLink to={"/home/"+props.userid} className={({ isActive }) => 'nav-link ' + (isActive ? 'active' : '')}>
                           Back
                        </NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                    <li class="nav-item">
                       <span class="nav-link" onClick={logout}>logout</span>
                    </li>
                    </li> 
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Backnavbar