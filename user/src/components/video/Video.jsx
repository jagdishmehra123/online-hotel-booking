import React from 'react'
import beachResort from "../../assets/beachResort.mp4"
import "../../styles/main.css"
const Video = () => {
  return (
    <div className='main' >
        < video src={beachResort} autoPlay loop muted  data-aos="flip-left" data-aos-delay="800" data-aos-easing="ease-in-out"/>
        <div className='home-text' data-aos="flip-left" data-aos-delay="1200" data-aos-easing="ease-in-out" >
             <h1 >Captivating Paradise</h1>
             <h4>for unwinding and reveling</h4>
        </div>
    </div>
  )
}

export default Video