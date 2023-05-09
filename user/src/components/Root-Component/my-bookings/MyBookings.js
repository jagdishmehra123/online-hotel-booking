import './MyBookings.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../../../helpers/axios";


const MyBookings = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])


    const token = localStorage.getItem('token')
    const getBookingData = async () => {
        const response = await axios.get('/get-bookings', {
            headers: {
                authorization: token
            }
        })
        console.log(response.data.list[0].cart)
        setList(response.data.list)
    }

    useEffect(() => {
        getBookingData()
        // eslint-disable-next-line
    }, [])


    const handleFeedbackButton=(id)=>{
        console.log(id)
        navigate(`/rating-form/${id}`)
    }

    return (
        <div className='my-bookings-wrapper'>
            <h3>MY BOOKINGS</h3>

            <div className='wrapper'>
                {list.map((booking, i) => {
                    return (
                        <div className='card' key={i + 1}>
                            <div className='row1'>
                                <p>Total Amount</p>
                                <h5>Rs.  {booking.totalAmount}</h5>
                            </div>
                            <div className='row2'>
                                <h5>{booking.resortname}</h5>
                                <p></p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Room Type</th>
                                            <th>No of Rooms</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {booking.cart.map((item, i) => {
                                            return (
                                                <tr key={i + 1}>
                                                    <td>{item.room.roomType}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.quantity}*{item.room.ratePerNight}
                                                        <br />
                                                        =
                                                        <span style={{ marginLeft: '0.3rem', fontWeight: 'bold' }}
                                                        >{(item.quantity) * (item.room.ratePerNight)}</span></td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='row3' >
                                <button id='rateusbtn' onClick={() => handleFeedbackButton(booking.resortId)}>Share Feedback</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyBookings