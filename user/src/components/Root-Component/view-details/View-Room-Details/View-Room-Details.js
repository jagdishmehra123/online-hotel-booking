import { useState, useEffect } from 'react';
import './View-Room-Details.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from '../../../../helpers/axios'
import RoomCard from '../RoomCard/RoomCard/RoomCard';

const ViewRoomDetails = () => {
    const [roomDetails, setRoomDetails] = useState();
    const { resortId, roomType, roomId } = useParams();
    console.log("resortId => ", resortId)
    console.log("roomType => ", roomType)
    console.log("roomId => ", roomId)
    const fetchRoomDetails = async () => {
        await axios.get(`https://online-hotel-booking-puce.vercel.app/resort-room/${resortId}/${roomId}`)
            .then((res) => {
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // console.log(roomDetails)

    useEffect(() => {
        fetchRoomDetails();
    }, [])

    // if (!roomDetails) {
    //     return (
    //         <h1>
    //             Loading...
    //         </h1>
    //     )
    // }

    return (
        <div className='view-details-container'>
            <section className='view-details-r1'>
                <img src={roomDetails?.imgUrl[0]} alt='' />
            </section>
        </div>
    )
}

export default ViewRoomDetails;