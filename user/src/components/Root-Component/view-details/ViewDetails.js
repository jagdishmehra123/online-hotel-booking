import React, { useEffect, useState } from 'react'
import './ViewDetails.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from '../../../helpers/axios';
import { FaStar } from 'react-icons/fa';

import Images from './Images';
import RoomCard from './RoomCard/RoomCard';
import Reviews from './reviews/Reviews';
import { Icon } from 'react-icons-kit'
import { bin } from 'react-icons-kit/icomoon/bin'

const ViewDetails = () => {
  const navigate = useNavigate()


  const [resort, setResort] = useState({})
  const [imgArr, setImgArr] = useState([])
  const [roomArr, setRoomArr] = useState([])
  const [cart, setCart] = useState([])
  const [reviews, setReviews] = useState([])
  const [msg, setMsg] = useState('')
  const [roomstatus, setroomstatus] = useState(false)
  const [activeBtn, setActiveBtn] = useState(true)
  const [price, setPrice] = useState('')
  const [occName, setOccName] = useState('')


  // eslint-disable-next-line
  const { resortname, id } = useParams()



  //GET PROPERTY DETAILS
  const getProperty = async () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    try {
      const response = await axios.get(`https://online-hotel-booking-puce.vercel.app/resort-details/${id}`)
      // console.log(response.data.resortData[0].rooms)
      setResort(response.data.resortData[0])
      setRoomArr(response.data.resortData[0].rooms)
      setImgArr(response.data.resortData[0].rooms[0].imgUrl);


      (dayOfWeek === 0 || dayOfWeek === 6) ? (setPrice('weekendPrice')) : (setPrice('weekdayPrice'))

    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getProperty()

   
    // eslint-disable-next-line
  }, [id])





  return (
    <>
      <div className='view-details-wrapper'>
        <div className='resort-name'>
          <h2 data-aos="fade-down">
            {resortname}</h2>
        </div>

        {/* section1 */}
        <Images images={imgArr} interval={1800} />
        {/* section1 ends*/}


        <div className='section2'>
          <div className='property-info'>
            {/* <div>
              {
                [...Array(5)].map((star, index) => {
                  return (
                    <FaStar size={20} style={{ color: 'orange' }} key={index + 1} />
                  )
                })
              }
            </div> */}
            <p >{resort.resortDescription}</p>
          </div>

        </div>



        <div className='booking-setion section3' id='booking-section' >
          <h3 data-aos="zoom-in" data-aos-delay='20' style={{ fontFamily: 'Geomainist' }}>Choose Your Room</h3>
          <div className='booking-wrapper'>
            <div className='room-card-wrapper'>
              {roomArr.map((room, i) => {
                return (
                  <RoomCard resortId={id} resortname={resortname}
                    room={room}
                    cart={cart} setCart={setCart}
                    roomArr={roomArr} price={price}
                    msg={msg} setMsg={setMsg} setroomstatus={setroomstatus}
                    activeBtn={activeBtn} setActiveBtn={setActiveBtn}
                    key={i + 1} />
                )
              })}
            </div>

          </div>
        </div>
        {/* section3 booking section ends */}


        <Reviews reviews={reviews} setReviews={setReviews} id={id} />
      </div>
    </>
  )
}

export default ViewDetails