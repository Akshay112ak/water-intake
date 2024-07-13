import React, { useState, useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import viewwaterintake from '../images/images13.png';
import { firestore } from '../firebase/firestore';
import { collection, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Backnavbar from './Backnavbar';
import checkAuth from "../redux/checkauth";

import '../paginate.css'
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; 
import { IconContext } from "react-icons"; 
function Viewwaterintake() {
    
    const [page, setPage] = useState(0);
    const [filterData, setFilterData] = useState();
    const n = 2;

    const[firstdate,setfirstdate]=useState('');
    const[seconddate,setseconddate]=useState('');
    const [difference, setDifference] = useState(null);
    const [items, setItems] = useState([]);
     const {userid} =useParams()
     console.log(userid,"view 10")
     const fetchdata = useCallback(async () => {
        const collectionref1 = collection(firestore, 'waterintake');
        const snapshot = await getDocs(collectionref1);
        const dataArray = snapshot.docs
            .filter(doc => doc.data().userid === userid)
            .map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(dataArray);
        console.log(dataArray, "16");
    }, [userid]);

    const handleDelete = async(id) => {
        // Implement delete functionality here
         try{
            const waterintake=doc(firestore,'waterintake',id);
            await deleteDoc(waterintake);
            const collectionref1 = collection(firestore, 'waterintake');
            const snapshot = await getDocs(collectionref1);
            const dataArray = snapshot.docs
            .filter(doc => doc.data().userid === userid)
            .map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(dataArray);
         }
         catch(error)
         {
            console.error('Error deleting product',error)
         }
    };

    useEffect(() => {
        fetchdata();
    }, [fetchdata]);

    useEffect(() => {
        setFilterData(
            items.filter((item, index) => (index >= page * n) && (index < (page + 1) * n))
        );
    }, [items, page]);
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };
    const finddifference = () => {
        const formattedFirstDate = formatDate(firstdate);
        const formattedSecondDate = formatDate(seconddate);
        console.log(firstdate,"64 view")
        const firstEntry = items.find(doc => doc.currentdate === formattedFirstDate);
        const secondEntry = items.find(doc => doc.currentdate === formattedSecondDate);
        
        if (firstEntry && secondEntry) {
            const firstQuantity = firstEntry.quantity;
            const secondQuantity = secondEntry.quantity;
            const diff = secondQuantity - firstQuantity;
            var newdiff=Math.abs(diff)
            setDifference(newdiff);
        } else {
            setDifference('Entries for the selected dates not found');
            console.error('Entries for the selected dates not found');
        }
    };
    return (
        <>
       
        <Backnavbar userid={userid}></Backnavbar>
        <div className="container-fluid" style={{ backgroundImage: `url(${viewwaterintake})`, backgroundSize: 'cover', height: '92vh' }}>
            <div className="pt-5">
                <table className="table table-bordered table-secondary w-50 mx-auto">
                    <thead className="text-center">
                        <tr>
                            <th>Quantity</th>
                            <th>Added Date</th>
                            <th>Added Time</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {filterData && filterData.map((item, index)  => (
                            <tr key={index}>
                                <td>{item.quantity}</td>
                                <td>{item.currentdate}</td>
                                <td>{item.currenttime}</td>
                                <td>
                                    <button className="btn btn-warning">
                                        <Link to={'/updatewaterintake/'+userid+'/'+item.id}>Update</Link>
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" data-toggle="modal" data-target="#modal">Delete</button>
                                </td>
                                <div id="modal" class="modal fade">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="modal-title">Are you sure you want to delete?</h3>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-footer justify-content-between">
                              
                                    <button type="button" class="btn btn-success" onClick={() => handleDelete(item.id)}data-dismiss="modal">Ok</button>
                              
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                            </tr>
                        ))}
                    </tbody>
                   
                    <div style={{position:'relative',left:630,top:10}}>
                <ReactPaginate
  containerClassName={"pagination"}
  pageClassName={"page-item"}
  activeClassName={"active"}
  onPageChange={(event) => setPage(event.selected)}
  pageCount={Math.ceil(items.length / n)}
  breakLabel="..."
  previousLabel={
    <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
      <AiFillLeftCircle />
    </IconContext.Provider>
  }
  nextLabel={
    <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
      <AiFillRightCircle />
    </IconContext.Provider>
  }
/>
                </div>
                </table>
                <div className='d-flex justify-content-center'>
                    <label style={{ color: 'black' }}>Enter first date</label>
                    <input type='date' value={firstdate} onChange={(e) => setfirstdate(e.target.value)}></input>
                    <label style={{ color: 'black' }}>Enter second date</label>
                    <input type='date' onChange={(e) => setseconddate(e.target.value)} value={seconddate}></input>
                    <br></br>
                </div>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-success mt-4' onClick={finddifference}>Find</button>
                    <span style={{ color: 'black', marginLeft: '10px' }}>{difference !== null ? `Difference: ${difference}` : ''}</span>
                </div>
               
                
            </div>
        </div>
        </>
    );
}

export default checkAuth(Viewwaterintake);
