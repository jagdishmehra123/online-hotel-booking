import React from 'react'
import beachResort from "../../assets/GOAPalolemBeach.mp4"
import "../../styles/main.css"
const Video = () => {
  return (
    <div className='main' >
      < video src={beachResort} autoPlay loop muted data-aos="flip-left" data-aos-delay="600" data-aos-easing="ease-in-out" />
      {/* <div className='home-text' data-aos="zoom-in" data-aos-delay="2000" data-aos-easing="ease-in-out" >
        <h1 >Captivating Paradise</h1>
        <h4>for unwinding and reveling</h4>
      </div> */}

    </div>
  )
}

export default Video
