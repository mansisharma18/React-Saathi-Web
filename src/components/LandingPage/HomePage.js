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
                     <h1 className='color-white font-weight-bold 'id="head1">Saathi – Your Loved Ones Deserve the Best Care</h1>
                     <div className='h2 color-white text-center' id="head1">Let Saathi be the helping hand and caring voice that keeps your family connected, no matter how far away you are.</div>
                  </div>
               </section>





               <section className="tabslider clerfix">
          <div className="container">
            <div className="row">
                <div className="tab-nav">
                  <div className="comman-heading"  itemscope itemtype="http://all-cures.com/Product">
                    
                     <div className="h4 mt-4" itemprop="Category">About Us</div>
                     <p className="fw-bold">Why Saathi?</p>
                     <p>Saathi was created with one goal in mind: to bring peace of mind to families who live far from their loved ones. We understand the challenges of being away, so we’ve developed a solution that allows you to stay involved in their care, 
                      even from a distance. Saathi’s companions are trained,
                       compassionate individuals who provide regular check-ins, social visits, and practical assistance.</p>
                       <p className="fw-bold">Key Values:</p>
                       <ul>
                        <li><p><span className="fw-bold">Companionship:</span>
                        Every Saathi is dedicated to being more than just an assistant – they are a friend who helps reduce feelings of loneliness and isolation.</p>
                        </li>
                        <li><p><span className="fw-bold">Professional Care:</span>
                        Our companions are trained to handle a variety of needs, from simple conversations to helping with everyday tasks like errands or medical appointments.</p>
                        </li>
                        <li><p><span className="fw-bold">Trust and Reliability:</span>
                        You can rely on us to keep you informed, providing regular updates so you always know your family is in good hands..</p>
                        </li>
                       </ul>
                  </div>
               
               </div>
                  
          </div>
        </div>
      </section> 


      
      <section className="tabslider clerfix">
          <div className="container">
            <div className="row">
                <div className="tab-nav">
                  <div className="comman-heading"  itemscope itemtype="http://all-cures.com/Product">
                    
                     <div className="h4 mt-4" itemprop="Category">Services</div>
                     <p className="fw-bold">How Can Saathi Help?</p>
                     <p>Saathi provides a wide range of services to make life easier for your loved ones and give you peace of mind. Whether it's 
                      providing emotional support, managing daily tasks, or making sure health needs are met, we are here to help.</p>
                       <p className="fw-bold">Service Highlights:</p>
                       <ul>
                        <li><p><span className="fw-bold">Social Calls and Emotional Support:</span>
                        Regular conversations to keep them feeling connected and reduce isolation.</p>
                        </li>
                        <li><p><span className="fw-bold">Home Check-Ins</span>
                        Visits to ensure they are safe, comfortable, and healthy.</p>
                        </li>
                        <li><p><span className="fw-bold">Transportation Assistance:</span>
                        Help with getting to doctor’s appointments, running errands, or visiting friends.</p>
                        </li>
                        <li><p><span className="fw-bold">Errand Running:</span>
                        Picking up groceries, medications, or helping with other daily tasks.</p>
                        </li>
                       </ul>
                  </div>
               
               </div>
                  
          </div>
        </div>
      </section> 



      <section className="tabslider clerfix">
          <div className="container">
            <div className="row">
                <div className="tab-nav">
                  <div className="comman-heading"  itemscope itemtype="http://all-cures.com/Product">
                    
                     <div className="h4 mt-4" itemprop="Category">How it Works</div>
                     <p className="fw-bold">Getting Started is Easy!</p>
                    
                       <span className="fw-bold">Step 1:</span>
                       <p><span className="fw-bold">Download the App:</span>
                       Available on both the App Store and Google Play, Saathi is easy to set up and start using right away.</p>

                       <span className="fw-bold">Step 2:</span>
                       <p><span className="fw-bold">Choose a Package: </span>
                       Select a care package that best suits your family’s needs, whether it’s regular social calls, errands, or in-person check-ins.</p>

                       
                       <span className="fw-bold">Step 3:</span>
                       <p><span className="fw-bold">Connect with a Saathi: </span>
                       Your assigned Saathi companion will reach out to your family member and start providing the care and support they 
                       need. You’ll receive updates and reports directly to your phone.</p>

                       
                       <span className="fw-bold">Step 4:</span>
                       <p><span className="fw-bold">Stay Informed:  </span>
                       Track your Saathi’s visits, check-ins, and progress reports through the app, so you always know how your loved one is doing.</p>
                       
                       
                       
                  </div>
               
               </div>
                  
          </div>
        </div>
      </section> 
               
               
            
      <section className="tabslider clerfix">
          <div className="container">
            <div className="row">
                <div className="tab-nav">
                  <div className="comman-heading"  itemscope itemtype="http://all-cures.com/Product">
                    
                     <div className="h4 mt-4" itemprop="Category">Pricing</div>
                     <p className="fw-bold">Affordable Care, Tailored to Your Needs</p>
                     <p>Saathi offers flexible packages that cater to different levels of care. Whether your loved one needs a few weekly calls 
                      or regular in-person check-ins, we’ve got a plan that works for you.</p>
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