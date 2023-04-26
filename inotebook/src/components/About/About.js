import React from 'react'
import Slide1 from '../../img/1.jpg'
import Slide2 from '../../img/2.jpg'
import Slide3 from '../../img/3.jpg'


const About = () => {

  return (
    <>
      <div className="d-flex justify-content-center mb-3 fs-100 mt-5 mb-5"><h4>READ WRITE DELETE NOTES on iNOTEBOOK</h4></div>
      <div className="container col-md-4 d-flex justify-content-center mt-5 mb-3">
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Slide1} className="d-block w-100" alt="Slide1" />
          </div>
          <div className="carousel-item">
            <img src={Slide2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={Slide3} className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
      </div>
    </>

  )
}

export default About