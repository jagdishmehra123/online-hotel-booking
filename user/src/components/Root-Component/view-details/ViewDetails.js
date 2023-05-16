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
  const [formErr, setFormErr] = useState(false)
  const [reviews, setReviews] = useState([])
  const [msg, setMsg] = useState('')
  const [roomstatus, setroomstatus] = useState(false)
  const [activeBtn, setActiveBtn] = useState(true)


  // eslint-disable-next-line
  const { resortname, id } = useParams()



  //GET PROPERTY DETAILS
  const getProperty = async () => {
    try {
      const response = await axios.get(`/resort-details/${id}`)
      console.log('view details of resort', response.data.resortData[0].rooms)
      setResort(response.data.resortData[0])
      setRoomArr(response.data.resortData[0].rooms)
      setImgArr(response.data.resortData[0].rooms[0].imgUrl)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getProperty()
    // eslint-disable-next-line
  }, [id])

  //HANDLE RESET
  const handleReset = () => {
    setCart([])
  }


  //HANDLE ADD( same as handle reserve from RoomCard componenet)
  const handleAdd = (room, id) => {
    // console.log(cart)

    console.log(room)
    const exixstingRoom = cart.find((item) => item.room.roomId === id)
    if (exixstingRoom) {
      setCart(
        cart.map((item) =>
          item.room.roomId === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    }
    else {
      setCart([...cart, { room, quantity: 1 }])
    }
  }

  //HANDLE REMOVE
  const handleRemove = (room, id, index) => {
    // console.log(cart)
    console.log(room)

    const exixstingRoom = cart.find((item) => item.room.roomId === id)
    if (exixstingRoom.quantity === 1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
    else {
      if (exixstingRoom && exixstingRoom.quantity > 0) {
        setCart(
          cart.map((item) =>
            item.room.roomId === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        )
        console.log(exixstingRoom.quantity)

      }
    }
  }


  //HANDLE BACKEND - UPDATE DATA AFTER POSTING BOOKING FORM
  const updateTotalRoomsinDb = async (cart) => {
    console.log("Original Rooms =>", resort.rooms)
    let updatedCart = []
    for (let i = 0; i < cart.length; i++) {
      updatedCart[i] = { ...cart[i] }
      let updatedTotalRooms = cart[i].room.availableRooms - cart[i].quantity
      updatedCart[i].room.availableRooms = updatedTotalRooms
    }
    console.log("Updated Rooms =>", updatedCart)
    await axios.patch(`/updateTotalRoomsinDb/${resort._id}`, updatedCart)
      .then((res) => {
        console.log(res)
        if (res.data.message === "Total Rooms Data Updation Failed") {
          return (false)
        }
        return (true)
      })
      .catch((err) => {
        console.log(err)
        alert("An error occoured please try after some time!")
      })
  }




  const token = localStorage.getItem('token')
  //HANDLE RESERVE
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', contact: '',
  })
  //HANDLE BOOKING FORM INPUTS
  const handleInputs = (e) => {
    setBookingForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }
  const handleBooking = async (e) => {
    e.preventDefault();
    console.log(bookingForm)
    const total = cart.reduce((total, item) => total + item.room.ratePerNight * item.quantity, 0)
    const data = {
      ...bookingForm,
      resortname: resortname,
      resortId: id,
      cart: cart,
      totalAmount: total
    }
    if (bookingForm.name === '' || bookingForm.email === '' || bookingForm.contact === '') {
      setFormErr(true)
    }
    else {
      console.log(data)
      // eslint-disable-next-line
      data.cart = data.cart.filter((i) => {
        if (i.quantity > 0)

          return i

      })
      updateTotalRoomsinDb(data.cart)
      const response = await axios.post('/booking-form', data, {
        headers: {
          authorization: token
        }
      })
      // if (response.data.success) {
      console.log(response.data)
      alert('We have reserved a room for you')
      getProperty()
      navigate('/my-bookings')
    }
  }



  React.useEffect(() => {
    if (cart.length > 0) { setFormErr(false) };
    if (cart.length === 0) { setCart([]) }
  }, [cart.length])



  //HAADLE DELETE
  const handleDelete = (index) => {
    console.log(index)
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  }




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
                    roomArr={roomArr}
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