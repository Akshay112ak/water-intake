import login from '../images/login.webp'
import { useState } from "react";
import {useDispatch} from "react-redux";
import {setUser} from '../redux/Authslice'
import {firestore} from '../firebase/firestore';
import { getDocs,collection } from 'firebase/firestore';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var dispatch=useDispatch()
    const navigate=useNavigate()
    var userid
    const fetchdata = async (email) => {
        const collectionref1 = collection(firestore, 'register');
        const snapshot = await getDocs(collectionref1);
        let user = false;
      
        var arraydata=[]
        snapshot.forEach((doc) => {
            arraydata.push(doc.data())
            if (doc.data().email === email&&doc.data().password===password) {
                user = true;
                userid=doc.id
                console.log(doc.id,"ok")
            }
            
           
            
        });
        console.log(user)
        console.log(arraydata)
        return user;
    };
       const  attemptLogin =async (e) =>{
        e.preventDefault();
        const user = await fetchdata(email,password);
        if(!user)
            {
                setErrorMessage("invalid username or password")
            }
            else{
                var trueuser={'email':email,'password':password,'userid': userid};
                var userr=JSON.stringify(trueuser);
                console.log("Payload to dispatch:", userr,typeof(userr));  // Log the payload separately
                dispatch(setUser(userr));
               navigate('/home/'+userid)
               console.log(userr,"log 48",setUser())
            }
      
      
    }
    return (<div>

        <div className="container-fluid " style={{backgroundImage:`url(${login})`, backgroundSize:'cover', height: '100vh' ,backgroundPosition:'center'}}>
        {/* <form encType="multipart/form-data" onSubmit={(e)=>e.preventDefault()} method="post"> */}
            <div className="row">
               
                <div className="col-8 offset-2">
                    <h1 className="text-center">Login</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <form onSubmit={attemptLogin}>
                            
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onInput={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onInput={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input className="btn btn-primary mx-auto d-block" type='submit' />
                            </div>
                        </form>
                    <br></br><br></br>
                    <div className="offset-5">New user <Link to={'/signup'}>Click here</Link></div>
                    </div>
            </div>
            {/* </form> */}
        </div>
    </div>)
}

export default Login;