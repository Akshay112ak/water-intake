import addwaterintake from '../images/images14.webp'
import { useState } from 'react' ;
import checkAuth from "../redux/checkauth";
import { firestore } from '../firebase/firestore';
import { collection, addDoc,getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Backnavbar from './Backnavbar';
function Addwaterintake() {
    const navigate=useNavigate()
    const [quantity,setQuantity]=useState('')
    const [errmsg,seterrmsg]=useState('')
    var currentdate,currenttime;
    currentdate=new Date().toLocaleDateString();
    //  currentdate='01/07/2024'
    currenttime=new Date().toLocaleTimeString();
    var {userid} =useParams()
    const Addwaterquantity = async(e) =>
        {
            e.preventDefault();
            const collectionref1 = collection(firestore, 'waterintake');
            const snapshot = await getDocs(collectionref1);
            snapshot.docs.map((doc)=>
                {
             return(console.log(doc.data().currentdate,"23 add",currentdate))    ; 
                })
            const entry = snapshot.docs.find(doc => doc.data().userid===userid && doc.data().currentdate === currentdate)
           
            
            if (entry) {
            seterrmsg('only 1 entry per day');
            }

            // .filter(doc => doc.data().userid === userid)
            else{
            try {
                const userCollection = collection(firestore, 'waterintake');
                const newUser = {
                    quantity: quantity,
                    currentdate:currentdate,
                    currenttime: currenttime,
                    userid:userid
                };
                const docRef = await addDoc(userCollection, newUser);
                console.log("Document written with ID: ", docRef.id);
                navigate("/viewwaterintake/"+userid)
            } catch (err) {
                console.error("Error adding document: ", err);
            }}
        }
  return (
    <>
    <Backnavbar userid={userid}></Backnavbar>
    <div class="container-fluid " style={{ backgroundImage: `url(${addwaterintake})`, backgroundSize: 'cover', height: '92vh' }}>
         <div className='pt-5'>
         <div class="card w-25 mx-auto">
         {errmsg && <div className="alert alert-danger">{errmsg}</div>}
        <div class="card-body">
           <h4 class="card-title text-center">Add Water intake</h4>
          <div class="card-text">
            <form  method="post" onSubmit={Addwaterquantity}>
                <dl class="row">
                    <dt class="col-sm-3"><label>Quantity</label></dt>
                    <dd class="col-sm-9" >
                        <input type="number" name="uniqueid"class="pl-2 border-0 w-100"placeholder='enter quantity in ltrs' value={quantity}
                                    onInput={(event) => setQuantity(event.target.value)}
                                    required></input></dd>
                  </dl>
                   <div style={{textAlign: 'center'}}><input type="submit" value="Submit"></input></div>
            </form>
    </div>
    </div>
</div> 
</div>
</div>
</>
 )
}

export default checkAuth(Addwaterintake);