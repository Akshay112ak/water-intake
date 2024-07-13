import register from '../images/register.webp';
import { useState } from "react";
import { firestore } from '../firebase/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import {Link,useNavigate} from 'react-router-dom';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    var navigate=useNavigate()
    const fetchdata = async (email) => {
        const collectionref1 = collection(firestore, 'register');
        const snapshot = await getDocs(collectionref1);
        let emailExists = false;
        var arraydata=[]
        snapshot.forEach((doc) => {
            arraydata.push(doc.data())
            if (doc.data().email === email) {
                emailExists = true;
            }
            
           
            
        });
        console.log(arraydata)
        return emailExists;
    };

    const registerUser = async (e) => {
        e.preventDefault();
        const emailExists = await fetchdata(email);

        if (emailExists) {
            setErrorMessage('Email already exists');
            return;
        }

        if (password !== passwordConf) {
            setErrorMessage('Password and confirm password do not match');
            return;
        }

        try {
            const userCollection = collection(firestore, 'register');
            const newUser = {
                name: name,
                email: email,
                password: password,
            };
            const docRef = await addDoc(userCollection, newUser);
            console.log("Document written with ID: ", docRef.id);
            setErrorMessage('');
            navigate('/')
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${register})`, backgroundSize: 'cover', height: '100vh' }}>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1>Register</h1>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form onSubmit={registerUser}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onInput={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>
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
                                    minLength={8}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={passwordConf}
                                    onInput={(event) => setPasswordConf(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input className="btn btn-primary mx-auto d-block" type='submit' />
                            </div>
                        </form>
                    </div><div className="mx-auto d-block">already registered  <Link to={'/'}>Click here</Link></div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
