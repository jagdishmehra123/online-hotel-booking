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
    <div className='imagesWrapper' data-aos='zoom-in' data-aos-delay='200' data-aos-offset='10'>
      <div className='icon1'><Icon icon={circleLeft} onClick={prevBtn} size={25}/></div>
      <div className='roomimg'><img src={imgArr[current]} alt='' /></div>
      <div className='icon2'><Icon icon={circleRight} onClick={nextBtn} size={25}/></div>
    </div>

  )
}

export default Images