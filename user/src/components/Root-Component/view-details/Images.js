import React, { useState } from 'react'
import './Images.css'
import { Icon } from 'react-icons-kit'
import { circleRight } from 'react-icons-kit/icomoon/circleRight'
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft'
import {location} from 'react-icons-kit/icomoon/location'



const Images = ({ imgArr ,resort}) => {

  // MOBILE VIEW SOLDER
  const [current, setCurrent] = useState(0)
  const nextBtn = () => {
    setCurrent((current === imgArr.length - 1) ? (0) : (current + 1))
  }
  const prevBtn = () => {
    setCurrent((current === 0) ? (imgArr.length - 1) : (current - 1))
  }
  // MOBILE VIEW SOLDER ENDS


  return (
    <div className='imagesWrapper'>
      <div className='icon1'><Icon icon={circleLeft} onClick={prevBtn} size={25}/></div>
      <div className='roomimg'><img src={imgArr[current]} alt='' /></div>
      <div className='icon2'><Icon icon={circleRight} onClick={nextBtn} size={25}/></div>

      <div className='titles'>
        <h3>{resort.resortName}</h3>
        <div className='location'>
          <div>
            <Icon icon={location} size={20} style={{color:'darkgrey'}}/></div>
            <h6>{resort.resortLocation}</h6>
          </div>
      </div>


      <div className='titles2'>
        <h3>{resort.resortName}</h3>
        <div className='location'>
          <div>
            <Icon icon={location}/></div>
            <h6>{resort.resortLocation}</h6>
          </div>
      </div>
    </div>

  )
}

export default Images