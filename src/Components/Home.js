import React from 'react';
import checkAuth from "../redux/checkauth";
import Navbar from './Navbar'
import images10 from '../images/image10.webp';
import images11 from '../images/image11.jpg';
import images12 from '../images/images12.jpg';
import { useParams } from 'react-router-dom';
function Home() {
    const {userid}=useParams()
      return (
    <div>
        <Navbar userid={userid}></Navbar>
        <div id="carouselExampleIndicators" class="carousel slide " data-ride="carousel" style={{height:'91vh'}}>
                    <ol class="carousel-indicators">
                      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img class="d-block w-100" src={images10} style={{height: '91vh'}}  alt="First slide"></img>
                      </div> 
                      <div class="carousel-item">
                        <img class="d-block w-100" src={images11}  style={{height:'91vh'}} alt="Second slide"></img>
                      </div>
                      <div class="carousel-item">
                        <img class="d-block w-100" src={images12}   style={{height:'91vh'}} alt="Third slide"></img>
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
       
       
       </div>
  )
}

export default checkAuth(Home);