import React, { useState, useEffect } from 'react'
import './BookingPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { toast } from 'react-hot-toast'
import moment from 'moment'

const BookingPage = ({ }) => {
    const navigate = useNavigate()
    const { resortname, resortId, roomId } = useParams()
    const [room, setRoom] = useState('a')

    //get room details
    const getRoom = async () => {
        try {
            const response = await axios.get(`https://online-hotel-booking-puce.vercel.app/resort-room/${resortId}/${roomId}`)
            if (response.data.success) {
                console.log(response.data)
                setRoom(response.data.data)
            }
            else {
                console.log(response)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getRoom();
        console.log('setroom', room)
        // eslint-disable-next-line
    }, [])



    //booking form
    const [bookingForm, setBookingForm] = useState({
        specialRequest: '', noOfRooms: '',
        email: '', name: '', contact: '', checkIn: '', checkOut: ''
    })
    //handle inputs
    const handleInputs = (e) => {
        setBookingForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }


    //UPDATE ROOM DATA IN BACKEND (i.e no of rooms)  when user book rooms
    const UpdateRoom = async () => {
        const updateData = {
            noOfRooms: bookingForm.noOfRooms,
            availableRooms: room.availableRooms
        }
        console.log('updateData', updateData)
        try {
            const response = await axios.patch(`https://online-hotel-booking-puce.vercel.app/update-room/${resortId}/${roomId}`, updateData)
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }




    //handle checkout
    const checkout = async () => {
        console.log(bookingForm)
        const bookingDate = moment().format('DD/MM/YYYY')
        const bookingTime = moment().format('HH:mm')

        const bookingData = {
            name: bookingForm.name,
            email: bookingForm.email,
            contact: bookingForm.contact,
            resortname: resortname,
            resortId: resortId,
            roomType: room.roomType,
            roomId:roomId,
            checkIn: bookingForm.checkIn,
            checkOut: bookingForm.checkOut,
            noOfRooms: bookingForm.noOfRooms,
            specialRequest: bookingForm.specialRequest,
            totalAmount: room.ratePerNight,
            bookingDate: bookingDate,
            bookingTime: bookingTime
        }

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                toast.error('Please signIn to your account to book a room')
            }
            else {
                const response = await axios.post('https://online-hotel-booking-puce.vercel.app/booking-form', bookingData, {
                    headers: {
                        authorization: token
                    }
                })
                if (response.data.success) {
                    console.log(response)
                    UpdateRoom();
                    toast.success('Thanks! we reserved a room for you')
                    // navigate('/my-bookings')
                }
                else {
                    toast.error(response.data.message)
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }







    return (
        <div className='booking-page-wrapper container'>
            <div className='heading'>
                <h1 data-aos='zoom-in' data-aos-delay='50'>FINALIZE YOUR STAY</h1>
            </div>

            <div className='row1'>
                <h5>Your Reservation Summary</h5>
            </div>

            <div className='row2'>
                <h4>{resortname}</h4>
                <table>
                    <tr>
                        <td>Check-in from :</td>
                        <td>12:00 PM</td>
                    </tr>
                    <tr>
                        <td>Check-out before :</td>
                        <td>10:00 AM</td>
                    </tr>
                    <tr>
                        <td>Reception contact :</td>
                        <td> </td>
                    </tr>
                </table>
            </div>

            <div className='row3' >
                <div className='col1'>
                    <div className='row1'>
                        <p >{room.roomType}
                            {
                                (room.breakfast === true) ? (
                                    <span className='breakfast-option' style={
                                        {
                                            fontSize: '1rem',
                                            fontWeight: 'normal',
                                        }
                                    }>Room with breakfast</span>
                                ) : (null)
                            }
                        </p>

                        {/* <p style={{ lineHeight: '1rem', fontFamily: "'Ysabeau', sans-serif" }}>Check-in date :</p> */}
                        {/* <p style={{ lineHeight: '1rem', fontFamily: "'Ysabeau', sans-serif" }}>Check-out date : </p> */}

                        <p style={{ lineHeight: '1rem', fontFamily: "'Ysabeau', sans-serif" }}>Adult Capacity : <span>{room.adultCapacity}</span></p>
                        <p style={{ lineHeight: '1rem', fontFamily: "'Ysabeau', sans-serif" }}>Charges Per Night : {`Rs. ${room.ratePerNight} +Taxes`} </p>
                    </div>
                    <div className='row2'>
                        <div><p>Total</p></div>
                        <div><p>{`Rs. ${room.ratePerNight}`}</p></div>
                    </div>
                </div>
                <div className='col2'>
                    <h3>Special Request</h3>
                    <h6>Please explain your request: arrival time, flight details, food preferences, membership number...</h6>
                    <div>
                        <textarea name='specialRequest' value={bookingForm.specialRequest} onChange={handleInputs} />
                    </div>
                </div>
            </div>

            {/* <div className='dummy-border'></div> */}

            <div className='row4'>
                <h3>Guest Information</h3>

                <div>
                    {/* guest details form */}
                    <div className='col1'>
                        <h6>Personal Details</h6>
                        <form className='guestform'>
                            <div><TextField type='email' className='form-input'
                                id="outlined-basic" label="Email address" variant="outlined" required
                                name='email' value={bookingForm.email} onChange={handleInputs} />
                            </div>
                            <div>
                                <TextField type='text' className='form-input'
                                    id="outlined-basic" label="Full Name" variant="outlined" required
                                    name='name' value={bookingForm.name} onChange={handleInputs} />
                            </div>
                            <div>
                                <TextField type='number' className='form-input'
                                    id="outlined-basic" label="Phone Number" variant="outlined" required
                                    name='contact' value={bookingForm.contact} onChange={handleInputs} />

                            </div>
                            <div>
                                <lable>Check-in date</lable>
                                <TextField type='date' className='form-input'
                                    id="outlined-basic" variant="outlined" required
                                    name='checkIn' value={bookingForm.checkIn} onChange={handleInputs} />
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <lable>Check-out date</lable>
                                <TextField type='date' className='form-input'
                                    id="outlined-basic" variant="outlined" required
                                    name='checkOut' value={bookingForm.checkOut} onChange={handleInputs} />
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <lable>No of Rooms</lable>
                                <TextField type='number' className='form-input'
                                    id="outlined-basic" variant="outlined" required
                                    name='noOfRooms' value={bookingForm.noOfRooms} onChange={handleInputs} />
                            </div>
                        </form>
                    </div>
                    {/* guest details form ends */}
                    <div className='dummy-border'></div>


                    {/* payment infomation */}
                    <div className='col2'>
                        <h6>Payment Information</h6>
                    </div>
                    {/* payment infomation ends */}

                </div>


                <div className='checkout-btn'>
                    <Button className='button' onClick={checkout}>CheckOut</Button>
                </div>


            </div>


            <p>Note: Please carefully go through our terms and conditions carefully before booking confirmation
                <span style={{
                    marginLeft: '1rem',
                    color: 'blue',
                    cursor: 'pointer'
                }}
                    onClick={() => { navigate('/terms') }}>click here</span>
            </p>

        </div >
    )
}

export default BookingPage