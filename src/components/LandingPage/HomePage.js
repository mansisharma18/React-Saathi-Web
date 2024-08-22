import React, { Component } from 'react';
import Footer from './Footer'
import { Navbar} from "react-bootstrap"
import { Nav,NavDropdown,Container} from "react-bootstrap"
import Carousel1 from './Carousel1';


// import { env } from 'process'



// env.REACT_APP = 'http://115.246.93.94:8080/cures';

class HomePage extends Component {
   constructor(props){
      super(props);
  
      this.state = {


       
         afterSubmitLoad: false,
         showAlert: false,
       
       
        
    };      
  }
  
 
 
 componentDidMount(){
  
 }
   
   render() {
      return(
         <div>
            {
                this.state.afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                  {/* <img src={Heart} alt="All Cures Logo" id="heart"/> */}
                </div>
            }
            {
                this.state.showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{this.state.alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }
            <div className="profilePage">
            <div className="">
               <section className=" zIndex-2" >
                  <div className="webAlign">
                     <div className="row d-flex">
                        <div className="header">
                           <div className=" logo mt-3 ml-4" > 
                            
                                <img src={'https://ik.imagekit.io/hg4fpytvry/product-images/tr:w-300,f-webp/static/media/heart.30b5f0b3.png'}  alt="All Cures Logo"/>
                                <span>Satthi</span>
                              
                           </div>
                          
                  <div class="fgrow">
               
                  <nav class="navbar navbar-expand-lg navbar-light bg-light newHeader">
                              
                              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                          <span class="navbar-toggler-icon"></span>
                                  </button>
                                  <div class="collapse navbar-collapse" id="navbarNavDropdown">
     <ul class="navbar-nav">
       <li class="nav-item">
         <a class="nav-link nav-link-black" href="/">Home</a>
       </li>
       <li class="nav-item dropdown">
         <a class="nav-link nav-link-black  nav-link-blackdropdown-toggle" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
         <div class="dropdown-menu" aria-labelledby="categoriesDropdown">
           <a class="dropdown-item" href="/searchcategory/disease/1">Arthritis</a>
           <a class="dropdown-item" href="/searchcategory/disease/74">Diabetes</a>
           <a class="dropdown-item" href="/searchcategory/disease/50">Hypertension</a>
           <div class="dropdown-divider"></div>
           <a class="dropdown-item" href="/allcategory">View More</a>
         </div>
       </li>
       <li class="nav-item">
         <a class="nav-link nav-link-black" href="/dashboard">Login</a>
       </li>
      
       {/* <li class="nav-item">
         <a class="nav-link" href="/AboutUs">About Us</a>
       </li> */}
               {/* <li className="nav-item">
         <a className="nav-link" href="/webstories">Webstories</a>
       </li> */}
     </ul>
     </div>
   </nav>
</div>
                           
 	
                        </div>
                    </div>
                    </div>
                </section>
              
            </div>
        </div>
               <section className="banner">
                  <div className='banner-title h1 d-flex justify-content-center align-items-center'>
                     <h1 className='color-white font-weight-bold 'id="head1">Satthi</h1>
                     {/* <div className='h2 color-white text-center' id="head1">Getting You Closer To Cures From Around The World</div> */}
                  </div>
               </section>
               
            
      <section className="tabslider clerfix">
          <div className="container">
            <div className="row">
                <div className="tab-nav">
                  <div className="comman-heading"  itemscope itemtype="http://all-cures.com/Product">
                    
                     <div className="h4 mt-4" itemprop="Category">Our Packages</div>
                     <p>We are working to create a Mobile App that aims at providing services to the Aged Seniors who are living alone away from their children/family 
                        and need assistance and support. 
                        We would appreciate if you could please spare some time and help to complete the survey and also provide feedback / suggestions.</p>
                  </div>
               
               </div>
                  <Carousel1/>
          </div>
        </div>
      </section> 

       
                  
    






    
      

      <Footer/>
      </div>
      
        );
    }
}



export default HomePage;