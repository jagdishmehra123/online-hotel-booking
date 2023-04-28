import React, { useEffect } from 'react'
import './BookingPage.css'


const BookingPage = ({ bookingData, cart, setCart, newRoom }) => {



  useEffect(() => {
    setCart([...cart, newRoom])
    // eslint-disable-next-line
  }, [roomId])

  return (
    <div className='booking-page-wrapper'>
      <h5>MY BOOKINGS</h5>
    </div>
  )
}

export default BookingPage