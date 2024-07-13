import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import updatewaterintake from '../images/image11.jpg';
import { firestore } from '../firebase/firestore';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Backnavbar from './Backnavbar';
import { useNavigate } from 'react-router-dom';
import checkAuth from "../redux/checkauth";
function Updatewaterintake() {
    const { waterid, userid } = useParams();
    const [quantity, setQuantity] = useState('');
      const navigate=useNavigate()
    const fetchdata = async (waterid) => {
        const collectionref1 = collection(firestore, 'waterintake');
        const snapshot = await getDocs(collectionref1);
        const dataArray = snapshot.docs.filter(doc => doc.id === waterid).map(doc => doc.data());
        if (dataArray.length > 0) {
            setQuantity(dataArray[0].quantity);
            console.log(dataArray[0].quantity, "up 23");
            console.log(dataArray, "up 24");
        }
    };

    useEffect(() => {
        fetchdata(waterid);
    }, [waterid]);

    const updatewaterquantity = async (e) => {
        e.preventDefault();
        // var currentdate = new Date().toLocaleDateString();
        // var currenttime = new Date().toLocaleTimeString();

        try {
            const waterintakeref = doc(firestore, 'waterintake', waterid);
            const updatedData = {
                quantity: quantity,
                
                userid: userid
            };
            await updateDoc(waterintakeref, updatedData);

            // Refetch the data to update the state
            fetchdata(waterid);
            navigate("/viewwaterintake/"+userid)
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <>
        <Backnavbar userid={userid}></Backnavbar>
        <div className="container-fluid" style={{ backgroundImage: `url(${updatewaterintake})`, backgroundSize: 'cover', height: '92vh' }}>
            <div className='pt-5'>
                <div className="card w-25 mx-auto">
                    <div className="card-body">
                        <h4 className="card-title text-center">Update Water Intake</h4>
                        <div className="card-text">
                            <form method="post" onSubmit={updatewaterquantity}>
                                <dl className="row">
                                    <dt className="col-sm-3"><label>Quantity</label></dt>
                                    <dd className="col-sm-9">
                                        <input
                                            type="number"
                                            name="quantity"
                                            className="pl-2 border-0 w-100"
                                            placeholder='Enter quantity in liters'
                                            value={quantity}
                                            onInput={(event) => setQuantity(event.target.value)}
                                            required
                                        />
                                    </dd>
                                </dl>
                                <div style={{ textAlign: 'center' }}><input type="submit" value="Submit" /></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default checkAuth(Updatewaterintake);
