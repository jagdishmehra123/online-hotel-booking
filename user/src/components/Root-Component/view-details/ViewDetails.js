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
      const response = await axios.get(`https://online-hotel-booking-puce.vercel.app/resort-details/${id}`)
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


  //GET RATING


  return (
    <>
      <div className='view-details-wrapper'>
        <div className='resort-name'>
          <h2 data-aos="fade-down">
            {resortname}</h2>
        </div>

        {/* section1 */}
        <Images imgArr={imgArr} resort={resort} />
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
            <p>{resort.resortDescription}</p>
          </div>

        </div>



        <div className='booking-setion section3' id='booking-section' >
          <h3 data-aos="zoom-in" data-aos-delay='50' style={{ fontFamily: 'Geomainist' }}>Choose Your Room</h3>
          <div className='booking-wrapper'>
            <div className='room-card-wrapper'>
              {roomArr.map((room, i) => {
                return (
                  <RoomCard
                    room={room}
                    cart={cart} setCart={setCart}
                    roomArr={roomArr}
                    msg={msg} setMsg={setMsg} setroomstatus={setroomstatus}
                    activeBtn={activeBtn} setActiveBtn={setActiveBtn}
                    key={i + 1} />
                )
              })}
            </div>


            <div className='booking-cart-wrapper'>
              <div >
                <h4>MY BOOKINGS</h4>
                {/* <div>Rooms</div> */}
              </div>

              <div className='booking-cards'>

                {
                  (cart.length > 0) ? (
                    cart.map((item, i) => {
                      return (
                        <div className='minicard'>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h5>{item.room.roomType}</h5>
                            <Icon icon={bin} id='deleteicon' onClick={() => { handleDelete(i) }}></Icon>
                          </div>
                          <div style={{ display: 'flex' }}>
                            <p>
                              No of Rooms :
                              <span style={{ paddingLeft: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>{item.quantity}</span>
                            </p>
                            <p>
                              Price:
                              <span style={{ paddingLeft: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
                                Rs.{(item.room.ratePerNight) * (item.quantity)}
                              </span>
                            </p>
                          </div>
                          {roomstatus && <p style={{ color: 'red' }}>{msg}</p>}
                          <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button onClick={() => handleAdd(item.room, item.room.roomId)}
                              style={{
                                marginRight: '1rem',
                                backgroundColor: 'lightgrey',
                                padding: '0.1rem 0.5rem', color: 'black'
                              }}>+</button>
                            <button onClick={() => handleRemove(item.room, item.room.roomId, i)}
                              style={{
                                marginRight: '1rem',
                                backgroundColor: 'lightgrey',
                                padding: '0.1rem 0.5rem', color: 'black'
                              }}
                            >-</button>
                          </div>
                        </div>
                        //  {item.quantity}
                        //  {(item.room.ratePerNight) * (item.quantity)}

                      )
                    })

                  ) : (
                    <ul>
                      <li>Immediate confirmation</li>
                      <li>No extra booking charges</li>
                    </ul>
                  )
                }
              </div>
              {cart.length > 0 ? (<p onClick={handleReset}
                style={{ textAlign: 'right', cursor: 'pointer' }}>
                RESET
              </p>) : (null)}
              {(cart.length > 0) ? (
                <p style={{
                  backgroundColor: 'lightblue',
                  padding: '0.7rem', paddingBottom: '0.4rem', fontSize: '1.2rem',
                  border: '0px',
                  marginTop: '1rem',
                }}>
                  Your Total Amount:
                  <p style={{
                    float: 'right', fontWeight: 'bold', letterSpacing: '2px'
                  }}>Rs. {cart.reduce((total, item) => total + item.room.ratePerNight * item.quantity, 0)}</p>
                </p>

              ) : (null)}


              {(cart.length > 0) ? (
                <form onSubmit={handleBooking}>
                  <h6>Please fill your details for confirmation</h6>

                  <div className='form'>
                    <input type='text' placeholder='Full Name' name='name'
                      value={bookingForm.name} onChange={handleInputs} />
                    <input type='email' placeholder='Email' name='email'
                      value={bookingForm.email} onChange={handleInputs} />
                    <input type='text' placeholder='Contact' name='contact'
                      value={bookingForm.contact} onChange={handleInputs} />
                  </div>

                  <div className='reserveBtn'>
                    {formErr && <p
                      style={{ color: 'red' }}>Form Fields cannot be empty</p>}
                    <button type='submit'>BOOK NOW</button>
                  </div>
                </form>
              ) :
                (null)}
            </div>
          </div>
        </div>
        {/* section3 booking section ends */}


        {(reviews.length <= 0) ? (null) : (
          <Reviews reviews={reviews} setReviews={setReviews} id={id} />
        )}
      </div>
    </>
  )
}

export default ViewDetails