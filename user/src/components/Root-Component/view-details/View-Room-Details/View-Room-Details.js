import { useState, useEffect } from 'react';
import './View-Room-Details.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from '../../../../helpers/axios'
import { Icon } from 'react-icons-kit'
import { circle } from 'react-icons-kit/fa/circle'
import Footer from '../../Footer/Footer'
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Button } from '@mui/material';


const ViewRoomDetails = () => {
    const navigate = useNavigate()

    const [resortDetails, setResortDetails] = useState();
    const [roomDetails, setRoomDetails] = useState();
    const { resortId, roomType, roomId } = useParams();
    const [resortname, setResortName] = useState('')
    // console.log("resortId => ", resortId)
    // console.log("roomType => ", roomType)
    // console.log("roomId => ", roomId)
    const fetchRoomDetails = async () => {
        await axios.get(`/resort-room/${resortId}/${roomId}`)
            .then((res) => {
                console.log(res.data.data)
                setRoomDetails(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // console.log(roomDetails)
    const getresort = async () => {
        const resp = await axios.get(`/resort-details/${resortId}`)
        console.log('resort', resp.data.resortData)
        setResortDetails(resp.data.resortData)
        setResortName(resp.data.resortData[0]?.resortName)
    }
    useEffect(() => {
        fetchRoomDetails();
        getresort();
    }, [])

    //HANDLE RESERVE
    //HANDLE RESERVE BUTTON
    const handleReserve = (resortname, resortId, roomId) => {
        console.log(resortname, resortId, roomId)
        navigate(`/booking-summary/${resortname}/${resortId}/${roomId}`)

    }
    if (!roomDetails) {
        return (
            <h1>
                Loading...
            </h1>
        )
    }

    return (
        <>
            <div className='view-details-container'>
                <div className='row1'>
                    <section className='imgwrap' data-aos='flip-right'>
                        <img src={roomDetails?.imgUrl[3]} alt='' />
                    </section>
                </div>
                <section className='content-wrap' >
                    <div>
                        <h2>{roomType}</h2>
                        <div>
                            <div>Adults <span>{roomDetails?.adultCapacity}</span></div>
                            <div>Children<span>{roomDetails?.childrenCapacity}</span></div>
                        </div>
                    </div>
                    <p >
                        Our {roomDetails?.adultCapacity} -bed capacity {roomDetails?.roomType} rooms
                        are sleek and showcase understated comfort and design.
                        <br />
                        Slip into your complimentary bathrobe and slippers and make yourself at home.
                    </p>
                </section>

            </div >

            <div className='book-now-btn'>
                <Button className='booknowbtn' variant="contained" color="success"
                    onClick={() => {
                        handleReserve(resortname, resortId, roomDetails.roomId,)
                    }}>BOOK NOW</Button>
            </div>

            <div className='view-details-container-row2' >
                <h2>Aminities & Services</h2>
                <div>

                    <section>
                        <p >{roomDetails.Wifi ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Wifi</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.airconditioned ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Air conditioned</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.balcony ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Balcony</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.bedsideTable ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>bedside Table</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.breakfast ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Breakfast</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.childrenCapacity ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Children Capacity</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.fitnessCenter ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Fitness Center</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.spa ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Spa</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.swimmingPool ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Spa</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.swimmingPool ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Swimming Pool</span></p>
                    </section>
                    <section>
                        <p >{roomDetails.wardrobe ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} /></span> : <span className="room-amenities-no"><FaTimes style={{ color: 'darkred' }} /></span>}
                            <span syle={{ marginLeft: '1rem' }}>Wardrobe</span></p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ViewRoomDetails;