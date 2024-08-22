import React from 'react';
import OwlCarousel from "react-owl-carousel";
import $ from 'jquery'; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const options = {
   margin: 20,
   responsiveClass: true,
   nav: true,
   dots: false,
   autoplay: false,
   smartSpeed: 1000,
   responsive: {
       0: {
           items: 1,
       },
       200: {
           items: 2,
       },
       600: {
           items: 2,
       },
       700: {
           items: 3,
       },
       1000: {
           items: 4,
       }
   },
};

export default function Carousel1(){

        return(
            <div className="tab-content category " id="choose-category" style={{maxWidth:"1140px", width:"100%", zIndex: 0}}>
                       <OwlCarousel className="owl-theme owl-loading" items={4} loop margin={150}  {...options}>
                  <div className="item bg-pink">
                        
                           <div className="item-img">
    
                           </div>
                           <div className="slider-heading">
                              <p><strong>Basic</strong></p>
                              <p> Includes XYZ.. How to call patrons every week and m aintains a record of patrons</p>
                           </div>
                    
                        </div>
                        <div className="item bg-org">
                        
                           <div className="item-img">
                             
                           </div>
                           <div className="slider-heading">
                              <p><strong>Bronze</strong></p>
                              <p> Includes XYZ.. How to call patrons every week and m aintains a record of patrons</p>
                           </div>
                        
                        </div>
                        <div className="item bg-l-org">
                        
                           <div className="item-img">
                              
                           </div>
                           <div className="slider-heading">
                              <p><strong>Silver</strong></p>
                              <p> Includes XYZ.. How to call patrons every week and m aintains a record of patrons</p>
                           </div>
                    
                        </div>
                        <div className="item bg-voilet">
                        
                           <div className="item-img">
                            
                           </div>
                           <div className="slider-heading">
                              <p><strong>Gold</strong><br/></p>
                              <p> Includes XYZ.. How to call patrons every week and m aintains a record of patrons</p>
                           </div>
            
                        </div>
                        
                       
                      
                       
                
                        
                        {/* <div className="navClass">></div>  */}
      </OwlCarousel>
      </div>
        )
    
}
