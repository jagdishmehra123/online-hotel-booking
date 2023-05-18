import React, { useState, useEffect } from 'react'
import './MyBookings.css'
import { useNavigate } from 'react-router-dom'
import axios from "../../../helpers/axios";


const MyBookings = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])


    const token = localStorage.getItem('token')
    const getBookingData = async () => {
        const response = await axios.get('http://localhost:4001/get-bookings')
        console.log(response)
        setList(response.data.list)
    }

    useEffect(() => {
        getBookingData()
        // eslint-disable-next-line
    }, [])

    //handle add review button
    const handleFeedbackButton = (id) => {
        console.log(id)
        navigate(`/rating-form/${id}`)
    }

    return (
        <div className='my-bookings-wrapper'>
            <div className='heading'><h3 style={{ fontFamily: 'Geomanist', textAlign: 'center' }}>BOOKINGS</h3></div>

            <div className='wrapper'>
                {(list.length <= 0) ? (<h1 style={{ opacity: '0.4', marginTop: '15rem', textAlign: 'center', margin: 'auto' }}>No Bookings yet !</h1>) :
                    (list.map((booking, i) => {
                        return (
                            <div className="booking-card">
                                <div className="resort-details">
                                    <h4 style={{ fontFamily: 'Geomanist', opacity: '0.6', textAlign: 'center' }}>{booking.resortname}</h4>
                                    <p className="room-type">Room Type: {booking.roomType}</p>
                                    <p className='.booking-dates' style={{ fontFamily: "Rajdhani, sans-serif" }}>Check-in: {booking.checkIn}</p>
                                    <p className='.booking-dates' style={{ fontFamily: "Rajdhani, sans-serif" }}>Check-out: 17 May 2023</p>
                                </div>

                                <div className="booking-rate">
                                    <p className="rate">Rate per night: $300</p>
                                    <p className="total-amount" style={{ fontFamily: "Rajdhani, sans-serif" }}>Total amount paid: $600</p>
                                </div>
                                <div className='revbtn-wrap'><button className="review-btn"
                                    onClick={() => handleFeedbackButton(booking.resortId)}>Add Review</button></div>
                            </div>
                        )
                    })
                    )
                }
            </div>
        </div>
    )
}

export default MyBookings