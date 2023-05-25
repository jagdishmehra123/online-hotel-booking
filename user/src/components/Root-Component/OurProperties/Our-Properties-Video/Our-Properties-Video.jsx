import React from 'react'
import bannerVideo from "../../../../assets/beachResort.mp4"
// import beachResort from "../../assets/beachResort.mp4"
import "../../../../styles/main.css"
const OurPropertyBannerVideo = () => {
  return (
    <div className='main' >
      < video src= {bannerVideo}
      
      autoPlay loop muted data-aos="flip-left" data-aos-delay="600" data-aos-easing="ease-in-out" />
      <div className='home-text' data-aos="flip-left" data-aos-delay="1000" data-aos-easing="ease-in-out" >
        <h1 >The Cuba Goa Properties</h1>
        <h4>BEACH HUTS, BUNGALOWS & RESORTS</h4>
      </div>
      
    </div>
  )
}

export default OurPropertyBannerVideo
